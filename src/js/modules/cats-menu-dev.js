export default class CatsMenu {
	constructor(options = {}) {
		// Дефолтная конфигурация
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

		this.allCatsBtns = this.parent.querySelectorAll(`[${this.options.catButton}]`);
		this.allBackBtns = this.parent.querySelectorAll(`[${this.options.backButton}]`);
		this.allCloseBtns = this.parent.querySelectorAll(`[${this.options.closeButton}]`);
		this.allCatBlocks = this.parent.querySelectorAll(`[${this.options.catBlock}]`);
		this.allSubCatListBtns = this.parent.querySelectorAll(`[${this.options.openSubListButton}]`);

		this.listener();
	}
	
	closeAnother(currentList, button) {
		this.allSubCatListBtns.forEach((btn) => {
			const parent = btn.closest(".catsoverlay-menu_subcats-block");
			const targetList = parent.querySelector("ul");
			if (currentList !== targetList) {
				targetList.classList.remove("active");
				targetList.style.maxHeight = "";
			}
            if (button != btn) {
				btn.classList.remove("active");
			}
		});		
	}

	listener() {
		// Отслеживаем нажатие на бургер
		this.openBtn.addEventListener("click", () => {
			this.parent.classList.toggle("active");
			this.openBtn.classList.toggle("active");
		});

		// Отслеживаем нажатие на КАТЕГОРИИ
		this.allCatsBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				const catid = btn.dataset.catid;
				const targetBlock = this.parent.querySelector(`[${this.options.catBlock + "='" + catid + "'"}]`);

				targetBlock && targetBlock.classList.add("active");
			});
		}, this);

		// Отслеживаем нажатие на все кнопки Закрыть
		this.allCloseBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				this.parent.classList.remove("active");
				this.openBtn.classList.remove("active");
				this.allCatBlocks.forEach((block) => {
					block.classList.remove("active");
				});
			});
		}, this);

		// Отслеживаем нажатие на кнопки ВЕРНУТЬСЯ
		this.allBackBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				this.allCatBlocks.forEach((block) => {
					block.classList.remove("active");
				});
			});
		});

		// Отслеживаем нажатие на кнопки открыть список подкатегории
		this.allSubCatListBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				const parent = btn.closest(".catsoverlay-menu_subcats-block");
				const targetList = parent.querySelector("ul");

				btn.classList.toggle("active");
				targetList.classList.toggle("active");

				if (targetList.classList.contains("active")) {
					targetList.style.maxHeight = targetList.scrollHeight + "px";
				} else {
					targetList.style.maxHeight = "";
				}
				this.closeAnother(targetList, btn);
			});
		});
	}
}
