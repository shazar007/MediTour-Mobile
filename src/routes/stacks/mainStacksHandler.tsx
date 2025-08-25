import React from 'react';
import {useSelector} from 'react-redux';
import HospitalmainStack from './Hospital/mainStack';
import PharmaceuticalMainStack from './Pharmaceutical/mainStack';
import UserMainStack from './User/mainStack';
import {createStackNavigator} from '@react-navigation/stack';
import VendorBottomTabs from '../VendorBottomTabs';
import {
  BlinqPayment,
  Notifications,
  Stripe_Details,
  StripeAlFalah,
} from '@screens';
import {View} from 'react-native';
import {Text} from '@components';

const Stack = createStackNavigator();

const MainRoutesHandler = () => {
  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);

  switch (changeStack) {
    case 'User':
      return <UserMainStack />;

    case 'Pharmaceutical':
      return <PharmaceuticalMainStack />;

    case 'Hospital':
      return <HospitalmainStack />;

    default:
      return <VendorMainStack />;
  }
};

const VendorMainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyTabs" component={VendorBottomTabs} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="StripeAlFalah" component={StripeAlFalah} />
      <Stack.Screen name="Stripe_Details" component={Stripe_Details} />
      <Stack.Screen name="BlinqPayment" component={BlinqPayment} />
    </Stack.Navigator>
  );
};

export default MainRoutesHandler;
