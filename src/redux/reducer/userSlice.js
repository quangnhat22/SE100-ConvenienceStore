// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isLoggedIn: false,
//   logging: false,
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
// }

// const authSlice = createSlice({
//   name: 'authentication',
//   initialState,
//   reducers: {
//     requestLog: (state) => {
//       state.logging = true;
//     },
//     requestLogSuccess: (state, action) => {
//       console.log(action.payload.user);
//       state.logging = false;
//       state.isLoggedIn = true;
//       state.currentUser = action.payload.user;
//     },
//     requestLogFailed: (state) => {
//       state.isLoggedIn = false;
//     },
//     logOutApp: (state, action) => {
//       state.isLoggedIn = false;
//       state.currentUser = undefined;
//     }
//   }
// });

// export const authActions = authSlice.actions;

// export default authSlice.reducer;