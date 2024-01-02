import { makeAutoObservable } from 'mobx';

export default class UserStore {

  constructor() {
    console.log('UserStore constructor called');
    this._isAuth = false;
    this._user = null;
    makeAutoObservable(this);
}

  setIsAuth(bool) {
    console.log('Setting isAuth to:', bool);
    this._isAuth = bool;
}

  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}