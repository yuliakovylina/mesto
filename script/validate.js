
function enableValidation(options) { 
    //находим формы 
    const formElements = Array.from(document.querySelectorAll(options.formSelector)); 
    //для каждой формы находим ее элементы 
    formElements.forEach(formElement => { 
        //находим ее инпуты 
        const inputElement = Array.from(formElement.querySelectorAll(options.inputSelector)); 
        //находим сабмит 
        const submitButton = formElement.querySelector('.form__save'); 
 
        //для всех инпутов 
        inputElement.forEach(input => { 
            //проверка валидности инпута 
        input.addEventListener('input', e => handleInput(e, options.inputErrorClass)); 
        }) 
     
        formElement.addEventListener('submit', (evt) => preventDefault(evt));
        formElement.addEventListener('input', () => handleFormInput(formElement, submitButton));
}); 
} 

function handleFormInput(formElement, submitButton, inactiveButtonClass) {
    //обработка валидности кнопки сабмит
    const isFormValid = formElement.checkValidity();
    submitButton.disabled = !isFormValid;
    submitButton.classList.toggle(inactiveButtonClass, !isFormValid);
}
 
function handleInput(evt, options) { 
    const input = evt.target; 
    const error = document.querySelector(`#${input.id}-error`); 
    if (input.checkValidity()) { 
        input.classList.remove(options.inputErrorClass); 
        error.textContent = ''; 
    } else { 
        input.classList.add(options.inputErrorClass); 
        error.textContent = input.validationMessage; 
    } 
} 
 
enableValidation({ 
    formSelector: '.form', 
    inputSelector: '.form__input', 
    submitButtonSelector: '.form__save', 
    inactiveButtonClass: 'form__save_inactive', 
    inputErrorClass: 'form__input_error', 
    errorClass: 'form__input-error_active' 
  }); 