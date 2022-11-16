import axios from "axios";
import * as UrlApi from '../url';

export const UserService = {
    postAuthLogin: (email, password) => {
        return axios({
            url: UrlApi.URL_AUTH_LOGIN,
            method: 'POST',
            data: {
                'email': email,
                'password': password
            }
        });
    },
}