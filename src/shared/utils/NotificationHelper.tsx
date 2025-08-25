import messaging from '@react-native-firebase/messaging';
import {setFCMToken, store} from '@redux';
import {PermissionsAndroid, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

export async function registerForPushNotifications() {
  const token = await messaging().getToken();

  if (token) {
    store.dispatch(setFCMToken(token));
  }
}

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    registerForPushNotifications();
  }
}

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS')
        .then(response => {
          if (!response) {
            PermissionsAndroid.request(
              'android.permission.POST_NOTIFICATIONS',
              {
                title: 'Notification',
                message:
                  'App needs access to your notification ' +
                  'so you can get Updates',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
          }
        })
        .catch(err => {
          //
        });
    } catch (err) {}
  }
};

export const handleNotification = (remoteMessage: any) => {
  PushNotification.createChannel(
    {
      channelId: 'test-channel', // (required)
      channelName: 'test messasge', // (required)
      channelDescription: 'Notification for special message', // (optional) default: undefined.
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.localNotification({
    ignoreInForeground: false,
    channelId: 'test-channel',
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
  });
};
