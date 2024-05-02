
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  photo:null,
  sessionToken:null,
  isAuthenticated: false,
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart(state, action) {
      state.loading = action?.payload?.loading
    },
    signInSuccess(state, action) {
      state.user = action.payload?.user;
      state.isAuthenticated = true;
      state.photo = action.payload?.photo;
      state.sessionToken = action.payload?.sessionToken;
      state.loading = false;
    },
    signInFailure(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.photo = null;
      state.sessionToken = null;
      state.loading = false;
    },
  },
});
export const signIn = () => ({
  type: 'auth/signIn',
});
export const { signInSuccess, signInFailure, signOut, signInStart } = authSlice.actions;

export default authSlice.reducer;
