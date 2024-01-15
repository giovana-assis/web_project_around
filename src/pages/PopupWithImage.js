import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.setEventListeners();
  }
  open = (alt, src) => {
    super.open();

    const imagePopup = this._popup.querySelector(".popup__image");
    const imageTitle = this._popup.querySelector(".popup__place");
    imagePopup.src = src;
    imageTitle.alt = alt;
    imageTitle.textContent = alt;
  };
}
