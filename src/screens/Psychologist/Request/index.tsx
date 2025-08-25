import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {HeaderCard, Text, UserHeaderContent, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {
  ArrowLeft,
  Docmenu,
  EditButton,
  LabBell,
  LabDropDown,
  LabMenu,
} from '@assets';
import {Modalize} from 'react-native-modalize';
import {Image} from 'react-native';
import {RF} from '@theme';
import {
  DoctorsRequestsItems,
  LabTestItems,
  PharmacyOrdersItems,
  margin,
  padding,
} from '@services';

const PsycologistRequest = ({navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Accept', 'Reject'];
  const [toggle, setToggle] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  const handleOptionSelect = option => {
    setSelectedOption(option);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
  const toggleSearch = () => {
    setToggle(true);
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        cardColor={colors.psycologist}
        numberOfIcons={'3'}
        onPress={openDrawer}
        icon1={LabMenu}
        tintColor={colors.primary}>
        <UserHeaderContent
          ScreenTitle={'Requests'}
          ColorScreenTitle={colors.primary}
          toggle={toggle}
          searhIconTrue
          onPress={toggleSearch}
          tintColor={colors.primary}
          searhIconTr
          onlySearchIcon
        />
      </HeaderCard>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: RF(16),
            paddingBottom: RF(72),
            paddingVertical: RF(16),
          }}>
          {DoctorsRequestsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: colors.background,
                elevation: 2,
                padding: RF(16),
                borderRadius: RF(8),
                borderLeftColor: colors.psycologistIcon,
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
                <View style={{flexDirection: 'row'}}>
                  <Text size={8} SFmedium color={colors.primary}>
                    {`${item.date}`}
                  </Text>
                  <Text
                    size={8}
                    SFmedium
                    color={colors.primary}
                    style={{marginLeft: RF(8)}}>
                    {`${item.time}`}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFregular color={colors.primary}>
                  {`${item.des}`}
                </Text>
                <TouchableOpacity onPress={toggleDropdown}>
                  <Image
                    source={Docmenu}
                    style={{width: RF(24), height: RF(24)}}
                  />
                </TouchableOpacity>
                {showDropdown && (
                  <View style={styles.dropdown}>
                    {options.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.option}
                        onPress={() => handleOptionSelect(option)}>
                        <Text>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default PsycologistRequest;

const styles = StyleSheet.create({});
