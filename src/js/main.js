import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();

const siteOverlay = document.querySelector(".site-overlay");
/*--------------------------------------------------------------------------------------------------------------
CURRENCY BLOCK
----------------------------------------------------------------------------------------------------------------*/
const currencyBlock = document.querySelector(".header-top_currency");

if (currencyBlock) {
	currencyReturn();

	currencyBlock.addEventListener("click", currencyReturn);
	function currencyReturn() {
		const euroData = currencyBlock.dataset.euro;
		const usdData = currencyBlock.dataset.usd;
		// Логика смены валюты и курса
		// Например, переключение между EUR и USD
		if (euroData && usdData) {
			const currentCurrency = currencyBlock.querySelector(".header-top_currency_name").textContent;
			if (currentCurrency === "EUR") {
				currencyBlock.querySelector(".header-top_currency_name").textContent = "USD";
				currencyBlock.querySelector(".header-top_currency_rate").textContent = usdData; // обновите по актуальным данным
			} else {
				currencyBlock.querySelector(".header-top_currency_name").textContent = "EUR";
				currencyBlock.querySelector(".header-top_currency_rate").textContent = euroData;
			}
		} else {
			currencyBlock.querySelector(".header-top_currency_name").textContent = "none";
			currencyBlock.querySelector(".header-top_currency_rate").textContent = "none"; // обновите по
		}
	}
}
/*--------------------------------------------------------------------------------------------------------------
MAIN ELLEPSIS SWIPER BLOCK
----------------------------------------------------------------------------------------------------------------*/
const swiperEllipse = document.querySelector("#swiperEllipse");

