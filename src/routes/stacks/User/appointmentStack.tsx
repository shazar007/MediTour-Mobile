import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AppointmentDetails,
  AppointmentUpcoming,
  DetailsScreen,
  FormatDesign,
  PreceptionDetails,
  ProductDetail,
  Stripe_Details,
} from '@screens';
import {useSelector} from 'react-redux';
import {LoginReminder} from '@components';

const Stack = createStackNavigator();

const UserAppointmentStack = ({route}: any) => {
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
        name="AppointmentUpcoming"
        component={user === null ? LoginReminder : AppointmentUpcoming}
      />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />

      <Stack.Screen name="PreceptionDetails" component={PreceptionDetails} />
      <Stack.Screen name="FormatDesign" component={FormatDesign} />
      <Stack.Screen name="Stripe_Details" component={Stripe_Details} />
    </Stack.Navigator>
  );
};
export default UserAppointmentStack;
