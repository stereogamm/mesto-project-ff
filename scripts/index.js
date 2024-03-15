//DOM nodes
const page = document.querySelector('.page');
const content = page.querySelector('.content');
const placesList = content.querySelector('.places__list');
//Темплейт карточки
const cardTemplate = page.querySelector('#card-template').content; 

// Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

//Функция создания одной карточки
function createCard(card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    const likeCardButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    
    deleteCardButton.addEventListener('click', () => {deleteCard(cardElement);}); 
    return cardElement;
}

//Вывести все карточки на страницу
initialCards.forEach(function (card) {
    placesList.append(createCard(card, deleteCard));
});

