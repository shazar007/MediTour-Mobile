import React from 'react';
import {
  MyBookings,
  HistoryDetailsScreen,
  CompanyDetails,
  PaymentDetails,
  TourDetails,
  StripeAlFalah,
  HotelBookingReview,
  Stripe_Details,
} from '@screens';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {LoginReminder} from '@components';

const Stack = createStackNavigator();

const UserMyBookingStack = () => {
  const {user} = useSelector((state: any) => state.root.user);
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
      <Stack.Screen
        name="BookingsScreen"
        component={user === null ? LoginReminder : MyBookings}
      />
      <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen name="TourDetails" component={TourDetails} />
      <Stack.Screen name="StripeAlFalah" component={StripeAlFalah} />
      <Stack.Screen name="HotelBookingReview" component={HotelBookingReview} />
      <Stack.Screen name="Stripe_Details" component={Stripe_Details} />

      <Stack.Screen
        name="HistoryDetailsScreen"
        component={HistoryDetailsScreen}
      />
      {/* <Stack.Screen name="HistoryScreen" component={History} /> */}
    </Stack.Navigator>
  );
};
export default UserMyBookingStack;
