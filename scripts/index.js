// объявить постоянные попапа редактирования профайла
const profileEditButton = document.querySelector('.profile__button_edit'); // найти кнопку редактирования профайла
const popupProfileEdit = document.querySelector('#popup-profile-edit'); // найти попап редактирования профайла
const popupProfileEditCloseButton = popupProfileEdit.querySelector('#popup-profile-edit-close'); // найти кнопку закрытия попапа редактирования профайла
const profileEditForm = popupProfileEdit.querySelector('#profile-edit-form'); // найти форму редактирования профайла в DOM
const nameInput = profileEditForm.querySelector('#popup-input-name'); // найти поле формы ввода данных "Как тебя зовут?"
const descriptionInput = profileEditForm.querySelector('#popup-input-description'); // найти поле формы ввода данных "Кто ты по жизни?"
const profileName = document.querySelector('.profile__name'); // найти, куда вставить значение поля формы ввода данных "Как тебя зовут?"
const profileDescription = document.querySelector('.profile__description'); // найти, куда вставить значение поля формы ввода данных "Кто ты по жизни?"
const profileEditSubmitButton = document.querySelector('#popup-edit-submit'); // найти кнопку "Сохранить"

// объявить постоянные попапа добавления карточки
const cardAddButton = document.querySelector('.profile__button_add'); // найти кнопку добавления карточки
const popupCardAdd = document.querySelector('#popup-card-add'); // найти попап добавления карточки
const popupCardAddCloseButton = popupCardAdd.querySelector('#popup-card-add-close'); // найти кнопку закрытия попапа добавления карточки
const cardAddForm = popupCardAdd.querySelector('#card-add-form'); // найти форму для заполнения попапа добавления карточки
const placeNameInput = cardAddForm.querySelector('#popup-input-place'); // найти поле формы ввода данных "Название"
const placeImageLinkInput = cardAddForm.querySelector('#popup-input-place-image-link'); // найти поле формы ввода данных "Ссылка на картинку"
const cardAddSubmitButton = document.querySelector('#popup-card-submit'); // найти кнопку "Создать"

// объявить постоянные попапа просмотра карточки
const popupCardImage = document.querySelector('#popup-card-image'); // найти попап изображения карточки
const popupCardImageCloseButton = popupCardImage.querySelector('#close-popup-card-image'); // найти  кнопку закрытия попапа изображения карточки
const popupFigureImage = popupCardImage.querySelector('.popup__figure-image'); // найти изображение карточки
const popupFigureCaption = popupCardImage.querySelector('.popup__figure-caption'); // найти описание карточки

const cardsContainer = document.querySelector('.elements__list'); // найти список карточек
const cardTemplate = document.querySelector('#element-template'); // найти заготовку карточки
const popups = document.querySelectorAll('.popup');

// открыть попап
function openPopup (popup) {
  popup.classList.add('popup__opened');
  document.addEventListener('keydown', closePopupByEsc);
};

// закрыть попап
function closePopup (popup) {
  popup.classList.remove('popup__opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

// закрыть любой попап нажатием по крестику и по оверлэю
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup__opened') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
});

// закрыть любой попап нажатием по клавише ESC
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__opened');
    closePopup(openedPopup);
  }
};

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
    popupFigureImage.src = card.link;
    popupFigureImage.alt = card.name;
    popupFigureCaption.textContent = card.name;
    openPopup(popupCardImage);
  });
    return cardItem;
}

// рендеринг карточек
const renderCard = card => cardsContainer.prepend(card);

// добавить первоначальные карточки
initialCards.forEach(card => renderCard(initiateCard(card)));

// открыть попап редактирования профайла
function openPopupProfileEdit() {
  openPopup(popupProfileEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearInputError(config, profileEditForm);
  toggleSubmitButton(config, profileEditForm, profileEditSubmitButton);
}

// редактировать профайл
function editProfileFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfileEdit);
}

// открыть попап добавления своей карточки
function openPopupCardAdd() {
  openPopup(popupCardAdd);
  cardAddForm.reset();
  clearInputError(config, cardAddForm);
  toggleSubmitButton(config, cardAddForm, cardAddSubmitButton);
}

// добавить свою карточку
function addCardFormSubmitHandler (evt) {
  evt.preventDefault();
  const сard = {name: placeNameInput.value, link: placeImageLinkInput.value};
  renderCard(initiateCard(сard));
  closePopup(popupCardAdd);
}

// слушать события
profileEditButton.addEventListener('click', openPopupProfileEdit);
profileEditForm.addEventListener('submit', editProfileFormSubmitHandler);
cardAddButton.addEventListener('click', openPopupCardAdd);
cardAddForm.addEventListener('submit', addCardFormSubmitHandler);