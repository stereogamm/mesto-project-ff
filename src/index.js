import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, toActivateLike} from './scripts/card.js';
import {openPopupWindow, closePopupWindow, closePopupWithOverlayClick} from './scripts/modal.js';
import {clearValidation, enableValidation, validationConfig} from './scripts/validation.js';
import {config, userInfo, requestCardsArray, updateUserInfo, addedNewCard, updateAvatarImage} from './scripts/api.js';

//TO DO 
//УДАЛИТЬ ПЕРЕД ДЕПЛОЕМ МЕТОД ПОЛУЧЕНИЯ КАРТОЧЕК И ФАЙЛ С МАССИВОМ!!!

//DOM nodes
const page = document.querySelector('.page');
const content = page.querySelector('.content');
const placesList = content.querySelector('.places__list');
//модальное окно редактирования профиля 
const editProfileButton = page.querySelector('.profile__edit-button');
const editProfilePopup = page.querySelector('.popup_type_edit');
//модальное окно для добавления новой карточки
const newCardPopup = page.querySelector('.popup_type_new-card');
const addNewCardButton = page.querySelector('.profile__add-button');
//модальное окно для изменения аватара
const userAvatar = document.querySelector('.profile__image');
const newAvatarPopup = page.querySelector('.popup_type_new-avatar');
const newAvatarForm = document.forms['new-avatar'];
const newAvatarEditField = newAvatarForm.elements['avatar-link']
//модальное окно фото при клике на карточку 
const cardImagePopup = page.querySelector('.popup_type_image');
const cardImagePopupSubtitle = page.querySelector('.popup__caption');
const popupImage = page.querySelector('.popup__image');
//кнопки закрытия модальных окон
const popupNewCardCloseButton = page.querySelector('.popup_type_new-card .popup__close');
const popupEditProfileCloseButton = page.querySelector('.popup_type_edit .popup__close');
const popupImageCloseButton = page.querySelector('.popup_type_image .popup__close');
const popupUpdateAvatarCloseButton = page.querySelector('.popup_type_new-avatar .popup__close');
//Форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
const editPopupFieldName = editProfileForm.elements['name'];
const editPopupFieldJob = editProfileForm.elements['description'];
//Форма создания новой карточки
const createNewCardForm = document.forms['new-place'];
const createNewCardFormFieldName = createNewCardForm.elements['place-name'];
const createNewCardFormFieldLink = createNewCardForm.elements['link'];
//Селектор всех модальных окон
const allModalWindows = document.querySelectorAll('.popup');


enableValidation(validationConfig);            

//Открытие модального окна редактирования профиля 
editProfileButton.addEventListener('click', () => {
    clearValidation(editProfilePopup, validationConfig);
    openPopupWindow(editProfilePopup);
    setEditProfilePopupData();
});

//открытие модального окна для добавления новой карточки
addNewCardButton.addEventListener('click', function(){
    clearValidation(newCardPopup, validationConfig);
    openPopupWindow(newCardPopup);
});

//Открытие модального окна для изменения аватара пользователя
userAvatar.addEventListener('click', function() {
    clearValidation(newAvatarPopup, validationConfig);
    openPopupWindow(newAvatarPopup);
})



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
    createNewCardForm.reset();
    closePopupWindow(newCardPopup);
});

popupImageCloseButton.addEventListener('click', function(){
    closePopupWindow(cardImagePopup);
});

popupUpdateAvatarCloseButton.addEventListener('click', function(){
    newAvatarForm.reset();
    closePopupWindow(newAvatarPopup);
});

//Обработчики события закрытия модальных окон при клике на оверлэй
newCardPopup.addEventListener('click', closePopupWithOverlayClick); 
editProfilePopup.addEventListener('click', closePopupWithOverlayClick); 
cardImagePopup.addEventListener('click', closePopupWithOverlayClick);
newAvatarPopup.addEventListener('click', closePopupWithOverlayClick);


//Асинхронный общий промис для запроса данных о пользователе и карточек, так как в отрисовке карточек нам нужен userId из первого запроса
Promise.all([userInfo(),requestCardsArray()])
    .then((data) => {
    const userData = data[0]; // данные о пользователе из промиса userInfo()
    const cardsData = data[1]; //массив карточек из промиса requestCardsArray()
    //далее работаем с этими переменными в текущем и следующем промисе
    const userId = userData._id;
    

    profileTitle.textContent = userData.name; //отрисовываем имя
    profileInfo.textContent = userData.about; //отрисовываем подзаголовок
    profileImage.style = `background-image: url('${userData.avatar}')`; //отрисовываем аватар

    return ([cardsData, userId]);
}) 
    .then(([cardsData, userId]) => { //работа с данными для отрисовки карточек
    cardsData.forEach(function(card) {
        placesList.append(createCard(card, deleteCard, toActivateLike, openPreviewImage, userId));
    }); 
})

//Заполнение полей формы именем/описанием значениями со страницы
const profileTitle = content.querySelector('.profile__title');
const profileInfo = content.querySelector('.profile__description');
const profileImage = content.querySelector('.profile__image');

function setEditProfilePopupData() { 
    editPopupFieldName.value = profileTitle.textContent;
    editPopupFieldJob.value = profileInfo.textContent;;
};

//Изменение данных профиля через попап + вызов промиса 
function editProfileData(evt) {
    evt.preventDefault();

    content.querySelector('.profile__title').textContent = editPopupFieldName.value;
    content.querySelector('.profile__description').textContent = editPopupFieldJob.value;
    renderLoading(true, editProfileForm.querySelector('.popup__button'));
    closePopupWindow(editProfilePopup);
    let name = editPopupFieldName.value;
    let about = editPopupFieldJob.value
    updateUserInfo(name, about)
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(true, editProfileForm.querySelector('.popup__button')))
};

editProfileForm.addEventListener('submit', editProfileData);

//Изменение аватара пользователя + вызов промиса
function editAvatarImage(evt) {
    evt.preventDefault();
    
    let avatarLink = newAvatarEditField.value;
    
    renderLoading(true, newAvatarForm.querySelector('.popup__button'));
    updateAvatarImage(avatarLink)
        .then((data) => {
           let avatarImage = data.avatar;
           userAvatar.style = `background-image: url(${avatarImage})`
        })
        .catch((err) => {
            console.log(err);
        })
        .finally (() => {
            renderLoading(false, newAvatarForm.querySelector('.popup__button'))
        }
    )
    closePopupWindow(newAvatarPopup);
    newAvatarForm.reset();
}

newAvatarForm.addEventListener('submit', editAvatarImage);

//Добавление данных новой карточки 
function createNewCard(evt) {
    evt.preventDefault();
    const cardName = createNewCardFormFieldName.value;
    const cardLink = createNewCardFormFieldLink.value;
    const newOdject = {name: cardName, link: cardLink, likes:[], owner: {}};
    addNewCard(createCard(newOdject, deleteCard, toActivateLike, openPreviewImage));
    createNewCardForm.reset();
    closePopupWindow(newCardPopup);
    renderLoading(true, createNewCardForm.querySelector('.popup__button'))
    addedNewCard(cardName, cardLink)
        .catch((err) => {
        console.log(err);
    })
        .finally(() => renderLoading(true, createNewCardForm.querySelector('.popup__button')))
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

//Отображение процесса обработки запроса на кнопках модальных окон
function renderLoading(isLoading, button) {
    if(isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранить';
    }
}