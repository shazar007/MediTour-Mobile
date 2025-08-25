import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DonationDonors, Donation_Donors_Detail} from '@screens';
import {useDispatch} from 'react-redux';
const Stack = createStackNavigator();
const DonationDonorsStack = ({route}: any) => {
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
      <Stack.Screen name="DonationDonors" component={DonationDonors} />
      <Stack.Screen
        name="Donation_Donors_Detail"
        component={Donation_Donors_Detail}
      />
    </Stack.Navigator>
  );
};
export default DonationDonorsStack;
