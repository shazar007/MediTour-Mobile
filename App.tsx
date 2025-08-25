import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {store} from '@redux';
import React, {useEffect, useState, useRef} from 'react';
import {darkThemeStyle, defaultTheme} from '@theme';
import messaging from '@react-native-firebase/messaging';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DropdownAlert from 'react-native-dropdownalert';
import {Platform, Pressable, StatusBar, useColorScheme} from 'react-native';
import {
  navigationRef,
  interceptorConfig,
  setIsDarkModeEnabled,
  getDataFromUserDefaults,
  rv,
} from '@services';
import Routes from './src/routes';
import {Host} from 'react-native-portalize';
import Toast from 'react-native-toast-message';
import {persistor} from './src/shared/redux/store';
import {StripeProvider} from '@stripe/stripe-react-native';
import {EventRegister} from 'react-native-event-listeners';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {toastConfig} from './src/shared/services/utils/customToastConfig';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import BootSplash from 'react-native-bootsplash';
import {Alert} from './src/shared/utils/AlertHelper';
import {checkAndFetchExchangeRate} from './src/shared/utils/ExchangeRateHelper';
import {
  handleNotification,
  requestNotificationPermission,
  requestUserPermission,
} from './src/shared/utils/NotificationHelper';
import {checkVersion} from 'react-native-check-version';

const App = () => {
  const [isEnabledOne, setIsEnabledOne] = useState(false);
  const colorScheme = useColorScheme();
  const {changeColor} = store.getState().root.shiftStack;
  const defaultT = defaultTheme;
  let appTheme = isEnabledOne ? defaultT : defaultT;
  // let appTheme = defaultT;

  // const version = async () => {
  //   const version = await checkVersion();
  //   console.log('Got version info:', version);
  //   if (version.needsUpdate) {
  //     console.log(`App has a ${version.updateType} update pending.`);
  //   }
  // };

  useEffect(() => {
    // version();
    interceptorConfig();
    requestUserPermission();
    requestNotificationPermission();
    //Exchange Rate
    checkAndFetchExchangeRate();

    //.......Splash
    const init = async () => {};
    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      handleNotification(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {});

    return unsubscribe;
  }, []);

  useEffect(() => {
    let listener = EventRegister.addEventListener('appThemeChange', data => {
      setIsEnabledOne(data);
    });
    return () => {
      EventRegister.removeEventListener(listener as any);
    };
  }, []);

  useEffect(() => {
    (async () => {
      let isEnabled = await getDataFromUserDefaults('THEME_KEY');

      if (
        (isEnabled !== undefined && isEnabled === 'true') ||
        (isEnabled === undefined && colorScheme === 'dark')
      ) {
        setIsEnabledOne(true);
        setIsDarkModeEnabled(true);
      } else {
      }
    })();
  });

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };

  return (
    <StripeProvider publishableKey="pk_test_51PU65d1rwEL9hE4Z37XFQSQJrlvyhcozuGtFvME323uUZIK2rObxR4Mz3yYAxrmhChWZNec5qp0aC7wlMUqZwNK000NK1G3fyj">
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{flex: 1}}>
                <NavigationContainer
                  ref={navigationRef}
                  theme={appTheme as any}>
                  <StatusBar
                    animated={true}
                    backgroundColor="transparent"
                    barStyle={'default'}
                    translucent={true}
                  />
                  <Host>
                    {/* <ZegoCallInvitationDialog /> */}
                    <Routes />
                  </Host>
                  <Toast position="bottom" config={toastConfig} />
                  <DropdownAlert
                    alert={func => (Alert.alertObj = func)}
                    dismissInterval={2000}
                    successColor={'green'}
                    errorColor={'red'}
                    animatedViewStyle={{height: '13.3%'}}
                    safeViewStyle={{
                      height:
                        //  Platform.OS == 'ios' ? rv(80) :
                        '100%',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}
                    activeStatusBarStyle={'default'}
                    inactiveStatusBarStyle={'default'}
                    inactiveStatusBarBackgroundColor={changeColor}
                    updateStatusBar={false}
                  />
                </NavigationContainer>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </PaperProvider>
    </StripeProvider>
  );
};

export default App;
