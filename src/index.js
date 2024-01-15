import "./blocks/index.css";

import FormValidator from "./pages/FormValidator.js";
import Card from "./pages/Card.js";
import { config } from "./pages/enums/Config.js";
import { initialCards } from "./pages/enums/InitialCards.js";
import PopupWithForm from "./pages/PopupWithForm.js";
import PopupWithImage from "./pages/PopupWithImage.js";
import Section from "./pages/Section.js";
import UserInfo from "./pages/UserInfo.js";
import {
  addFormButton,
  openFormButton,
  inputName,
  inputDetail,
  formProfile,
  cardForm,
} from "./pages/enums/constants.js";

const popupWithImage = new PopupWithImage("#popup-photo");

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#template", () => {
        popupWithImage.open(item.name, item.link);
      });
      return card.generateCard();
    },
  },
  ".cards-container"
);

section.renderInitialCards();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  detailSelector: ".profile__detail",
});

const popupForm = new PopupWithForm({
  popupSelector: ".popup-profile",
  submitCallback: ({ name, detail }) => {
    userInfo.setUserInfo(name, detail);
  },
});
openFormButton.addEventListener("click", () => {
  const { name, detail } = userInfo.getUserInfo();
  inputName.value = name;
  inputDetail.value = detail;
  popupForm.open();
});

const popupCard = new PopupWithForm({
  submitCallback: section.addItem,
  popupSelector: ".popup-card",
});
addFormButton.addEventListener("click", () => {
  popupCard.open();
});

const formProfileValidator = new FormValidator(config, formProfile);
const cardFormValidator = new FormValidator(config, cardForm);

formProfileValidator.enableValidation();
cardFormValidator.enableValidation();
