import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const config = {
  inputName: ".popup__name",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const popUpPhoto = document.querySelector("#popup-photo");

const closeImage = () => {
  popUpPhoto.classList.remove("popup-visible");
};

popUpPhoto.querySelector(".popup__close").addEventListener("click", closeImage);

const container = document.querySelector(".cards-container");

const renderCard = (name, link) => {
  const card = new Card(name, link, "#template");
  container.prepend(card.generateCard());
  const cardImage = document.querySelector(".card__image")

  cardImage.addEventListener("click", () => {
    popUpPhoto.classList.add("popup-visible");
    popUpPhoto.querySelector(".popup__image").src = link
    popUpPhoto.querySelector(".popup__place").textContent = name;
    })
};

initialCards.forEach((card) => {
  renderCard(card.name, card.link);
  container.append(card);
});



const formProfile = document.forms.form_profile;
const cardForm = document.forms.form__card;

const formProfileValidator = new FormValidator(config, formProfile);
const cardFormValidator = new FormValidator(config, cardForm);

formProfileValidator.enableValidation();
cardFormValidator.enableValidation();

export {renderCard, closeImage} 