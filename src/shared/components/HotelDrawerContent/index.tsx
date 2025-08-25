import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {
  cart,
  like,
  Right,
  logOut,
  Privacy,
  LabPhone,
  UserIcon,
  userAvatar,
  DonationDr,
} from '@assets';
import {setIsLoggedIn, setUser} from '@redux';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {navigate} from '@services';
import {DrawerContentScrollView} from '@react-navigation/drawer';

const DrawerContent = [
  {
    id: 1,
    ScreenName: 'Property',
    ScreenLogo: UserIcon,
    OnNavigate: 'PropertyBnb',
  },
  {
    id: 2,
    ScreenName: 'Setting',
    ScreenLogo: like,
    // OnNavigate: 'Favorite'
  },

  {
    id: 3,
    ScreenName: 'Privacy & Policy',
    ScreenLogo: Privacy,
    // OnNavigate: 'PrivacyPolicies',
  },
];

interface Props {
  navigation?: any;
}

const HotelDrawerContent = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const info: any = B2B?.hotel;
  const cartLength = cart?.length;

  return (
    // <DrawerContentScrollView {...props}>
    <ImageBackground
      source={DonationDr}
      style={{
        height: '100%',
        width: '100%',
      }}
      imageStyle={{width: '100%', height: '100%'}}>
      <View style={styles.view}>
        <View style={styles.inner}>
          <Image
            source={info?.logo ? {uri: info?.logo} : userAvatar}
            style={styles.img}
          />
          <View style={styles.txt}>
            <Text color={'#fff'} size={14} SFmedium>
              {info?.ownerFirstName}
            </Text>
            <View style={styles.image}>
              <Image source={LabPhone} style={styles.lab} />
              <Text size={12} SFmedium style={styles.ml} color={'#fff'}>
                {info?.phoneNumber}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text center SFmedium size={14} color={colors.background} />
      <View style={styles.main}>
        <FlatList
          data={DrawerContent}
          scrollEnabled={false}
          renderItem={({item}: any) => (
            <Pressable
              onPress={() => navigate(item?.OnNavigate)}
              style={styles.carLengthStyle}>
              {item?.cart && cartLength ? (
                <View style={styles.cartView}>
                  <Text size={10} color={'#fff'}>
                    {cartLength}
                  </Text>
                </View>
              ) : null}
              <View style={styles.imgTxt}>
                <Image
                  style={styles._img}
                  source={item?.ScreenLogo}
                  tintColor={item?.cart && cartLength ? colors.orange : '#fff'}
                />

                <Text SFmedium size={14} color={'#fff'}>
                  {item?.ScreenName}
                </Text>
              </View>
              <Image source={Right} tintColor={'#fff'} style={styles._img} />
            </Pressable>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(setIsLoggedIn(false));
          dispatch(setUser(null));
        }}
        style={styles._view}>
        <Image source={logOut} style={styles._img} />
        <Text color={'#fff'} size={14} SFmedium>
          LogOut
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default HotelDrawerContent;

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RF(32),
  },
  imgTxt: {
    gap: RF(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {marginHorizontal: RF(16), marginVertical: RF(16)},
  _img: {width: RF(24), height: RF(24), resizeMode: 'contain'},
  _view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(24),
    marginHorizontal: RF(16),
    marginVertical: RF(16),
  },
  ml: {marginLeft: 2},
  image: {flexDirection: 'row', alignItems: 'center', gap: RF(8)},
  lab: {width: RF(16), height: RF(16), tintColor: '#fff'},
  txt: {flexDirection: 'column', marginHorizontal: RF(16), gap: RF(8)},
  view: {
    marginHorizontal: RF(16),
    marginVertical: RF(24),
    top: RF(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inner: {flexDirection: 'row', alignItems: 'center'},
  carLengthStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RF(32),
  },
  cartView: {
    height: 16,
    width: 16,
    backgroundColor: '#EE7E37',
    borderRadius: 13,
    position: 'absolute',
    zIndex: 100,
    // left: RF(160),
    left: RF(10),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: RF(12),
  },
  img: {
    width: RF(48),
    height: RF(48),
    borderRadius: RF(32),
    resizeMode: 'contain',
  },
});
