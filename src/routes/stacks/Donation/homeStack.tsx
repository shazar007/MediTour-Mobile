import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DonationHome} from '@screens';
import {useDispatch} from 'react-redux';
const Stack = createStackNavigator();
const DonationHomeStack = ({route}: any) => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
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
      }}>
      <Stack.Screen name="DonationHome" component={DonationHome} />
    </Stack.Navigator>
  );
};
export default DonationHomeStack;
