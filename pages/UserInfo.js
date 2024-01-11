export default class UserInfo {
  constructor({ nameSelector, detailSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._detailElement = document.querySelector(detailSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      detail: this._detailElement.textContent,
    };
  }

  setUserInfo(name, detail) {
    this._nameElement.textContent = name;
    this._detailElement.textContent = detail;
  }
}
