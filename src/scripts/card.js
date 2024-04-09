
//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
//Функция создания карточки
export function createCard(card, deleteCard, toActivateLike, openPreviewImage) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    const likeCardButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    
    deleteCardButton.addEventListener('click', () => {deleteCard(cardElement);}); 
    likeCardButton.addEventListener('click', toActivateLike);
    cardImage.addEventListener('click', openPreviewImage);
    return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}

//Функция лайка карточки 
export function toActivateLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

