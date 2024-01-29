export default class UserInfo {
  constructor({ name, about, avatar, userId }) {
    this._name = document.querySelector(name),
    this._about = document.querySelector(about);
    this._avatar = avatar;
    this._userId = userId;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
      userId: this._userId,
    };
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
    // this._avatar.src = avatar 
  }

  updateUserInfo(data) {
    this._userName = data.name;
    this._userJob = data.job;
}
  setUserAvatar(){
    this._avatar = avatar;
  }

}
