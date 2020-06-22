//нашли модальное окно
const popupProfile = document.querySelector('.popup_profile'); 
//нашли кнопку редактирования профиля
const editProfileButton = document.querySelector(".profile__small-button");
//нашли кнопку закрытия профиля
const closePopupButton = document.querySelector(".popup__button-close_profile");
//нашли форму
const editProfileForm = popupProfile.querySelector(".form_edit");
const addPictureForm = document.querySelector(".form_pic");
//форма - нашли поле ввода имени пользователя
const nameInput = editProfileForm.querySelector(".form__input_name");
//форма - нашли поле ввода рода деятельности пользователя
const jobInput = editProfileForm.querySelector(".form__input_profession");
const placeInput = document.querySelector(".form__input_place");
const linkInput = document.querySelector(".form__input_link");
const profileTitle = document.querySelector(".profile__title");  
const profileSubtitle = document.querySelector(".profile__subtitle");
//находим попап добавления картинок
const popupPicture = document.querySelector(".popup_cards");
// находим кнопку добавления картинки*кнопка-плюс*
const plusButton = document.querySelector(".profile__button");
// нашли кнопку закрытия попапа с картинками
const closePictureButton = document.querySelector(".popup__button-close_pic");
//нашли контейнер, в который будем добавлять карточки 
const elementsContainer = document.querySelector(".elements");
//нашли темплейт, в котором будем работать  
const cardTemplate = document.querySelector('.card-template').content;
const bigPicturePopup = document.getElementById('picture-large');
const bigPicture = document.querySelector('.popup__item');
const bigPictureName = document.querySelector('.popup__name');
const bigPictureCloseButton = document.querySelector('.popup__button-close_enlarge');
const errorPlace = document.getElementById("name-place-error"); //ошибки инпутов
const errorUrl = document.getElementById("link-place-error");
const errorName = document.getElementById("name-input-error");
const errorProfession = document.getElementById("profession-error");
const popups = Array.from(document.querySelectorAll(".popup"));

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

//добавляем карточки из массива на страницу
function addCard(name, link) {
  //клонируем темплейт, в котором будем работать
  const card = cardTemplate.cloneNode(true);
  //присваиваем название
  const cardName = card.querySelector('.card__name');
  cardName.textContent = name;
  //присваиваем ссылку
  const cardLink = card.querySelector('.card__image');
  cardLink.src = link;
  cardLink.alt = name;
  
  card.querySelector('.card__like').addEventListener('click', toggleLike);
  card.querySelector('.card__delete').addEventListener('click', removeCard);
  card.querySelector('.card__picture').addEventListener('click', bigPicturePopupOpenClose);

  return card;
}

//перебираем содержимое массива
initialCards.forEach(function(item) { 
  elementsContainer.prepend(addCard(item.name, item.link));
});

//функция открытия попапа добавления карточек
function openClosePictureHandler() {
  placeInput.value = "";
  linkInput.value = "";
  if (
    errorPlace.classList.contains(formSelectors.errorClass) || 
    errorUrl.classList.contains(formSelectors.errorClass)
  ) {
    resetFormInputValues(elem);
    togglePopup(popupPicture);
  } else {
    togglePopup(popupPicture);
  }
}

//меняем свойство кнопки like
function toggleLike(evt) {
  evt.target.classList.toggle('card__like_clicked');
}

//функция удаления карточки
function removeCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

//добавляем новую карточку
function formSubmitPictureAdd(evt) {
  evt.preventDefault();
  elementsContainer.prepend(addCard(placeInput.value, linkInput.value));
  closePopup(popupPicture);
}

//функция открытия/закрытия большого попапа с картинкой
function bigPicturePopupOpenClose (evt) {
  const item = evt.target;
  bigPicture.src = item.src;
  bigPictureName.textContent = item.alt; 
  bigPictureName.alt = name;  
  togglePopup(bigPicturePopup); 
}

//открытие модального окна
function togglePopup(elem) {
  elem.classList.toggle('popup_opened');
  setEscapeAndClickListener(elem);
}

//закрытие модального окна через кнопку-крестик
function closePopup(){
 // removeEscapeAndClickListener(elem);
  document.querySelector('.popup_opened').classList.remove('popup_opened');
}

//открытие/закрытие попапа-редактирования профиля
function openProfileForm(elem) {
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileSubtitle.textContent;
  if (errorName.classList.contains(formSelectors.errorClass) || 
      errorProfession.classList.contains(formSelectors.errorClass)) {
        removeEscapeAndClickListener(elem);
        closePopup(popupProfile);

      } else {
        togglePopup(popupProfile);
      }
  //togglePopup(popupProfile);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
  //нажимаем на "сохранить", данные из формы сохраняются в заголовки, попап закрывается
}

//function clickAndEscapeListeners(elem) {
  //document.addEventListener('keydown', function (evt) {
    //if (evt.key === "Escape") {
      //elem.classList.remove('popup_opened');
    //}
  //}, {once: true}
  //);
  //elem.addEventListener('click', (evt) => {
    //if (evt.target.classList.contains('popup_opened')) {
      //elem.classList.remove('popup_opened');
    //}
 // });
//}

function clickClose(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function escClose(evt) {
  if (evt.key ==="Escape") {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  }
}

function setEscapeAndClickListener(elem) {
  document.addEventListener("keydown", escClose);
  elem.addEventListener("click", clickClose);
}

function removeEscapeAndClickListener(elem) {
  document.removeEventListener("keydown", escClose);
  elem.removeEventListener("click", clickClose);
}

function resetFormInputValues(elem) {
  const form = elem.querySelector(formSelectors.formSelector);
  const formInputs = Array.from(
    form.querySelectorAll(formSelectors.inputSelector)
  );
  formInputs.forEach((formInput) => {
    hideInputError(form, formInput, formSelectors);
  });
}

//вешаем слушатель на кнопки и другие элементы открытия/закрытия
editProfileButton.addEventListener('click', openProfileForm);
closePopupButton.addEventListener('click', closePopup);
editProfileForm.addEventListener('submit', formSubmitHandler);                                                           
plusButton.addEventListener('click', openClosePictureHandler);    
closePictureButton.addEventListener('click', closePopup); 
addPictureForm.addEventListener('submit',formSubmitPictureAdd );                                        
bigPictureCloseButton.addEventListener('click', closePopup);
 
  

  
 