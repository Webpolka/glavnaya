/* ------------------------------------------------------------------------------------------------------------------------------------------
HTML TEMPLATE
--------------------------------------------------------------------------------------------------------------------------------------------

<div class="cookies-popup-ht15zxx">
	<div class="cookies-popup__wrapper-ht15zxx">
		<p class="cookies-popup__content-ht15zxx">
			Мы используем файлы соокіе для улучшения работы сайта. Продолжая использовать сайт, вы даёте согласие на обработку файлов соокіе
			в соответствии с Федеральным законом N°152-Ф3 «O персональных данных». Подробнее о правилах обработки в
			<a href="#" target="_blank">Политике обработки персональных данных</a>.
		</p>
		<button class="cookies-popup__btn-ht15zxx">Ок</button>
	</div>
</div>

--------------------------------------------------------------------------------------------------------------------------------------------
SCSS path : src/scss/components/cookies.scss
---------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------
JS code : simply import and call this function in main.js
---------------------------------------------------------------------------------------------------------------------------------------------

import checkCookies from './modules/cookies';
checkCookies();

*/

export default function checkCookies() {
    let cookieNote = document.querySelector('.cookies-popup-ht15zxx');
    let cookieBtnAccept = cookieNote.querySelector('.cookies-popup__btn-ht15zxx');    

    // Если куки cookies_policy нет или она просрочена, то показываем уведомление
    if (!getCookie('cookies_policy')) {
        cookieNote.classList.add('cookies-popup_show-ht15zxx');
    }

    // При клике на кнопку устанавливаем куку cookies_policy на один год
    cookieBtnAccept.addEventListener('click', function () {
        setCookie('cookies_policy', 'true', 365);
        cookieNote.classList.remove('cookies-popup_show-ht15zxx');
    });  
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}