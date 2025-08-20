export default class CatsMenu {
	constructor(options = {}) {
		const defaultConfig = {
			parent: ".catsoverlay",
			openBtn: "#burger",
			catButton: "data-catID",
			catBlock: "data-blockID",
			backButton: "data-subcatback",
			closeButton: "data-catsclose",
			openSubListButton: "data-subcatslist",
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
			const parent = btn.closest(".catsoverlay-menu_subcats-block");
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
				const catid = target.dataset.catid;
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
		this.openBtn.addEventListener("click", () => {
			this.parent.classList.toggle("active");
			this.openBtn.classList.toggle("active");
		});

		// Общее событие для всей области parent
		this.parent.addEventListener("click", (e) => {
			const target = e.target;

			// Обработка кликов внутри меню
			// Кнопки категорий
			if (target.closest(`[${this.options.catButton}]`)) {
				const btn = target.closest(`[${this.options.catButton}]`);
				const catid = btn.dataset.catid;
				const targetBlock = this.parent.querySelector(`[${this.options.catBlock}='${catid}']`);
				if (targetBlock) {
					targetBlock.classList.add("active-lg");
				}
				return;
			}

			// Кнопки закрытия
			if (target.closest(`[${this.options.closeButton}]`)) {
				this.parent.classList.remove("active");
				this.openBtn.classList.remove("active");
				this.allCatBlocks.forEach((block) => block.classList.remove("active-lg"));
				return;
			}

			// Кнопки "вернуться"
			if (target.closest(`[${this.options.backButton}]`)) {
				this.allCatBlocks.forEach((block) => block.classList.remove("active-lg"));
				return;
			}

			// Кнопки открытия списка подкатегорий
			if (target.closest(`[${this.options.openSubListButton}]`)) {
				const btn = target.closest(`[${this.options.openSubListButton}]`);
				const parent = btn.closest(".catsoverlay-menu_subcats-block");
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
