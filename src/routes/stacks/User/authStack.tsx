import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  EmailVerification,
  JoinAsProvider,
  New_Login,
  OnBoarding,
  UserForgotPassword,
  UserSignup,
} from '@screens';

const Stack = createStackNavigator();

const UserAuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
      }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="JoinAsProvider" component={JoinAsProvider} />
      <Stack.Screen name="New_Login" component={New_Login} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="UserSignup" component={UserSignup} />
      <Stack.Screen name="UserForgotPassword" component={UserForgotPassword} />
    </Stack.Navigator>
  );
};
export default UserAuthStack;
