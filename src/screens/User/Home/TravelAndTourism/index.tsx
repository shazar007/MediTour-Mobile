import {View} from 'react-native';
import React, {useState} from 'react';
import {
  Wrapper,
  HeaderCard,
  HotelContent,
  UserHeaderContent,
  CustomFlatTab,
  CustomHeader,
} from '@components';
import {UserBell} from '@assets';
import {useSelector} from 'react-redux';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
const UserTravelAndTourism = () => {
  const [selected, setSelected] = useState('Hotels');
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#FAF9F6'}}>
        <CustomHeader
          title={selected}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <View>
          {/* <View style={{marginTop: RF(20), marginHorizontal: RF(20)}}>
            <CustomFlatTab
              data={custom}
              initialState={selected}
              handlePress={handleDropDown}
              contentContainerStyle={{
                justifyContent: 'space-between',
                width: '100%',
              }}
            />
          </View> */}
          {selected === 'Hotels' && <HotelContent />}
        </View>
      </View>
    </Wrapper>
  );
};

export default UserTravelAndTourism;
