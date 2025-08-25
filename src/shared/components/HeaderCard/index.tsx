import React from 'react';
import {LAYOUT, RF} from '@theme';
import Text from '../text';
import {useSelector} from 'react-redux';
import {
  globalStyles,
  margin,
  navigate,
  navigationRef,
  openDrawer,
} from '@services';
import {useTheme} from '@react-navigation/native';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  TouchableHighlightProps,
  TouchableOpacity,
} from 'react-native';
import {
  backIcon,
  drawer,
  plus,
  notification,
  EditButton,
  crossIcon,
  LabMenu,
} from '@assets';

interface Props extends TouchableHighlightProps {
  icon1?: any;
  icon1Clr?: any;
  show?: any;
  icon2?: any;
  icon3?: any;
  title?: any;
  height?: any;
  twoInRow?: any;
  children?: any;
  plusIcon?: any;
  tintColor?: any;
  cardColor?: any;
  Profile?: any;
  iconFlase?: any;
  CrossEdit?: any;
  navigation?: any;
  NotColor?: any;
  onPress?: () => void;
  numberOfIcons?: any;
  home?: any;
  notify?: any;
  toggle?: any;
  emergency?: any;
  EmergencyOnpress?: any;
  setToggle?: any;
  clr?: any;
  userName?: boolean;
}

const HeaderCard = (props: Props) => {
  const {user} = useSelector((state: any) => state.root.user);
  const {lab} = useSelector((state: any) => state.root.b2b);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const theme: any = useTheme();
  const colors = theme.colors;
  const {
    icon1,
    icon2,
    icon3,
    title,
    height,
    onPress,
    twoInRow,
    plusIcon,
    children,
    cardColor,
    NotColor,
    tintColor,
    iconFlase,
    Profile,
    CrossEdit,
    numberOfIcons,
    home,
    notify,
    emergency,
    toggle,
    setToggle,
    show,
    EmergencyOnpress,
    userName,
    clr,
    icon1Clr,
  } = props;

  const styles = useStyles(colors, height, changeColor, cardColor);

  const goBack = () => {
    if (toggle == true) {
      setToggle(false);
    } else {
      navigationRef?.current?.goBack();
    }
  };

  const handlePlusIcon = () => {
    navigate('EmergencyScreen');
  };

  const handleDrawer = () => {
    openDrawer();
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: cardColor ? cardColor : changeColor,
        },
      ]}>
      {numberOfIcons == '3' ? (
        <View style={styles.row}>
          <View style={styles.space_row}>
            {plusIcon && (
              <Pressable
                onPress={
                  notify ? () => navigate('Notifications') : handlePlusIcon
                }>
                <Image
                  style={styles.icons}
                  tintColor={tintColor}
                  source={icon2 ? icon2 : plus}
                />
              </Pressable>
            )}
            {twoInRow && (
              <Pressable
                onPress={!icon3 ? () => navigate('Notifications') : null}>
                <Image
                  tintColor={icon3 ? null : tintColor}
                  source={icon3 ? icon3 : notification}
                  style={[styles.icons, {marginLeft: RF(15)}]}
                />
              </Pressable>
            )}
          </View>
        </View>
      ) : numberOfIcons == '2' ? (
        <View style={styles.row}>
          <Pressable
            style={{paddingVertical: 10}}
            onPress={icon1 ? onPress : goBack}>
            <Image
              style={[
                styles.icons,
                {tintColor: icon1Clr && icon1Clr, marginLeft: 24},
              ]}
              source={icon1 ? icon1 : backIcon}
            />
          </Pressable>
          <View style={[styles.space_row, styles.flexGrow]}>
            <Text size={16} SFregular color={colors.ThemeText}>
              {/* {userName == false ? null : (
                <Text
                  size={16}
                  SFregular
                  color={clr ? clr : '#fff'}
                  style={margin.left_16}>
                  {home ? '' : title ? title : 'Hi ' + user?.name}
                </Text>
              )} */}
            </Text>

            {iconFlase ? null : (
              <View style={{flexDirection: 'row'}}>
                {emergency && (
                  <Image style={styles.icons} source={icon2 ? icon2 : plus} />
                )}
                {notify && (
                  <Pressable onPress={() => navigate('Notifications')}>
                    <Image
                      style={styles.notifi}
                      tintColor={NotColor}
                      source={notification}
                    />
                  </Pressable>
                )}
                {Profile && (
                  <Pressable onPress={() => navigate('EditProfile')}>
                    <Image style={styles.notifi} source={EditButton} />
                  </Pressable>
                )}
                {CrossEdit && (
                  <Pressable onPress={() => navigate('UserProfile')}>
                    <Image
                      style={styles.notifi}
                      source={crossIcon}
                      tintColor={'#fff'}
                    />
                  </Pressable>
                )}
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.row}>
          <Pressable onPress={onPress ? onPress : goBack}>
            <Image style={styles.icons} source={icon1 ? icon1 : drawer} />
          </Pressable>

          {show && (
            <View style={styles.space_row}>
              <Pressable onPress={() => navigate('EmergencyScreen')}>
                <Image
                  style={styles.icons}
                  tintColor={tintColor}
                  source={icon2 ? icon2 : plus}
                />
              </Pressable>
              <Pressable onPress={() => navigate('Notifications')}>
                <Image
                  style={[styles.icons, {marginLeft: RF(15)}]}
                  source={icon3 ? icon3 : notification}
                />
              </Pressable>
            </View>
          )}
        </View>
      )}
      {children}
    </View>
  );
};

const useStyles = (
  colors: any,
  height: any,
  changeColor: any,
  cardColor: any,
) =>
  StyleSheet.create({
    card: {
      width: '100%',
      backgroundColor: cardColor,
      paddingTop: RF(58),
      paddingRight: LAYOUT.PADDING.HIGH,
      overlayColor: 'transparent',
      paddingBottom: LAYOUT.PADDING.NORMAL,
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    icons: {
      height: RF(20),
      width: RF(20),
      resizeMode: 'contain',
    },
    space_row: {
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    flexGrow: {
      justifyContent: 'space-between',
      paddingLeft: RF(16),
    },
    notifi: {
      width: RF(20),
      height: RF(20),
      resizeMode: 'contain',
      marginLeft: RF(15),
    },
  });

export default HeaderCard;
