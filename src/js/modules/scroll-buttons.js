export default class ScrollButtons {
	constructor(options = {}) {
		const defaultConfig = {
			btnParent: ".conversations-list",
			btnUp: '[data-id="scroll-up"]',
			btnDown: '[data-id="scroll-down"]',

			scrollArea: ".conversations-list_scroll",
			step: 5,
			speed: 10,
		};

		this.options = Object.assign(defaultConfig, options);

		this.scrollStep = options.step;
		this.scrollSpeed = options.speed;

		this.btnParent = document.querySelector(this.options.btnParent);
		this.btnUp = this.btnParent.querySelector(this.options.btnUp);
		this.btnDown = this.btnParent.querySelector(this.options.btnDown);

		this.scrollArea = document.querySelector(this.options.scrollArea);
		this.intervalId = null;
		this.listener();

		this.checkScroll = this.checkScroll.bind(this);
	}
	listener() {
		window.onload = this.checkScroll;
		window.onresize = this.checkScroll;
		this.btnParent.onresize = this.checkScroll;
		this.btnParent.onchange = this.checkScroll;

		this.btnUp.addEventListener("mousedown", (e) => this.startScrolling(-1, e));
		this.btnUp.addEventListener("mouseup", (e) => this.stopScrolling(e));
		this.btnUp.addEventListener("mouseleave", (e) => this.stopScrolling(e));

		this.btnDown.addEventListener("mousedown", (e) => this.startScrolling(1, e));
		this.btnDown.addEventListener("mouseup", (e) => this.stopScrolling(e));
		this.btnDown.addEventListener("mouseleave", (e) => this.stopScrolling(e));
	}

	checkScroll = () => {
		let bool = true;
		if (this.scrollArea.scrollHeight > this.scrollArea.clientHeight) {
			// Если есть прокрутка, показываем стрелки
			this.btnUp.style.display = "block";
			this.btnDown.style.display = "block";
			bool = true;
		} else {
			// Иначе скрываем
			this.btnUp.style.display = "none";
			this.btnDown.style.display = "none";
			bool = false;
		}
		return bool;
	};

	startScrolling(direction, e) {
		e.stopPropagation();
		e.preventDefault();
		// Остановить, если уже запущено
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
		this.intervalId = setInterval(() => {
			this.scrollArea.scrollBy({ top: direction * this.scrollStep, behavior: "auto" });
		}, this.scrollSpeed); // интервал в миллисекундах
	}
	stopScrolling(e) {
		e.stopPropagation();
		e.preventDefault();
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}
}
