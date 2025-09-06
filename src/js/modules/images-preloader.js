export default class ImagePreloader {
	constructor(options = {}) {
		const defaultConfig = {
			maxFileSizeKB: 500,
			inputId: "product-images",
			buttonId: "advertising-mediaload-button",
			previewsContainerId: "advertising-mediaload-previews",
			warningId: "advertising-mediaload-warning",
			dragAreaId: "advertising-mediaload-area",
		};

		this.options = Object.assign(defaultConfig, options);

		this.maxFileSizeKB = this.options.maxFileSizeKB || 500;
		this.input = document.getElementById(this.options.inputId);
		this.button = document.getElementById(this.options.buttonId);
		this.previewsContainer = document.getElementById(this.options.previewsContainerId);
		this.warning = document.getElementById(this.options.warningId);
		this.dragArea = document.getElementById(this.options.dragAreaId);
		this.selectedFiles = [];

		this.init();
	}

	init() {
		this.button.addEventListener("click", (e) => {
			e.preventDefault();
			this.input.click();
		});

		this.input.addEventListener("change", () => {
			this.handleFiles(this.input.files);
		});

		this.dragArea &&
			this.dragArea.addEventListener("dragover", (e) => {
				e.preventDefault();
				this.dragArea.style.backgroundColor = "#f0f0f0";
			});
		this.dragArea &&
			this.dragArea.addEventListener("dragleave", () => {
				this.dragArea.style.backgroundColor = "";
			});
		this.dragArea &&
			this.dragArea.addEventListener("drop", (e) => {
				e.preventDefault();
				this.dragArea.style.backgroundColor = "";
				this.handleFiles(e.dataTransfer.files);
			});
	}

	handleFiles(files) {
		const filesArray = Array.from(files);
		for (const file of filesArray) {
			if (!file.type.startsWith("image/")) continue;

			// Проверка на дублирование по имени файла
			const isDuplicate = this.selectedFiles.some((f) => f.name === file.name);
			if (isDuplicate) {
				if (this.warning) {
					this.warning.innerHTML = `
					<div class="mediaload-warning_inner">
					<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.56701 7.30309C9.37772 7.63641 9.61848 8.05 10.0018 8.05H14.9263C15.3512 8.05 15.5825 8.54655 15.309 8.8718L4.97844 21.1569C4.62931 21.5721 3.96161 21.2121 4.1166 20.6922L6.66548 12.1429C6.76108 11.8222 6.5209 11.5 6.18633 11.5H0.806771C0.435624 11.5 0.193847 11.1099 0.359003 10.7775L5.57639 0.277507C5.66087 0.107503 5.83433 0 6.02416 0H12.8554C13.2387 0 13.4794 0.413585 13.2901 0.746905L9.56701 7.30309Z" fill="#E60000"/></svg>
        			<span>This media file was added !</span>
					</div>`;
				}
				this.warning && this.warning.classList.remove("hidden");
				continue;
			}

			// Проверка размера файла
			if (file.size > this.maxFileSizeKB * 1024) {
				if (this.warning) {
					this.warning.innerHTML = `
       			<div class="mediaload-warning_inner">
       			<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.56701 7.30309C9.37772 7.63641 9.61848 8.05 10.0018 8.05H14.9263C15.3512 8.05 15.5825 8.54655 15.309 8.8718L4.97844 21.1569C4.62931 21.5721 3.96161 21.2121 4.1166 20.6922L6.66548 12.1429C6.76108 11.8222 6.5209 11.5 6.18633 11.5H0.806771C0.435624 11.5 0.193847 11.1099 0.359003 10.7775L5.57639 0.277507C5.66087 0.107503 5.83433 0 6.02416 0H12.8554C13.2387 0 13.4794 0.413585 13.2901 0.746905L9.56701 7.30309Z" fill="#E60000"/></svg>
        		<span>High-quality and clear photos attract buyers, and their quantity increases the chances of a sale.</span>
				</div>`;
				}
				this.warning && this.warning.classList.remove("hidden");
				continue;
			}

			this.selectedFiles.push(file);

			const dataTransfer = new DataTransfer();
			this.selectedFiles.forEach((file) => dataTransfer.items.add(file));
			this.input.files = dataTransfer.files;

			 console.log(this.input.files);

			this.warning && this.warning.classList.add("hidden");

			const reader = new FileReader();
			reader.onload = (e) => {
				const previewDiv = document.createElement("div");
				previewDiv.className = "mediaload-previews_item";

				const img = document.createElement("img");
				img.src = e.target.result;

				// Создаем кнопку удаления
				const deleteBtn = document.createElement("button");
				deleteBtn.innerHTML =
					'<svg width="15" height="15"  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0.418415 0.418415C0.976316 -0.139472 1.88083 -0.139472 2.43873 0.418415L10 7.97973L17.5613 0.418415C18.1192 -0.139472 19.0237 -0.139472 19.5816 0.418415C20.1395 0.976316 20.1395 1.88083 19.5816 2.43873L12.0203 10L19.5816 17.5613C20.1395 18.1192 20.1395 19.0237 19.5816 19.5816C19.0237 20.1395 18.1192 20.1395 17.5613 19.5816L10 12.0203L2.43873 19.5816C1.88083 20.1395 0.976316 20.1395 0.418415 19.5816C-0.139472 19.0237 -0.139472 18.1192 0.418415 17.5613L7.97973 10L0.418415 2.43873C-0.139472 1.88083 -0.139472 0.976316 0.418415 0.418415Z"/></svg>';
				deleteBtn.className = "mediaload-previews_item-delete";

				deleteBtn.addEventListener("click", () => {
					this.removeFile(file, previewDiv);
					this.warning && this.warning.classList.add("hidden");

					console.log(this.input.files);
				});

				previewDiv.appendChild(img);
				previewDiv.appendChild(deleteBtn);
				this.previewsContainer.appendChild(previewDiv);
			};
			reader.readAsDataURL(file);
		}
		this.updateWarning();
	}

	removeFile(file, previewElement) {
		// Удаляем файл из массива
		this.selectedFiles = this.selectedFiles.filter((f) => f !== file);

		// Обновляем input.files
		const dataTransfer = new DataTransfer();
		this.selectedFiles.forEach((f) => dataTransfer.items.add(f));
		this.input.files = dataTransfer.files;

		// Можно скрыть предупреждение, если список пуст
		if (this.selectedFiles.length === 0) {
			this.warning && this.warning.classList.add("hidden");
		}

		if (previewElement && previewElement.parentNode) {
			previewElement.parentNode.removeChild(previewElement);
		}
		this.updateWarning();
	}

	updateWarning() {
		const hasLargeFiles = this.selectedFiles.some((f) => f.size > this.maxFileSizeKB * 1024);

		// const hasDuplicateFiles = this.selectedFiles.some((f) => {
		// 	return false;
		// });
		if (this.warning) {
			if (hasLargeFiles) {
				this.warning.innerHTML = `
				<div class="mediaload-warning_inner">
       			<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.56701 7.30309C9.37772 7.63641 9.61848 8.05 10.0018 8.05H14.9263C15.3512 8.05 15.5825 8.54655 15.309 8.8718L4.97844 21.1569C4.62931 21.5721 3.96161 21.2121 4.1166 20.6922L6.66548 12.1429C6.76108 11.8222 6.5209 11.5 6.18633 11.5H0.806771C0.435624 11.5 0.193847 11.1099 0.359003 10.7775L5.57639 0.277507C5.66087 0.107503 5.83433 0 6.02416 0H12.8554C13.2387 0 13.4794 0.413585 13.2901 0.746905L9.56701 7.30309Z" fill="#E60000"/></svg>
        		<span>High-quality and clear photos attract buyers, and their quantity increases the chances of a sale.</span>
				</div>`;
				this.warning.classList.remove("hidden");
			}
			// } else if (hasDuplicateFiles) {
			// 	this.warning.innerHTML = `<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.56701 7.30309C9.37772 7.63641 9.61848 8.05 10.0018 8.05H14.9263C15.3512 8.05 15.5825 8.54655 15.309 8.8718L4.97844 21.1569C4.62931 21.5721 3.96161 21.2121 4.1166 20.6922L6.66548 12.1429C6.76108 11.8222 6.5209 11.5 6.18633 11.5H0.806771C0.435624 11.5 0.193847 11.1099 0.359003 10.7775L5.57639 0.277507C5.66087 0.107503 5.83433 0 6.02416 0H12.8554C13.2387 0 13.4794 0.413585 13.2901 0.746905L9.56701 7.30309Z" fill="#E60000"/></svg>
			// This media file was added !`;
			// 	this.warning.classList.remove("hidden");
			// }
		}
	}
}
