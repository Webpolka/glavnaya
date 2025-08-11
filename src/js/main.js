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

		console.log(totalSlides)
	}
});
