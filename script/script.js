const popup = document.querySelector(".popup");
const button = document.querySelector(".profile__small-button"); 
const close = document.querySelector(".popup__button-close");
const formElement = popup.querySelector(".form");
const nameInput = formElement.querySelector(".form__name"); 
const jobInput = document.querySelector(".form__profession");
const profileTitle = document.querySelector(".profile__title"); 
const profileSubtitle = document.querySelector(".profile__subtitle");

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


