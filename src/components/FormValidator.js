class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._inputName = config.inputName;
    this._inputElement = config.inputElement;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formSelector.querySelector(
      `.${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        errorElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add("popup__save-disabled");
    } else {
      buttonElement.classList.remove("popup__save-disabled");
      buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formSelector.querySelector(
      this._submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formSelector.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }

}

export default FormValidator;
