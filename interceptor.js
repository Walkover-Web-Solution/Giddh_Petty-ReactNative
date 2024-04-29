import axios from 'axios';
import { store } from './src/redux/index'; 
import { signOut } from './src/redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorToast } from './src/components/customToast/CustomToast';


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
    if (error?.response && (error?.response?.status === 401 || error?.response?.status === 400)) {
      console.log("error",error?.response);
      errorToast('Encountered error');
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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default api;