export default class CatsMenu {
	constructor(options = {}) {
		const defaultConfig = {
			header: ".header",
			parent: ".catsoverlay",

			cat: "data-catalog-cat",
			sub: "data-catalog-sub",
			back: "data-catalog-back",
			close: "data-catalog-close",

			openBtn: false,
			openSubBtn: "data-catalog-subbtn",
			index: 0,
		};
		this.timer;
		this.options = Object.assign(defaultConfig, options);
		this.openBtn = document.querySelector(this.options.openBtn);

		this.parent = document.querySelector(this.options.parent);
		if (!this.parent) {
			return;
		}
		this.header = document.querySelector(this.options.header);

		// Делегируем события внутри родительского элемента
		this.parent.addEventListener("click", (e) => this.delegateMobile(e));
		this.parent.addEventListener("mouseover", (e) => this.delegateDesktop(e));

		// Обработчик позиции сверху от высоты хедера
		this.setPositionTop();
		window.onresize = (e) => this.setPositionTop();
		window.onchange = (e) => this.setPositionTop();

		// Обработчик для кнопки открытия (если она есть)
		if (this.openBtn) {
			this.openBtn.addEventListener("click", () => {
				this.openBtn.classList.toggle("active");
				this.parent.classList.toggle("active");
				if (!this.openBtn.classList.contains("active")) {
					this.closeAllLists();
				}
				if (this.openBtn.classList.contains("active")) {
					this.addNoScroll();
				} else if (!this.openBtn.classList.contains("active")) {
					this.removeNoScroll();
				}
			});
		}

		// Фейковый скролл для визуала
		this.fakeScrollBar = document.createElement("div");
		this.fakeScrollBar.className = "fake-scrollbar";
		document.body.insertBefore(this.fakeScrollBar, document.body.lastChild);

		this.initDesktop();
	}

	// устанавливаем отступ сверху отталкиваясь от высоты шапки
	setPositionTop() {
		if (this.header) {
			const height = this.header.clientHeight / 16 + 3;
			this.parent.setAttribute("style", `--header-height: ${height}rem`);
		}
	}

	initDesktop() {
		const initCat = this.parent.querySelectorAll(`[${this.options.cat}]`)[this.options.index];
		const initList = this.parent.querySelectorAll(`[${this.options.sub}]`)[this.options.index];

		initCat.classList.add("active");
		initList.classList.add("active");
	}

