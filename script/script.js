const popup = document.querySelector(".popup"); //нашли модальное окно
const button = document.querySelector(".profile__small-button"); //нашли кнопку редактирования профиля
const close = document.querySelector(".popup__button-close");//нашли кнопку закрытия профиля
const formElement = popup.querySelector(".form"); //нашли форму
const formElementPic = document.querySelector(".form_pic");
const formSubmit = popup.querySelector('.form__save'); //форма - нашли кнопку сохранить/создать
const nameInput = formElement.querySelector(".form__input_name"); //форма - нашли поле ввода имени пользователя
const jobInput = formElement.querySelector(".form__input_profession");//форма - нашли поле ввода рода деятельности пользователя
const placeInput = document.querySelector(".form__input_place");
const linkInput = document.querySelector(".form__input_link");
const profileTitle = document.querySelector(".profile__title");  
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupPicture = document.querySelector(".popup_picture");//находим попап добавления картинок
const mainButton = document.querySelector(".profile__button");// находим кнопку добавления картинки*кнопка-плюс*
const closePic = document.querySelector(".popup__button-close_pic"); // нашли кнопку закрытия попапа с картинками
const elementsContainer = document.querySelector(".elements");//нашли контейнер, в который будем добавлять карточки
const cardTemplate = document.querySelector('.card-template').content; //нашли темплейт, в котором будем работать
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
function cloneCard(name, link) {
  const card = cardTemplate.cloneNode(true);//клонируем темплейт, в котором будем работать
  const cardName = card.querySelector('.card__name'); //присываиваем название
  cardName.textContent = name;
  const cardLink = card.querySelector('.card__image');//присваиваем ссылкe
  cardLink.src = link;
 
  card.querySelector('.card__like').addEventListener('click', toggleLike);
  card.querySelector('.card__delete').addEventListener('click', cardRemove);
  cardLink.addEventListener('click', function (evt) {
    bigPicturePopup.classList.toggle('popup_opened');
    bigPicture.src = link;
    bigPictureName.textContent = name;
  });
  
  elementsContainer.prepend(card);//добавляем контейнер в DOM

}

//перебираем содержимое массива
initialCards.forEach(function (item) { 
  cloneCard(item.name, item.link);
})

//функция открытия попапа добавления карточек
function popupPictureAdd() {
  popupPicture.classList.add('popup_opened');
  placeInput.value = "";
  linkInput.value = "";
  
}

//закрываем попап добавления карточки
function closePicturePopup() {
  popupPicture.classList.remove('popup_opened');
}

const buttonLike = document.querySelectorAll('.card__like');

//меняем свойство кнопки like
function toggleLike(evt) {
        evt.target.classList.toggle('card__like_clicked');
  }

function addListener(elem) {
  elem.addEventListener('click', toggleLike);
}
buttonLike.forEach(addListener); 

//функция удаления карточки
function cardRemove(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

//добавляем новую карточку
function formSubmitPictureAdd(evt) {
  evt.preventDefault();
  
  const nameInput = document.querySelector('.form__input_place').value;
  const linkInput = document.querySelector('.form__input_link').value;
  
  cloneCard(nameInput, linkInput);
  closePicturePopup();
}

//функция закрытия большого попапа
function bigPopupClose() {
  bigPicturePopup.classList.toggle('popup_opened');
}

function popupOpened() { //функция открытия/эакрытия попапа
    popup.classList.add('popup_opened'); //добавляет/удаляет .popup_opened
    nameInput.value = profileTitle.textContent //заполняет поля формы ранее заданными значениями
    jobInput.value = profileSubtitle.textContent
    
}

//закрытие попапа *редактирование профиля*
function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup()
  //нажимаем на "сохранить", данные из формы сохраняются в заголовки, попап закрывается
}

button.addEventListener('click', popupOpened);//вешаем слушатель на кнопку открытия попапа
close.addEventListener('click', closePopup);//вешаем слушатель на кнопку закрытия попапа
formElement.addEventListener('submit', formSubmitHandler);// вешаем слушатель на кнопку сохранить
                                                            // и она закрывается *submit*Я НЕ МОГУ ПОНЯТЬ ЧТО Я СДЕЛАЛА
mainButton.addEventListener('click', popupPictureAdd);//слушатель на кнопку плюс, открываем форму создания карточки    
closePic.addEventListener('click', closePicturePopup); //нажимаем на крестик формы создания карточки-закрываем форму
formElementPic.addEventListener('submit',formSubmitPictureAdd );                                        
bigPictureCloseButton.addEventListener('click', bigPopupClose);
 
  

  
 