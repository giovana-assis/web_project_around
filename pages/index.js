import Card from "./Card.js"

const openFormButton = document.querySelector(".edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close");
const addFormButton = document.querySelector(".add-button");
const popupCard = document.querySelector(".popup-card");
const popupAdd = popupCard.querySelector(".popup");
const closeButtonCard = popupCard.querySelector(".popup__close");

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

const popUpPhoto = document.querySelector("#popup-photo");

const openImage = (card) => {
  console.log("1")
  popUpPhoto.classList.add("popup-visible");
  popUpPhoto.querySelector(".popup__image").setAttribute("src", card.link);
  popUpPhoto.querySelector(".popup__place").textContent = card.name;
}

const closeImage = () => {
  popUpPhoto.classList.remove("popup-visible");
};
popUpPhoto.querySelector(".popup__close").addEventListener("click", closeImage);

// const cards = Array.from(document.querySelectorAll(".card"))
// const cardElement = cards.forEach((cardElement) => {
//   cardElement.addEventListener("click", () => {console.log(cardElement)})})

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
  const container = document.querySelector(".cards-container");

const renderCard = (name, link) => {
  const card = new Card(name, link, "#template");
  container.prepend(card.generateCard());
  }

initialCards.forEach((card) => {
renderCard(card.name, card.link)
// container.append(card)   COMO COLOCAR NA ORDEM CERTA?

})
  
const inputPlace = popupCard.querySelector(".popup__name");
const inputLink = popupCard.querySelector(".popup__detail");
const cardForm = document.forms.form__card;
const addCard = (e) => {
  e.preventDefault();

  const newCard = {
    name: inputPlace.value,
    link: inputLink.value
  }
  renderCard(newCard.name, newCard.link);
  closePopupCard()
}

cardForm.addEventListener("submit", addCard);


function addPopupCard() {
  popupAdd.classList.add("popup-visible");
}

function closePopupCard() {
  popupAdd.classList.remove("popup-visible");
}

addFormButton.addEventListener("click", addPopupCard);
closeButtonCard.addEventListener("click", closePopupCard);

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
