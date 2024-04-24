
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
  
//показывает ошибку валидации
function showError(formElement, inputElement, errorMessage) {
    const err = formElement.querySelector(`.${inputElement.id}-err`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    err.classList.add(validationConfig.errorClass);
    err.textContent = errorMessage;
};
//скрывает ошибку валидации
function hideError(formElement, inputElement) {
    const err = formElement.querySelector(`.${inputElement.id}-err`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    err.classList.remove(validationConfig.errorClass);
    err.textContent = '';
};
//правила показа сообщений об ошибке
function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideError(formElement, inputElement);
      }
};
//возвращает невалидное поле
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
//состояние кнопки
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
            buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};
//ивентлисенер при каждом вводе в воле
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);

            toggleButtonState(inputList, buttonElement);
        });
    });
};

//очищение текста ошибок (вызовы в index.js)
export function clearValidation(formElement, validationConfig) {
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement)
    });
    toggleButtonState(inputList, buttonElement);
}

//функция для включения валидации во всех формах
export function enableValidation(validationConfig) {
    
        const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
        formList.forEach((formElement) => {
          formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
        });
      }

         
