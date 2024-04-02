
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  photo:null,
  sessionToken:null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess(state, action) {
      state.user = action.payload?.user;
      state.isAuthenticated = true;
      state.photo = action.payload?.photo;
      state.sessionToken = action.payload?.sessionToken;
    },
    signInFailure(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.photo = null;
      state.sessionToken = null;
    },
  },
});
export const signIn = () => ({
  type: 'auth/signIn',
});
export const { signInSuccess, signInFailure, signOut } = authSlice.actions;

export default authSlice.reducer;
