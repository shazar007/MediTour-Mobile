import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {HeaderCard, Text, UserHeaderContent, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {EditButton, LabMenu} from '@assets';
import {Modalize} from 'react-native-modalize';
import {Image} from 'react-native';
import {RF} from '@theme';
import {PharmacyOrdersItems, globalStyles, margin, navigate} from '@services';

const PharmacyResult = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const Payment = () => {
    navigate('PharmacyPaymentDetails');
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        icon1={LabMenu}
        userName={false}
        numberOfIcons={'3'}
        cardColor={colors.Pharmacy}
        tintColor={colors.background}>
        <UserHeaderContent searhIconTrue ScreenTitle={'Payment'} />
      </HeaderCard>
      <View
        style={[
          globalStyles.row,
          {paddingHorizontal: RF(16), paddingVertical: RF(8)},
        ]}>
        <Text
          size={16}
          SFmedium
          color={colors.blueText}
          style={margin.bottom_8}>
          Total Payments = 1234
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: RF(16), paddingBottom: RF(72)}}>
          {PharmacyOrdersItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.Carddesign}
              // onPress={Payment}
            >
              <View style={globalStyles.row}>
                <Text size={16} SFmedium color={colors.Pharmacy}>
                  {`${item.OrderId}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.TotalPayment}/-`}
                </Text>
              </View>

              <View style={globalStyles.row}>
                <Text size={14} SFmedium color={colors.primary}>
                  {`Order Quantity: ${item.MedNum}`}
                </Text>

                <Image source={item.download} style={styles.download} />
              </View>
              <View style={globalStyles.row}>
                <Text size={14} SFmedium color={colors.primary}>
                  {`${item.date}`}
                </Text>
                <TouchableOpacity>
                  <Text size={14} SFregular color={colors.Pharmacy}>
                    filename.pdf
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

export default PharmacyResult;

const styles = StyleSheet.create({});
