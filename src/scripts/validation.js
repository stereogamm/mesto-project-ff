
export const validationConfig = {
    formSelector: '.popup__form', // Селектор формы
    inputSelector: '.popup__input', // Селекторы полей ввода
    submitButtonSelector: '.popup__button', // Селектор кнопки отправки
    inactiveButtonClass: 'popup__button_disabled', // Класс неактивной кнопки
    inputErrorClass: 'popup__input_type_error', // Класс ошибки в поле ввода
    errorClass: 'popup__error_visible' // Класс отображения ошибки
};
  
//находит элемент ошибки, добавляет соответствующие классы для отображения ошибки и устанавливает текст сообщения об ошибке.
function showError(formElement, inputElement, errorMessage) {
    const err = formElement.querySelector(`.${inputElement.id}-err`); // Находим элемент ошибки по его id
    inputElement.classList.add(validationConfig.inputErrorClass); // Добавляем классы для отображения ошибки
    err.classList.add(validationConfig.errorClass); 
    err.textContent = errorMessage;// Устанавливаем текст ошибки
};

//скрывает сообщение об ошибке для указанного поля ввода, удаляя соответствующие классы
function hideError(formElement, inputElement) {
    const err = formElement.querySelector(`.${inputElement.id}-err`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    err.classList.remove(validationConfig.errorClass);
    err.textContent = ''; // Очищаем текст ошибки
};

//проверяет валидность поля ввода и, если оно невалидно, вызывает функцию showError, иначе вызывает hideError
function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) { // Проверяем, есть ли у поля ввода ошибки валидации
        inputElement.setCustomValidity(inputElement.dataset.errorMessage); // Если есть, устанавливаем пользовательское сообщение об ошибке
    } else {
        inputElement.setCustomValidity(""); // Иначе сбрасываем пользовательское сообщение об ошибке
    }
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideError(formElement, inputElement);
      }
};

//возвращает невалидное поле из списка полей
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => { // Проверяем, есть ли хотя бы одно невалидное поле в списке
        return !inputElement.validity.valid;
    })
};

//обновляет состояние кнопки отправки в зависимости от валидности полей ввода
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) { // Если есть хотя бы одно невалидное поле, делаем кнопку неактивной
            buttonElement.disabled = true;
            buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else { // Иначе делаем кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

// назначает обработчики событий для каждого поля ввода в форме, вызывая проверку валидности при каждом вводе и обновление состояния кнопки отправки
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => { // Назначаем обработчик события input для каждого поля ввода
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);

            toggleButtonState(inputList, buttonElement);
        });
    });
};

//очищает тексты ошибок и возвращает кнопку отправки в исходное состояние для указанной формы(вызовы в index.js)
export function clearValidation(formElement, validationConfig) {
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement)
    });
    toggleButtonState(inputList, buttonElement);
}

//включает валидацию для всех форм на странице, назначая обработчики событий для каждой формы.
export function enableValidation(validationConfig) {
        const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
        formList.forEach((formElement) => {
          formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
        });
      }

         
