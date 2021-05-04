<template>
  <transition name="translate">
    <div class="asidecart" v-if="show" :class="TotalGoods || Object.keys(Removed).length ? '' : 'is-empty'">
      <div class="asidecart__backdrop" @click="closeModal()"/>

      <div class="asidecart__dialog">
        <div class="asidecart__empty-content">
          <img class="asidecart__empty-content-icon" src="@/assets/img/empty-cart.png">
          <p class="asidecart__empty-content-text">Ваша корзина пуста. <br> Добавьте товары, чтобы продолжить</p>
        </div>
        <div class="asidecart__header">
          <h2 class="asidecart__title">Корзина</h2>
          <button class="asidecart__close-button" @click="closeModal()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="asidecart__subheader">
          <p class="asidecart__subheader-counter">{{ TotalGoods }} {{ goodsWord }}</p>
          <button class="asidecart__subheader-clear-button" @click="removeAllFromCart()">
            Очистить список
          </button>
        </div>
        <div class="asidecart__goods_list">
          <div v-for="item in Cart" :key="item.id" class="asidecart__goods-item">
            <div class="asidecart__goods-item-img">
              <img :src="require('@/assets/img/' + item.img +'.jpg')" alt="#" title="#">                          
            </div>
            <div class="asidecart__goods-item-text-wrapper">
              <a href="#" class="asidecart__goods-item-title">
                {{ item.text }}             
              </a>
              <div class="asidecart__goods-item-price">
                {{ item.price }} ₽  
              </div>
            </div>
            <Quantity :item="item"/>
            <a href="javascript:void(0);" class="asidecart__goods-item-delete" @click="removeFromCart(item)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g opacity="0.2">
                  <path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
              </svg>
            </a>
          </div>
          <div v-for="item in Removed" :key="item.id" class="asidecart__goods-item is-removed">
            <span class="asidecart__goods-item-removed-wrapper">
              <div class="asidecart__goods-item-img">
              <img :src="require('@/assets/img/' + item.img +'.jpg')" alt="#" title="#">                          
              </div>
              <div class="asidecart__goods-item-text-wrapper">
                <a href="#" class="asidecart__goods-item-title">
                  {{ item.text }}             
                </a>
                <div class="asidecart__goods-item-price">
                  {{ item.price }} ₽  
                </div>
              </div>
              <Quantity :item="item"/>
              <a href="javascript:void(0);" class="asidecart__goods-item-delete" @click="removeFromCart(item)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g opacity="0.2">
                    <path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                </svg>
              </a>
            </span>
            <button class="asidecart__goods-item-refresh-button" @click="refreshGoods(item)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 1L21 5L17 9" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 23L3 19L7 15" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="asidecart__footer">
          <div class="asidecart__footer-total-wrapper">
            <p class="asidecart__footer-total-title">
              Итого
            </p>
            <p class="asidecart__footer-total-price">
              {{ TotalPrice }} ₽
            </p>
          </div>
          <a class="asidecart__footer-order-button" href="#">Оформить заказ</a>
        </div>
      </div>
  </div>
  </transition>
</template>

<script>
import Quantity from '@/components/Quantity.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "AsideCart",
  data() {
    return {
      show: false
    };
  },
  components: {
    Quantity
  },
  methods: {
    ...mapActions(['removeFromCart', 'removeAllFromCart', 'refreshGoods']),
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    },
    getTrueWord(num, form1, form2, form3) {
      let result, perc;
      
      switch(num%10){
          case 1:
              result = (num%100)==11?form3:form1;
          break;
          case 0:case 5:case 6:case 7:case 8:case 9:
              result = form3;
          break;
          case 2:case 3:case 4:
              perc = (num%100);
              result = perc==12||perc==13||perc==14?form3:form2;
          break;
      }

      return result; 
    }
  },
  computed: {
    ...mapGetters(['Cart', 'TotalPrice', 'TotalGoods', 'Removed']),
    goodsWord: function(){
      let num = this.TotalGoods;
      return this.getTrueWord(num, ' товар', ' товара', ' товаров');
    }
  },
};
</script>


<style lang="scss" scoped>
  .translate-enter-active,
  .translate-leave-active {
    transition: opacity 0.4s;

    .asidecart__backdrop{
      transition: opacity 0.4s;
    }
    .asidecart__dialog{
      transition: transform 0.4s;
    }
  }
  .translate-enter-from,
  .translate-leave-to {
    .asidecart__backdrop{
      opacity: 0;
    }
    .asidecart__dialog{
      transform: translateX(100%);
    }
  }
  .translate-enter-to {
    .asidecart__backdrop{
      opacity: 1;
    }
    .asidecart__dialog{
      transform: translateX(0%);
    }
  }
</style>
