export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add("popup-visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup-visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
      const buttonClose = this._popup.querySelector(".popup__close");
    }
  };

  setEventListeners() {
    const buttonClose = this._popup.querySelector(".popup__close");
    const popupWrapper = this._popup.querySelector(".popup__wrapper");
    buttonClose.addEventListener("click", this.close);
    document.addEventListener("click", (evt) => {
      if (evt.target === popupWrapper) {
        this.close();
      }
    });
  }
}
