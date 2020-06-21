
function enableValidation(options) {
    //находим формы
    const formElements = Array.from(document.querySelectorAll(options.formSelector));
    //для каждой формы находим:
    formElements.forEach(formElement => {
        //находим ее инпуты
        const inputElement = Array.from(formElement.querySelectorAll(options.inputSelector));
        //находим сабмит
        const submitButton = formElement.querySelector('.form__save');

        //для всех инпутов
        inputElement.forEach(input => {
            //проверка валидности инпута
        input.addEventListener('input', e => handleInput(e, options.inputErrorClass))
        })
    
        formElement.addEventListener('input', () => handleFormInput(formElement, submitButton));
        formElement.addEventListener('submit', (evt) => preventDefault(evt));

        });
}

function handleFormInput(formElement, submitButton) {
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
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

function preventDefault(evt) {
    evt.preventDefault();
}

function resetError(form) {
    const errorSpan = Array.from(form.querySelectorAll('.form__input-error'));
    const inputElement = Array.from(form.querySelectorAll('.form__input'));
    errorSpan.forEach(everySpan => {
        everySpan.textContent = '';
    })
    inputElement.forEach(everyInput => {
        everyInput.classList.remove('form__input_inactive');
        everyInput.classList.remove('form__input-error_active');

    })
}
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save',
    inactiveButtonClass: 'form__save_inactive',
    inputErrorClass: 'form__input_error',
    errorClass: 'form__input-error_active'
  });
