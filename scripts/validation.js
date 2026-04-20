const showInputError = (formEl, inputEl, errorMsg) => {
  // const errorMsgID = inputEl.id + "-error"; refactor below
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add("modal__input_type_error");
}

const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__input_type_error");
}


const checkInputValidity = (formEl, inputEl) => {
  console.log(inputEl.validationMessage)
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonEl) => {
  hasInvalidInput(inputList);
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl);
    buttonEl.classList.add("button_inactive");
  } else {
    buttonEl.classList.remove("button_inactive");
    buttonEl.disabled = false;
  }
}

const disableButton = (buttonEl) => {
  buttonEl.disabled = true;
  buttonEl.classList.add("button_inactive");
}

// OPTIONAL
const resetValidation = (formEl, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input);
  });
}


const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__save-btn");


  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl)  => {
    setEventListeners(formEl);
  })
}

enableValidation();