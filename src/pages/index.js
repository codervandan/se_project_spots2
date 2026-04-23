import "../pages/index.css";
import { enableValidation, settings, toggleButtonState, disableButton, resetValidation, setEventListeners } from "../scripts/validation.js";
import Api from "../utils/Api.js";

// ARRAY OF OBJECTS
// const initialCards = [
//   {
//     name: "Landscape Image",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morninig light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   }
// ];

// DOM SELECTORS
const editProfileBtn = document.querySelector(".profile__edit-btn")
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileFormEl = editProfileModal.querySelector(".modal__form");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostSaveBtn = newPostModal.querySelector(".modal__save-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostFormEl = newPostModal.querySelector(".modal__form");


const cardImageInput = newPostModal.querySelector("#card-image-input");
const cardCaptionInput = newPostModal.querySelector("#card-caption-input");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardSubmitBtn = newPostModal.querySelector(".modal__save-btn");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewNameEl = previewModal.querySelector(".modal__caption");

const avatarEditBtn = document.querySelector(".profile__avatar-edit-btn");
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#avatar-input");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const profileAvatarEl = document.querySelector(".profile__avatar");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");

// INSTANTIATE CLASS
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/",
  headers: {
    authorization: "b305640e-0dfd-4073-a50a-45aaa9f07108", // Replace with your actual token
    "Content-Type": "application/json"
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // set profile
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;

    profileAvatarEl.src = userData.avatar;

    // render cards
    cards.forEach(card => {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);


// OPTIONAL POPUP


function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  api.deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
  }


avatarEditBtn.addEventListener("click", () => {
  avatarInput.value = "";
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  api.updateAvatar({
    avatar: avatarInput.value
  })
  .then((userData) => {
    profileAvatarEl.src = userData.avatar;
    closeModal(avatarModal);
  })
  .catch(console.error);
});



editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);

let selectedCard;
let selectedCardId;

newPostFormEl.addEventListener("submit", function(evt) {
  evt.preventDefault();

  api.addCard({
    name: cardCaptionInput.value,
    link: cardImageInput.value
  })
  .then((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsList.prepend(cardElement);
    evt.target.reset();
    closeModal(newPostModal);
  })
  .catch(console.error);
});

// EVENT LISTENERS
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  // OPTIONAL
  resetValidation(editProfileFormEl, [editProfileNameInput, editProfileDescriptionInput], settings);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function() {
  openModal(newPostModal);
});

newPostSaveBtn.addEventListener("click", function() {
  closeModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function() {
  closeModal(newPostModal);
})

previewModalCloseBtn.addEventListener("click", () => {
  // previewModal.classList.toggle("modal_is-opened");
  closeModal(previewModal);
})

deleteForm.addEventListener("submit", handleDeleteSubmit);

deleteCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

// FUNCTIONS
function openModal(modal) {
  modal.classList.add("modal_is-opened")
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened")
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  api.updateUserInfo({
    name: editProfileNameInput.value,
    about: editProfileDescriptionInput.value
  })
  .then((userData) => {
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    closeModal(editProfileModal);
  })
  .catch(console.error);
}


function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");


  cardTitleEl.textContent = data.name;

  // cardLikeBtnEl.addEventListener("click", () => {
  //   cardLikeBtnEl.classList.toggle("card__like-btn_active")
  // });

  if(data.isLiked){
  cardLikeBtnEl.classList.add("card__like-btn_active");
}

  cardLikeBtnEl.addEventListener("click", () => {
  const isLiked = cardLikeBtnEl.classList.contains("card__like-btn_active");
  const request = isLiked
    ? api.unlikeCard(data._id)
    : api.likeCard(data._id);

  request
    .then((updatedCard) => {
      cardLikeBtnEl.classList.toggle("card__like-btn_active");
    })
    .catch(console.error);
});

  // cardDeleteBtnEl.addEventListener("click", () => {
  //   // cardDeleteBtnEl.classList.toggle("card__delete-btn_active");
  //   // cardDeleteBtnEl.closest(".card").remove(); <-- You can do this method or the cardElement.remove() as well both will work
  //   cardElement.remove();
  //   // cardElement = null;
  // });

//   cardDeleteBtnEl.addEventListener("click", () => {
//   api.deleteCard(data._id)
//     .then(() => {
//       cardElement.remove();
//     })
//     .catch(console.error);
// });
cardDeleteBtnEl.addEventListener("click", () => {
  handleDeleteCard(cardElement, data);
});

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewNameEl.textContent = data.name;
    console.log(cardImageEl);

    openModal(previewModal);
  })

  return cardElement;
}


// LOOPS

enableValidation(settings);