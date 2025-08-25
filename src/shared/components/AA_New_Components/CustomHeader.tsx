import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  Text as RNText,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {navigate, navigationRef, openDrawer, rs, rv} from '@services';
import {backIcon, drawer, notification} from '@assets';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getColorCode} from '@theme';

const CustomHeader = ({
  ph,
  title,
  leftIcon,
  leftPress,
  bgColor,
  titleColor,
  notify,
  borderBottomWidth = 1,
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

  const {changeColor, changeStack} = useSelector(
    (state: any) => state.root.shiftStack,
  );
  const {user} = useSelector((state: any) => state.root.user);
  const {colorCode} = getColorCode();
  const onPress = () => navigationRef?.current?.goBack();

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          changeStack === 'User' ? changeColor : bgColor || colorCode,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        height: '13.3%',
      }}>
      <View
        style={[
          styles.section,
          {
            paddingHorizontal: ph ? ph : rs(16),
            backgroundColor: bgColor,
          },
        ]}>
        <Pressable
          style={leftIcon === 'drawer' ? styles?.drawer : styles.img}
          onPress={leftPress ? leftPress : onPress}>
          {leftIcon && (
            <Image
              source={leftIcon === 'drawer' ? drawer : backIcon}
              style={leftIcon === 'drawer' ? styles?.drawer : styles.img}
            />
          )}
        </Pressable>

        <RNText
          numberOfLines={2}
          style={{
            fontSize: rs(16),
            maxWidth: '70%',
            fontWeight: '700',
            textAlign: 'center',
            fontFamily: 'OmniaArabicITF-Bold',
            color: titleColor ? titleColor : colors.black,
          }}>
          {title}
        </RNText>

        {notify ? (
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
        ) : (
          <Image
            source={backIcon}
            style={styles.img}
            tintColor={'transparent'}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    section: {
      width: '100%',
      height: '100%',
      // height: rv(56),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBlockColor: colors._gray,
    },
    img: {
      width: rs(24),
      height: rv(24),
      resizeMode: 'contain',
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
  });

export default CustomHeader;
