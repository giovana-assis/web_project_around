import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    const buttonDeletePopup = this._popup.querySelector(".popup__save_delete");
    buttonDeletePopup.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._card).then(() => {
        this.close();
      });
    });
  }
}
