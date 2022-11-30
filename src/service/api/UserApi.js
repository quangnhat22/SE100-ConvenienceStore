import Axios from "axios";
import * as UrlApi from "../url";

export const UserService = {
  getUsers: () => {
    return Axios.get(UrlApi.URL_USERS);
  },
  postUsers: (newUser) => {
    let {
      email,
      password,
      fullname,
      birthday,
      identityNumber,
      gender,
      phoneNumber,
      address,
      other,
      avatar,
      role,
    } = newUser;
    return Axios.post(UrlApi.URL_USERS, {
      email: email,
      password: password,
      fullname: fullname,
      birthday: birthday,
      identityNumber: identityNumber,
      gender: gender,
      phoneNumber: phoneNumber,
      address: address,
      other: other,
      avatar: avatar,
      role: role,
    });
  },
  putUsersById: (
    id,
    user,
  ) => {
    let {
      email,
      password,
      fullname,
      birthday,
      identityNumber,
      gender,
      phoneNumber,
      address,
      other,
      avatar,
      role,
    } = user;
    return Axios.delete(UrlApi.URL_USERS_ID(id), {
      email: email,
      password: password,
      fullname: fullname,
      birthday: birthday,
      identityNumber: identityNumber,
      gender: gender,
      phoneNumber: phoneNumber,
      address: address,
      other: other,
      avatar: avatar,
      role: role,
    });
  },
  getUsersById: (id) => {
    return Axios.get(UrlApi.URL_USERS_ID(id));
  },
  deleteProvidersById: (id) => {
    return Axios.delete(UrlApi.URL_USERS_ID(id));
  },
};
