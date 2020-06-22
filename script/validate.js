const formSelectors = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_inactive",
    inputErrorClass: "form__input_error",
    errorClass: "form__input-error_active",
};
  
const hideInputError = (formElement, inputElement, formSelectors) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(formSelectors.inputErrorClass);
    errorElement.classList.remove(formSelectors.errorClass);
    errorElement.textContent = "";
};
  
const showInputError = (formElement, inputElement, errorMessage, formSelectors) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
    inputElement.classList.add(formSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formSelectors.errorClass);
};
  
const checkInputValidity = (formElement, inputElement, formSelectors) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formSelectors);
    } else {
      hideInputError(formElement, inputElement, formSelectors);
    }
};
  
const hasInvalidInput = (inputList) => {
  return inputList.every((inputElement) => {
      return inputElement.validity.valid;
  });
};
  
const toggleButtonState = (inputList, buttonElement, formSelectors) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку активной
    buttonElement.classList.remove(formSelectors.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    // иначе сделай кнопку неактивной
    buttonElement.classList.add(formSelectors.inactiveButtonClass);
    buttonElement.disabled = true;
  }
};
  
const setEventListeners = (formElement, formSelectors) => {
  const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
  const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, formSelectors);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, formSelectors);
      toggleButtonState(inputList, buttonElement, formSelectors);
    });
  });
};
  
const enableValidation = (formSelectors) => {
  const formList = Array.from(document.querySelectorAll(formSelectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, formSelectors);
  });
};

enableValidation(formSelectors);
  

