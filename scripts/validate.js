const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// проверить валидность поля ввода
const checkValidity = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formElement, inputElement);
  }
};

// показать ошибку ввода
const showInputError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
}

// спрятать ошибку ввода
const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

// добавить полям формы необходимые обработчики
const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const popupSubmitButton = formElement.querySelector(config.submitButtonSelector);
  toggleSubmitButton(config, formElement, popupSubmitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(config, formElement, inputElement);
      toggleSubmitButton(config, formElement, popupSubmitButton);
    });
  });
};

//  найти и перебрать все формы
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) =>  {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);
  });
};

// очистить ошибки
const inputList = formElement.querySelectorAll(config.inputSelector);

inputList.forEach((inputElement) => { 
  hideInputError(config, formElement, inputElement);
};

// изменить состояние кнопки отправки формы
function toggleSubmitButton(config, formElement, submitButton) {
  submitButton.disabled = !formElement.checkValidity();
  submitButton.classList.toggle(config.inactiveButtonClass, !formElement.checkValidity());
}

 enableValidation(config);