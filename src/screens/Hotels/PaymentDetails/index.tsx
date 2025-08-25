import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {HeaderCard, Line, Text, UserHeaderContent, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {backIcon} from '@assets';
import {Image} from 'react-native';
import {RF} from '@theme';
import {
  PaymentDescription,
  PaymentDetailing,
  ReservationDetails,
  globalStyles,
  navigate,
} from '@services';
const HotelPaymentDetails = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const back = () => {
    navigation.goBack('');
  };
  const InsurancePlan = () => {
    navigate('InsurancePlan');
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        cardColor={colors.Hotel}
        numberOfIcons={'3'}
        onPress={back}
        icon1={backIcon}
        tintColor={colors.primary}>
        {/* <UserHeaderContent
          ScreenTitle={'Payment Detail'}
          ColorScreenTitle={colors.primary}
          searhIconTrue
          tintColor={colors.primary}
          searhIconTr
          tintTr={colors.primary}
          onlySearchIcon
        /> */}
      </HeaderCard>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: RF(16), paddingBottom: RF(72)}}>
          <View
            style={{
              paddingTop: RF(8),
              backgroundColor: colors.background,
              paddingVertical: RF(8),
              paddingHorizontal: RF(8),
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
          {ReservationDetails.map((item: any, index: any) => (
            <TouchableOpacity key={index} style={styles.DesignCard}>
              <Text size={14} SFmedium color={colors.primary}>
                {`${item.ReservationId}`}
              </Text>
              <View style={globalStyles.row}>
                <Text size={14} SFmedium color={colors.primary}>
                  {`${item.name}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.date}`}
                </Text>
              </View>
              <View style={globalStyles.row}>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.totalpayment}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.time}`}
                </Text>
              </View>
              <View style={globalStyles.row}>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.category}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.type}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};
export default HotelPaymentDetails;
