import {RF} from '@theme';
import {LabMenu} from '@assets';
import useStyles from './styles';
import {Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import {DoctorsRequestsItems} from '@services';
import {useTheme} from '@react-navigation/native';
import {HeaderCard, Text, UserHeaderContent, Wrapper} from '@components';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

const HospitalPayments = ({navigation}: any) => {
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

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        home
        icon1={LabMenu}
        numberOfIcons={'3'}
        onPress={openDrawer}
        cardColor={colors.Hospital}
        tintColor={colors.pharmacy}>
        <UserHeaderContent
          searhIconTr
          searhIconTrue
          ScreenTitle={'Payment'}
          tintColor={colors.primary}
          ColorScreenTitle={colors.primary}
        />
      </HeaderCard>
      <View
        style={{
          paddingHorizontal: RF(16),
          paddingVertical: RF(8),
          flexDirection: 'row',
        }}>
        <Text size={16} SFmedium color={colors.blueText}>
          Total Payments = 6
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: RF(16), paddingBottom: RF(72)}}>
          {DoctorsRequestsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: colors.background,
                elevation: 2,
                padding: RF(16),
                borderRadius: RF(8),
                borderLeftColor: colors.Hospital,
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
                  {`${item.DrName}`}
                </Text>
                <Text size={16} SFmedium color={colors.primary}>
                  {`${item.paymentId}`}
                </Text>
              </View>
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
                    tintColor: colors.Hospital,
                  }}
                />
              </View>
              <TouchableOpacity>
                <Text
                  size={14}
                  SFregular
                  color={colors.primary}
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

export default HospitalPayments;

const styles = StyleSheet.create({});
