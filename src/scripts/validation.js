export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}


const showInputError = (formEl, inputEl, errorMsg, config) => {
  // const errorMsgID = inputEl.id + "-error"; refactor below
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
}

const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
}


const checkInputValidity = (formEl, inputEl, config) => {
  console.log(inputEl.validationMessage)
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

export const toggleButtonState = (inputList, buttonEl, config) => {
  hasInvalidInput(inputList);
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
    buttonEl.classList.add(config.inactiveButtonClass);
  } else {
    buttonEl.classList.remove(config.inactiveButtonClass);
    buttonEl.disabled = false;
  }
}

export const disableButton = (buttonEl, config) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
}

// OPTIONAL
export const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, config);
  });
}


export const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);


  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl)  => {
    setEventListeners(formEl, config);
  })
}

// enableValidation(settings);