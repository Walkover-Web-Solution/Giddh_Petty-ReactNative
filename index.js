/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage.clear();
import LogRocket from '@logrocket/react-native';
LogRocket.init('sd2s3m/petty-cash')
AppRegistry.registerComponent(appName, () => App);
