<template>
  <div class="app-page">
    <Slider />
    <Modal ref="catalogFilters">
      <template v-slot:body>
        <div class="checkbox-filter s-catalog__aside-filter" v-for="filter in filters" :key="filter.name" @change="filterProducts(filters, filter)">
          <div class="slide-checkbox checkbox-filter__input">
            <input type="checkbox" class="slide-checkbox__input" :name="'m-checkbox-' + filter.value" :id="'m-checkbox-' + filter.value" :checked="filter.active">
            <label :for="'m-checkbox-' + filter.value" class="slide-checkbox__label"></label>
          </div>
          <p class="checkbox-filter__name">
            {{ filter.name }}
          </p>
        </div>
      </template>
    </Modal>
    <section class="s-catalog">
      <div class="s-catalog__aside">
        <div class="checkbox-filter s-catalog__aside-filter" v-for="filter in filters" :key="filter.name" @change="filterProducts(filters, filter)">
          <div class="slide-checkbox checkbox-filter__input">
            <input type="checkbox" class="slide-checkbox__input" :name="'checkbox-' + filter.value" :id="'checkbox-' + filter.value" :checked="filter.active">
            <label :for="'checkbox-' + filter.value" class="slide-checkbox__label"></label>
          </div>
          <p class="checkbox-filter__name">
            {{ filter.name }}
          </p>
        </div>
      </div>
      <div class="s-catalog__content">
        <h1 class="s-catalog__title" @click="$refs.cart.openModal()">Краски</h1>
        <div class="s-catalog__header">
          <button
            class="s-catalog__header-show-filters-mbl"
            @click="$refs.catalogFilters.openModal()"
          >
            Фильтры
          </button>
          <p class="s-catalog__header-goods-amount">{{ productsCounter }} {{ goodsWord }}</p> 
          <CustomSelect>
            <template v-slot:body>
              <li v-for="item in sorting" :key="item.name" :class="{ 'is-active': item.active  }">
                <input type="radio" :id="'radio-' + item.name" :name="'radio-' + item.name" :checked="item.active">
                <label :for="'radio-' + item.name" @click="sortProducts(item)">{{ item.value }}</label>
              </li>
            </template>
          </CustomSelect>
        </div>
        <section class="s-goods-list">
          <div class="goods-card s-goods-list__goods-card"  v-for="item in fProducts" :key="item.id" itemscope="" itemtype="http://schema.org/Product">
            <a class="goods-card__img-wrapper" href="javascript:void(0)" itemprop="url">
              <div class="goods-card__labels">
                <div class="goods-card__label" v-if="item.new">
                  new
                </div>
                <div class="goods-card__label" v-if="item.popular">
                  popular
                </div>
              </div>
              <img class="goods-card__img" :src="require('@/assets/img/' + item.img + '.jpg')" :alt="item.text" itemprop="image">
            </a>
            <a class="goods-card__title" href="javascript:void(0)" itemprop="name">
              {{item.text}}
            </a>
            <div class="goods-card__footer" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
              <p class="goods-card__price" itemprop="price" :content="item.price">{{ item.price }} ₽</p>
              <a href="javascript:void(0)" class="goods-card__add-to-cart" @click="addToCart(item)">
                <img src="@/assets/img/plus.svg" alt="plus icon" title="plus icon">
              </a>
              
              <link itemprop="availability" href="http://schema.org/InStock">
              <meta itemprop="priceCurrency" content="RUB">
              <meta itemprop="priceValidUntil" content="2029-12-31">
              <meta itemprop="price" content="91990.99">
              <meta itemprop="priceCurrency" content="RUB">
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import Slider from '@/components/Slider.vue'
import Modal from "@/components/Modal.vue";
import CustomSelect from "@/components/CustomSelect.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: 'Catalog',
  data() {
    return {
      filters: [
        {name: 'Новинки', value: 'new', active: false},
        {name: 'Есть в наличии', value: 'available', active: false},
        {name: 'Контрактные', value: 'contract', active: false},
        {name: 'Эксклюзивные', value: 'exclusive', active: false},
        {name: 'Распродажа', value: 'sale', active: false},
      ],
      sorting: [
        {name: 'expensive', value: 'Сначала дорогие', active: true},
        {name: 'cheap', value: 'Сначала недорогие'},
        {name: 'popular', value: 'Сначала популярные'},
        {name: 'new', value: 'Сначала новые'},
      ],
      filteredProducts: []
    }
  },
  components: {
    Modal,
    Slider,
    CustomSelect
  }, 
  computed: {
    ...mapGetters(["Products"]),
    fProducts(){
      return this.filters.filter(filter => filter.active).length > 0 ? this.orderedItems(this.filteredProducts, this.sorting.filter(item => item.active)) : this.orderedItems(this.Products, this.sorting.filter(item => item.active))
    },
    productsCounter(){
      return this.filters.filter(filter => filter.active).length > 0 ? this.filteredProducts.length : this.Products.length
    },
    goodsWord: function(){
      let num = this.productsCounter;
      return this.getTrueWord(num, ' товар', ' товара', ' товаров');
    }
  },
  methods: {
    ...mapActions(["addToCart"]),
    filterProducts(filters, filter){
      this.filteredProducts = [];
      filter.active = !filter.active;

      let activeFilters = filters.filter(filter => filter.active).length,
          Products = this.Products;

      this.filteredProducts = Products.filter(product => {
        let counter = 0;

        filters.map(function(filter){
          for(let key in product){
            if(filter.value == key && filter.active && product[key]){
              counter++;
            }
          }
        })
        if(parseInt(counter) == parseInt(activeFilters))
          return true;
      })
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
    },
    orderedItems(items, value) {
      let sortingName = value[0].name;

      if(sortingName == 'expensive'){
        return items.slice().sort(function (a, b) {
            return parseInt(a.price) < parseInt(b.price) ?  1 : -1
        }); 
      } else if(sortingName == 'cheap'){
        return items.slice().sort(function (a, b) {
            return parseInt(a.price) > parseInt(b.price) ?  1 : -1
        }); 
      } else if(sortingName == 'popular'){
        return items.slice().sort(function (a, b) {
            return a.popular < b.popular ?  1 : -1
        }); 
      } else if(sortingName == 'new'){
        return items.slice().sort(function (a, b) {
            return parseInt(a.id) < parseInt(b.id) ?  1 : -1
        }); 
      }
    },
    sortProducts(item){
      this.sorting.map(function(sortingEl){
        sortingEl.active = false;
      })
      item.active = true;
    }
  }
}

</script>
