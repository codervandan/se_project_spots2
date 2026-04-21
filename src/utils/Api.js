class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // other methods for working with the API

  // USER ROUTES

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this._handleServerResponse);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about })
    }).then(this._handleServerResponse);
  }

  updateAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar })
    }).then(this._handleServerResponse);
  }

  // CARD ROUTES

  getInitialCards() {
    // return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
    //   headers: {
    //     authorization: "d6b8f356-7009-4322-bb29-66f0bf0e3a34",
    //   },
    // }).then((res) => res.json());
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._handleServerResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link })
    }).then(this._handleServerResponse);
  }

// DELETE CARDS

  deleteCard( cardId ) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._handleServerResponse);
  }

// LIKE/UNLIKE CARDS

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    }).then(this._handleServerResponse);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._handleServerResponse);
  }

}

export default Api;