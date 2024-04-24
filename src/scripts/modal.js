
//Функция открытия модального окна
export function openPopupWindow(element){
    element.classList.toggle('popup_is-opened');
    document.addEventListener('keydown', closePopupWithEscButton);
}

//Функция закрытия модального окна при клике на крестик 
export function closePopupWindow(element){
    element.classList.toggle('popup_is-opened');
    document.removeEventListener('keydown', closePopupWithEscButton);
}

//Функция закрытия модального окна нажатием на Esc 
export function closePopupWithEscButton(evt) {
    if (evt.key === 'Escape') {
        closePopupWindow(document.querySelector('.popup_is-opened'));
    }
  }

  //Функция закрытия модального окна при клике на оверлэй

  export function closePopupWithOverlayClick(evt) {
    if(evt.target === evt.currentTarget) {
        closePopupWindow(evt.currentTarget)
    }
  }



