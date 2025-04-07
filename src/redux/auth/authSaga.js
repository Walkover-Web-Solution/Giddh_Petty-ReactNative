// authSaga.js

import { put, takeLatest, call, select } from 'redux-saga/effects';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import api, { loginInstance } from '../../../interceptor'; // Import the axios interceptor instance
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signInStart, twoFactorAuthenticationStarted, VERIFY_OTP, verifyOTPFailed } from './authSlice';
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
    if (response?.data && response?.data?.body && response?.data?.body?.session && response?.data?.body?.session?.id) {
      yield put(signInSuccess({ user: response.data.body, photo: res.user.photo }));
    }else if (
      response?.data &&
      response?.data?.status == 'success' &&
      response?.data?.body &&
      response?.data?.body?.statusCode == 'AUTHENTICATE_TWO_WAY'
    ){
      yield put(twoFactorAuthenticationStarted(response?.data?.body))
    }
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
    if (response?.data && response?.data?.body && response?.data?.body?.session && response?.data?.body?.session?.id) {
      yield put(signInSuccess({ user: response.data.body, photo: null }));
    }else if (
      response?.data &&
      response?.data?.status == 'success' &&
      response?.data?.body &&
      response?.data?.body?.statusCode == 'AUTHENTICATE_TWO_WAY'
    ){
      yield put(twoFactorAuthenticationStarted(response?.data?.body))
    }
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
    if (response?.data && response?.data?.body && response?.data?.body?.session && response?.data?.body?.session?.id) {
      yield put(signInSuccess({ user: response.data.body, photo: null }));
    }else if (
      response?.data &&
      response?.data?.status == 'success' &&
      response?.data?.body &&
      response?.data?.body?.statusCode == 'AUTHENTICATE_TWO_WAY'
    ){
      yield put(twoFactorAuthenticationStarted(response?.data?.body))
    }
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

export function* verifyOTP(action) {
  try {
    const response = yield call(
      loginInstance.post, 'v2/verify-number', {
        oneTimePassword:action.payload.otp,
        mobileNumber: action.payload.mobileNumber,
        countryCode:action.payload.countryCode
      });
    if (response?.data && response?.data?.body && response?.data?.body?.session) {
      yield put(signInSuccess({ user: response.data.body, photo: null }));
    } 
  } catch (error) {
      yield put(verifyOTPFailed());
      Alert.alert(error.response?.data?.message);
  }
}

export function* authSaga() {
  yield takeLatest('SIGN_START',signStart);
  yield takeLatest('SIGN_OUT', signOut);
  yield takeLatest('SIGN_IN_OTP', signInWithOtp);
  yield takeLatest('SIGN_IN_APPLE',signInWithApple);
  yield takeLatest(VERIFY_OTP.type,verifyOTP);
}
