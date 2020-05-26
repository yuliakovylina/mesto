let popup = document.querySelector(".popup");
let button = document.querySelector(".profile__small-button"); 
let close = document.querySelector(".popup__button-close");
let formElement = popup.querySelector(".form");
let nameInput = formElement.querySelector(".form__name"); 
let jobInput = document.querySelector(".form__profession");
let profileTitle = document.querySelector(".profile__title"); 
let profileSubtitle = document.querySelector(".profile__subtitle");

function popupOpened() {
    popup.classList.add('popup_opened');
    nameInput.textContent = profileTitle.textContent
    jobInput.textContent = profileSubtitle.textContent
}
button.addEventListener('click', popupOpened);

function closePopup(){
    popup.classList.remove('popup_opened');
}
close.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup()
}
formElement.addEventListener ('submit', formSubmitHandler);


