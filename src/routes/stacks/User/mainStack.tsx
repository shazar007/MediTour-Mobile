import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Image, Platform, Pressable, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  appointment,
  HomeActive,
  homeInActive,
  bookingInActive,
  appointmentActive,
  bookingActive,
  profileActive,
  profileInActive,
} from '@assets';
import {RF} from '@theme';
import {Text} from '@components';
import UserHomeStack from './homeStack';
import UserAppointmentStack from './appointmentStack';
import {navigate, rs, rv} from '@services';
import {useSelector} from 'react-redux';
import {
  BidDetails,
  BlinqPayment,
  EditProfile,
  EmergencyScreen,
  Favorite,
  FlightsDetails,
  HelpCenter,
  MedOrderDetails,
  Notifications,
  OrderDetails,
  OrderHistory,
  OrderNoWPharmacy,
  Orders,
  OverView,
  PaymentDetails,
  PaymentRequest,
  PrivacyPolicies,
  Request,
  RequestDetails,
  StripeAlFalah,
  Stripe_Details,
  TravelerIdentity,
  TravelerInfo,
  UserProfile,
  ViewCart,
} from '@screens';
import UserMyBookingStack from './myBookingStack';

import {
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import User_ProfileStack from './user_ProfileStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const handlePressTab = (stack: string) => {
    navigate(stack);
  };

  const screens = [
    {
      name: 'Home',
      component: UserHomeStack,
      iconActive: HomeActive,
      iconInactive: homeInActive,
      stack: 'UserHome',
    },
    {
      name: 'Appointment',
      component: UserAppointmentStack,
      iconActive: appointmentActive,
      iconInactive: appointment,
      stack: 'Appointment',
    },
    {
      name: 'My Booking',
      component: UserMyBookingStack,
      iconActive: bookingActive,
      iconInactive: bookingInActive,
      stack: 'My Booking',
    },
    {
      name: 'Profile',
      component: User_ProfileStack,
      iconActive: profileActive,
      iconInactive: profileInActive,
      stack: 'Profile',
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: changeColor,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? rv(80) : rv(60),
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
      }}>
      {screens?.map((screen, index) => (
        <Tab.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          listeners={() => ({
            tabPress: event => {
              event.preventDefault();
            },
          })}
          options={{
            tabBarIcon: ({focused}: any) => (
              <CustomTabs
                onPress={handlePressTab}
                stack={screen.stack}
                source={focused ? screen.iconActive : screen.iconInactive}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const UserMainStack = () => {
  const stackScreens = [
    {name: 'MyTabs', component: MyTabs},
    {name: 'UserProfile', component: UserProfile},
    {name: 'PrivacyPolicies', component: PrivacyPolicies},
    {name: 'EditProfile', component: EditProfile},
    {name: 'OrderDetails', component: OrderDetails},
    {name: 'OrderHistory', component: OrderHistory},
    {name: 'Orders', component: Orders},
    {name: 'OverView', component: OverView},
    {name: 'OrderNoWPharmacy', component: OrderNoWPharmacy},
    {name: 'Favorite', component: Favorite},
    {name: 'EmergencyScreen', component: EmergencyScreen},
    {name: 'Notifications', component: Notifications},
    {name: 'HelpCenter', component: HelpCenter},
    {name: 'Request', component: Request},
    {name: 'MedOrderDetails', component: MedOrderDetails},
    {name: 'RequestDetails', component: RequestDetails},
    {name: 'PaymentRequest', component: PaymentRequest},
    {name: 'FlightsDetails', component: FlightsDetails},
    {name: 'BidDetails', component: BidDetails},
    {name: 'TravelerIdentity', component: TravelerIdentity},
    {name: 'TravelerInfo', component: TravelerInfo},
    {name: 'ViewCart', component: ViewCart},
    {name: 'StripeAlFalah', component: StripeAlFalah},
    {name: 'PaymentDetails', component: PaymentDetails},
    {name: 'Stripe_Details', component: Stripe_Details},
    {name: 'BlinqPayment', component: BlinqPayment},
    {
      name: 'ZegoUIKitPrebuiltCallWaitingScreen',
      component: ZegoUIKitPrebuiltCallWaitingScreen,
      options: {headerShown: false},
    },
    {
      name: 'ZegoUIKitPrebuiltCallInCallScreen',
      component: ZegoUIKitPrebuiltCallInCallScreen,
    },
  ];

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {stackScreens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options || {}}
        />
      ))}
    </Stack.Navigator>
  );
};

const CustomTabs = ({
  source,
  stack,
  focused,
  onPress,
}: {
  source: any;
  focused?: any;
  stack: any;
  onPress: (stack: any) => void;
}) => {
  const theme: any = useTheme();
  const styles = useStyles();

  return (
    <Pressable
      onPress={() => onPress(stack == 'UserHome' ? 'Home' : stack)}
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: rv(6),
      }}>
      <Image
        source={source}
        style={[
          styles.focusedImg,
          {tintColor: !focused && theme?.colors.medGrey},
        ]}
      />
      <Text size={10} color={focused ? '#0E54A3' : theme?.colors.medGrey}>
        {stack == 'UserHome' ? 'Home' : stack}
      </Text>
    </Pressable>
  );
};
const useStyles = () =>
  StyleSheet.create({
    focusedImg: {
      height: rv(24),
      width: rs(24),
    },
    unfocusedImg: {
      height: 24,
      width: 24,
    },
    round: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
      height: RF(64),
      width: RF(64),
      borderRadius: 40,
    },
  });
export default UserMainStack;

// import {BottomFabBar} from 'rn-wave-bottom-bar';
// tabBar={props => (
//   <BottomFabBar
//     mode={'default'}
//     focusedButtonStyle={{
//       shadowColor: '#fff',
//       shadowOffset: {
//         width: 0,
//         height: 7,
//       },
//       shadowOpacity: 0.41,
//       shadowRadius: 9.11,
//     }}
//     bottomBarContainerStyle={{
//       elevation: 5,
//       shadowColor: '#fff',
//       shadowOffset: {
//         width: 0,
//         height: 7,
//       },
//       shadowOpacity: 0.41,
//       shadowRadius: 9.11,
//       position: 'absolute',
//       bottom: Platform.OS === 'ios' ? -20 : -3,
//       left: 0,
//       right: 0,
//     }}
//     {...props}
//   />
// )}

// function MyDrawer({navigation}: any) {
//   const theme: any = useTheme();
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         drawerType: 'front',
//         headerShown: false,
//         drawerStyle: {
//           width: RF(240),
//           borderBottomRightRadius: 20,
//           borderTopRightRadius: 20,
//           overflow: 'hidden',
//         },
//       }}
//       drawerContent={props => (
//         <UserDrawerContent
//           {...props}
//           sourceBG={DonationDr}
//           data={DrawerContent}
//           colorExit
//         />
//       )}>
//       <Drawer.Screen name="MyTabs" component={MyTabs} />
//     </Drawer.Navigator>
//   );
// }
