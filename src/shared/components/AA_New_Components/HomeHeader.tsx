import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {navigate, rs, rv} from '@services';
import {
  Avatar1,
  cart_,
  dummyProfileIcon,
  notification,
  ProfileIcon,
} from '@assets';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Text} from '@components';
const HomeHeader = ({
  bgColor,
  titleColor,
}: {
  title?: any;
  leftIcon?: any;
  leftPress?: any;
  bgColor?: any;
  titleColor?: any;
  ph?: any;
  borderBottomWidth?: any;
  notify?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {googleCredientials, selectedAddress, user, cart} = useSelector(
    (state: any) => state.root.user,
  );
  let address = user?.address?.address;

  const withGooglePhoto = googleCredientials?.photo;
  const withUser = user?.userImage;
  console.log('🚀 ~ user.........:', user);

  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const cartLength = cart?.length;

  return (
    <SafeAreaView
      style={{
        backgroundColor: bgColor || changeColor,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        height: '14%',
        flexDirection: 'row',
      }}>
      <View style={styles?.section}>
        <View
          //  onPress={onPressProfile}

          style={styles?.profileImage}>
          <Image
            source={
              withGooglePhoto
                ? {uri: withGooglePhoto}
                : withUser
                ? {uri: withUser}
                : {
                    uri: 'https://microbiology.ucr.edu/sites/default/files/styles/form_preview/public/blank-profile-pic.png?itok=4teBBoet',
                  }
            }
            style={styles.profile_img}
          />
        </View>
        <View style={{flexGrow: 1}}>
          <Text color={'#fff'} size={16}>
            Hi,{'  '}
            <Text color={'#fff'} SFsemiBold size={14}>
              {user?.name || 'Guest'}
            </Text>
          </Text>

          {user !== null && (
            <Text
              numberOfLines={1}
              color={'#fff'}
              size={10}
              style={{
                marginTop: Platform.OS === 'ios' ? rv(4) : rv(2),
                width: rs(180),
              }}>
              {address}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexGrow: 1,
          paddingRight: rs(16),
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: rs(8),
        }}>
        <Pressable
          disabled={user === null ? true : false}
          style={{padding: rs(5)}}
          onPress={() => navigate('ViewCart')}>
          {cartLength ? (
            <View style={[styles.cartView]}>
              <Text size={10} color={'#fff'}>
                {cartLength}
              </Text>
            </View>
          ) : null}
          {user !== null && (
            <Image
              tintColor={titleColor ? titleColor : colors.black}
              source={cart_}
              style={styles.notifyIcon}
            />
          )}
        </Pressable>
        <Pressable
          disabled={user === null ? true : false}
          onPress={() => navigate('Notifications')}>
          {user !== null && (
            <Image
              tintColor={titleColor ? titleColor : colors.black}
              source={notification}
              style={styles.notifyIcon}
            />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    section: {
      width: '75%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rs(16),
      paddingRight: 0,
    },
    img: {
      width: rs(24),
      height: rv(24),
      resizeMode: 'contain',
    },
    profile_img: {
      height: '100%',
      width: '100%',
    },
    drawer: {
      width: rs(20),
      height: rv(20),
      resizeMode: 'contain',
    },

    notifyIcon: {
      width: rs(20),
      height: rv(24),
      resizeMode: 'contain',
    },

    profileImage: {
      height: rs(40),
      width: rs(40),
      borderRadius: rs(20),
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      marginRight: rs(8),
      borderWidth: 2,
      borderColor: '#fff',
    },

    cartView: {
      height: rv(16),
      width: rs(16),
      backgroundColor: '#EE7E37',
      borderRadius: 13,
      position: 'absolute',
      zIndex: 100,
      right: 0,
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default HomeHeader;
