
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
    if (evt.key === 'Escape' || evt.keyCode === 27) {
        closePopupWindow(document.querySelector('.popup_is-opened'));
    }
  }


