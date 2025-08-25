import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StripeAlFalah, Stripe_Details, ViewCart} from '@screens';

const Stack = createStackNavigator();

const UserMessagesStack = () => {
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
      <Stack.Screen name="ViewCart" component={ViewCart} />
      <Stack.Screen name="StripeAlFalah" component={StripeAlFalah} />
      <Stack.Screen name="Stripe_Details" component={Stripe_Details} />
    </Stack.Navigator>
  );
};
export default UserMessagesStack;
