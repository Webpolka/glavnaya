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
const allInnerSwipers = document.querySelectorAll('[id^="swiper-inner-"]');
allInnerSwipers.forEach((swiper, index) => {
	new Swiper(swiper, {
		slidesPerView: 1,
		loop: true,
		pagination: {
			el: ".swiper-pagination", // элемент, в который будет вставляться пагинация
			clickable: true, // чтобы кликать по пагинации
		},
	});
});



/*--------------------------------------------------------------------------------------------------------------
LOAD SVG SPRITE TO PAGE
----------------------------------------------------------------------------------------------------------------*/
function loadSvgSprite(url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const div = document.createElement('div');
      div.style.display = 'none'; // скрываем спрайт
      div.innerHTML = data;
      document.documentElement.appendChild(div);
	  console.log('SPRITE OK !')
    })
    .catch(err => console.error('Ошибка загрузки SVG спрайта:', err));
}

// Использование:
const spritePath = `${window.location.origin}/icons/symbol/sprite.svg`;
loadSvgSprite(spritePath);
