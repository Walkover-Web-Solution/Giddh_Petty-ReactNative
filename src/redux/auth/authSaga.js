// authSaga.js

import { put, takeLatest, call } from 'redux-saga/effects';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import api from '../../../interceptor'; // Import the axios interceptor instance
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure } from './authSlice';

function* signInWithGoogle() {
  try {
    yield GoogleSignin.hasPlayServices();
    yield GoogleSignin.signOut();
    const res = yield GoogleSignin.signIn();
    const token = yield GoogleSignin.getTokens();
    const response = yield call(api.get, 'v2/signup-with-google', {
      headers: {
        'access-token': token.accessToken,
      },
    });
    yield put(signInSuccess({ user: response.data.body, photo: res.user.photo }));
  } catch (error) {
    console.log(error);
    yield put(signInFailure(error.message));
  }
}
function* signInWithOtp({ payload}) {
  try {
    console.log(payload);
    const response = yield call(api.post, 'v2/login', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      accessToken: payload,
    });
    yield put(signInSuccess({ user: response.data.body, photo:null}));
  } catch (error) {
    console.log(error);
    yield put(signInFailure(error.message));
  }
}

function* signOut() {
  try {
    yield GoogleSignin.revokeAccess();
    yield GoogleSignin.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

export function* authSaga() {
  yield takeLatest('SIGN_IN', signInWithGoogle);
  yield takeLatest('SIGN_OUT', signOut);
  yield takeLatest('SIGN_IN_OTP', signInWithOtp);
}
