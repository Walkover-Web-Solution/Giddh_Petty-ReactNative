// authSaga.js

import { put, takeLatest, call, select } from 'redux-saga/effects';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import api, { loginInstance } from '../../../interceptor'; // Import the axios interceptor instance
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signInStart } from './authSlice';
import { Alert, AsyncStorage } from 'react-native';

function* signInWithGoogle() {
  try {
    yield GoogleSignin.hasPlayServices();
    yield GoogleSignin.signOut();
    const res = yield GoogleSignin.signIn();
    const token = yield GoogleSignin.getTokens();
    console.log("tjpl",token);
    const response = yield call(loginInstance.get, 'v2/signup-with-google', {
      headers: {
        'access-token': token.accessToken,
      },
    });
    console.log("res",response);
    yield put(signInSuccess({ user: response.data.body, photo: res.user.photo }));
  } catch (error) {
    Alert.alert(error.toString());
    yield put(signInFailure(error.message));
  }
  finally{
    yield put(signInStart({loading:false}));
  }
}
function* signInWithOtp({ payload }) {
  try {
    const response = yield call(api.post, 'v2/login', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      accessToken: payload?.message,
    });
    yield put(signInSuccess({ user: response.data.body, photo:null}));
  } catch (error) {
    console.log(error);
    yield put(signInFailure(error.message));
  }
  finally{
    yield put(signInStart({loading:false}));
  }
}

function* signOut() {
  try {
    // yield GoogleSignin.revokeAccess();
    // yield GoogleSignin.signOut();
    const usersGmail = yield select((state)=>
    state?.auth?.user?.user?.uniqueName
  )
  yield call(api.delete, `users/${usersGmail}/destroy-session?lang=en`);
  } catch (error) {
    console.warn(error);
    // yield put(signOutFailure(error.message));
  }
finally{
    yield put(signInStart({loading:false}));
  }
}

function* signStart(){
  try {
    yield put(signInStart({loading:true}));
    yield call(signInWithGoogle);
  } catch (error) {
    yield put(signInStart({loading:false}));
    console.warn(error);
  }
}

export function* authSaga() {
  yield takeLatest('SIGN_START',signStart);
  yield takeLatest('SIGN_OUT', signOut);
  yield takeLatest('SIGN_IN_OTP', signInWithOtp);
}
