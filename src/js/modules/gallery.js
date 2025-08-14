export default class ImageCardGallery {
	constructor(container, options = {}) {
		this.container = container;
		this.options = Object.assign(
			{
				imageSelector: ".product-image",
				activeClass: "active",
				dotSelector: ".dot",
				lazyLoad: true,
				placeholderSrc: "./images/placeholder.png",
				overlaySelector: ".product-card_overlay", // селектор для overlay
				overlayActiveClass: "showed", // класс для overlay при наведении на последнюю картинку
			},
			options
		);

		this.images = Array.from(container.querySelectorAll(this.options.imageSelector));
		this.dots = Array.from(container.querySelectorAll(this.options.dotSelector));
		this.overlay = container.querySelector(this.options.overlaySelector);
		this.currentIndex = 0;
		this.init();
	}

	init() {
		this.setupImages();
		this.setupDots();
		if (this.options.lazyLoad) {
			this.setupLazyLoading();
		}
		this.setupOverlayBehavior();
	}

	setupImages() {
		this.images.forEach((img, index) => {
			if (index === 0) {
				img.classList.add(this.options.activeClass);
				img.src = img.dataset.src;
			} else {
				img.classList.remove(this.options.activeClass);
				if (this.options.lazyLoad && img.src === this.options.placeholderSrc && img.dataset.src) {
					img.src = img.dataset.src;
				}
			}
		});
	}

	setupDots() {
		this.dots.forEach((dot, index) => {
			dot.addEventListener("mouseenter", () => {
				this.showImage(index);
			});
			dot.addEventListener("mouseleave", () => {
				this.hideOverlay(index);
			});
		});
	}

	showImage(index) {
		if (index < 0 || index >= this.images.length) return;

		this.images.forEach((img, i) => {
			img.classList.toggle(this.options.activeClass, i === index);
			if (i === index) {
				img.src = img.dataset.src;
			}
		});
		this.dots.forEach((dot, i) => {
			dot.classList.toggle(this.options.activeClass, i === index);
		});

		this.currentIndex = index;

		if (this.options.lazyLoad) {
			const currentImg = this.images[index];
			if (!currentImg.src && currentImg.dataset.src) {
				currentImg.src = currentImg.dataset.src;
			}
		}

		// Проверяем, если последняя картинка, добавляем активный класс overlay
		if (index === this.images.length - 1 && this.overlay) {
			this.overlay.classList.add(this.options.overlayActiveClass);
		} else if (this.overlay) {
			this.overlay.classList.remove(this.options.overlayActiveClass);
		}
	}
	hideOverlay(index) {
		this.overlay.classList.remove(this.options.overlayActiveClass);
	}

	setupLazyLoading() {
		if ("IntersectionObserver" in window) {
			const observer = new IntersectionObserver(
				(entries, obs) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const img = entry.target;
							if (!img.src && img.dataset.src) {
								img.src = img.dataset.src;
								obs.unobserve(img);
							}
						}
					});
				},
				{ rootMargin: "50px" }
			);

			this.images.forEach((img) => {
				if (!img.src && img.dataset.src) {
					observer.observe(img);
				}
			});
		}
	}

	setupOverlayBehavior() {
		// Можно добавить, чтобы при наведении на последнюю картинку автоматически активировался overlay
		// или оставить только переключение при смене изображений (уже реализовано в showImage)
		// Например, если нужно менять overlay при наведении на последнюю картинку:
		// this.images[this.images.length - 1].addEventListener('mouseenter', () => {
		//   this.overlay.classList.add(this.options.overlayActiveClass);
		// });
		// this.images[this.images.length - 1].addEventListener('mouseleave', () => {
		//   this.overlay.classList.remove(this.options.overlayActiveClass);
		// });
	}
}
