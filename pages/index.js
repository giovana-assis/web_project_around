const openFormButton = document.querySelector(".edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close");

function addPopup() {
  popup.classList.add("popup-visible");
}

function closePopup() {
  popup.classList.remove("popup-visible");
}

openFormButton.addEventListener("click", addPopup);
closeButton.addEventListener("click", closePopup);

const profileName = document.querySelector(".profile__name");
const profileDetail = document.querySelector(".profile__detail");

const inputName = document.querySelector(".popup__name");
const inputDetail = document.querySelector(".popup__detail");
const formProfile = document.forms.form_profile;

function changeProfile(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDetail.textContent = inputDetail.value;
  closePopup();
}
formProfile.addEventListener("submit", changeProfile);

function createCard(card) {
  const cardTemplate = document.querySelector("#template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete");
  const likeButton = cardElement.querySelector(".card__heart");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = card.name;
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  cardImage.addEventListener("click", () => openImage(card));
  deleteButton.addEventListener("click", () => {
    deleteButton.parentElement.remove();
  });
  likeButton.classList.remove("card__heart-active");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__heart-active");
  });
  return cardElement;
}

const popUpPhoto = document.querySelector("#popup-photo");
function openImage(card) {
  popUpPhoto.classList.add("popup-visible");
  popUpPhoto.querySelector(".popup__image").setAttribute("src", card.link);
  popUpPhoto.querySelector(".popup__place").textContent = card.name;
}

const closeImage = () => {
  popUpPhoto.classList.remove("popup-visible");
};
popUpPhoto.querySelector(".popup__close").addEventListener("click", closeImage);

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

const container = document.querySelector(".cards");
for (const cards of initialCards) {
  const card = createCard(cards);
  container.append(card);
}

const addFormButton = document.querySelector(".add-button");
const popupCard = document.querySelector(".popup-card");
const popupAdd = popupCard.querySelector(".popup");
const closeButtonCard = popupCard.querySelector(".popup__close");

function addPopupCard() {
  popupAdd.classList.add("popup-visible");
}

function closePopupCard() {
  popupAdd.classList.remove("popup-visible");
}

addFormButton.addEventListener("click", addPopupCard);
closeButtonCard.addEventListener("click", closePopupCard);
const cardForm = document.forms.form__card;
const inputPlace = popupCard.querySelector(".popup__name");
const inputLink = popupCard.querySelector(".popup__detail");

function addNewCard(e) {
  e.preventDefault();

  const card = createCard({
    name: inputPlace.value,
    link: inputLink.value,
  });
  container.prepend(card);
  closePopupCard();
}

cardForm.addEventListener("submit", addNewCard);

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
