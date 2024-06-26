import axios from 'axios';
import { store } from './src/redux/index'; 
import { signOut } from './src/redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorToast } from './src/components/customToast/CustomToast';
import { Platform } from 'react-native';


const api = axios.create({
  baseURL: 'https://api.giddh.com/',
});

export const loginInstance = axios.create({
  baseURL: 'https://api.giddh.com/',
})

api.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['User-Agent'] = Platform.OS
    const sessionToken = store.getState().auth?.user?.session?.id; 
    // console.log(sessionToken,"s")
    if (sessionToken) {
      config.headers['session-id'] = sessionToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response && error?.response?.status === 401) {
      // console.log("error",error?.response);
      errorToast('Encountered error',error);
      AsyncStorage.clear();
      store.dispatch(signOut(null));
    }
    return Promise.reject(error);
  }
);

loginInstance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['User-Agent'] = Platform.OS
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default api;