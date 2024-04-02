
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// import {AuthUrls} from './auth.url'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// export const signInWithGoogle = async() => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     const tok=await GoogleSignin.getTokens();
//     const response = await fetch(`${AuthUrls.LOGIN_WITH_GOOGLE}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'access-token': tok.accessToken,
//       },
//     });
//     const data = await response.json();
//     await AsyncStorage.setItem('user', data?.body?.user?.uniqueName);
//     return data;
//   } catch (error) {
//     console.log(error);
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       // User cancelled the login flow
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       // Operation (e.g., sign-in) is in progress already
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       // Play services not available or outdated
//     } else {
//       // Some other error happened
//     }
//   }
// };

// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import { signIn } from '../../redux/auth/authSlice';

// export const signInWithGoogle = async () => {
//   const dispatch = useDispatch();
//     const navigation=useNavigation();
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     const tok = await GoogleSignin.getTokens();
//     await AsyncStorage.setItem('tokenId', userInfo.idToken);
//     await AsyncStorage.setItem('email', userInfo.user.email);
//     await AsyncStorage.setItem('name', userInfo.user.name);
//     await AsyncStorage.setItem('photo', userInfo.user.photo);

//     dispatch(signIn(userInfo.user));

//     const response = await fetch('https://api.giddh.com/v2/signup-with-google', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'access-token': tok.accessToken
//       },
//     });
//     const data = await response.json();
//     const response1 = await fetch(`https://api.giddh.com/users/${data.body.user.uniqueName}/companies`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'session-Id': data.body.session.id
//       }
//     });
//     const data1 = await response1.json();
//     console.warn('Response:', data1.body[0].name);
//     navigation.replace('Company');
//   } catch (error) {
//     console.log(error);
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       // User cancelled the login flow
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       // Operation (e.g., sign-in) is in progress already
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       // Play services not available or outdated
//     } else {
//       // Some other error happened
//     }
//   }
// };
