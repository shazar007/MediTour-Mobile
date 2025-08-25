import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Image, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AppointmentActive,
  AppointmentInActive,
  Avatar1,
  Avatardoc,
  DeptActive,
  DeptInActive,
  HomeActive,
  HomeTabInActive,
  ProfileIcon,
  userAvatar,
} from '@assets';
import {LAYOUT, RF} from '@theme';
import {BottomStack, Text} from '@components';
import {useSelector} from 'react-redux';
import HospitalHomeStack from './homeStack';
import HospitalDepartmentStack from './departmentsStack';
import HospitalAppointmentStack from './appointmentStack';
import HospitalPaymentStack from './paymentStack';
import {BlinqPayment, Notifications, StripeAlFalah} from '@screens';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(theme.colors);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderRadius: RF(88),
          borderColor: 'white',
          backgroundColor: colors.background,
          position: 'absolute',
          marginHorizontal: LAYOUT.MARGIN.NORMAL,
          height: RF(64),
          bottom: RF(10),
          paddingHorizontal: LAYOUT.MARGIN.NORMAL,
          ...styles.shadow,
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: colors.InactiveTabColor,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: changeColor,
      }}>
      <Tab.Screen
        name="Home"
        component={HospitalHomeStack}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <BottomStack
                  styles={{
                    backgroundColor: focused ? '#A5ECFC3D' : colors.background,
                    borderRadius: focused ? RF(50) : 0,
                  }}>
                  <Image
                    source={focused ? HomeActive : HomeTabInActive}
                    style={{
                      width: RF(20),
                      height: RF(20),
                    }}
                  />
                  {focused && (
                    <Text
                      size={12}
                      color={colors.primary}
                      MTlight
                      style={{
                        paddingHorizontal: RF(4),
                      }}>
                      Home
                    </Text>
                  )}
                </BottomStack>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Department"
        component={HospitalDepartmentStack}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <BottomStack
                  styles={{
                    backgroundColor: focused ? '#A5ECFC3D' : colors.background,
                    borderRadius: focused ? RF(50) : 0,
                  }}>
                  <Image
                    source={focused ? DeptInActive : DeptActive}
                    style={{
                      width: RF(20),
                      height: RF(20),
                    }}
                  />
                  {focused && (
                    <Text
                      size={12}
                      color={colors.primary}
                      MTlight
                      style={{
                        paddingHorizontal: RF(4),
                      }}>
                      Dept.
                    </Text>
                  )}
                </BottomStack>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={HospitalAppointmentStack}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <BottomStack
                  styles={{
                    backgroundColor: focused ? '#A5ECFC3D' : colors.background,
                    borderRadius: focused ? RF(50) : 0,
                  }}>
                  <Image
                    source={focused ? AppointmentActive : AppointmentInActive}
                    style={{
                      width: RF(20),
                      height: RF(20),
                    }}
                  />
                  {focused && (
                    <Text
                      size={12}
                      color={colors.primary}
                      MTlight
                      style={{
                        paddingHorizontal: RF(4),
                      }}>
                      Appo.
                    </Text>
                  )}
                </BottomStack>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HospitalPaymentStack}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <BottomStack
                  styles={{
                    backgroundColor: focused ? '#A5ECFC3D' : colors.background,
                    borderRadius: focused ? RF(50) : 0,
                  }}>
                  <Image
                    source={focused ? Avatar1 : Avatar1}
                    style={{
                      width: RF(20),
                      height: RF(20),
                      tintColor: 'gray',
                    }}
                  />
                  {focused && (
                    <Text
                      size={12}
                      color={colors.primary}
                      MTlight
                      style={{
                        paddingHorizontal: RF(4),
                      }}>
                      Profile
                    </Text>
                  )}
                </BottomStack>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
const HospitalmainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="StripeAlFalah" component={StripeAlFalah} />
      <Stack.Screen name="BlinqPayment" component={BlinqPayment} />
    </Stack.Navigator>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    focusedImg: {
      height: RF(20),
      width: RF(24),
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
    shadow: {
      shadowOffset: {
        width: 0,
        height: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 1,
      },
    },
  });
export default HospitalmainStack;
