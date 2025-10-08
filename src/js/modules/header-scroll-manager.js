export default class HeaderScrollManager {
	constructor(options = {}) {
		const defaultConfig = {
			header: ".header",
			headerTop: ".header-top",
			headerMedium: ".header-medium",
			headerBottom: ".header-bottom",
			catalogOverlay: ".catsoverlay",
			delay: 300,
		};

		this.options = Object.assign(defaultConfig, options);
		this.init();
	}

	init() {
		const header = document.querySelector(this.options.header);
		const headerTop = document.querySelector(this.options.headerTop);
		const headerBottom = document.querySelector(this.options.headerBottom);

		const overlayMenu = document.querySelector(this.options.catalogOverlay);
		const delay = this.options.delay;

		let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
		let scrollTimeout;
		

		headerTop.style.maxHeight = headerTop.scrollHeight + "px";
		headerBottom.style.maxHeight = headerBottom.scrollHeight + "px";

		// устанавливаем отступ сверху для меню отталкиваясь от высоты хедера на текущий момент
		setTopForOverlayMenu();		
		window.addEventListener("scroll", onScroll);
		window.addEventListener("resize", onScroll);


		function onScroll() {
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}

			scrollTimeout = setTimeout(() => {
				// Здесь ваша логика проверки позиции блока
				checkVisibility();
			}, delay); // задержка 100 мс
		}

		function setTopForOverlayMenu() {
			if (header && overlayMenu) {
				const height = header.offsetHeight;
				overlayMenu.setAttribute("style", `--base-top: ${height}px`);
			}
		}	

		function checkVisibility() {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

			if (scrollTop <= 0) {
				headerBottom.classList.remove("hide");
				headerBottom.style.maxHeight = headerBottom.scrollHeight + "px";

				headerTop.classList.remove("hide");
				headerTop.style.maxHeight = headerTop.scrollHeight + "px";

				setTimeout(() => {
					setTopForOverlayMenu();
				}, delay + 10);
			} else if (scrollTop > 250) {
				headerBottom.classList.add("hide");
				headerBottom.style.maxHeight = "0px";

				headerTop.classList.add("hide");
				headerTop.style.maxHeight = "0px";

				setTimeout(() => {
					setTopForOverlayMenu();
				}, delay + 10);
			}

			lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
		}
	}
}