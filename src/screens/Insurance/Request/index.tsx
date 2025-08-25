import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {HeaderCard, Text, UserHeaderContent, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {Docmenu, LabMenu} from '@assets';
import {Modalize} from 'react-native-modalize';
import {Image} from 'react-native';
import {RF} from '@theme';
import {DoctorsRequestsItems, globalStyles} from '@services';
const InsuranceRequest = ({navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Accept', 'Reject'];
  const [toggle, setToggle] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    toggleDropdown();
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
        cardColor={colors.DoctorButton}
        numberOfIcons={'3'}
        onPress={openDrawer}
        icon1={LabMenu}
        tintColor={colors.pharmacy}>
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
        <View style={styles.mainview}>
          {DoctorsRequestsItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.CardDesign}>
              <View style={globalStyles.row}>
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
                  {`${item.category}`}
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
export default InsuranceRequest;
