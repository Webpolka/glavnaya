import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();

const siteOverlay = document.querySelector(".site-overlay");
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
CARD GALLERY 
----------------------------------------------------------------------------------------------------------------*/
const allShopBullets = document.querySelectorAll(".shopBullet");
allShopBullets.forEach((shopBullet) => {
	new ShopBullet(shopBullet, {
		lazyLoad: true,
		bulletHover: "red",
	});
});

/*--------------------------------------------------------------------------------------------------------------
FAVOURS LIKED
----------------------------------------------------------------------------------------------------------------*/
const allFavoursLiked = document.querySelectorAll(".product-card_like");
allFavoursLiked.forEach((like) => {
	like.addEventListener("click", function (e) {
		e.preventDefault();
		e.stopPropagation();
		this.classList.toggle("liked");
	});
});
/*--------------------------------------------------------------------------------------------------------------
DATA-HREF LISTENER
----------------------------------------------------------------------------------------------------------------*/
document.querySelectorAll("[data-href]").forEach((dataLink) => {
	dataLink.addEventListener("click", function (e) {
		e.preventDefault();
		e.stopPropagation();
		window.location.assign(this.dataset.href);
	});
});

/*--------------------------------------------------------------------------------------------------------------
DATA-SIGN UP LISTENER
----------------------------------------------------------------------------------------------------------------*/
const signSlideForm = document.querySelector(".authorize-signup");
const loginSlideForm = document.querySelector(".authorize-login");

const dataSignedBtn = document.querySelector("[data-signed]");
const dataSignedText = dataSignedBtn.querySelector("span");

const allHeaderSlideCloseBtns = [document.querySelector(".authorize-login_close"), document.querySelector(".authorize-signup_close")];
const signedBoolean = dataSignedBtn.dataset.signed === "true" ? true : false;

let timer;

function initSignButton(signedBoolean) {
	if (signedBoolean) {
		dataSignedText.textContent = "Sign In";
	} else if (!signedBoolean) {
		dataSignedText.textContent = "Sign Up";
	}
}

function removeNoScroll() {
	const catOverlay = document.querySelector(".catsoverlay-wrapper");

	clearTimeout(timer);
	timer = setTimeout(() => {
		document.documentElement.classList.remove("no-scroll");
		document.documentElement.style.paddingRight = "";
		siteOverlay.classList.remove("active");
		catOverlay.style.paddingRight = "";
	}, 0);
}
function addNoScroll() {
	const catOverlay = document.querySelector(".catsoverlay-wrapper");
	const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	document.documentElement.classList.add("no-scroll");

	catOverlay.style.paddingRight = `${scrollbarWidth}px`;
	document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
	siteOverlay.classList.add("active");
}

// Выставляем стейт кнопки
initSignButton(signedBoolean);

// Прослушивание кнопки Sign Up или Sign In
dataSignedBtn.addEventListener("click", function (e) {
	e.preventDefault();

	if (signedBoolean) {
		addNoScroll();
		loginSlideForm.classList.add("active");
		console.log("Пользователь уже зарегистрирован !");
	} else if (!signedBoolean) {
		addNoScroll();
		signSlideForm.classList.add("active");
		console.log("Пользователю нужно зарегистрироваться !");
	}
});

// Прослушивание всех кнопок закрыть для слайд форм авторизации
allHeaderSlideCloseBtns.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		e.preventDefault();
		signSlideForm.classList.remove("active");
		loginSlideForm.classList.remove("active");
		removeNoScroll();
	});
});

// Очищаем все поля паролей при нажатии reset password
document.querySelectorAll(".panel-reset-btn").forEach((btn) => {
	btn.addEventListener("click", function () {
		document.querySelectorAll("input[type='password']").forEach((input) => {
			input.value = "";
			input.focus();
		});
	});
});

/*--------------------------------------------------------------------------------------------------------------
DATA-TABS LISTENER
----------------------------------------------------------------------------------------------------------------*/
import Tabs from "./modules/tabs";

const headerLoginTabs = new Tabs({
	parent: ".authorize-login",
});

const headerSignTabs = new Tabs({
	parent: ".authorize-signup",
});

/*--------------------------------------------------------------------------------------------------------------
DATA-CATEGORIES LISTENER
----------------------------------------------------------------------------------------------------------------*/
import CatsMenu from "./modules/cats-menu-prod";
new CatsMenu();

/*--------------------------------------------------------------------------------------------------------------
CHAR COUNTERS
----------------------------------------------------------------------------------------------------------------*/
import CharCounter from "./modules/char-counter";

new CharCounter({
	inputId: "product-name",
	maxLength: 50,
});

/*--------------------------------------------------------------------------------------------------------------
CHOICES SELECTS
----------------------------------------------------------------------------------------------------------------*/
const selectProductMake = document.getElementById("product-make");
const selectProductModel = document.getElementById("product-model");
const selectProductGeneration = document.getElementById("product-generation");
const selectProductYear = document.getElementById("product-year");
const selectProductBodyType = document.getElementById("product-body_type");

const selectProductArray = [
	selectProductMake, 
	selectProductModel, 
	selectProductGeneration, 
	selectProductYear, 
	selectProductBodyType
];

selectProductArray.forEach((select) => {
	new Choices(select, {
		searchEnabled: false, // отключить поиск, так как один выбор
		itemSelectText: "", // убрать подсказку при выборе
		shouldSort: false,
		placeholder: true,
		placeholderValue: "Select", // placeholder
		position: "bottom",
	});
});
