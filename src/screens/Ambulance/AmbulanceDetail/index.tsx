import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {CustomHeader, Text, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {
  ArrowLeft,
  EditButton,
  LabBell,
  LabDropDown,
  LabMenu,
  backIcon,
} from '@assets';
import {Modalize} from 'react-native-modalize';
import {Image} from 'react-native';
import {RF} from '@theme';
import {
  AmbulanceDetailData,
  DoctorsRequestsItems,
  LabTestItems,
  PharmacyOrdersItems,
  margin,
  padding,
} from '@services';

const AmbulanceDetail = ({navigation}: any) => {
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
      <CustomHeader
        title={'Ambulance Detail'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      {/* <HeaderCard
        cardColor={colors.Ambulance}
        numberOfIcons={'3'}
        onPress={openDrawer}
        icon1={backIcon}
        tintColor={colors.primary}>
        <UserHeaderContent
          ScreenTitle={'Ambulance Detail'}
          ColorScreenTitle={colors.primary}
          searhIconTrue
          tintColor={colors.primary}
          searhIconTr
          onlySearchIcon
        />
      </HeaderCard> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: RF(24), paddingVertical: RF(24)}}>
          {AmbulanceDetailData.map((item, index) => (
            <View key={index}>
              <Text size={16} SFsemiBold color={colors.primary}>
                {`${item.FirstHeading}`}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.IdNumber}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.Vnum}`}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.name}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.type}`}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.color}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.Year}`}
                </Text>
              </View>
              <View style={{marginTop: RF(24)}}>
                <Text size={16} SFsemiBold color={colors.primary}>
                  {`${item.SecHeading}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.Price}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.PriceMedi}`}
                </Text>
              </View>
              <View style={{marginTop: RF(24)}}>
                <Text size={16} SFsemiBold color={colors.primary}>
                  {`${item.thirdHeading}`}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.Description}`}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default AmbulanceDetail;
