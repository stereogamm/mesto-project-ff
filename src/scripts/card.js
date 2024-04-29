import {config, cardWillBeDeleted} from './api.js';

//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
//Функция создания карточки
export function createCard(card, deleteCard, toActivateLike, openPreviewImage, userId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    const likeCardButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const ownerId = card.owner._id;
    const cardId = card._id

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.like_count').textContent = card.likes.length;

    renderDeleteCardButton(userId, ownerId, deleteCardButton);
   
    deleteCardButton.addEventListener('click', () => {
        deleteCard(cardId, cardElement);
    }); 

    likeCardButton.addEventListener('click', toActivateLike);
    cardImage.addEventListener('click', openPreviewImage);

    return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardId, cardElement) {
    cardWillBeDeleted(cardId);
    cardElement.remove();
}

//Функция лайка карточки 
export function toActivateLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

//Логика отображения/скрытия иконки удаления карточки 
function renderDeleteCardButton(userId, ownerId, button) {
    if (!(userId == ownerId)) {
        button.hidden = true;
    }
}
