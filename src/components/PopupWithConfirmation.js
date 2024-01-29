import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
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
    console.log(this._popup);
    const buttonDeletePopup = this._popup.querySelector(".popup__save");
    console.log(buttonDeletePopup);
    this._popup.addEventListener("click", (e) => {
      console.log("ok");
      e.preventDefault();
      this._handleFormSubmit(this._card).then(() => {
        this.close();
      });
    });
  }
}
