import {
  View,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {RF, SCREEN_WIDTH} from '@theme';
import React from 'react';
import Text from '../text';
import {margin} from '@services';
import DropModal from '../DropModal';
import Search from '../Search/inidex';
import {useSelector} from 'react-redux';
import CustomModal from '../CustomModal';
import MarqueeText from 'react-native-marquee';
import {useTheme} from '@react-navigation/native';
import GradientModalContent from '../GradientModalcontent';
import {LabBell, filter, location, search, whiteSearch} from '@assets';

interface Props {
  drop?: any;
  size?: any;
  toggle?: any;
  tintTr?: any;
  options?: any;
  selected?: any;
  tintColor?: any;
  textColor?: any;
  searchOut?: any;
  nameTitle?: any;
  background?: any;
  showFilter?: any;
  placeHolder?: any;
  profileIcon?: any;
  ScreenTitle?: any;
  searhIconTr?: any;
  searhBarTrue?: any;
  searhIconTrue?: any;
  onlySearchIcon?: any;
  searhIconTrue1?: any;
  screen?: any;
  container?: any;
  onPress?: () => void;
  onPressLocation?: () => void;
  ColorScreenTitle?: any;
  onChangeText?: (i: any) => void;
  onEndEditing?: () => void;
  onOpenModalize?: () => void;
  onSubmitEditing?: (i: any) => void;
  handleDropDown?: (i?: any) => void;
  DescriptionText?: any;
  DescText?: any;
  TitleWidth?: any;
  ShareIcon?: any;
  onPresShareIcon?: any;
  HeartIcon?: any;
  Onpress?: any;
}
const ios = Platform.OS === 'ios';

const UserHeaderContent = (props: Partial<Props>) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {
    size,
    drop,
    tintTr,
    toggle,
    options,
    onPress,
    selected,
    tintColor,
    textColor,
    searchOut,
    nameTitle,
    background,
    showFilter,
    placeHolder,
    profileIcon,
    ScreenTitle,
    searhIconTr,
    searhBarTrue,
    onChangeText,
    searhIconTrue,
    onlySearchIcon,
    onOpenModalize,
    handleDropDown,
    onPressLocation,
    onSubmitEditing,
    ColorScreenTitle,
    searhIconTrue1,
    container,
    TitleWidth,
    onEndEditing,
    DescriptionText,
    DescText,
    ShareIcon,
    HeartIcon,
    onPresShareIcon,
    Onpress,
    screen,
    ...otherProps
  } = props;
  const styles = useStyles(colors);
  const {googleCredientials, selectedAddress, user} = useSelector(
    (state: any) => state.root.user,
  );
  const withGooglePhoto = googleCredientials?.photo;
  const withUser = user?.userImage;

  //

  let handleLoader = withGooglePhoto
    ? {uri: withGooglePhoto}
    : withUser
    ? {uri: withUser}
    : profileIcon
    ? true
    : false;

  //

  return (
    <>
      {toggle == true ? null : (
        <View style={[styles.rowContainer, container]}>
          {profileIcon ? (
            <View
              style={{
                height: ios ? RF(32) : RF(36),
                justifyContent: 'center',
                alignItems: 'center',
                width: ios ? RF(32) : RF(36),
                overflow: 'hidden',
                borderRadius: 100,
              }}>
              <Image
                source={
                  withGooglePhoto
                    ? {uri: withGooglePhoto}
                    : withUser
                    ? {uri: withUser}
                    : profileIcon
                }
                style={styles.img}
              />
            </View>
          ) : (
            <Text
              SFsemiBold
              numberOfLines={1}
              size={size ? size : 24}
              style={{width: TitleWidth, marginLeft: RF(24)}}
              color={ColorScreenTitle || colors.ThemeText}>
              {ScreenTitle ? ScreenTitle : selected}
            </Text>
          )}
          <View style={styles.flexGrow}>
            <View style={styles.txt}>
              <View style={{position: 'absolute'}}>
                {nameTitle && (
                  <Text
                    size={ios ? 14 : 16}
                    SFregular
                    style={{width: RF(180)}}
                    color={textColor || colors.ThemeText}
                    numberOfLines={2}>
                    {nameTitle}
                  </Text>
                )}
                {screen == 'home' && (
                  <MarqueeText
                    style={{
                      fontSize: 10,
                      width: SCREEN_WIDTH / 1.3,
                      color: textColor || colors.ThemeText,
                    }}
                    loop={true}
                    speed={0.1}
                    delay={1000}
                    numberOfLines={1}
                    marqueeOnStart={true}>
                    {selectedAddress?.address}
                  </MarqueeText>
                )}
              </View>

              {drop && (
                <DropModal
                  options={options}
                  selected={selected}
                  backgroundColor={background}
                  handleDropDown={handleDropDown}
                />
              )}
            </View>
            <View style={styles.justify}>
              {searhIconTrue && (
                <Pressable onPress={onPress}>
                  <Image
                    source={whiteSearch}
                    tintColor={tintColor}
                    style={[styles.smallIcon]}
                  />
                </Pressable>
              )}
              {searhIconTrue1 && (
                <Pressable onPress={onPress}>
                  <Image
                    source={filter}
                    tintColor={'#fff'}
                    style={[styles.smallIcon]}
                  />
                </Pressable>
              )}
              {searhIconTr && (
                <Pressable onPress={onPress}>
                  <Image
                    source={LabBell}
                    tintColor={tintTr}
                    style={[{width: RF(24), height: RF(24)}]}
                  />
                </Pressable>
              )}
              {onlySearchIcon
                ? null
                : // <Pressable onPress={onPressLocation} style={styles.search}>
                  //   <Image source={location} style={styles.smallIcon} />
                  //   <Text size={12} color={colors.ThemeText}>
                  //     Location
                  //   </Text>
                  // </Pressable>
                  ShareIcon && (
                    <Pressable onPress={onPresShareIcon}>
                      <Image
                        source={ShareIcon}
                        style={[styles._img, margin.Horizontal_8]}
                      />
                    </Pressable>
                  )}
              {searchOut && (
                <TouchableOpacity onPress={Onpress}>
                  <Image
                    source={HeartIcon ? HeartIcon : search}
                    style={[styles._img]}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
      {DescriptionText && (
        <Text size={12} color={colors.ThemeText}>
          {DescText}
        </Text>
      )}
      <View
        style={[
          searhBarTrue || toggle == true
            ? margin.top_24
            : {marginTop: 0, width: '100%', backgroundColor: 'red'},
        ]}>
        {searhBarTrue && <Search placeHolder={placeHolder} />}
        {toggle == true && (
          <Search
            radius={24}
            {...otherProps}
            onChangeText={onChangeText}
            onEndEditing={onEndEditing}
            placeHolder={placeHolder ? placeHolder : 'Search here...'}
            onOpenModalize={onOpenModalize}
            onSubmitEditing={onSubmitEditing}
            // secondIcon={showFilter ? filter : ''}
          />
        )}
        <CustomModal>
          <GradientModalContent />
        </CustomModal>
      </View>
    </>
  );
};

export default UserHeaderContent;

const useStyles = (colors: any) =>
  StyleSheet.create({
    _img: {height: RF(22), width: RF(22), tintColor: '#fff'},
    txt: {
      flexDirection: 'row',
      alignItems: 'center',
      // width: '60%',
    },
    rowContainer: {
      width: '100%',
      flexDirection: 'row',
      paddingTop: RF(16),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    img: {
      height: '100%',
      width: '100%',
    },
    flexGrow: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginLeft: 5,
      flexGrow: 1,
    },
    smallIcon: {
      height: RF(16),
      width: RF(16),
      marginRight: 5,
      marginLeft: RF(16),
    },
    justify: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    search: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: RF(5),
    },
  });
