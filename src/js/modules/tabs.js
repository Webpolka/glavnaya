export default class Tabs {
    constructor(options = {}) {
      // Дефолтная конфигурация
      const defaultConfig = {
        parent: ".header-login",
        button: "data-tab",
        panel: "data-panel",
        index: 0,
      };
   
      this.options = Object.assign(defaultConfig, options);
      this.parent = document.querySelector(this.options.parent);
   
      this.buttons = this.parent.querySelectorAll(`[${this.options.button}]`);
      this.panels = this.parent.querySelectorAll(`[${this.options.panel}]`);
      this.listener();
    }
    // Отслеживание нажатий на кнопки
    listener() {
      this.showTab(this.searchId(this.options.index));
      this.buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => this.tabsChanger(e));
      });
    }
    // Находим Id для вкладки
    searchId(index) {
      const PL = this.panels.length;
      if (index <= PL - 1) {
        return this.panels[index].getAttribute(`${this.options.panel}`);
      } else {
        return this.panels[0].getAttribute(`${this.options.panel}`);
      }
    }
    // Находим вкладку которую нужно показать
    tabsChanger(e) {
      const tabId = e.currentTarget.getAttribute(`${this.options.button}`);
      this.showTab(tabId);
    }
    showTab(tabId) {
      // 1. Деактивируем все кнопки
      this.buttons.forEach((button) => button.classList.remove("active"));
   
      // 2. Скрываем все вкладки
      this.panels.forEach((panel) => panel.classList.remove("active"));
   
      // 3. Активируем нужную кнопку
      this.buttons.forEach((btn) => {
        if (btn.getAttribute(`${this.options.button}`) == tabId) {
          btn.classList.add("active");
        }
      });
      // 4. Показываем нужную вкладку
      this.panels.forEach((panel) => {
        if (panel.getAttribute(`${this.options.panel}`) == tabId) {
          panel.classList.add("active");
        }
      });
    }
  }