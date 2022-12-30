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
      active,
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
      active: active,
    });
  },
  putUsersById: (id, user) => {
    let {
      email,
      fullname,
      birthday,
      identityNumber,
      gender,
      phoneNumber,
      address,
      other,
      avatar,
      role,
      active,
    } = user;
    console.log(id, user);
    return Axios.put(UrlApi.URL_USERS, {
      id: parseInt(id),
      email: email,
      fullname: fullname,
      birthday: birthday,
      identityNumber: identityNumber,
      gender: gender,
      phoneNumber: phoneNumber,
      address: address,
      other: other,
      avatar: avatar,
      role: role,
      active: active,
    });
  },
  getUsersById: (id) => {
    return Axios.get(UrlApi.URL_USERS_ID(id));
  },
  deleteUserById: (id) => {
    return Axios.delete(UrlApi.URL_USERS_ID(id));
  },
};
