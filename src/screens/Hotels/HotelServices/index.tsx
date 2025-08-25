import {
  Image,
  Pressable,
  ScrollView,
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
  bed,
  farmhouse,
  home,
  homes,
  homestay,
  hotels,
  hotelsone,
} from '@assets';
import {Text} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {globalStyles, navigate} from '@services';
const HotelServices = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const openDrawer = () => {
    navigation.goBack('');
  };
  // const apartment = () => {
  //   navigate('ApartmentServices');
  // };
  // const HomeServices = () => {
  //   navigate('HomeServices');
  // };
  const HotelInfo = () => {
    navigate('HotelInfo');
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
        <View style={{marginHorizontal: RF(20), marginVertical: RF(16)}}>
          <Text size={14} SFregular color={colors.primary}>
            Which category is the best for your place? choose your comfortzone
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: RF(88)}}>
            <View
              style={[
                globalStyles.rowSimple,
                {gap: RF(10), marginTop: RF(12)},
              ]}>
              <Pressable
                onPress={HotelInfo}
                style={{
                  backgroundColor: colors.background,
                  elevation: 1,
                  width: RF(140),
                  borderRadius: RF(16),
                  paddingHorizontal: RF(16),
                  paddingVertical: RF(40),
                  alignItems: 'center',
                  borderWidth: 0.5,
                  borderColor: colors.primary,
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
                  Hotels
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: colors.background,
                  elevation: 1,
                  borderRadius: RF(16),
                  paddingVertical: RF(40),
                  paddingHorizontal: RF(24),
                  alignItems: 'center',
                  borderWidth: 0.5,
                  borderColor: colors.primary,
                }}>
                <Image
                  source={homes}
                  style={{
                    tintColor: colors.primary,
                    width: RF(36),
                    height: RF(36),
                  }}
                />
                <Text size={14} SFsemiBold color={colors.primary}>
                  Guest House
                </Text>
              </Pressable>
            </View>
            <View style={[globalStyles.rowSimple, {gap: RF(10)}]}>
              <Pressable
                // onPress={HotelServices}
                style={{
                  backgroundColor: colors.background,
                  elevation: 1,
                  width: RF(140),
                  borderRadius: RF(16),
                  paddingHorizontal: RF(16),
                  paddingVertical: RF(40),
                  alignItems: 'center',
                  borderWidth: 0.5,
                  borderColor: colors.primary,
                }}>
                <Image
                  source={homestay}
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
                  Homestay
                </Text>
              </Pressable>
              <Pressable
                // onPress={HomeServices}
                style={{
                  backgroundColor: colors.background,
                  elevation: 1,
                  borderRadius: RF(16),
                  paddingVertical: RF(40),
                  paddingHorizontal: RF(42),
                  marginVertical: RF(12),
                  alignItems: 'center',
                  borderWidth: 0.5,
                  borderColor: colors.primary,
                }}>
                <Image
                  source={hotelsone}
                  style={{
                    tintColor: colors.primary,
                    width: RF(36),
                    height: RF(36),
                  }}
                />
                <Text size={14} SFsemiBold color={colors.primary}>
                  Hostels
                </Text>
              </Pressable>
            </View>
            <View style={[globalStyles.rowSimple, {gap: RF(10)}]}>
              <Pressable
                // onPress={HotelServices}
                style={{
                  backgroundColor: colors.background,
                  elevation: 1,
                  width: RF(142),
                  borderRadius: RF(16),
                  paddingHorizontal: RF(5),
                  paddingVertical: RF(40),
                  alignItems: 'center',
                  borderWidth: 0.5,
                  borderColor: colors.primary,
                }}>
                <Image
                  source={bed}
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
                  Bed & Breakfast
                </Text>
              </Pressable>
              <Pressable
                // onPress={HomeServices}
                style={{
                  backgroundColor: colors.background,
                  elevation: 1,
                  borderRadius: RF(16),
                  paddingVertical: RF(40),
                  paddingHorizontal: RF(34),
                  alignItems: 'center',
                  borderWidth: 0.5,
                  borderColor: colors.primary,
                }}>
                <Image
                  source={homestay}
                  style={{
                    tintColor: colors.primary,
                    width: RF(36),
                    height: RF(36),
                  }}
                />
                <Text size={14} SFsemiBold color={colors.primary}>
                  Homestay
                </Text>
              </Pressable>
            </View>
            <View
              style={[
                globalStyles.rowSimple,
                {gap: RF(10), marginVertical: RF(12)},
              ]}>
              <Pressable
                // onPress={HotelServices}
                style={{
                  backgroundColor: colors.background,
                  elevation: 1,
                  width: RF(142),
                  borderRadius: RF(16),
                  paddingHorizontal: RF(5),
                  paddingVertical: RF(40),
                  alignItems: 'center',
                  borderWidth: 0.5,
                  borderColor: colors.primary,
                }}>
                <Image
                  source={farmhouse}
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
                  Bed & Breakfast
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Wrapper>
  );
};

export default HotelServices;

const styles = StyleSheet.create({});
