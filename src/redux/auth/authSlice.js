
import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
  user: null,
  photo:null,
  sessionToken:null,
  isAuthenticated: false,
  loading: false,
  tfaStart: undefined,
  isVerifyingOTP: false
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
      state.isVerifyingOTP = false;
      state.tfaStart = undefined;
      state.tfaDetails = undefined;
    },
    twoFactorAuthenticationStarted(state, action) {
      state.tfaStart = true;
      state.tfaDetails = action?.payload
    },
    unMountingTwoFactorAuthScreen(state) {
      state.tfaStart = false;
      state.tfaDetails = undefined
    },
    VERIFY_OTP(state,action) {
      state.isVerifyingOTP = true;    
    },
    verifyOTPFailed(state) {
      state.isVerifyingOTP = false;    
    }
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      if (action.payload && action.payload.auth) {
        const authReducer = action.payload.auth;
        state = authReducer
        state.tfaStart = undefined;
        state.tfaDetails = undefined;
        state.isVerifyingOTP = false;  
      }
    });
  },
});
export const signIn = () => ({
  type: 'auth/signIn',
});
export const { signInSuccess, signInFailure, signOut, signInStart, twoFactorAuthenticationStarted, unMountingTwoFactorAuthScreen, VERIFY_OTP, verifyOTPFailed } = authSlice.actions;

export default authSlice.reducer;
