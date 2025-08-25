import React from 'react';
import {OnBoarding, PortalSelection} from '@screens';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const OnBoardingStack = ({route}: any) => {
  const {isLoggedIn} = useSelector((state: any) => state.root.user);
  const {oneTimeOnBoarding} = useSelector(
    (state: any) => state.root.onBoarding,
  );
  return (
    <Stack.Navigator
      screenOptions={{
        // presentation: 'transparentModal',
        headerShown: false,
        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
      {...{
        initialRouteName:
          oneTimeOnBoarding == false ? 'OnBoarding' : 'PortalSelection',
      }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="PortalSelection" component={PortalSelection} />
    </Stack.Navigator>
  );
};

export default OnBoardingStack;
