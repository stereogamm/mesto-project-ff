// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const page = document.querySelector('.page');
const content = page.querySelector('.content');
const placesList = content.querySelector('.places__list');
const cardTemplate = page.querySelector('#card-template').content; 

function deleteCard(cardElement) {
    cardElement.remove();
}

function createCards(card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    const likeCardButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    
    deleteCardButton.addEventListener('click', () => {deleteCard(cardElement);}); 
    placesList.append(cardElement); 
}

for (let i = 0; i < initialCards.length ; i++) {
    createCards(initialCards[i], deleteCard);
}



