import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  AppButton,
  B2BCustomCheckbox,
  HeaderCard,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {backIcon, crossIcon} from '@assets';
import {useTheme} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import {RF} from '@theme';
import {navigate} from '@services';
const HospitalPackage = ({navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const theme: any = useTheme();
  const colors = theme.colors;
  const [chipsData, setChipsData] = useState([]);
  const handleCheckboxChange = (isChecked: any, label: any) => {
    if (isChecked) {
      // Add the label to the chipsData
      setChipsData(prevData => [...prevData, label]);
    } else {
      // Remove the label from the chipsData
      setChipsData(prevData => prevData.filter(item => item !== label));
    }
  };
  const handleRemoveChip = (label: any) => {
    setChipsData(prevData => prevData.filter(item => item !== label));
  };
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
    navigate('Accordianlist');
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        cardColor={colors.Insurance}
        numberOfIcons={'3'}
        onPress={openDrawer}
        icon1={backIcon}
        tintColor={colors.primary}>
        <UserHeaderContent
          ScreenTitle={'Hospitals'}
          ColorScreenTitle={colors.primary}
          searhIconTrue
          tintColor={colors.primary}
          searhIconTr
          tintTr={colors.primary}
          onlySearchIcon
        />
      </HeaderCard>
      <View style={{marginHorizontal: RF(24), marginVertical: RF(16)}}>
        {/* Render your outlined chips based on chipsData */}
        {chipsData.map((chip, index) => (
          <View
            key={index}
            style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
            <View
              style={{
                // borderWidth: 1,
                padding: 8,
                borderRadius: RF(12),
                backgroundColor: colors.DoctorButton,
              }}>
              <Text>{chip}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveChip(chip)}>
              <Image
                source={crossIcon}
                style={{
                  width: RF(12),
                  height: RF(12),
                  marginBottom: RF(20),
                  tintColor: colors.primary,
                }}
              />
            </TouchableOpacity>
          </View>
        ))}
        <B2BCustomCheckbox
          label="Doctor Hospital"
          onChange={(isChecked: any) =>
            handleCheckboxChange(isChecked, 'Doctor Hospital')
          }
        />
        <B2BCustomCheckbox
          label="Shukat khanam "
          onChange={(isChecked: any) =>
            handleCheckboxChange(isChecked, 'Shukat khanam')
          }
        />
        <B2BCustomCheckbox
          label="Shukat khanam"
          onChange={(isChecked: any) =>
            handleCheckboxChange(isChecked, 'Shukat khanam')
          }
        />
        <B2BCustomCheckbox
          label="Shukat khanam"
          onChange={(isChecked: any) =>
            handleCheckboxChange(isChecked, 'Shukat khanam')
          }
        />
        <B2BCustomCheckbox
          label="Shukat khanam"
          onChange={(isChecked: any) =>
            handleCheckboxChange(isChecked, 'Shukat khanam')
          }
        />
        <B2BCustomCheckbox
          label="Shukat khanam"
          onChange={(isChecked: any) =>
            handleCheckboxChange(isChecked, 'Shukat khanam')
          }
        />
        <B2BCustomCheckbox
          label="Shukat khanam"
          onChange={(isChecked: any) =>
            handleCheckboxChange(isChecked, 'Shukat khanam')
          }
        />
        <B2BCustomCheckbox
          label="Shukat khanam"
          onChange={(isChecked: any) =>
            handleCheckboxChange(isChecked, 'Shukat khanam')
          }
        />
        <AppButton
          m_Top={40}
          title="Save & Continue"
          bgColor={colors.Insurance}
          textcolor={colors.primary}
          onPress={handleOnPress}
        />
      </View>
    </Wrapper>
  );
};
export default HospitalPackage;
