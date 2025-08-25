import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {HeaderCard, Text, UserHeaderContent, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {LabDropDown, LabMenu} from '@assets';
import {Modalize} from 'react-native-modalize';
import {Image} from 'react-native';
import {RF} from '@theme';
import {DoctorsRequestsItems, globalStyles, margin} from '@services';

const PsycologistAppointment = ({navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [toggle, setToggle] = useState(false);
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
          ScreenTitle={'Appointments'}
          ColorScreenTitle={colors.primary}
          toggle={toggle}
          searhIconTrue
          onPress={toggleSearch}
          tintColor={colors.primary}
          searhIconTr
          onlySearchIcon
        />
      </HeaderCard>
      <View
        style={{
          paddingHorizontal: RF(16),
          paddingVertical: RF(8),
          flexDirection: 'row',
        }}>
        <Text
          size={16}
          SFmedium
          color={colors.blueText}
          style={margin.bottom_8}>
          Current Appointment
        </Text>
        <Image
          source={LabDropDown}
          style={{width: RF(20), height: RF(20), tintColor: colors.primary}}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: RF(16),
            paddingBottom: RF(72),
          }}>
          {DoctorsRequestsItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.CardDesign}>
              <View style={globalStyles.row}>
                <Image
                  source={item.avatar}
                  style={{width: RF(48), height: RF(48)}}
                />
                <View style={{flex: 1, marginLeft: RF(8)}}>
                  <View style={globalStyles.rowSimple}>
                    <Text size={16} SFmedium color={colors.primary}>
                      {`${item.name}`}
                    </Text>
                    <Text
                      size={8}
                      SFlight
                      color={colors.primary}
                      style={{marginLeft: RF(8)}}>
                      {`${item.date}`}
                    </Text>
                    <Text
                      size={8}
                      SFlight
                      color={colors.primary}
                      style={{marginLeft: RF(8)}}>
                      {`${item.time}`}
                    </Text>
                  </View>
                  <Text size={14} SFregular color={colors.primary}>
                    {`${item.des}`}
                  </Text>
                  <Text size={14} SFregular color={colors.primary}>
                    {`${item.number}`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default PsycologistAppointment;

const styles = StyleSheet.create({});
