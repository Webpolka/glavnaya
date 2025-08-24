export default class CatsMenu {
	constructor(options = {}) {
		const defaultConfig = {
			parent: ".catsoverlay",
			openBtn: false,
			catButton: "data-catIDoverlay",
			catBlock: "data-blockIDoverlay",
			backButton: "data-subcatback='overlay'",
			closeButton: "data-catsclose='overlay'",
			openSubListButton: "data-subcatslist='overlay'",
		};
		this.options = Object.assign(defaultConfig, options);
		this.parent = document.querySelector(this.options.parent);
		this.openBtn = document.querySelector(this.options.openBtn);

		this.allCatButtons = this.parent.querySelectorAll(`[${this.options.catButton}]`);
		this.allCatBlocks = this.parent.querySelectorAll(`[${this.options.catBlock}]`);
		this.init();
	}

	closeAnotherLists(currentList, button) {
		this.parent.querySelectorAll(`[${this.options.openSubListButton}]`).forEach((btn) => {
			const parent = btn.closest(`${this.options.parent}-menu_subcats-block`);
			const targetList = parent.querySelector("ul");
			if (currentList !== targetList) {
				targetList.classList.remove("active");
				targetList.style.maxHeight = "";
			}
			if (button !== btn) {
				btn.classList.remove("active");
			}
		});
	}

	removeAnotherBlocks(targetBlock, button) {
		this.allCatBlocks.forEach((block) => {
			if (targetBlock !== block) {
				block.classList.remove("active");
			}
		});
		this.allCatButtons.forEach((btn) => {
			if (button !== btn) {
				btn.classList.remove("active");
			}
		});
	}

	getValueAfterPrefix(str, prefix) {
		const startIndex = str.indexOf(prefix);
		if (startIndex === -1) {
			// Префикс не найден
			return null;
		}
		const valueStart = startIndex + prefix.length;
		// Можно взять остаток строки после префикса
		return str.substring(valueStart).trim();
	}

	getDataAttributeCatID(targetElement, targetAttribute) {
		const dataAttributes = [];
		let result;

		for (let attr of targetElement.attributes) {
			if (attr.name.startsWith("data-catid")) {
				dataAttributes.push(attr.name);
			}
		}

		dataAttributes.forEach((d) => {
			if (d === targetAttribute.toLowerCase()) {
				result = d;
			}
		});
		return result;
	}

	init() {
		this.allCatButtons[0].classList.add("active");
		this.allCatBlocks[0].classList.add("active");
		let timer;
		// Предположим, что все ваши кнопки находятся внутри this.parent
		this.parent.addEventListener("mouseover", (e) => {
			if (window.innerWidth <= 992) return; // Не выполнять, если ширина ≤ 992px

			const target = e.target.closest(`[${this.options.catButton}]`);

			// Проверяем, что событие произошло именно на кнопке
			if (target && this.parent.contains(target)) {
				const dataAttrName = this.getDataAttributeCatID(target, this.options.catButton);
				const dataAfterPrefix = this.getValueAfterPrefix(dataAttrName, "catid");

				const catid = target.getAttribute(`data-catid${dataAfterPrefix}`);
				const targetBlock = this.parent.querySelector(`[${this.options.catBlock}='${catid}']`);

				if (targetBlock) {
					target.classList.add("active");
					this.removeAnotherBlocks(targetBlock, target);
					clearTimeout(timer);
					timer = setTimeout(() => {
						targetBlock.classList.add("active");
					}, 50);
				}
			}
		});

		// Отслеживаем нажатие на бургер
		this.openBtn &&
			this.openBtn.addEventListener("click", () => {
				this.parent.classList.toggle("active");
				this.openBtn.classList.toggle("active");
			});

		// Общее событие для всей области parent
		this.parent.addEventListener("click", (e) => {
			const target = e.target;

			// Обработка кликов внутри меню
			// Кнопки категорий
			if (target && target.closest(`[${this.options.catButton}]`)) {
				const btn = target.closest(`[${this.options.catButton}]`);

				const dataAttrName = this.getDataAttributeCatID(btn, this.options.catButton);
				const dataAfterPrefix = this.getValueAfterPrefix(dataAttrName, "catid");

				const catid = btn.getAttribute(`data-catid${dataAfterPrefix}`);

				const targetBlock = this.parent.querySelector(`[${this.options.catBlock}='${catid}']`);
				if (targetBlock) {
					targetBlock.classList.add("active-lg");

					this.parent.querySelector(`${this.options.parent}-zindex`) &&
						this.parent.querySelector(`${this.options.parent}-zindex`).classList.add("over");
				}
				return;
			}

			// Кнопки закрытия
			if (target.closest(`[${this.options.closeButton}]`)) {
				this.parent.classList.remove("active");
				this.openBtn && this.openBtn.classList.remove("active");
				this.allCatBlocks.forEach((block) => block.classList.remove("active-lg"));
				setTimeout(() => {
					this.parent.querySelector(`${this.options.parent}-zindex`) &&
						this.parent.querySelector(`${this.options.parent}-zindex`).classList.remove("over");
				}, 300);
				return;
			}

			// Кнопки "вернуться"
			if (target.closest(`[${this.options.backButton}]`)) {
				this.allCatBlocks.forEach((block) => block.classList.remove("active-lg"));

				setTimeout(() => {
					this.parent.querySelector(`${this.options.parent}-zindex`) &&
						this.parent.querySelector(`${this.options.parent}-zindex`).classList.remove("over");
				}, 300);

				return;
			}

			// Кнопки открытия списка подкатегорий
			if (target.closest(`[${this.options.openSubListButton}]`)) {
				const btn = target.closest(`[${this.options.openSubListButton}]`);
				const parent = btn.closest(`${this.options.parent}-menu_subcats-block`);
				const targetList = parent.querySelector("ul");
				if (targetList) {
					btn.classList.toggle("active");
					targetList.classList.toggle("active");
					if (targetList.classList.contains("active")) {
						targetList.style.maxHeight = targetList.scrollHeight + "px";
					} else {
						targetList.style.maxHeight = "";
					}
					this.closeAnotherLists(targetList, btn);
				}
				return;
			}
		});
	}
}
