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
  PharmacyPaymentDetail,
  ReservationDetails,
  globalStyles,
  navigate,
} from '@services';
const PharmacyPaymentDetails = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const back = () => {
    navigation.goBack('');
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        cardColor={colors.Pharmacy}
        numberOfIcons={'3'}
        onPress={back}
        icon1={backIcon}
        tintColor={colors.primary}>
        <UserHeaderContent
          ScreenTitle={'Payment Detail'}
          ColorScreenTitle={colors.primary}
          searhIconTrue
          tintColor={colors.primary}
          searhIconTr
          tintTr={colors.primary}
          onlySearchIcon
        />
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
              <View key={index} style={globalStyles.row}>
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
          {PharmacyPaymentDetail.map((item, index) => (
            <TouchableOpacity key={index} style={styles.DesignCard}>
              <View style={globalStyles.row}>
                <Text size={14} SFmedium color={colors.primary}>
                  {`${item.idNum}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.Quantity}`}
                </Text>
              </View>
              <View style={globalStyles.row}>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.testtype}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.price}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};
export default PharmacyPaymentDetails;
