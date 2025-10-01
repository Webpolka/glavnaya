
/* --------------------------------------------------------------------------------------------------------------------------
PRODUCCT GALLERY PARALAX
-----------------------------------------------------------------------------------------------------------------------------*/

const galleryParalaxContainer = document.querySelector("#autoad-paralax-container");
const galleryBigImage = galleryParalaxContainer ? galleryParalaxContainer.querySelector("img") : null;

if (galleryParalaxContainer) {
	galleryParalaxContainer.addEventListener("mousemove", (e) => {
		const { left, top, width, height } = galleryParalaxContainer.getBoundingClientRect();
		const x = e.clientX - left; // позиция мыши внутри контейнера по X
		const y = e.clientY - top; // по Y

		// Вычисляем смещение в процентах
		const offsetX = (x / width - 0.5) * 2; // -1 до 1
		const offsetY = (y / height - 0.5) * 2;

		// Максимальное смещение в пикселях
		const maxTranslate = 20; // настройте по желанию

		// Смещение изображения в противоположную сторону
		const translateX = -offsetX * maxTranslate;
		const translateY = -offsetY * maxTranslate;

		// Применяем трансформацию
		galleryBigImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.1)`;
	});

	galleryParalaxContainer.addEventListener("mouseleave", () => {
		// Возвращаем изображение в исходное положение при уходе мыши
		galleryBigImage.style.transform = `translate(0, 0)`;
	});
}