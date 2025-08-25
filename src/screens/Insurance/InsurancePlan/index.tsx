import useStyles from './styles';
import {Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {PlanofInsurance, navigate, navigationRef} from '@services';
import {CustomHeader, Text, Wrapper} from '@components';

const InsurancePlan = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const InsurancePackage = (item: any) => {
    if (item?.name == 'Health') {
      navigate('InsurancePackage', {item: item?.name});
    } else if (item?.name == 'Travel') {
      navigate('Insurance_Travel_Package', {
        item: item?.name,
        navigation: navigation,
      });
    }
  };

  // const state = navigationRef.current?.getRootState();

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Insurance Plan'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <View style={styles.view}>
        {PlanofInsurance.map((item, index) => (
          <Pressable
            onPress={() => InsurancePackage(item)}
            key={index}
            style={styles.press}>
            <Text size={20} SFmedium color={colors.primary}>
              {item?.name}
            </Text>
            <View style={styles.txtV}>
              <Text size={12} SFlight color={colors.primary} style={styles.wd}>
                {item?.description}
              </Text>
              <Image source={item.Avatar} style={styles.img} />
            </View>
          </Pressable>
        ))}
      </View>
    </Wrapper>
  );
};
export default InsurancePlan;
