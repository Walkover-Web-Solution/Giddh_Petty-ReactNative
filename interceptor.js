import axios from 'axios';
import { store } from './src/redux/index'; 
import { signOut } from './src/redux/auth/authSlice';


const api = axios.create({
  baseURL: 'https://api.giddh.com/',
});

api.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    const sessionToken = store.getState().auth?.user?.session?.id;
    console.log(sessionToken,"s")
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
    if (error.response && error.response.status === 401) {
      store.dispatch(signOut());
    }
    return Promise.reject(error);
  }
);

export default api;