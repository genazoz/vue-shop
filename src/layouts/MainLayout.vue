<template>
  <div class="app-main-layout">
    <Header />
    <Cart ref="cart"></Cart>
    <main class="app-content">
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Cart from "@/components/Cart";

export default {
  components: {
    Header,
    Footer,
    Cart
  },
  methods: {
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
  }
}
</script>

<style>

</style>
