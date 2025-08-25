import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DonationPackages,
  Donation_Criteria,
  Donation_Add_Packages,
  Donation_Add_Criteria,
  Donation_Package_Detail,
} from '@screens';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();
const DonationPackagesStack = ({route}: any) => {
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
      <Stack.Screen name="DonationPackages" component={DonationPackages} />
      <Stack.Screen name="Donation_Criteria" component={Donation_Criteria} />
      <Stack.Screen
        name="Donation_Package_Detail"
        component={Donation_Package_Detail}
      />

      <Stack.Screen
        name="Donation_Add_Criteria"
        component={Donation_Add_Criteria}
      />

      <Stack.Screen
        name="Donation_Add_Packages"
        component={Donation_Add_Packages}
      />
    </Stack.Navigator>
  );
};
export default DonationPackagesStack;
