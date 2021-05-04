import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    goodsList: [
      {
        id: '1',
        img: 'goods1',
        text: 'Краска Wallquest, Brownsone M1',
        price: '1400',
        popular: true,
        contract: true,
        sale: true,
        new: false,
        exclusive: true,
        available: true
      },
      {
        id: '2',
        img: 'goods2',
        text: 'Краска Wallquest, Brownsone M2',
        price: '3400',
        contract: true,
        popular: false,
        sale: true,
        new: false,
        exclusive: true,
        available: true
      },
      {
        id: '3',
        img: 'goods3',
        text: 'Краска Wallquest, Brownsone M3',
        price: '5400',
        contract: true,
        popular: true,
        new: false,
        exclusive: true,
        available: true
      },
      {
        id: '4',
        img: 'goods4',
        text: 'Краска Wallquest, Brownsone M4',
        price: '31400',
        popular: true,
        new: true,
        contract: true,
        exclusive: false,
        available: false
      },
      {
        id: '5',
        img: 'goods5',
        text: 'Краска Wallquest, Brownsone M5',
        price: '7700',
        popular: false,
        new: true,
        exclusive: true,
        available: true
      },
      {
        id: '6',
        img: 'goods6',
        text: 'Краска Wallquest, Brownsone M6',
        price: '15400',
        new: true,
        popular: false,
        contract: true,
        available: true,
        exclusive: false
      },
      {
        id: '7',
        img: 'goods7',
        text: 'Краска Wallquest, Brownsone M7',
        price: '63400',
        popular: true,
        new: true,
        sale: true,
        exclusive: true,
        available: true
      }
    ],
    cart: {},
    totalPrice: 0,
    totalGoods: 0,
    removed: {}
  },
  mutations: {
    addToCart: function(state, item){
      // Добавляем в корзину или изменяем количество выбранного продукта
      if(item.id in state.cart){
        if(state.cart[item.id].quantity < 99)
          state.cart[item.id].quantity++;
      }else{
        let newItem = { ...item };
        newItem.quantity = 1;
        state.cart[item.id] = newItem;
      }

      // Убираем удаленные товары
      if(item.id in state.removed)
        delete state.removed[item.id]
    },
    removeFromCart: function(state, item){
      if(item.id in state.removed){
        console.log();
      }else{
        state.removed[item.id] = { ...item };
      }

      delete state.cart[item.id];
    },
    removeAllFromCart: function(state){
      let id; 

      for (id in state.cart) delete state.cart[id];
      for ( id in state.removed) delete state.removed[id];
    },
    refreshGoods: function(state, item){
      let newItem = { ...item };
      state.cart[item.id] = newItem;
      delete state.removed[item.id]
    },
    updateData: function(state){
      // Выводим итоговую цену и количество добавленных товаров в корзине
      let totalPrice = 0, totalGoods = 0, id, cart = state.cart;
      for( id in cart ) {
        if(Object.prototype.hasOwnProperty.call( cart,  id ) ) {
          totalPrice += parseInt( cart[id].quantity ) * parseInt(cart[id].price);
          totalGoods += parseInt( cart[id].quantity );
        }
      }
      state.totalPrice = totalPrice;
      state.totalGoods = totalGoods;
    },
    changeQty: function(state, { item, data }){
      if(state.cart[item.id].quantity < 99 && data)
        state.cart[item.id].quantity++;
        
      if(state.cart[item.id].quantity > 1 && !data)
      state.cart[item.id].quantity--;
    },
  },
  actions: {
    addToCart({commit}, item){
      commit('addToCart', item);
      commit('updateData');
    },
    removeFromCart({commit}, item){
      commit('removeFromCart', item);
      commit('updateData');
    },
    removeAllFromCart({commit}){
      commit('removeAllFromCart');
      commit('updateData');
    },
    refreshGoods({commit}, item){
      commit('refreshGoods', item)
      commit('updateData');
    },
    changeQty({commit}, { item, data }){
      commit('changeQty', { item, data });
      commit('updateData');
    },
  },
  modules: {
    
  },
  getters: {
    Products: state => state.goodsList,
    Cart: state => state.cart,
    TotalGoods: state => state.totalGoods,
    TotalPrice: state => state.totalPrice,
    Removed: state => state.removed,
  },
  plugins: [createPersistedState({
    paths: ['cart', 'totalPrice', 'totalGoods']
  })],
})
