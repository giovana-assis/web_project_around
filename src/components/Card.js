class Card {
  constructor(
    { name, link, likes, _id, owner },
    cardTemplate,
    { handleCardClick, handleDeleteClick, handleLikeClick },
    cardId
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._cardId = cardId;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__like-counter").textContent =
      this._likes.length;

    const trashDeleteOwner = () => {
      const myId = "94395b635080f2dd73235768";
      if (this._owner._id === myId) {
        this._element
          .querySelector(".card__delete")
          .classList.remove("card__delete-hidden");
        return true;
      }
    };
    trashDeleteOwner();

    if (this.isLiked()) {
      const likeButton = this._element.querySelector(".card__heart");
      likeButton.classList.add("card__heart-active");
    }

    return this._element;
  }

  isLiked() {
    const myId = "94395b635080f2dd73235768";

    return this._likes.find((res) => res._id === myId);
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });
    this._element
      .querySelector(".card__heart")
      .addEventListener("click", () => {
        this._likeCard();
      });
  }

  removeCard() {
    this._element.remove();
  }

  _likeCard() {
    const likeButtonIsActive = this._element
      .querySelector(".card__heart")
      .classList.contains("card__heart-active");
    this._handleLikeClick(
      likeButtonIsActive,
      this._id,
      this._element.querySelector(".card__like-counter")
    );
    const heart = this._element.querySelector(".card__heart");
    heart.classList.toggle("card__heart-active");
  }
}

export default Card;