	/*-------------------------------------- ОБРАБОТЧИКИ ДЛЯ ДЕСКТОПНОЙ ВЕРСИИ МЕНЮ --------------------------------------*/
	delegateDesktop(e) {
		const target = e.target;

		if (window.innerWidth <= 992) return;

		// Обработка кнопок вкладок
		const catAttr = this.options.cat;
		const tabBtn = target.closest(`[${catAttr}]`);
		if (tabBtn) {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.removeDesktopActive();
				tabBtn.classList.add("active");
				this.tabsChangerDesktop({ currentTarget: tabBtn });
			}, this.options.delay);
			return;
		}
	}
	// Снятие ховера при десктопном меню
	removeDesktopActive() {
		this.parent.querySelectorAll(`[${this.options.cat}]`).forEach((btn) => {
			btn.classList.remove("active");
		});
	}

	tabsChangerDesktop(e) {
		const tabId = e.currentTarget.getAttribute(this.options.cat);
		this.showTabDesktop(tabId);
	}

	showTabDesktop(tabId) {
		this.lists = this.parent.querySelectorAll(`[${this.options.sub}]`);
		this.lists.forEach((sub) => sub.classList.remove("active"));
		this.lists.forEach((sub) => {
			if (sub.getAttribute(this.options.sub) == tabId) {
				sub.classList.add("active");
			}
		});
	}

	/*-------------------------------------- ОБРАБОТЧИКИ ДЛЯ МОБИЛЬНОЙ ВЕРСИИ МЕНЮ --------------------------------------*/
	delegateMobile(e) {
		const target = e.target;
		// Проверяем, кликнули ли по кнопке открытия (если кнопка внутри parent)
		if (target.matches(this.options.openBtn)) {
			// Обработка уже сделана отдельно, можно оставить пустым или вернуть
			return;
		}

		// Обработка кнопок вкладок
		const catAttr = this.options.cat;
		const tabBtn = target.closest(`[${catAttr}]`);
		if (tabBtn) {
			this.tabsChangerMobile({ currentTarget: tabBtn });

			this.parent.querySelector(`${this.options.parent}-zindex`) &&
				this.parent.querySelector(`${this.options.parent}-zindex`).classList.add("over");
			return;
		}

		// Обработка кнопок "назад"
		const backAttr = this.options.back;
		const backBtn = target.closest(`[${backAttr}]`);
		if (backBtn) {
			this.closeAllLists();
			setTimeout(() => {
				this.parent.querySelector(`${this.options.parent}-zindex`) &&
					this.parent.querySelector(`${this.options.parent}-zindex`).classList.remove("over");
			}, 300);
			return;
		}

		// Обработка кнопок "закрыть"
		const closeAttr = this.options.close;
		const closeBtn = target.closest(`[${closeAttr}]`);
		if (closeBtn) {
			this.closeAllLists();
			this.removeNoScroll();
			this.openBtn && this.openBtn.classList.remove("active");
			this.parent.classList.remove("active");
			setTimeout(() => {
				this.parent.querySelector(`${this.options.parent}-zindex`) &&
					this.parent.querySelector(`${this.options.parent}-zindex`).classList.remove("over");
			}, 300);
			return;
		}

		// Обработка кнопок "открытие закрытие подкатегории"
		const subAttr = this.options.openSubBtn;
		const subBtn = target.closest(`[${subAttr}]`);
		if (subBtn) {
			const parent = subBtn.closest(`${this.options.parent}-menu_subcats-block`);
			const targetList = parent.querySelector("ul");
			if (targetList) {
				subBtn.classList.toggle("active");
				targetList.classList.toggle("active");
				if (targetList.classList.contains("active")) {
					targetList.style.maxHeight = targetList.scrollHeight + "px";
				} else {
					targetList.style.maxHeight = "";
				}
				this.closeAnotherLists(targetList, subBtn);
			}
			return;
		}
	}

	// Метод для изменения вкладки
	tabsChangerMobile(e) {
		const tabId = e.currentTarget.getAttribute(this.options.cat);
		this.showTabMobile(tabId);
	}

	showTabMobile(tabId) {
		this.lists = this.parent.querySelectorAll(`[${this.options.sub}]`);
		this.lists.forEach((sub) => {
			sub.classList.remove("active-lg");
		});

		this.lists.forEach((sub) => {
			if (sub.getAttribute(this.options.sub) == tabId) {
				sub.classList.add("active-lg");
			}
		});
	}

	// Закрываем все менюшки которые открыты
	closeAllLists() {
		if (!this.lists) {
			this.lists = this.parent.querySelectorAll(`[${this.options.sub}]`);
		}
		this.lists.forEach((sub) => {
			sub.classList.remove("active-lg");
		});
		this.closeAllSubLists();
	}

	closeAllSubLists() {
		this.parent.querySelectorAll(`[${this.options.openSubBtn}]`).forEach((btn) => {
			btn.classList.remove("active");
		});

		const allSubLists = this.parent.querySelectorAll(`${this.options.parent}-menu_subcats-list`);
		allSubLists.forEach((list) => {
			list.classList.remove("active");
			list.style.removeProperty("max-height");
		});
	}

	closeAnotherLists(currentList, cat) {
		this.parent.querySelectorAll(`[${this.options.openSubBtn}]`).forEach((btn) => {
			const parent = btn.closest(`${this.options.parent}-menu_subcats-block`);
			const targetList = parent.querySelector("ul");
			if (currentList !== targetList) {
				targetList.classList.remove("active");
				targetList.style.maxHeight = "";
			}
			if (cat !== btn) {
				btn.classList.remove("active");
			}
		});
	}

	removeNoScroll() {
		const catOverlay = document.querySelector(".catsoverlay-wrapper");

		if (catOverlay) {
			document.body.classList.remove("no-scroll");
			document.body.style.paddingRight = "";

			catOverlay.style.paddingRight = "";
			this.fakeScrollBar.style.width = 0;
		}
	}
	addNoScroll() {
		const catOverlay = document.querySelector(".catsoverlay-wrapper");
		const scrollbarWidth = window.innerWidth - document.body.clientWidth;

		if (catOverlay) {
			document.body.classList.add("no-scroll");
			document.body.style.paddingRight = `${scrollbarWidth}px`;

			catOverlay.style.paddingRight = `${scrollbarWidth}px`;
			this.fakeScrollBar.style.width = scrollbarWidth + "px";
		}
	}

	// closeAnotherLists(currentList, cat) {
	// 	this.parent.querySelectorAll(`[${this.options.openSubListcat}]`).forEach((btn) => {
	// 		const parent = btn.closest(`${this.options.parent}-menu_subcats-block`);
	// 		const targetList = parent.querySelector("ul");
	// 		if (currentList !== targetList) {
	// 			targetList.classList.remove("active");
	// 			targetList.style.maxHeight = "";
	// 		}
	// 		if (cat !== btn) {
	// 			btn.classList.remove("active");
	// 		}
	// 	});
	// }

	// removeAnotherBlocks(targetBlock, cat) {
	// 	this.allCatBlocks.forEach((block) => {
	// 		if (targetBlock !== block) {
	// 			block.classList.remove("active");
	// 		}
	// 	});
	// 	this.allCatcats.forEach((btn) => {
	// 		if (cat !== btn) {
	// 			btn.classList.remove("active");
	// 		}
	// 	});
	// }

	// getValueAfterPrefix(str, prefix) {
	// 	const startIndex = str.indexOf(prefix);
	// 	if (startIndex === -1) {
	// 		// Префикс не найден
	// 		return null;
	// 	}
	// 	const valueStart = startIndex + prefix.length;
	// 	// Можно взять остаток строки после префикса
	// 	return str.substring(valueStart).trim();
	// }

	// getDataAttributeCatID(targetElement, targetAttribute) {
	// 	const dataAttributes = [];
	// 	let result;

	// 	for (let attr of targetElement.attributes) {
	// 		if (attr.name.startsWith("data-catalog-cat")) {
	// 			dataAttributes.push(attr.name);
	// 		}
	// 	}

	// 	dataAttributes.forEach((d) => {
	// 		if (d === targetAttribute.toLowerCase()) {
	// 			result = d;
	// 		}
	// 	});
	// 	return result;
	// }

	// init() {
	// 	this.allCatcats[0].classList.add("active");
	// 	this.allCatBlocks[0].classList.add("active");
	// 	let timer;
	// 	// Предположим, что все ваши кнопки находятся внутри this.parent
	// 	this.parent.addEventListener("mouseover", (e) => {
	// 		if (window.innerWidth <= 992) return; // Не выполнять, если ширина ≤ 992px

	// 		const target = e.target.closest(`[${this.options.catcat}]`);

	// 		// Проверяем, что событие произошло именно на кнопке
	// 		if (target && this.parent.contains(target)) {
	// 			const dataAttrName = this.getDataAttributeCatID(target, this.options.catcat);
	// 			const dataAfterPrefix = this.getValueAfterPrefix(dataAttrName, "catid");

	// 			const catid = target.getAttribute(`data-catid${dataAfterPrefix}`);
	// 			const targetBlock = this.parent.querySelector(`[${this.options.catBlock}='${catid}']`);

	// 			if (targetBlock) {
	// 				target.classList.add("active");
	// 				this.removeAnotherBlocks(targetBlock, target);
	// 				clearTimeout(timer);
	// 				timer = setTimeout(() => {
	// 					targetBlock.classList.add("active");
	// 				}, 50);
	// 			}
	// 		}
	// 	});

	// 	// Отслеживаем нажатие на бургер
	// 	this.openBtn &&
	// 		this.openBtn.addEventListener("click", () => {
	// 			this.parent.classList.toggle("active");
	// 			this.openBtn.classList.toggle("active");

	// 			if (this.openBtn.classList.contains("active")) {
	// 				this.addNoScroll();
	// 			} else if (!this.openBtn.classList.contains("active")) {
	// 				this.removeNoScroll();
	// 			}
	// 		});

	// 	// Общее событие для всей области parent
	// 	this.parent.addEventListener("click", (e) => {
	// 		const target = e.target;

	// 		// Обработка кликов внутри меню
	// 		// Кнопки категорий
	// 		if (target && target.closest(`[${this.options.catcat}]`)) {
	// 			const btn = target.closest(`[${this.options.catcat}]`);

	// 			const dataAttrName = this.getDataAttributeCatID(btn, this.options.catcat);
	// 			const dataAfterPrefix = this.getValueAfterPrefix(dataAttrName, "catid");

	// 			const catid = btn.getAttribute(`data-catid${dataAfterPrefix}`);

	// 			const targetBlock = this.parent.querySelector(`[${this.options.catBlock}='${catid}']`);
	// 			if (targetBlock) {
	// 				targetBlock.classList.add("active-lg");

	// 				this.parent.querySelector(`${this.options.parent}-zindex`) &&
	// 					this.parent.querySelector(`${this.options.parent}-zindex`).classList.add("over");
	// 			}
	// 			return;
	// 		}

	// 		// Кнопки закрытия
	// 		if (target.closest(`[${this.options.closecat}]`)) {
	// 			this.parent.classList.remove("active");
	// 			this.openBtn && this.openBtn.classList.remove("active");
	// 			this.removeNoScroll();
	// 			this.allCatBlocks.forEach((block) => block.classList.remove("active-lg"));
	// 			setTimeout(() => {
	// 				this.parent.querySelector(`${this.options.parent}-zindex`) &&
	// 					this.parent.querySelector(`${this.options.parent}-zindex`).classList.remove("over");
	// 			}, 300);
	// 			return;
	// 		}

	// 		// Кнопки "вернуться"
	// 		if (target.closest(`[${this.options.backcat}]`)) {
	// 			this.allCatBlocks.forEach((block) => block.classList.remove("active-lg"));

	// 			setTimeout(() => {
	// 				this.parent.querySelector(`${this.options.parent}-zindex`) &&
	// 					this.parent.querySelector(`${this.options.parent}-zindex`).classList.remove("over");
	// 			}, 300);

	// 			return;
	// 		}

	// 		// Кнопки открытия списка подкатегорий
	// 		if (target.closest(`[${this.options.openSubListcat}]`)) {
	// 			const btn = target.closest(`[${this.options.openSubListcat}]`);
	// 			const parent = btn.closest(`${this.options.parent}-menu_subcats-block`);
	// 			const targetList = parent.querySelector("ul");
	// 			if (targetList) {
	// 				btn.classList.toggle("active");
	// 				targetList.classList.toggle("active");
	// 				if (targetList.classList.contains("active")) {
	// 					targetList.style.maxHeight = targetList.scrollHeight + "px";
	// 				} else {
	// 					targetList.style.maxHeight = "";
	// 				}
	// 				this.closeAnotherLists(targetList, btn);
	// 			}
	// 			return;
	// 		}
	// 	});
	// }
}
