import {ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomHeader, Line, Text, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {Image} from 'react-native';
import {RF} from '@theme';
import {PaymentDescription, PaymentDetailing} from '@services';

const DonationPaymentDetails = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Payment Detail'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: RF(16), paddingBottom: RF(72)}}>
          <View
            style={{
              paddingTop: RF(8),
              backgroundColor: '#F4EFFF',
              paddingVertical: RF(8),
              marginVertical: RF(16),
              paddingHorizontal: RF(8),
              borderRadius: RF(4),
            }}>
            <Text size={16} color={colors.primary} SFsemiBold>
              Payment ID: 321558
            </Text>
            {PaymentDetailing.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View style={{justifyContent: 'space-between'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text size={14} SFregular color={colors.primary}>
                      {`${item.amount}`}
                    </Text>
                    <Text size={14} SFmedium color={colors.primary}>
                      {`${item.amountpkr}`}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text size={14} SFregular color={colors.primary}>
                      {`${item.date}`}
                    </Text>
                    <Text size={14} SFmedium color={colors.primary}>
                      {`${item.datenum}`}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text size={14} SFregular color={colors.primary}>
                      {`${item.tax}`}
                    </Text>
                    <Text size={14} SFmedium color={colors.primary}>
                      {`${item.amountpkr}`}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text size={14} SFregular color={colors.primary}>
                      {`${item.deduct}`}
                    </Text>
                    <Text size={14} SFmedium color={colors.primary}>
                      {`${item.amountpkr}`}
                    </Text>
                  </View>
                  <Line colors={colors.primary} />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text size={14} SFregular color={colors.primary}>
                      {`${item.amount}`}
                    </Text>
                    <Text size={14} SFmedium color={colors.primary}>
                      {`${item.totalamount}`}
                    </Text>
                  </View>
                </View>
                <Image
                  source={item.Avatar}
                  style={{width: RF(95), height: RF(131)}}
                />
              </View>
            ))}
          </View>
          {PaymentDescription.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: colors.Donation,
                elevation: 2,
                padding: RF(16),
                borderRadius: RF(8),
                borderLeftColor: '#6E6F72',
                borderLeftWidth: 2,
                marginVertical: RF(8),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={16} SFmedium color={colors.primary}>
                  {`${item.name}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.item}`}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFmedium color={colors.primary}>
                  {`${item.type}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.amnt}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};
export default DonationPaymentDetails;
