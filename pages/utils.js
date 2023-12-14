import { renderCard } from "./index.js";

const openFormButton = document.querySelector(".edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close");
const addFormButton = document.querySelector(".add-button");
const popupCard = document.querySelector(".popup-card");
const popupAdd = popupCard.querySelector(".popup");
const closeButtonCard = popupCard.querySelector(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileDetail = document.querySelector(".profile__detail");
const inputName = document.querySelector(".popup__name");
const inputDetail = document.querySelector(".popup__detail");
const inputPlace = popupCard.querySelector(".popup__name");
const inputLink = popupCard.querySelector(".popup__detail");
const formProfile = document.forms.form_profile;
const cardForm = document.forms.form__card;

//  Abrir e fechar pop-up de perfil
function addPopup() {
  popup.classList.add("popup-visible");
}

function closePopup() {
  popup.classList.remove("popup-visible");
}

openFormButton.addEventListener("click", addPopup);
closeButton.addEventListener("click", closePopup);

//   Alterar o perfil
function changeProfile(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDetail.textContent = inputDetail.value;
  formProfile.reset();
  closePopup();
}
formProfile.addEventListener("submit", changeProfile);

// Abrir e fechar pop-up do cartão
function addPopupCard() {
  popupAdd.classList.add("popup-visible");
}

function closePopupCard() {
  popupAdd.classList.remove("popup-visible");
}

addFormButton.addEventListener("click", addPopupCard);
closeButtonCard.addEventListener("click", closePopupCard);

// Fechar pop-up imagem

const popUpPhoto = document.querySelector("#popup-photo");
const closeImage = () => {
  popUpPhoto.classList.remove("popup-visible");
};

popUpPhoto.querySelector(".popup__close").addEventListener("click", closeImage);

// Fechar pop-ups com Esc ou clique

const closePopupEsc = (e) => {
  if (e.key === "Escape") {
    closePopup();
    closePopupCard();
    closeImage();
  }
  e.target.removeEventListener("keydown", closePopup);
};
document.addEventListener("keydown", closePopupEsc);

document.addEventListener("click", (e) => {
  const popupWrapper = Array.from(document.querySelectorAll(".popup__wrapper"));
  popupWrapper.forEach((wrapperElement) => {
    if (e.target === wrapperElement) {
      closePopup();
      closePopupCard();
      closeImage();
    }
  });
});

// Editar pop-up do cartão

const addCard = (e) => {
  e.preventDefault();

  const newCard = {
    name: inputPlace.value,
    link: inputLink.value,
  };
  renderCard(newCard.name, newCard.link);
  cardForm.reset();
  closePopupCard();
};

cardForm.addEventListener("submit", addCard);
