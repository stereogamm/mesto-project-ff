const editProfileForm = document.forms['edit-profile'];
const editPopupFieldName = editProfileForm.elements['name'];
const editPopupFieldJob = editProfileForm.elements['description']; 
// const validationConfig = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// };
  
//показывает ошибку валидации
function showError(formElement, inputElement, errorMessage) {
    const err = formElement.querySelector(`.${inputElement.id}-err`);
    inputElement.classList.add('popup__input_type_error');
    err.classList.add('popup__error_visible');
    err.textContent = errorMessage;
};
//скрывает ошибку валидации
function hideError(formElement, inputElement) {
    const err = formElement.querySelector(`.${inputElement.id}-err`);
    inputElement.classList.remove('popup__input_type_error');
    err.classList.remove('popup__error_visible');
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
            buttonElement.classList.add('popup__button_disabled');
            buttonElement.classList.add('popup__button-inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
        buttonElement.classList.remove('popup__button-inactive');
    }
};
//ивентлисенер при вводе в воле
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);

            toggleButtonState(inputList, buttonElement);
        });
    });
};

setEventListeners(editProfileForm);

//очищение текста ошибок (нужны вызовы в index.js)
function clearValidation(formElement) {
    const buttonElement = formElement.querySelector('.popup__button');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    inputList.forEach((input) => {
        hideError(formElement, inputElement)
    });
    toggleButtonState(inputList, buttonElement);
}



