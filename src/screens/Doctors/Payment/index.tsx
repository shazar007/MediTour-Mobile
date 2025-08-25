import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CustomHeader, Text, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {Image} from 'react-native';
import {RF} from '@theme';
import {DoctorsRequestsItems, globalStyles} from '@services';
const DoctorsPayment = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Patient Payment'}
        leftIcon
        titleColor={'#fff'}
        notify
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: RF(16), paddingBottom: RF(72)}}>
          {DoctorsRequestsItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.DesignCard}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={12} SFmedium color={'#0D47A1'}>
                  Patient Id:
                </Text>
                <Text size={12} SFmedium color={'#0D47A1'}>
                  123456
                </Text>
              </View>
              <View style={globalStyles.row}>
                <Text size={12} SFmedium color={colors.primary}>
                  Patient Name:
                </Text>
                <Text size={9} SFregular color={colors.primary}>
                  Zubair
                </Text>
              </View>
              <View style={globalStyles.row}>
                <Text size={12} SFmedium color={colors.primary}>
                  Service:
                </Text>
                <Text size={12} SFregular color={colors.primary}>
                  Video Consultancy
                </Text>
              </View>

              <View style={globalStyles.row}>
                <Text size={12} SFmedium color={colors.primary}>
                  Payment Id:
                </Text>
                <Text size={9} SFregular color={colors.primary}>
                  IF045J45E
                </Text>
              </View>
              <View style={globalStyles.row}>
                <Text size={12} SFmedium color={colors.primary}>
                  Amount:
                </Text>
                <Text size={12} SFregular color={colors.primary}>
                  500/-
                </Text>
              </View>
              <View style={globalStyles.row}>
                <Text size={12} SFmedium color={'#F37636'}>
                  Receipt
                </Text>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <Image
                    source={item.download}
                    style={{
                      width: RF(16),
                      height: RF(16),
                      tintColor: '#F37636',
                    }}
                  />
                  <Text size={12} SFregular color={'#F37636'}>
                    Download
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};
export default DoctorsPayment;
