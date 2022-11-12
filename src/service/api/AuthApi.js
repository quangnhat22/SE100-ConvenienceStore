import axios from "axios";
import * as UrlApi from '../url';

export const UserService = {
    getAuthLogin: (email, password) => {
        return axios.get(
            UrlApi.URL_AUTH_LOGIN,
            {
                data: {
                    "email": email,
                    "password": password
                }
            }
        )
    }
}