import "./blocks/index.css";

import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import { config } from "./components/enums/Config.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import {
  addFormButton,
  openFormButton,
  formProfile,
  cardForm
} from "./components/enums/constants.js";
import API from "./components/API.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";

const api = new API({
  baseURL: "https://around.nomoreparties.co/v1/web_ptbr_08",
  headers: {
    authorization: "c33edda4-44b3-4b31-9ef9-67d7dfcdfd71",
    "Content-Type": "application/json",
  },
});

const popupWithImage = new PopupWithImage("#popup-photo");

api
  .getInitialCards()
  .then((initialCards) => {
    const section = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const card = new Card(
            item,
            "#template",
            {
          handleCardClick: () => {
            popupWithImage.open(item.name, item.link);
          },
          handleDeleteClick: () => {
            deleteFormElement.open(card);
          },
          handleLikeClick: (LikeButtonIsActive, cardId, likeCounter) => {
            api.updateLike(LikeButtonIsActive, cardId).then((result) => {
              likeCounter.textContent = result.likes.length;
            });
          },

        });
          return card.generateCard();
        },
      },
      ".cards-container"
    );
    section.renderInitialCards();
    const popupCard = new PopupWithForm({
      submitCallback: (item) => {
        api.createCard(item).then((createCard) => {
          section.addItem(createCard);
        });
      },
      popupSelector: ".popup-card",
    });
    addFormButton.addEventListener("click", () => {
      popupCard.open();
    });
  })
  .catch((err) => {
    console.log(err); // registra o erro no console
  });

const deleteFormElement = new PopupWithConfirmation ({
  popupSelector: ".popup-delete",
  handleFormSubmit: (card) => {
    console.log(card)
    return api.deleteCard(card._cardId) // Card ID undefined
    .then(() => {
      card.removeCard()
    })
    .catch((err) => {
      console.log(err)
    })
  }
});

deleteFormElement.setEventListeners();



const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__about",
  // avatar: avatar,
  // userId: _id,
});

api
  .getUserProfile()
  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo(name, about, avatar);
  })
  .catch((err) => {
    console.log(err);
  });

const popupForm = new PopupWithForm({
  submitCallback: ({ name, about }) => {
    api
    .setUserProfile({ name, about })
    userInfo.setUserInfo(name, about);
  },
  popupSelector: ".popup-profile"
});

openFormButton.addEventListener("click", () => {
    const { name, about } = userInfo.getUserInfo();
    popupForm.open();
});

const formProfileValidator = new FormValidator(config, formProfile);
const cardFormValidator = new FormValidator(config, cardForm);

formProfileValidator.enableValidation();
cardFormValidator.enableValidation();
