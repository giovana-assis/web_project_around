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
  cardForm,
  buttonAvatar,
  avatarForm,
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
          const card = new Card(item, "#template", {
            handleCardClick: () => {
              popupWithImage.open(item.name, item.link);
            },
            handleDeleteClick: () => {
              const deleteFormElement = new PopupWithConfirmation({
                popupSelector: ".popup-delete",
                handleFormSubmit: (item) => {
                  return api
                    .deleteCard(item._id)
                    .then(() => {
                      card.removeCard();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                },
              });
              deleteFormElement.open(card);
              deleteFormElement.setEventListeners();
            },
            handleLikeClick: (LikeButtonIsActive, cardId, likeCounter) => {
              api.updateLike(LikeButtonIsActive, card._id).then((res) => {
                likeCounter.textContent = res.likes.length;
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
        api
          .createCard(item)
          .then((createCard) => {
            section.addItem(createCard);
          })
          .finally(() => popupCard.renderLoading(false));
      },
      popupSelector: ".popup-card",
    });
    addFormButton.addEventListener("click", () => {
      popupCard.open();
    });
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__about",
  avatar: ".profile__picture",
});

api
  .getUserProfile()
  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo(name, about);
    userInfo.setUserAvatar(avatar);
  })
  .catch((err) => {
    console.log(err);
  });

const popupAvatar = new PopupWithForm({
  submitCallback: ({ avatar }) => {
    api
      .setUserAvatar(avatar)
      .then(() => {
        userInfo.setUserAvatar(avatar);
        popupAvatar.close();
      })
      .finally(() => popupAvatar.renderLoading(false));
  },
  popupSelector: ".popup-avatar",
});

buttonAvatar.addEventListener("click", () => {
  popupAvatar.open();
});

const popupForm = new PopupWithForm({
  submitCallback: ({ name, about }) => {
    api
      .setUserProfile({ name, about })
      .then(() => {
        userInfo.setUserInfo(name, about);
      })
      .finally(() => popupForm.renderLoading(false));
  },
  popupSelector: ".popup-profile",
});

openFormButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  popupForm.open();
});

const formProfileValidator = new FormValidator(config, formProfile);
const cardFormValidator = new FormValidator(config, cardForm);
const avatarFormValidator = new FormValidator(config, avatarForm);

formProfileValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
