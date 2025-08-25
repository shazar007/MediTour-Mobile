import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {HeaderCard, UserHeaderContent, Wrapper} from '@components';
import {
  HomeTabInActive,
  apartments,
  backIcon,
  home,
  homes,
  hotels,
} from '@assets';
import {Text} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {globalStyles, navigate} from '@services';
const HotelProperty = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const openDrawer = () => {
    navigation.goBack('');
  };
  const apartment = () => {
    navigate('ApartmentServices');
  };
  const HomeServices = () => {
    navigate('HomeServices');
  };
  const HotelServices = () => {
    navigate('HotelServices');
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
          ScreenTitle={'Property'}
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
          <Text size={14} SFregular color={colors.primary}>
            Book with us, and unlock your dream stay on
            <Text size={14} SFsemiBold color={colors.primary}>
              MediTour!"
            </Text>
          </Text>
          <Text size={14} SFregular color={colors.primary}>
            Select Your Comfort Zone On
            <Text size={14} SFsemiBold color={colors.primary}>
              {' '}
              MediTour
            </Text>{' '}
          </Text>
          <View style={[globalStyles.rowSimple, {gap: RF(20)}]}>
            <Pressable
              onPress={apartment}
              style={{
                backgroundColor: colors.background,
                elevation: 1,
                borderRadius: RF(8),
                paddingHorizontal: RF(20),
                paddingVertical: RF(40),
                marginVertical: RF(16),
                alignItems: 'center',
              }}>
              <Image
                source={apartments}
                style={{
                  tintColor: colors.primary,
                  width: RF(36),
                  height: RF(36),
                }}
              />
              <Text size={16} SFsemiBold color={colors.primary}>
                Apartments
              </Text>
            </Pressable>
            <Pressable
              onPress={HomeServices}
              style={{
                backgroundColor: colors.background,
                elevation: 1,

                borderRadius: RF(8),
                paddingVertical: RF(40),
                paddingHorizontal: RF(40),
                marginVertical: RF(16),
                alignItems: 'center',
              }}>
              <Image
                source={homes}
                style={{
                  tintColor: colors.primary,
                  width: RF(36),
                  height: RF(36),
                }}
              />
              <Text size={16} SFsemiBold color={colors.primary}>
                Homes
              </Text>
            </Pressable>
          </View>
          <View style={globalStyles.rowSimple}>
            <Pressable
              onPress={HotelServices}
              style={{
                backgroundColor: colors.background,
                elevation: 1,
                width: RF(140),
                // padding: RF(16),
                borderRadius: RF(8),
                paddingHorizontal: RF(16),
                paddingVertical: RF(32),
                alignItems: 'center',
              }}>
              <Image
                source={hotels}
                style={{
                  tintColor: colors.primary,
                  width: RF(36),
                  height: RF(36),
                }}
              />
              <Text
                size={16}
                SFsemiBold
                color={colors.primary}
                style={{textAlign: 'center'}}>
                Hotels, B&Bs & More
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

export default HotelProperty;

const styles = StyleSheet.create({});
