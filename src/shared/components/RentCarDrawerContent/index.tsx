import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {
  cart,
  like,
  help,
  Right,
  logOut,
  Privacy,
  LabPhone,
  UserIcon,
  userAvatar,
  orders,
  order2,
  request,
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
} from 'react-native';
import {navigate} from '@services';
import {DrawerContentScrollView} from '@react-navigation/drawer';

const DrawerContent = [
  {
    id: 1,
    ScreenName: 'My Profile',
    ScreenLogo: UserIcon,
    OnNavigate: 'UserProfile',
  },
  {id: 2, ScreenName: 'Orders', ScreenLogo: cart, OnNavigate: 'Orders'},
  {id: 2, ScreenName: 'Orders', ScreenLogo: order2, OnNavigate: 'OverView'},
  {id: 3, ScreenName: 'Favorites', ScreenLogo: like, OnNavigate: 'Favorite'},
  {
    id: 4,
    ScreenName: 'Cart',
    cart: 'true',
    ScreenLogo: cart,
    OnNavigate: 'ViewCart',
  },
  {
    id: 5,
    ScreenName: 'Privacy & Policy',
    ScreenLogo: Privacy,
    OnNavigate: 'PrivacyPolicies',
  },
  {
    id: 6,
    ScreenName: 'Request',
    ScreenLogo: request,
    OnNavigate: 'Request',
  },
  {
    id: 7,
    ScreenName: 'Help Center',
    ScreenLogo: help,
    OnNavigate: 'HelpCenter',
  },
];

interface Props {
  navigation?: any;
}

const RentCarDrawerContent = (props: Props) => {
  const {navigation} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();
  const {user, cart} = useSelector((state: any) => state.root.user);
  const cartLength = cart?.length;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.view}>
        <View style={styles.inner}>
          <Image source={userAvatar} style={styles.img} />
          <View style={styles.txt}>
            <Text color={'#fff'} size={14} SFmedium>
              {user?.name}
            </Text>
            <View style={styles.image}>
              <Image source={LabPhone} style={styles.lab} />
              <Text size={12} SFmedium style={styles.ml} color={'#fff'}>
                {user?.phone}
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
    </DrawerContentScrollView>
  );
};

export default RentCarDrawerContent;

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
  image: {flexDirection: 'row', alignItems: 'center'},
  lab: {width: RF(16), height: RF(16), tintColor: '#fff'},
  txt: {flexDirection: 'column', marginHorizontal: RF(16)},
  view: {
    marginHorizontal: RF(16),
    marginVertical: RF(16),
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
  },
});
