import { makeAutoObservable, runInAction } from 'mobx';
import { Admin } from '../models/admin';
import agent from '../api/agent';

export default class AuthenticationStore {
  token: string | null = localStorage.getItem('jwt');
  admin: Admin | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.token;
  }

  login = async (credentials: Admin) => {
    try {
      const { token } = await agent.Authentication.login(credentials);
      runInAction(() => {
        this.token = token;
        localStorage.setItem('jwt', token);
      });
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    this.token = null;
    localStorage.removeItem('jwt');
  };

  getToken = () => {
    return this.token;
  };
}
