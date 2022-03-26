const profileEditButton = document.querySelector('.profile__button-edit'); // найти кнопку редактирования профайла
const popup = document.querySelector('.popup'); // найти попап
const popupCloseButton = popup.querySelector('.popup__button-close'); // найти кнопку закрытия попапа
const formElement = popup.querySelector('.popup__form'); // найти форму в DOM
const nameInput = formElement.querySelector('#popup-input-name'); // найти поле формы ввода данных "Как тебя зовут?"
const descriptionInput = formElement.querySelector('#popup-input-description'); // найти поле формы ввода данных "Кто ты по жизни?"
const profileName = document.querySelector('.profile__name'); // найти, куда вставить значение поля формы ввода данных "Как тебя зовут?"
const profileDescription = document.querySelector('.profile__description'); // найти, куда вставить значение поля формы ввода данных "Кто ты по жизни?"

// добавить класс для открытия попапа
function openPopup()  {
popup.classList.add('popup_opened'); 
nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;
}

// убрать класс для закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened'); 
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);