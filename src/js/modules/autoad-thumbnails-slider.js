/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER PRODUCT GALLERY THUMBNAILS
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const autoadThumbSlider = document.querySelector("#autoad-swiper");

	if (autoadThumbSlider) {
		const swiper = new Swiper(autoadThumbSlider, {
			// дополнительные параметры
			slidesPerView: 5.25,
			spaceBetween: 8, //
			breakpoints: {
				0: {				
					spaceBetween: 8,
				},
				576: {					
					spaceBetween: 8,
				},
			},

			autoplay: {
				delay: 7000,
			},						
		});		
	}
});