import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();

/*--------------------------------------------------------------------------------------------------------------
CURRENCY BLOCK
----------------------------------------------------------------------------------------------------------------*/
const currencyBlock = document.querySelector(".header-currency");

if (currencyBlock) {
	currencyReturn();

	currencyBlock.addEventListener("click", currencyReturn);
	function currencyReturn() {
		const euroData = currencyBlock.dataset.euro;
		const usdData = currencyBlock.dataset.usd;
		// Логика смены валюты и курса
		// Например, переключение между EUR и USD
		if (euroData && usdData) {
			const currentCurrency = currencyBlock.querySelector(".header-currency_name").textContent;
			if (currentCurrency === "EUR") {
				currencyBlock.querySelector(".header-currency_name").textContent = "USD";
				currencyBlock.querySelector(".header-currency_rate").textContent = usdData; // обновите по актуальным данным
			} else {
				currencyBlock.querySelector(".header-currency_name").textContent = "EUR";
				currencyBlock.querySelector(".header-currency_rate").textContent = euroData;
			}
		} else {
			currencyBlock.querySelector(".header-currency_name").textContent = "none";
			currencyBlock.querySelector(".header-currency_rate").textContent = "none"; // обновите по
		}
	}
}
/*--------------------------------------------------------------------------------------------------------------
MAIN ELLEPSIS SWIPER BLOCK
----------------------------------------------------------------------------------------------------------------*/
const swiper = new Swiper("#swiperEllipse", {
	slidesPerView: 10,
	spaceBetween: 20,
	loop: true,

	navigation: {
		nextEl: ".ellipse-next-button",
		prevEl: ".swiper-button-prev",
	},

	breakpoints: {
		0: {
			slidesPerView: 3,
		},
		// при ширине >= 640px
		576: {
			slidesPerView: 4,
		},
		// при ширине >= 768px
		768: {
			slidesPerView: 6,
		},
		// при ширине >= 1024px
		1024: {
			slidesPerView: 10,
		},
	},
});

/*--------------------------------------------------------------------------------------------------------------
INIT ALL INNER SWIPER SLIDERS
----------------------------------------------------------------------------------------------------------------*/

const allProductCards = document.querySelectorAll(".product-card");

allProductCards.forEach((card) => {
	const innerSwiper = card.querySelector('[id^="swiper-inner-"]');
	const overlayCard = card.querySelector(".product-card_overlay");

	innerSwiper &&
		new Swiper(innerSwiper, {
			slidesPerView: 1,
			loop: true,
			pagination: {
				el: ".swiper-pagination", // элемент, в который будет вставляться пагинация
				clickable: true, // чтобы кликать по пагинации
			},
			autoplay: {
				delay: 1500,
				disableOnInteraction: false,
				enabled: false,
			},
			on: {
				init: function () {
					this.el.addEventListener("mouseenter", () => {
						this.autoplay.start();
					});
					this.el.addEventListener("mouseleave", () => {
						this.autoplay.stop();
					});
				},
			},
		});
	if (overlayCard) {
		const slides = card.querySelectorAll(".product-card_image");
		const totalSlides = slides.length;
		const imageCountSpan = overlayCard.querySelector(".product-card_count");

		if (totalSlides > 1) {
			imageCountSpan.textContent = `Another ${totalSlides} photos`;
		} else if (totalSlides == 1) {
			imageCountSpan.textContent = `Only ${totalSlides} photo`;
		}

		console.log(totalSlides);
	}
});

/*--------------------------------------------------------------------------------------------------------------
HEADER TRANSFER BLOCKS
----------------------------------------------------------------------------------------------------------------*/
import TransferElements from "./modules/transfer";

const headerLocationEl = document.querySelector(".header-location");
const headerLocationPlace = document.querySelector(".header-bottom_intro");
const headerSearchFormEl = document.querySelector(".header-search-form");
const headerSearchFormPlace = document.querySelector(".header-bottom");

if (headerLocationEl && headerLocationPlace) {
	new TransferElements({
		sourceElement: headerLocationEl,
		breakpoints: {
			576: {
				targetElement: headerLocationPlace,
				targetPosition: 2,
			},
		},
	});
}

if (headerSearchFormEl && headerSearchFormPlace) {
	new TransferElements({
		sourceElement: headerSearchFormEl,
		breakpoints: {
			576: {
				targetElement: headerSearchFormPlace,
				targetPosition: 1,
			},
		},
	});
}

/*--------------------------------------------------------------------------------------------------------------
FAVOURS LIKED
----------------------------------------------------------------------------------------------------------------*/
const allFavoursLiked = document.querySelectorAll(".product-card_favorites");
allFavoursLiked.forEach((like) => {
	like.addEventListener("click", function () {
		this.classList.toggle("liked");
	});
});
