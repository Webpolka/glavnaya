export default class ModalAuth {
	constructor(parentElement, options = {}) {
		this.parent = parentElement; // Передается DOM-элемент
		this.selectors = options.selectors || {};

		this.elements = {};

		this.initElements();
		this.initEventListeners();
	}

	initElements() {
		const {
			openBtn,
			siteOverlay,
			authorizeLogin,
			authorizeSignUp,
			closeBtn,
			backBtn,
			continueBtn,
			submitBtn,
			greatName,
			firstPart,
			secondPart,
			form,
			firstInput,
			secondInput,
			resetFirstBtn,
			resetSecondBtn,
		} = this.selectors;

		// Ищем внутри этого parent
		this.elements.siteOverlay = document.querySelector(siteOverlay);
		this.elements.authorizeLogin = document.querySelector(authorizeLogin);
		this.elements.authorizeSignUp = document.querySelector(authorizeSignUp);
		this.elements.openBtns = document.querySelectorAll(openBtn);

		this.elements.closeBtn = this.parent.querySelector(closeBtn);
		this.elements.backBtn = this.parent.querySelector(backBtn);
		this.elements.continueBtn = this.parent.querySelector(continueBtn);
		this.elements.submitBtn = this.parent.querySelector(submitBtn);
		this.elements.greatName = this.parent.querySelector(greatName);
		this.elements.firstPart = this.parent.querySelector(firstPart);
		this.elements.secondPart = this.parent.querySelector(secondPart);
		this.elements.form = this.parent.querySelector(form);
		this.elements.firstInput = this.parent.querySelector(firstInput);
		this.elements.secondInput = this.parent.querySelector(secondInput);
		this.elements.resetFirstBtn = this.parent.querySelector(resetFirstBtn);
		this.elements.resetSecondBtn = this.parent.querySelector(resetSecondBtn);
	}

	initEventListeners() {
		const { openBtns, closeBtn, backBtn, continueBtn, submitBtn, resetFirstBtn, resetSecondBtn, siteOverlay } = this.elements;

		if (resetFirstBtn) {
			resetFirstBtn.addEventListener("click", () => {
				this.elements.firstInput.value = "";
			});
		}

		if (resetSecondBtn) {
			resetSecondBtn.addEventListener("click", () => {
				this.elements.secondInput.value = "";
			});
		}

		if (this.parent) {
			this.parent.addEventListener("click", (e) => {
				if (e.target === this.parent) {
					this.parent.classList.remove("active");
				}
			});
		}

		openBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				this.parent.classList.add("active");
				this.hideAuthorizeSlideForm();
			});
		}, this);

		if (closeBtn) {
			closeBtn.addEventListener("click", () => {
				this.parent.classList.remove("active");
				removeNoScroll();
			});
		}

		function removeNoScroll() {
			const catOverlay = document.querySelector(".catsoverlay-wrapper");

			document.documentElement.classList.remove("no-scroll");
			document.documentElement.style.paddingRight = "";
			siteOverlay && siteOverlay.classList.remove("active");
			if (catOverlay) {
				catOverlay.style.paddingRight = "";
			}
		}

		if (continueBtn) {
			continueBtn.addEventListener("click", () => {
				if (this.elements.firstInput.value.trim().length > 1) {
					this.elements.firstPart.classList.remove("active");
					this.elements.secondPart.classList.add("active");
					this.elements.greatName.textContent = this.elements.firstInput.value.trim();
				} else {
					this.elements.firstInput.focus();
				}
			});
		}

		if (submitBtn) {
			submitBtn.addEventListener("click", (e) => {
				e.preventDefault();
				if (this.elements.secondInput.value.trim().length < 1) {
					this.elements.secondInput.focus();
				} else {
					this.elements.form.submit();
				}
			});
		}

		if (backBtn) {
			backBtn.addEventListener("click", () => {
				this.elements.firstPart.classList.add("active");
				this.elements.secondPart.classList.remove("active");
			});
		}
	}

	hideAuthorizeSlideForm() {
		if (this.elements.siteOverlay) this.elements.siteOverlay.classList.remove("active");
		if (this.elements.authorizeLogin) this.elements.authorizeLogin.classList.remove("active");
		if (this.elements.authorizeSignUp) this.elements.authorizeSignUp.classList.remove("active");
	}
}
