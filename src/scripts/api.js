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

//запрос на получение информации для профиля
export const userInfo = () => {
 return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(serverResponseHandler) 
    .catch(errorResponseHandler)
}
   
//
        
 
    
 

