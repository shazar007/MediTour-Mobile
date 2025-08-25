/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {initializeApp} from '@firebase/app';
import 'react-native-get-random-values';

const firebaseConfig = {
  // Your Firebase config object
};
// import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
// import * as ZIM from 'zego-zim-react-native';
// import * as ZPNs from 'zego-zpns-react-native';

// ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);
initializeApp(firebaseConfig);
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
