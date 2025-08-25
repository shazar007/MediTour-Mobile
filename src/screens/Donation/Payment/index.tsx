import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {HeaderCard, Text, UserHeaderContent, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {LabMenu} from '@assets';
import {Modalize} from 'react-native-modalize';
import {Image} from 'react-native';
import {RF} from '@theme';
import {DoctorsRequestsItems, navigate} from '@services';

const DonationPayment = ({navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  const modalizeRef = useRef<Modalize>(null);
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const handleOnPress = () => {
    navigate('DonationPaymentDetails');
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        home
        icon1={LabMenu}
        numberOfIcons={'3'}
        onPress={openDrawer}
        cardColor={'#F4EFFF'}
        tintColor={colors.primary}>
        <UserHeaderContent
          ScreenTitle={'Payments'}
          ColorScreenTitle={colors.bluE}
          textColor={colors.primary}
          tintColor={colors.primary}
          tintTr={colors.primary}
        />
      </HeaderCard>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: RF(16), paddingBottom: RF(72)}}>
          {DoctorsRequestsItems.map((item, index) => (
            <TouchableOpacity
              onPress={handleOnPress}
              key={index}
              style={{
                backgroundColor: colors.Donation,
                elevation: 2,
                padding: RF(16),
                borderRadius: RF(8),
                borderLeftColor: colors.Doctor,
                borderLeftWidth: 2,
                marginVertical: RF(8),
              }}>
              <Text size={16} SFmedium color={colors.Doctor}>
                {`${item.paymentId}`}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.date}`}
                </Text>
                <Image
                  source={item.download}
                  style={{
                    width: RF(16),
                    height: RF(16),
                    tintColor: colors.Doctor,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.payment}`}
                </Text>
                <TouchableOpacity>
                  <Text
                    size={14}
                    SFregular
                    color={colors.primary}
                    style={{textAlign: 'right'}}>
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

export default DonationPayment;

const styles = StyleSheet.create({});
