import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {HeaderCard, Text, UserHeaderContent, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {ArrowLeft, EditButton, LabBell, LabDropDown, LabMenu} from '@assets';
import {Modalize} from 'react-native-modalize';
import {Image} from 'react-native';
import {RF} from '@theme';
import {DoctorsRequestsItems, navigate} from '@services';

const InsurancePayment = ({navigation}: any) => {
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
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const handleOnPress = () => {
    navigate('InsurancePaymentDetails');
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        home
        icon1={LabMenu}
        numberOfIcons={'3'}
        onPress={openDrawer}
        tintColor={colors.primary}
        cardColor={colors.Insurance}>
        <UserHeaderContent
          ScreenTitle={'Payment'}
          ColorScreenTitle={colors.primary}
          textColor={colors.primary}
          tintColor={colors.primary}
          tintTr={colors.primary}
        />
      </HeaderCard>
      <View
        style={{
          paddingHorizontal: RF(16),
          paddingVertical: RF(8),
          flexDirection: 'row',
        }}>
        <Text size={16} SFmedium color={colors.primary}>
          Total Payments = 1234
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: RF(16), paddingBottom: RF(72)}}>
          {DoctorsRequestsItems.map((item, index) => (
            <TouchableOpacity
              onPress={handleOnPress}
              key={index}
              style={{
                backgroundColor: colors.background,
                elevation: 2,
                padding: RF(16),
                borderRadius: RF(8),
                borderLeftColor: colors.primary,
                borderLeftWidth: RF(2),
                marginVertical: RF(8),
              }}>
              <Text size={16} SFmedium color={colors.primary}>
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
                    tintColor: colors.primary,
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

export default InsurancePayment;

const styles = StyleSheet.create({});
