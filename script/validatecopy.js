enableValidation({ 
    formSelector: '.form', 
    inputSelector: '.form__input', 
    submitButtonSelector: '.form__save', 
    inactiveButtonClass: 'form__save_inactive', 
    inputErrorClass: 'form__input_error', 
    errorClass: 'form__input-error_active' 
  }); 

const formElements = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input'); 

  //функция, которая добавляет класс с ошибкой
const showInputError = (element) => {
    element.classList.add('form__input_error');
};

//функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
    element.classList.remove('form__input_error');
};

//функция, которая проверяет валидность поля
const isValid = () => {
    if (!formInput.validity.valid) {
        //если поле не проходит валидацию покажем ошибку
        showInputError(formInput);
    } else {
        //если походит то скроем
        hideInputError(formInput);
    }
};

formElement.addEventListener('submit', function (evt) {
    //отменим стандартное поведение по сабмиту
    evt.preventDefault();
});

//вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid);

