import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, toActivateLike} from './scripts/card.js'
import {openPopupWindow, closePopupWindow, closePopupWithOverlayClick} from './scripts/modal.js'

//DOM nodes
const page = document.querySelector('.page');
const content = page.querySelector('.content');
const placesList = content.querySelector('.places__list');
//Открытие модального окна редактирования профиля 
const editProfileButton = page.querySelector('.profile__edit-button');
const editProfilePopup = page.querySelector('.popup_type_edit');
//открытие модального окна для добавления новой карточки
const newCardPopup = page.querySelector('.popup_type_new-card');
const addNewCardButton = page.querySelector('.profile__add-button');
//открытие фото при клике на карточку 
const cardImagePopup = page.querySelector('.popup_type_image');
const cardImagePopupSubtitle = page.querySelector('.popup__caption');
const popupImage = page.querySelector('.popup__image');
//закрытие попапа при клике на крестик 
const popupNewCardCloseButton = page.querySelector('.popup_type_new-card .popup__close');
const popupEditProfileCloseButton = page.querySelector('.popup_type_edit .popup__close');
const popupImageCloseButton = page.querySelector('.popup_type_image .popup__close');
//Заполнение полей формы именем/призванием значениями со страницы
const editProfileForm = document.forms['edit-profile'];
const editPopupFieldName = editProfileForm.elements['name'];
const editPopupFieldJob = editProfileForm.elements['description'];
//Добавление данных новой карточки в массив initialCards
const createNewCardForm = document.forms['new-place'];
const createNewCardFormFieldName = createNewCardForm.elements['place-name'];
const createNewCardFormFieldLink = createNewCardForm.elements['link'];
//Плавное открытие и закрытие попапов
const allModalWindows = document.querySelectorAll('.popup');


//Вывести все карточки на страницу
initialCards.forEach(function (card) {
    placesList.append(createCard(card, deleteCard, toActivateLike, openPreviewImage));
});

//Открытие модального окна редактирования профиля 
editProfileButton.addEventListener('click', () => {
    openPopupWindow(editProfilePopup);
    setEditProfilePopupData();
});

//открытие модального окна для добавления новой карточки
addNewCardButton.addEventListener('click', function(){
    openPopupWindow(newCardPopup);
});

//открытие фото при клике на карточку 
function openPreviewImage (evt) {
    const previewImageLink = evt.target.src;
    const previewImageAlt = evt.target.alt;

    popupImage.src = previewImageLink;
    popupImage.alt = previewImageAlt;
    cardImagePopupSubtitle.textContent = previewImageAlt;
    openPopupWindow(cardImagePopup);
}

popupEditProfileCloseButton.addEventListener('click', function(){
    closePopupWindow(editProfilePopup)
});

popupNewCardCloseButton.addEventListener('click', function(){
    closePopupWindow(newCardPopup)
});

popupImageCloseButton.addEventListener('click', function(){
    closePopupWindow(cardImagePopup)
});

//Обработчики события закрытия модальных окон при клике на оверлэй
newCardPopup.addEventListener('click', closePopupWithOverlayClick); 
editProfilePopup.addEventListener('click', closePopupWithOverlayClick); 
cardImagePopup.addEventListener('click', closePopupWithOverlayClick);
        
//Заполнение полей формы именем/работой значениями со страницы
const profileTitle = content.querySelector('.profile__title').textContent;
const profileInfo = content.querySelector('.profile__description').textContent;
function setEditProfilePopupData() { 
    editPopupFieldName.value = profileTitle;
    editPopupFieldJob.value = profileInfo;
};

//Изменение страницы через попап 
function editProfileData(evt) {
    evt.preventDefault();
    content.querySelector('.profile__title').textContent = editPopupFieldName.value;
    content.querySelector('.profile__description').textContent = editPopupFieldJob.value;
    closePopupWindow(editProfilePopup);
};

editProfileForm.addEventListener('submit', editProfileData);

//Добавление данных новой карточки 
function createNewCard(evt) {
    evt.preventDefault();
    const cardName = createNewCardFormFieldName.value;
    const cardLink = createNewCardFormFieldLink.value;
    const newOdject = {name: cardName, link: cardLink};
    addNewCard(createCard(newOdject, deleteCard, toActivateLike, openPreviewImage));
    createNewCardForm.reset();
    closePopupWindow(newCardPopup);
};

createNewCardForm.addEventListener('submit', createNewCard);

//Добавление новой созданной карточки в начало списка карточек
function addNewCard(newCard) {
    placesList.prepend(newCard);
};

//Плавное открытие и закрытие попапов
allModalWindows.forEach(function(currentModal) {
    currentModal.classList.toggle('popup_is-animated');
});

