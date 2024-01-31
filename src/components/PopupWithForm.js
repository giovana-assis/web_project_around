import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitCallback, popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitCallback = submitCallback;
    this._buttonValue = this._popup.querySelector(".popup__save").value;
    this.setEventListeners();
  }

  _getInputValues() {
    const formData = new FormData(this._form);
    const dataObject = Object.fromEntries(formData.entries());
    return dataObject;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popup.querySelector(".popup__save").textContent = "Saving...";
    } else {
      this._popup.querySelector(".popup__save").value = this._buttonValue;
    }
  }

  setSubmitAction(action) {
    this._submitCallback = action;
  }
}
