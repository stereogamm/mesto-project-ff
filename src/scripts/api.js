export const config = {
    baseUrl: 'https://mesto.nomoreparties.co./v1/wff-cohort-12',
    headers: {
      authorization: '40763991-4d89-4574-a25e-bed5b549aaca',
      'Content-Type': 'application/json'
    }
  }

//общая функция-обработчик ответа сервера
  const serverResponseHandler = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //общая функция-обработчик ошибки сервера
  const errorResponseHandler = (error) => {
    console.log(error);
  }

//запрос на получение данных пользователя
export const userInfo = () => {
 return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(serverResponseHandler) 
    .catch(errorResponseHandler)
}
   
//запрос на получение карточек с сервера
export const requestCardsArray = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(serverResponseHandler) 
  .catch(errorResponseHandler)
}

 //запрос на редактирование профиля
 export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(serverResponseHandler) 
  .catch(errorResponseHandler)
 }
    
 //Добавление новой карточки
 export const addedNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(serverResponseHandler) 
  .catch(errorResponseHandler)
 }
 
//Удаление карточки
export const cardWillBeDeleted = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(serverResponseHandler) 
  .catch(errorResponseHandler)
}

//Постановка лайка
export const cardWillBeLiked = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(serverResponseHandler) 
  .catch(errorResponseHandler)
}

//Cнятие лайка
export const likeWillbeDeleted = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(serverResponseHandler) 
  .catch(errorResponseHandler)
}

//Обновление аватара пользователя
export const updateAvatarImage = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(serverResponseHandler) 
  .catch(errorResponseHandler)
}