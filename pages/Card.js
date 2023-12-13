class Card {
  constructor(name, link, cardTemplate) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".card__heart")
      .addEventListener("click", () => {
        this._likeCard();
      });

  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element
      .querySelector(".card__heart")  
      .classList.add("card__heart-active");
  }

}

export default Card;
