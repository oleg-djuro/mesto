// объявить постоянные попапа редактирования профайла
const profileEditButton = document.querySelector('.profile__button_edit'); // найти кнопку редактирования профайла
const popupProfileEdit = document.querySelector('#popup-profile-edit'); // найти попап редактирования профайла
const popupProfileEditCloseButton = popupProfileEdit.querySelector('#popup-profile-edit-close'); // найти кнопку закрытия попапа редактирования профайла
const profileEditForm = popupProfileEdit.querySelector('#profile-edit-form'); // найти форму редактирования профайла в DOM
const nameInput = profileEditForm.querySelector('#popup-input-name'); // найти поле формы ввода данных "Как тебя зовут?"
const descriptionInput = profileEditForm.querySelector('#popup-input-description'); // найти поле формы ввода данных "Кто ты по жизни?"
const profileName = document.querySelector('.profile__name'); // найти, куда вставить значение поля формы ввода данных "Как тебя зовут?"
const profileDescription = document.querySelector('.profile__description'); // найти, куда вставить значение поля формы ввода данных "Кто ты по жизни?"

// объявить постоянные попапа добавления карточки
const cardAddButton = document.querySelector('.profile__button_add'); // найти кнопку добавления карточки
const popupCardAdd = document.querySelector('#popup-card-add'); // найти попап добавления карточки
const popupCardAddCloseButton = popupCardAdd.querySelector('#popup-card-add-close'); // найти кнопку закрытия попапа добавления карточки
const cardAddForm = popupCardAdd.querySelector('#card-add-form'); // найти форму для заполнения попапа добавления карточки
const placeNameInput = cardAddForm.querySelector('#popup-input-place'); // найти поле формы ввода данных "Название"
const placeImageLinkInput = cardAddForm.querySelector('#popup-input-place-image-link'); // найти поле формы ввода данных "Ссылка на картинку"

// объявить постоянные попапа просмотра карточки
const popupCardImage = document.querySelector('#popup-card-image'); // найти попап изображения карточки
const popupCardImageCloseButton = popupCardImage.querySelector('#close-popup-card-image'); // найти  кнопку закрытия попапа изображения карточки
const popupFigureImage = popupCardImage.querySelector('.popup__figure-image'); // найти изображение карточки
const popupFigureCaption = popupCardImage.querySelector('.popup__figure-caption'); // найти описание карточки

// объявить массив первоначальных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsList = document.querySelector('.elements__list'); // найти список карточек
const cardTemplate = document.querySelector('#element-template'); // найти заготовку карточки
const popups = document.querySelectorAll('.popup');

// функция открытия попапа
function openPopup (popup) {
  popup.classList.add('popup__opened');
};

// функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup__opened');
};

// закрыть любой попап нажатием по крестику
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
});

// инициализировать карточку
function initiateCard(card) {
  const cardItem = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.elements__photo');
  const cardCaption = cardItem.querySelector('.elements__item-name');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardCaption.textContent = card.name;
// полюбить карточку
  cardItem.querySelector('.elements__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__button-like_active');
  });
// удалить карточку
  cardItem.querySelector('.elements__button-delete').addEventListener('click', () => {
cardItem.remove();
  });
// открыть изображение карточки
  cardImage.addEventListener('click', () => {
    openPopup(popupCardImage);
    popupFigureImage.src = card.link;
    popupFigureImage.alt = card.name;
    popupFigureCaption.textContent = card.name;
  });
    return cardItem;
}

// рендеринг карточек
const renderCard = card => cardsList.prepend(card);

// добавить первоначальные карточки
initialCards.forEach(card => renderCard(initiateCard(card)));

// открыть попап редактирования профайла
function openPopupProfileEdit()  {
  openPopup(popupProfileEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// редактировать профайл
function editProfileFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfileEdit);
}

// добавить свою карточку
function addCardFormSubmitHandler (evt) {
  evt.preventDefault();
  const сard = {name: placeNameInput.value, link: placeImageLinkInput.value};
  renderCard(initiateCard(сard));
  closePopup(popupCardAdd);
  cardAddForm.reset();
}

// слушать события
profileEditButton.addEventListener('click', openPopupProfileEdit);
profileEditForm.addEventListener('submit', editProfileFormSubmitHandler);
cardAddButton.addEventListener('click', () => openPopup(popupCardAdd));
cardAddForm.addEventListener('submit', addCardFormSubmitHandler);