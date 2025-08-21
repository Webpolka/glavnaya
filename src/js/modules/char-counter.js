export default class CharCounter {
	constructor(options = {}) {
		const defaultConfig = {            
			inputId: "product-name",			
            maxLength: 50,
		};

		this.options = Object.assign(defaultConfig, options);

		this.input = document.getElementById(this.options.inputId);
		this.counter = document.querySelector(`[data-counter="${this.options.inputId}"]`);
		this.maxLength = this.options.maxLength || null; // Можно задать явно или взять из атрибута
		this.init();
	}

	init() {		
		if (!this.input) {
			console.log(`Инпут с id "${this.options.inputId}" не найден`);
			return;
		}
		
		if (!this.counter) {
			console.log(`Селектор счетчика "${this.counterSelector}" не найден`);
			return;
		}

		// Можно взять maxLength из атрибута, если не передан явно
		if (!this.maxLength && this.input.hasAttribute("maxlength")) {
			this.maxLength = parseInt(this.input.getAttribute("maxlength"), 10);
		}

		// Обновляем счетчик при инициализации
		this.updateCount();

		// Подписка на событие input
		this.input.addEventListener("input", () => this.updateCount());
	}

	updateCount() {
		const currentLength = this.input.value.length;
		this.counter.textContent = currentLength;
	}
}
