import React, {useEffect, useRef, useState} from 'react';
import {getColorCode, RF} from '@theme';
import {GOOGLE_PLACES_API_KEY, margin, rs, rv} from '@services';
import {backIcon, crossIcon, live} from '@assets';
import {useTheme} from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
interface Props {
  back?: any;
  title?: any;
  cross?: any;
  iconLeft?: any;
  onChange?: any;
  setModalHeight?: any;
  type?: any;
  placeHolder?: any;
  placeHolderColor?: any;
  noAutoFocus?: any;
  textInputContainer?: any;
  disable?: any;
  loading?: any;
  onPressCross?: any;
  setIndicator?: any;
}
const LocationComponent = (props: Props) => {
  const {
    title,
    back,
    cross,
    iconLeft,
    onChange,
    type,
    setModalHeight,
    placeHolder,
    noAutoFocus,
    placeHolderColor,
    textInputContainer,
    loading,
    disable,
    onPressCross,
    setIndicator,
  } = props;
  const ref: any = useRef();
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);
  const {colorCode} = getColorCode();

  useEffect(() => {
    ref?.current?.setAddressText(title);
  }, []);

  const clear = async () => {
    await ref?.current?.clear();
    ref?.current?.setAddressText('');
    onPressCross();
  };

  return (
    // <ScrollView
    //   nestedScrollEnabled={true}
    //   style={{flexGrow: 1, backgroundColor: 'red'}}>
    <GooglePlacesAutocomplete
      ref={ref}
      // fetchDetails
      disableScroll
      placeholder={placeHolder ? placeHolder : 'Search Location'}
      // predefinedPlacesAlwaysVisible
      // autoFillOnNotFound={true}
      // listViewDisplayed={true}
      // keepResultsAfterBlur={true}
      // keyboardShouldPersistTaps="handled"
      // listEmptyComponent={() => <EmptyList />}
      listLoaderComponent={
        <ActivityIndicator
          size={'large'}
          style={margin?.top_32}
          color={colors?.primary}
        />
      }
      onPress={(data: any, details = null) => {
        if (onChange) {
          onChange(data, details);
        }
      }}
      query={{
        language: 'en',
        key: GOOGLE_PLACES_API_KEY,
      }}
      textInputProps={{
        style: {
          width: '80%',
          color: colors?.primary,
        },
        placeholderTextColor: placeHolderColor ? placeHolderColor : '#0D47A1',
        autoFocus: noAutoFocus ? false : true,
      }}
      currentLocationLabel={title}
      renderLeftButton={() => (
        <Pressable
          disabled={disable ? true : false}
          style={styles.leftIcon}
          onPress={() => setModalHeight && setModalHeight(220)}>
          <Image
            source={back ? backIcon : iconLeft ? iconLeft : live}
            style={styles.icon}
          />
        </Pressable>
      )}
      renderRightButton={() => (
        <>
          {cross ? (
            <Pressable hitSlop={20} style={styles.view} onPress={clear}>
              <Image source={crossIcon} style={styles.img} />
            </Pressable>
          ) : loading ? (
            <ActivityIndicator animating={loading} size={20} />
          ) : null}
        </>
      )}
      styles={{
        container: {
          padding: 0,
          paddingBottom: 0,
          paddingVertical: 0,
          paddingTop: 0,
        },
        listView: styles.list,
        description: styles.des,
        textInput: styles.txtInput,
        textInputContainer: [styles.txtContainer, {...textInputContainer}],
      }}
    />
    // </ScrollView>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    txtInput: {color: colors.primary},
    list: {
      zIndex: 1000,
      flex: 1,
    },
    des: {
      fontWeight: '400',
      color: colors.primary,
    },
    txtContainer: {
      backgroundColor: '#f5f5f5',
      height: rv(40),
      borderRadius: rs(8),
      paddingHorizontal: rs(8),
      // borderBottomWidth: 0.5,
      // borderWidth: 1,
      borderColor: colors.primary,
    },
    leftIcon: {
      alignItems: 'center',
      marginHorizontal: RF(8),
      justifyContent: 'center',
    },
    icon: {
      width: RF(16),
      height: RF(16),
      tintColor: colors.primary,
      resizeMode: 'contain',
    },
    input: {},
    view: {
      alignItems: 'center',
      marginHorizontal: RF(8),
      justifyContent: 'center',
    },
    img: {
      width: RF(16),
      height: RF(16),
      resizeMode: 'contain',
      tintColor: colors.primary,
    },
    main: {marginTop: RF(8)},
  });

export default LocationComponent;
