import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    appLoaded = false;
    token: string | null = null;

    constructor() {
        makeAutoObservable(this);

        this.token = window.localStorage.getItem('jwt');

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        );
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }
    
    setAppLoaded = () => {
        this.appLoaded = true;
    }

    setToken = (token: string | null) => {
        this.token = token;
    };

    getToken = () => {
        return this.token;
    }
}
