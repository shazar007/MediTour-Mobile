import React from 'react';
import {
  EmailVerification,
  LaboratoryForgot,
  LaboratoryHome,
  LaboratoryLogin,
  LaboratorySignup,
  LaboratoryTest,
  UserForgotPassword,
} from '@screens';
import {createStackNavigator} from '@react-navigation/stack';
import {LabInputModal} from '@components';
const Stack = createStackNavigator();
const LaboratoryAuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, presentation: 'transparentModal'}}>
      <Stack.Screen name="LaboratoryLogin" component={LaboratoryLogin} />
      <Stack.Screen name="LaboratorySignup" component={LaboratorySignup} />
      <Stack.Screen name="LaboratoryHome" component={LaboratoryHome} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="LaboratoryForgot" component={LaboratoryForgot} />
      <Stack.Screen name="LaboratoryTest" component={LaboratoryTest} />
      <Stack.Screen name="LabInputModal" component={LabInputModal} />
      <Stack.Screen name="UserForgotPassword" component={UserForgotPassword} />
    </Stack.Navigator>
  );
};
export default LaboratoryAuthStack;
