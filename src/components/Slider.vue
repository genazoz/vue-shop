<template>
	<section class="s-catalog-slider">
		<ul class="breadcrumbs s-catalog-slider__breadcrumbs" itemscope="" itemtype="https://schema.org/BreadcrumbList">
			<li class="breadcrumbs__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
				<meta itemprop="position" content="1" />
				<router-link class="breadcrumbs__link" to="/" itemprop="item">
					<span itemprop="name">Главная</span>
				</router-link>
			</li>
			<li class="breadcrumbs__item">
				<svg class="breadcrumbs__separator" xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none">
					<circle opacity="0.3" cx="1.5" cy="2" r="1.5" fill="#C4C4C4"/>
				</svg>
			</li>
			<li class="breadcrumbs__item" itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
				<meta itemprop="position" content="2" />
				<router-link class="breadcrumbs__link" to="/"  itemprop="item">
					<span itemprop="name">Продукты</span>
				</router-link>
			</li>
			<li class="breadcrumbs__item">
				<svg class="breadcrumbs__separator" xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none">
					<circle opacity="0.3" cx="1.5" cy="2" r="1.5" fill="#C4C4C4"/>
				</svg>
			</li>
			<li class="breadcrumbs__item" itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
				<meta itemprop="position" content="3" />
				<div class="breadcrumbs__link">
					<span itemprop="name">Краски</span>
				</div>
			</li>
		</ul>
		<swiper
			class="catalog-slider"
			:slides-per-view="1"
			:space-between="0"
			navigation
			:pagination="{ clickable: true }"
			@swiper="onSwiper"
			@slideChange="onSlideChange"
		>
			<swiper-slide class="catalog-slider__slide">
				<div class="catalog-slider__content">
					<h2 class="catalog-slider__content-title">
						Краски
					</h2>
					<p class="catalog-slider__content-text">
						Идеально подходят для стен и других поверхностей. <br> Найди свой идеальный цвет!
					</p>
				</div>
				<img src="@/assets/img/slide1.jpg" alt="catalog item" title="catalog item">
			</swiper-slide>
			<swiper-slide class="catalog-slider__slide">
				<div class="catalog-slider__content">
					<h2 class="catalog-slider__content-title">
						Краски
					</h2>
					<p class="catalog-slider__content-text">
						Идеально подходят для стен и других поверхностей. <br> Найди свой идеальный цвет!
					</p>
				</div>
				<img src="@/assets/img/slide1.jpg" alt="catalog item" title="catalog item">
			</swiper-slide>
			<swiper-slide class="catalog-slider__slide">
				<div class="catalog-slider__content">
					<h2 class="catalog-slider__content-title">
						Краски
					</h2>
					<p class="catalog-slider__content-text">
						Идеально подходят для стен и других поверхностей. <br> Найди свой идеальный цвет!
					</p>
				</div>
				<img src="@/assets/img/slide1.jpg" alt="catalog item" title="catalog item">
			</swiper-slide>
			<swiper-slide class="catalog-slider__slide">
				<div class="catalog-slider__content">
					<h2 class="catalog-slider__content-title">
						Краски
					</h2>
					<p class="catalog-slider__content-text">
						Идеально подходят для стен и других поверхностей. <br> Найди свой идеальный цвет!
					</p>
				</div>
				<img src="@/assets/img/slide1.jpg" alt="catalog item" title="catalog item">
			</swiper-slide>
			<swiper-slide class="catalog-slider__slide">
				<div class="catalog-slider__content">
					<h2 class="catalog-slider__content-title">
						Краски
					</h2>
					<p class="catalog-slider__content-text">
						Идеально подходят для стен и других поверхностей. <br> Найди свой идеальный цвет!
					</p>
				</div>
				<img src="@/assets/img/slide1.jpg" alt="catalog item" title="catalog item">
			</swiper-slide>
			<swiper-slide class="catalog-slider__slide">
				<div class="catalog-slider__content">
					<h2 class="catalog-slider__content-title">
						Краски
					</h2>
					<p class="catalog-slider__content-text">
						Идеально подходят для стен и других поверхностей. <br> Найди свой идеальный цвет!
					</p>
				</div>
				<img src="@/assets/img/slide1.jpg" alt="catalog item" title="catalog item">
			</swiper-slide>
		</swiper>
	</section>
</template>
<script>
  import SwiperCore, { Navigation, Pagination } from 'swiper';

  import { Swiper, SwiperSlide } from 'swiper/vue';

  SwiperCore.use([Navigation, Pagination]);

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    methods: {
      onSwiper(swiper) {
        console.log(swiper);
      },
      onSlideChange() {
        console.log('slide change');
      },
    },
  };
</script>