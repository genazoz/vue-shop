<template>
  <component :is="layout">
    <router-view/>  
  </component>
</template>
<script>
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'EmptyLayout')
    }
  },
  components: {
    MainLayout
  }
}
</script>

<style lang="scss">

</style>
