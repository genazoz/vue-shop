<template>
  <div class="custom-select">
    <ul class="custom-select__list">
      <slot name="body"/>
    </ul>
    <div class="custom-select__cover"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.querySelectorAll(".custom-select__list label").forEach(function(x){
      x.addEventListener('click', function () {
        this.closest('.custom-select__list').classList.toggle("show");
        this.closest('.custom-select__list').querySelectorAll('li').forEach(function(x){
          x.classList.remove("is-active");
        })
        this.parentElement.classList.add("is-active");
      });
    })
    document.querySelector('.custom-select__cover').addEventListener('click', function(){
      this.closest('.custom-select').querySelector('.custom-select__list').classList.toggle("show");
    })
  },
}
</script>

<style>

</style>
