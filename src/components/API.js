export default class API {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: {
        authorization: "c33edda4-44b3-4b31-9ef9-67d7dfcdfd71",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  createCard(card) {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(card),
    }).then((res) => res.json());
  }

  getUserProfile() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }

  setUserProfile({ name, about }) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateLike(LikeButtonIsActive, cardId) {
    if (LikeButtonIsActive) {
      return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: avatar }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }
}
