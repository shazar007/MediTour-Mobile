import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ChangePassword,
  OrderHistory,
  PrivacyPolicies,
  Request,
  User_Profile,
  UserProfile,
} from '@screens';
import {help, order2, privacy, UserIcon} from '@assets';
import {LoginReminder} from '@components';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const profileData = [
  {
    editProfile: 'UserProfile',
    activities: [
      {id: 0, title: 'My Orders', icon: order2, screen: 'OrderHistory'},
      {id: 1, title: 'My Requests', icon: help, screen: 'Request'},
    ],
  },
  {
    others: [
      {
        id: 0,
        title: 'Password Settings',
        icon: order2,
        screen: 'ChangePassword',
      },
      {
        id: 1,
        title: 'Privacy Policy',
        icon: privacy,
        screen: 'PrivacyPolicies',
      },
    ],
  },
];

const User_ProfileStack = ({route}: any) => {
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
        name="User_Profile"
        component={user === null ? LoginReminder : User_Profile}
        initialParams={{data: profileData}}
      />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="Request" component={Request} />
      <Stack.Screen name="PrivacyPolicies" component={PrivacyPolicies} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};
export default User_ProfileStack;
