export default class TabsByAnchor {
	constructor(options = {}) {
		const defaultConfig = {
			tab: "[data-tabFull]",
			panel: "[data-panelFull]",
		};

		this.options = Object.assign(defaultConfig, options);

		this.tabs = document.querySelectorAll(this.options.tab);
		this.panels = document.querySelectorAll(this.options.panel);

		this.listener();
	}
	listener() {
		this.tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				this.tabs.forEach((t) => {
					t.classList.remove("active");
				});
				tab.classList.add("active");

				const anchor = tab.getAttribute(this.removeSquareBrackets(this.options.tab));

				this.panels.forEach((p) => {
					p.classList.remove("active");

					if (p.getAttribute(this.removeSquareBrackets(this.options.panel)) == anchor) {
						p.classList.add("active");
					}
				});
			});
		}, this);
	}
	removeSquareBrackets(str) {
		// Проверяем, что строка начинается с '[' и заканчивается на ']'
		if (str.startsWith("[") && str.endsWith("]")) {
			// Удаляем первые и последние символы
			return str.slice(1, -1);
		}
		// Если скобки не по краям, возвращаем строку без изменений
		return str;
	}
}
