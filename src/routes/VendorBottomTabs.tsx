import React from 'react';
import {LAYOUT, RF} from '@theme';
import {useSelector} from 'react-redux';
import {Text, BottomStack, VendorTabBar, ActivationCard} from '@components';
import {useTheme} from '@react-navigation/native';
import {View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {vendorTabsData} from './TabsData';

const VendorBottomTabs = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(theme.colors);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles?.tabBarStyle,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: changeColor,
        tabBarInactiveTintColor: colors.InactiveTabColor,
      }}>
      {vendorTabsData()?.map((item: any, index: any) => (
        <Tab.Screen
          key={index}
          name={item?.title}
          component={item?.component}
          options={{
            tabBarIcon: ({color, focused}) => {
              return (
                <VendorTabBar
                  focused={focused}
                  activeIcon={item?.activeIcon}
                  inActiveIcon={item?.inActiveIcon}
                  stack={item?.title}
                />
              );
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default VendorBottomTabs;

const useStyles = (colors: any) =>
  StyleSheet.create({
    tabBarStyle: {
      borderRadius: RF(88),
      borderColor: 'white',
      backgroundColor: colors.background,
      position: 'absolute',
      height: RF(64),
      bottom: RF(10),
      marginHorizontal: LAYOUT.MARGIN.NORMAL,
      paddingHorizontal: LAYOUT.MARGIN.NORMAL,
      shadowOffset: {
        width: 0,
        height: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 1,
      },
      drawer: {
        width: RF(240),
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
      },
    },
    tab: {alignItems: 'center', justifyContent: 'center'},
  });
