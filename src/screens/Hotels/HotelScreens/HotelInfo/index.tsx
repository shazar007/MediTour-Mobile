import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  AppTextInput,
  HeaderCard,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {
  HomeTabInActive,
  LabCountry,
  apartments,
  backIcon,
  bed,
  dropIcon,
  farmhouse,
  home,
  homes,
  homestay,
  hotels,
  hotelsone,
} from '@assets';
import {Text} from '@components';
import {useTheme} from '@react-navigation/native';
import {LAYOUT, RF} from '@theme';
import {globalStyles, navigate} from '@services';
import CheckBox from '@react-native-community/checkbox';
const HotelInfo = ({navigation}: any) => {
  const [checkBox, setCheckBox] = useState(false);
  const [ToggleCheckBox, setToggleCheckBox] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const openDrawer = () => {
    navigation.goBack('');
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        cardColor={colors.Hotel}
        numberOfIcons={'3'}
        onPress={openDrawer}
        icon1={backIcon}
        tintColor={colors.primary}>
        <UserHeaderContent
          ScreenTitle={'Hotel Info'}
          ColorScreenTitle={colors.primary}
          textColor={colors.primary}
          searhIconTrue
          tintColor={colors.primary}
          searhIconTr
          tintTr={colors.primary}
          onlySearchIcon
        />
      </HeaderCard>
      <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
        <View style={{marginHorizontal: RF(24), marginVertical: RF(16)}}>
          <AppTextInput placeholder="Your property  Name" m_Top={RF(16)} />
          <AppTextInput
            placeholder="Start Rating"
            m_Top={RF(16)}
            endIcon={dropIcon}
          />
          <AppTextInput placeholder="Wajahat Khan" m_Top={RF(8)} />
          <AppTextInput placeholder="Alternative Contact No." m_Top={RF(16)} />
          <AppTextInput
            placeholder="Province"
            m_Top={RF(16)}
            endIcon={dropIcon}
          />
          <AppTextInput placeholder="Property Address" m_Top={RF(16)} />
          <Text
            size={14}
            SFmedium
            color={colors.primary}
            style={{marginVertical: RF(8)}}>
            Note:{' '}
            <Text size={14} SFregular color={colors.primary}>
              You have multiple properties you want to list. Remember to fill in
              the information that corresponds to this property registration.
            </Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: RF(56),
              alignItems: 'center',
              marginBottom: RF(8),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                alignItems: 'center',
              }}>
              <CheckBox
                disabled={false}
                tintColors={{true: colors.primary, false: colors.primary}}
                value={ToggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text size={16} SFregular color={colors.primary}>
                Yes
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                alignItems: 'center',
              }}>
              <CheckBox
                disabled={false}
                tintColors={{true: colors.primary, false: colors.primary}}
                value={checkBox}
                onValueChange={newValue => setCheckBox(newValue)}
              />
              <Text size={16} SFregular color={colors.primary}>
                No
              </Text>
            </View>
          </View>
          <AppTextInput placeholder="Zip Code" m_Top={RF(0)} />
          <AppTextInput
            placeholder="Pakistan"
            m_Top={RF(16)}
            endIcon={LabCountry}
          />
          <AppButton
            title="Next"
            iconTrue
            tintColor={colors.primary}
            m_Top={RF(16)}
            bgColor={colors.Hotel}
            textcolor={colors.primary}
          />
          <Text
            size={14}
            SFlight
            color={colors.primary}
            style={{marginVertical: RF(8)}}>
            You have multiple properties you want to list. Remember to fill in
            the information that corresponds to this property registration.
          </Text>
        </View>
      </View>
    </Wrapper>
  );
};
export default HotelInfo;
