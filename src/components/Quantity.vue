<template>
    <div class="quantity-toggle">
        <button class="quantity-toggle__button" @click="changeQty({ item, data: 0 })">
            <img src="@/assets/img/minus.svg" alt="#" title="#">    
        </button>
        <input class="quantity-toggle__input" type="text" :value="item.quantity" readonly>
        <button class="quantity-toggle__button" @click="changeQty({ item, data: 1 })">
            <img src="@/assets/img/plus.svg" alt="#" title="#">  
        </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: [
    'item'
  ],
  methods: {
    ...mapActions(['changeQty'])
  }
}
</script>

 