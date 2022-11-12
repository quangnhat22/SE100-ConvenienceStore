import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  logging: false,
//   currentUser: {
//     'about': '',
//     'avatar': '',
//     'email': '',
//     'fullname': '',
//     'isEmailVerified': '',
//     'isProfileFilled': '',
//     'phone': '',
//     'uid': '',
//     'username': ''
//   },
}

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    requestLog: (state) => {
      state.logging = true;
    },
    requestLogSuccess: (state, action) => {
      state.logging = false;
      state.isLoggedIn = true;
    },
    requestLogFailed: (state) => {
      state.isLoggedIn = false;
    },
    logOutApp: (state, action) => {
      state.isLoggedIn = false;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;