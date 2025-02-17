// authSaga.js

import { put, takeLatest, call, select } from 'redux-saga/effects';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import api, { loginInstance } from '../../../interceptor'; // Import the axios interceptor instance
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signInStart } from './authSlice';
import { Alert, AsyncStorage } from 'react-native';
import LogRocket from '@logrocket/react-native';

const addUserDeatilsToLogRocket = (userName, userEmail) => {
  console.log("LogRocket Details " + "  " + userName + " " + userEmail);
  LogRocket.identify(userEmail, {
    name: userName,
    email: userEmail,
    newUser: true
  });
}

function* signInWithGoogle() {
  try {
    yield GoogleSignin.hasPlayServices();
    yield GoogleSignin.signOut();
    const res = yield GoogleSignin.signIn();
    const token = yield GoogleSignin.getTokens();
    yield addUserDeatilsToLogRocket(res?.user?.name, res?.user?.email);
    const response = yield call(loginInstance.get, 'v2/signup-with-google', {
      headers: {
        'access-token': token.accessToken,
      },
    });
    yield put(signInSuccess({ user: response.data.body, photo: res.user.photo }));
  } catch (error) {
    console.log("error",error);
    Alert.alert("Fail to login");
    yield put(signInStart({loading:false}));
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
    const {user} = response?.data?.body;
    yield addUserDeatilsToLogRocket(user?.name, user?.email);
    yield put(signInSuccess({ user: response.data.body, photo:null}));
  } catch (error) {
    console.log(error);
    yield put(signInFailure(error.message));
    yield put(signInStart({loading:false}));
  }
  finally{
    yield put(signInStart({loading:false}));
  }
}

function* signInWithApple({ payload }) {
  try {
    const response = yield call(loginInstance.post, 'v2/signup-with-apple', {
      authorizationCode: payload.authorizationCode,
      requestFromPettyCash : true,
      email: payload.email,
      fullName: payload.fullName,
      identityToken: payload.identityToken,
      state: payload.state,
      user: payload.user
  });
    yield addUserDeatilsToLogRocket(response?.body?.user?.name, response?.body?.user?.email);
    yield put(signInSuccess({ user: response.data.body, photo:null}));
  } catch (error) {
    console.log("error----->",error);
    Alert.alert("Fail to login");
    yield put(signInStart({loading:false}));
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
    const uniqueName = yield select((state)=>
    state?.auth?.user?.user?.uniqueName
  )
  yield call(api.delete, `users/${uniqueName}/destroy-session?lang=en`);
  yield put(signInStart({loading:false}));
  } catch (error) {
    console.warn(error);
    yield put(signInStart({loading:false}));
    // yield put(signOutFailure(error.message));
  }
  finally{
    yield put(signInStart({loading:false}));
  }
}

function* signStart({payload}){
  try {
    yield put(signInStart({loading:true}));
    if(payload?.type === 'SIGN_IN_GOOGLE')
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
  yield takeLatest('SIGN_IN_APPLE',signInWithApple);
}
