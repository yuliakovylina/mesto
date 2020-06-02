const popup = document.querySelector(".popup");
const button = document.querySelector(".profile__small-button"); 
const close = document.querySelector(".popup__button-close");
const formElement = popup.querySelector(".form");
const nameInput = formElement.querySelector(".form__input_name"); 
const jobInput = formElement.querySelector(".form__input_profession");
const profileTitle = document.querySelector(".profile__title"); 
const profileSubtitle = document.querySelector(".profile__subtitle");

function popupOpened() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent
    jobInput.value = profileSubtitle.textContent
    
}

function closePopup(){
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup()
}

button.addEventListener('click', popupOpened);
close.addEventListener('click', closePopup);
formElement.addEventListener ('submit', formSubmitHandler);


