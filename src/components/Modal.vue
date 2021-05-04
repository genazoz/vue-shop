<template>
  <transition name="translate">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()"/>

      <div class="modal__dialog">
        <slot name="body"/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      show: false
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    }
  },
  props: [
    'filters'
  ]
};
</script>


<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 111;

    display: flex;
    align-items: flex-end;

    overflow-x: hidden;
    overflow-y: auto;

    &__backdrop {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;

      background-color: rgba(0, 0, 0, 0.7);
    }
    &__dialog { 
      position: relative;
      z-index: 1;
      
      width: 100vw;
      min-height: 318px;
      margin: 0;
      padding: 54px 24px 24px;

      background: #ffffff;
      border-radius: 24px 24px 0px 0px;

      &::before{
        content: '';

        position: absolute;
        top: 12px;
        left: 0;
        right: 0;

        width: 28px;
        height: 4px;
        margin: auto;

        background: #1F2020;
        opacity: 0.6;
        border-radius: 40px;
      } 
    }
  }
  .translate-enter-active,
  .translate-leave-active {
    transition: opacity 0.4s;

    .modal__backdrop{
      transition: opacity 0.4s;
    }
    .modal__dialog{
      transition: transform 0.4s;
    }
  }
  .translate-enter-from,
  .translate-leave-to {
    .modal__backdrop{
      opacity: 0;
    }
    .modal__dialog{
      transform: translateY(100%);
    }
  }
  .translate-enter-to {
    .modal__backdrop{
      opacity: 1;
    }
    .modal__dialog{
      transform: translateY(0%);
    }
  }
</style>
