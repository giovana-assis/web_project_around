import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitCallback, popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitCallback = submitCallback;
    this._button = this._popup.querySelector(".popup__save");
    this.setEventListeners();
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll(".popup__input");

    const values = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.renderLoading(true);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Salvando...";
    } else {
      this._button.setAttribute("disabled", "");
      this._button.classList.add("popup__save-disabled");
      this._button.textContent = "Salvar";
    }
  }
}
