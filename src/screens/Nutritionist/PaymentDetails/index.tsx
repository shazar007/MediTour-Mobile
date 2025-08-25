import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {HeaderCard, Line, Text, UserHeaderContent, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {backIcon} from '@assets';
import {Modalize} from 'react-native-modalize';
import {Image} from 'react-native';
import {RF} from '@theme';
import {PaymentDescription, PaymentDetailing, navigate} from '@services';

const NutritionistPaymentDetails = ({navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = (item: any) => {
    modalizeRef.current?.open();
    setSelectedItem(item);
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const back = () => {
    navigate('NutritionistPayment');
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        cardColor={colors.Nutritionist}
        numberOfIcons={'3'}
        onPress={back}
        icon1={backIcon}
        tintColor={colors.primary}>
        <UserHeaderContent
          ScreenTitle={'Payment Des..'}
          ColorScreenTitle={colors.primary}
          searhIconTrue
          tintColor={colors.primary}
          searhIconTr
          tintTr={colors.primary}
          onlySearchIcon
        />
      </HeaderCard>
      <View
        style={{
          marginTop: RF(8),
          marginRight: RF(16),
          paddingHorizontal: RF(8),
          paddingVertical: RF(8),
          borderWidth: 1,
          borderColor: '#33528A',
          borderRadius: RF(4),
          width: '56%',
          alignSelf: 'flex-end',
        }}>
        <Text size={14} SFsemiBold color={colors.primary}>
          Recieved Amount: 999/-
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: RF(16), paddingBottom: RF(72)}}>
          <View style={{paddingTop: RF(8)}}>
            <Text size={16} color={colors.primary} SFsemiBold>
              Payment ID: 321558
            </Text>
            {PaymentDetailing.map((item, index) => (
              <View
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
                backgroundColor: colors.background,
                elevation: 2,
                padding: RF(16),
                borderRadius: RF(8),
                borderLeftColor: colors.Nutritionist,
                borderLeftWidth: 2,
                marginVertical: RF(8),
              }}>
              <Text size={14} SFmedium color={colors.InactiveTabColor}>
                {`${item.idNum}`}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFmedium color={colors.primary}>
                  {`${item.numberplate}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.totalamnt}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default NutritionistPaymentDetails;

const styles = StyleSheet.create({});
