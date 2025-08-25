import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import BottomStack from '../BottomStack';
import {useTheme} from '@react-navigation/native';
import {rs, rv} from '@services';
import Text from '../text';
import {getColorCode} from '@theme';
import {useSelector} from 'react-redux';

const VendorTabBar = ({
  focused,
  activeIcon,
  inActiveIcon,
  stack,
}: {
  focused?: any;
  activeIcon?: any;
  inActiveIcon?: any;
  stack?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme?.colors;
  const {colorCode} = getColorCode();
  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);

  //

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <BottomStack
        styles={{
          backgroundColor: focused
            ? changeStack === 'Travel Agency' ||
              changeStack === 'Rent A car' ||
              changeStack === 'Insurance' ||
              changeStack === 'Hotels' ||
              changeStack === 'Doctors' ||
              changeStack === 'User'
              ? '#fff'
              : changeStack === 'Laboratory'
              ? colors.LabBottomTabActive
              : colorCode
            : colors.background,
          borderRadius: focused ? rs(50) : 0,
        }}>
        <Image
          source={focused ? activeIcon : inActiveIcon}
          style={{
            width: rs(20),
            height: rv(20),
            tintColor: focused
              ? changeStack === 'Laboratory'
                ? colors.orange
                : colors.primary
              : '#7D7D7D',
          }}
        />
        {focused && (
          <Text
            size={12}
            color={
              changeStack === 'Laboratory' ? colors.orange : colors.primary
            }
            MTlight
            style={{
              paddingHorizontal: rv(4),
            }}>
            {stack}
          </Text>
        )}
      </BottomStack>
    </View>
  );
};

export default VendorTabBar;

const styles = StyleSheet.create({});
