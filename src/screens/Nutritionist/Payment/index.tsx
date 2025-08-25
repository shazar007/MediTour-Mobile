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

const NutritionistPayment = ({navigation}: any) => {
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
    navigate('NutritionistPaymentDetails');
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        cardColor={colors.Nutritionist}
        numberOfIcons={'3'}
        onPress={openDrawer}
        icon1={LabMenu}
        tintColor={colors.primary}>
        <UserHeaderContent
          ScreenTitle={'Patient Payments'}
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
          paddingHorizontal: RF(16),
          paddingVertical: RF(8),
          flexDirection: 'row',
        }}>
        <Text size={16} SFmedium color={colors.blueText}>
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
                borderLeftColor: colors.Nutritionist,
                borderLeftWidth: 2,
                marginVertical: RF(8),
              }}>
              <Text size={16} SFmedium color={colors.Nutritionist}>
                {`${item.paymentId}`}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFmedium color={colors.primary}>
                  {`${item.name}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.date}`}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFmedium color={colors.primary}>
                  {`${item.meeting}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.payment}`}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.perItem}`}
                </Text>
                <Image
                  source={item.download}
                  style={{
                    width: RF(16),
                    height: RF(16),
                    tintColor: colors.Nutritionist,
                  }}
                />
              </View>
              <TouchableOpacity>
                <Text
                  size={14}
                  SFregular
                  color={colors.Doctor}
                  style={{textAlign: 'right'}}>
                  filename.pdf
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default NutritionistPayment;

const styles = StyleSheet.create({});
