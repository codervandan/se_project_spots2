class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

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

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // other methods for working with the API
}

export default Api;