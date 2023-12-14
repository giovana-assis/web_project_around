import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { config } from "./enums/Config.js";
import { initialCards } from "./enums/InitialCards.js";

const container = document.querySelector(".cards-container");

const renderCard = (name, link) => {
  const card = new Card(name, link, "#template");
  container.prepend(card.generateCard());
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

export { renderCard };