swiperEllipse &&
	new Swiper("#swiperEllipse", {
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

const innerSignInSlideBtn = document.querySelector('[data-modal="sign-in"]');
const innerSignUpSlideBtn = document.querySelector('[data-modal="sign-up"]');

if (dataSignedBtn) {
	const dataSignedText = dataSignedBtn.querySelector("span");

	const allHeaderSlideCloseBtns = [document.querySelector(".authorize-login_close"), document.querySelector(".authorize-signup_close")];

	let timer;

	innerSignInSlideBtn.addEventListener("click", () => {
		signSlideForm.classList.remove("active");
		removeNoScroll();

		setTimeout(() => {
			addNoScroll();
			loginSlideForm.classList.add("active");
		}, 300);
	});

	innerSignUpSlideBtn.addEventListener("click", () => {
		loginSlideForm.classList.remove("active");
		removeNoScroll();

		setTimeout(() => {
			addNoScroll();
			signSlideForm.classList.add("active");
		}, 300);
	});

	let signedBoolean;
	if (dataSignedBtn) {
		signedBoolean = dataSignedBtn.dataset.signed === "true" ? true : false;
		// Выставляем стейт кнопки
		initSignButton(signedBoolean);
	}

	function initSignButton(signedBoolean) {
		if (signedBoolean && dataSignedText) {
			dataSignedText.textContent = "Sign In";
		} else if (!signedBoolean && dataSignedText) {
			dataSignedText.textContent = "Sign Up";
		}
	}

	function removeNoScroll() {
		const catOverlay = document.querySelector(".catsoverlay-wrapper");

		clearTimeout(timer);
		timer = setTimeout(() => {
			document.documentElement.classList.remove("no-scroll");
			document.documentElement.style.paddingRight = "";
			siteOverlay && siteOverlay.classList.remove("active");
			if (catOverlay) {
				catOverlay.style.paddingRight = "";
			}
		}, 0);
	}
	function addNoScroll() {
		const catOverlay = document.querySelector(".catsoverlay-wrapper");
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.documentElement.classList.add("no-scroll");

		if (catOverlay) {
			catOverlay.style.paddingRight = `${scrollbarWidth}px`;
		}
		document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
		siteOverlay && siteOverlay.classList.add("active");
	}

	// Прослушивание кнопки Sign Up или Sign In
	dataSignedBtn &&
		dataSignedBtn.addEventListener("click", function (e) {
			e.preventDefault();

			if (signedBoolean && loginSlideForm) {
				addNoScroll();
				loginSlideForm.classList.add("active");
				console.log("Пользователь уже зарегистрирован !");
			} else if (!signedBoolean && signSlideForm) {
				addNoScroll();
				signSlideForm.classList.add("active");
				console.log("Пользователю нужно зарегистрироваться !");
			}
			return;
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
}

/*--------------------------------------------------------------------------------------------------------------
DATA-TABS LISTENER
----------------------------------------------------------------------------------------------------------------*/
import Tabs from "./modules/tabs";
const authorizeLoginElement = document.querySelector(".authorize-login");
const authorizeSignUpElement = document.querySelector(".authorize-signup");
const authorizeBtn = document.querySelector("[data-signed]");

if (authorizeBtn) {
	authorizeLoginElement &&
		new Tabs({
			parent: ".authorize-login",
		});
	authorizeSignUpElement &&
		new Tabs({
			parent: ".authorize-signup",
		});
}
/*--------------------------------------------------------------------------------------------------------------
DATA-CATEGORIES LISTENER
----------------------------------------------------------------------------------------------------------------*/
// [data-catId] - catID обязательный префикс(скрипт на нём завязан)
import CatsMenu from "./modules/cats-menu-prod";

const categoriesOverlayMenu = document.querySelector(".catsoverlay");
const categoriesAdvertisingStartPage = document.querySelector(".catsadvert");

categoriesOverlayMenu &&
	new CatsMenu({
		parent: ".catsoverlay",
		openBtn: "#burger",
		catButton: "data-catIDoverlay",
		catBlock: "data-blockIDoverlay",
		backButton: "data-subcatback='overlay'",
		closeButton: "data-catsclose='overlay'",
		openSubListButton: "data-subcatslist='overlay'",
	});
categoriesAdvertisingStartPage &&
	new CatsMenu({
		parent: ".catsadvert",
		catButton: "data-catIDpage",
		catBlock: "data-blockIDpage",
		backButton: "data-subcatback='page'",
		closeButton: "data-catsclose='page'",
		openSubListButton: "data-subcatslist='page'",
	});

/*--------------------------------------------------------------------------------------------------------------
CHAR COUNTERS
----------------------------------------------------------------------------------------------------------------*/
import CharCounter from "./modules/char-counter";

new CharCounter({
	inputId: "product-name",
	maxLength: 50,
});

new CharCounter({
	inputId: "product-description",
	maxLength: 4000,
});

/*--------------------------------------------------------------------------------------------------------------
CHOICES SELECTS
----------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const selectProductMake = document.getElementById("product-make");
	const selectProductModel = document.getElementById("product-model");
	const selectProductGeneration = document.getElementById("product-generation");
	const selectProductYear = document.getElementById("product-year");
	const selectProductBodyType = document.getElementById("product-body_type");
	const selectProductModification = document.getElementById("product-modification");

	const selectProductBodyColor = document.getElementById("product-body_color");
	const selectProductInteriorMaterial = document.getElementById("product-interior_material");
	const selectProductInterialColor = document.getElementById("product-interior_color");

	const selectProductRegion = document.getElementById("product-region");
	const selectProductCity = document.getElementById("product-city");

	const selectProductArray = [
		selectProductMake,
		selectProductModel,
		selectProductGeneration,
		selectProductYear,
		selectProductBodyType,
		selectProductModification,
		selectProductBodyColor,
		selectProductInteriorMaterial,
		selectProductInterialColor,
		selectProductRegion,
		selectProductCity,
	];

	selectProductArray.forEach((select) => {
		select &&
			new Choices(select, {
				searchEnabled: false, // отключить поиск, так как один выбор
				itemSelectText: "", // убрать подсказку при выборе
				shouldSort: false,
				placeholder: true,
				placeholderValue: "Select", // placeholder
				position: "bottom",
			});
	});
});
/*--------------------------------------------------------------------------------------------------------------
IMAGES PRELOADER
----------------------------------------------------------------------------------------------------------------*/
import ImagePreloader from "./modules/images-preloader";

// Инициализация класса после DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
	const loadProductImages = document.querySelector("#product-media");
	loadProductImages &&
		new ImagePreloader({
			maxFileSizeKB: 500,
			inputId: "product-media",
			buttonId: "advertising-mediaload-button",
			previewsContainerId: "advertising-mediaload-previews",
			warningId: "advertising-mediaload-warning",
			dragAreaId: "advertising-mediaload-area",
		});
});

/*--------------------------------------------------------------------------------------------------------------
PROFILE BTN
----------------------------------------------------------------------------------------------------------------*/

const profileBtn = document.querySelector("#profile-btn");
const profileDropdown = document.querySelector(".header-profile_dropdown");

if (profileBtn && profileDropdown) {
	handleEvent();
	function handleEvent() {
		const rectLeft = profileBtn.offsetLeft;
		const rectWidth = profileBtn.offsetWidth;

		profileDropdown.style.display = "block";
		const profileDropdownWidth = profileDropdown.offsetWidth;
		profileDropdown.style.removeProperty("display");

		profileDropdown.style.left = `${rectLeft - profileDropdownWidth + rectWidth}px`;
	}

	// Добавляем обработчики событий для window
	window.addEventListener("resize", handleEvent);
	window.addEventListener("change", handleEvent);

	profileBtn.addEventListener("click", () => {
		profileDropdown.classList.toggle("show");
	});
}


/*--------------------------------------------------------------------------------------------------------------
LISTS BUTTONS-PANELS LISTENER
----------------------------------------------------------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
	const allListsButtons = document.querySelectorAll("[data-listBtn]");

	allListsButtons.forEach((btn) => {
	
		btn.addEventListener("click", () => {
			btn.classList.toggle("active");
			
			const id = btn.dataset.listbtn;
			const dropdown = document.querySelector(`[data-listPanel="${id}"]`);

			if (dropdown) {
				dropdown.classList.toggle("active");

				if (dropdown.classList.contains("active")) {
					dropdown.style.maxHeight = dropdown.scrollHeight + 15 + "px";
					dropdown.style.paddingBottom = 15 + "px";
					dropdown.style.marginTop = -5 + "px";
				} else if (!dropdown.classList.contains("active")) {
					dropdown.style.removeProperty("max-height");
					dropdown.style.removeProperty("padding-bottom");
					dropdown.style.removeProperty("margin-top");
				}
			} else {
				console.log(`панель data-listPanel="${id}" не найдена`);
			}
		});
	});
});
