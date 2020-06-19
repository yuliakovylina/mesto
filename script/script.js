//нашли модальное окно
const popupProfile = document.querySelector('.popup_profile'); 
//нашли кнопку редактирования профиля
const buttonEditProfile = document.querySelector(".profile__small-button");
//нашли кнопку закрытия профиля
const close = document.querySelector(".popup__button-close");
//нашли форму
const formElement = popupProfile.querySelector(".form");
const formElementPic = document.querySelector(".form_pic");
//форма - нашли поле ввода имени пользователя
const nameInput = formElement.querySelector(".form__input_name");
//форма - нашли поле ввода рода деятельности пользователя
const jobInput = formElement.querySelector(".form__input_profession");
const placeInput = document.querySelector(".form__input_place");
const linkInput = document.querySelector(".form__input_link");
const profileTitle = document.querySelector(".profile__title");  
const profileSubtitle = document.querySelector(".profile__subtitle");
//находим попап добавления картинок
const popupPicture = document.querySelector(".popup_cards");
// находим кнопку добавления картинки*кнопка-плюс*
const mainButton = document.querySelector(".profile__button");
// нашли кнопку закрытия попапа с картинками
const closePic = document.querySelector(".popup__button-close_pic");
//нашли контейнер, в который будем добавлять карточки 
const elementsContainer = document.querySelector(".elements");
//нашли темплейт, в котором будем работать  
const cardTemplate = document.querySelector('.card-template').content;
const bigPicturePopup = document.getElementById('picture-large');
const bigPicture = document.querySelector('.popup__item');
const bigPictureName = document.querySelector('.popup__name');
const bigPictureCloseButton = document.querySelector('.popup__button-close_enlarge');
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
  card.querySelector('.card__delete').addEventListener('click', cardRemove);
  card.querySelector('.card__picture').addEventListener('click', bigPicturePopupOpenClose);
  //cardLink.addEventListener('click', bigPicturePopupOpenClose);

  return card;
}

//перебираем содержимое массива
initialCards.forEach(function(item) { 
  elementsContainer.prepend(addCard(item.name, item.link));
})

//функция открытия попапа добавления карточек
function popupPictureAddRemove() {
  placeInput.value = "";
  linkInput.value = "";
  togglePopup(popupPicture); 
}

//меняем свойство кнопки like
function toggleLike(evt) {
  evt.target.classList.toggle('card__like_clicked');
}

//функция удаления карточки
function cardRemove(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

//добавляем новую карточку
function formSubmitPictureAdd(evt) {
  evt.preventDefault();
  elementsContainer.prepend(addCard(placeInput.value, linkInput.value));
  togglePopup(popupPicture);
}

//функция открытия/закрытия большого попапа с картинкой
function bigPicturePopupOpenClose (evt) {
  const item = evt.target;
  bigPicture.src = item.src;
  bigPictureName.textContent = item.alt; 
  console.log(name);
  bigPictureName.alt = name; 
  togglePopup(bigPicturePopup); 
}

//открытие модального окна
function togglePopup(elem) {
  elem.classList.toggle('popup_opened');
  clickAndEscape(elem);
}

//открытие/закрытие попапа-редактирования профиля
function popupProfileOpened() {
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileSubtitle.textContent;
  togglePopup(popupProfile);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  togglePopup(popupProfile);
  //нажимаем на "сохранить", данные из формы сохраняются в заголовки, попап закрывается
}

function clickAndEscape(elem) {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === "Escape") {
      elem.classList.remove('popup_opened');
    }
  }, {once: true}
  );
  elem.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      elem.classList.remove('popup_opened');
    }
  });
}

//вешаем слушатель на кнопки и другие элементы открытия/закрытия
buttonEditProfile.addEventListener('click', popupProfileOpened);
close.addEventListener('click', () => togglePopup(popupProfile));
formElement.addEventListener('submit', formSubmitHandler);                                                           
mainButton.addEventListener('click', popupPictureAddRemove);    
closePic.addEventListener('click', () => togglePopup(popupPicture)); 
formElementPic.addEventListener('submit',formSubmitPictureAdd );                                        
bigPictureCloseButton.addEventListener('click', () => togglePopup(bigPicturePopup));
 
  

  
 