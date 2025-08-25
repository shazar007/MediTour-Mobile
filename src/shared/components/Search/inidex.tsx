import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import {search} from '@assets';
import {useSelector} from 'react-redux';

interface Props extends TextInputProps {
  placeHolder?: any;
  colors?: any;
  height?: any;
  b_Margin?: any;
  radius?: any;
  secondIcon?: any;
  onOpenModalize?: () => void;
  onChangeText?: any;
  onEndEditing?: any;
  onSubmitEditing?: any;
  noRadius?: any;
  bgColor?: any;
}

const Search = (props: Props) => {
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const {
    placeHolder,
    colors,
    height,
    b_Margin,
    radius,
    secondIcon,
    onOpenModalize,
    onChangeText,
    onEndEditing,
    onSubmitEditing,
    noRadius,
    bgColor,
    ...otherProps
  } = props;
  return (
    <View
      style={[
        styles.searchContainer,
        {
          height: height ? height : RF(48),
          borderRadius: radius ? radius : noRadius ? 0 : 16,
          backgroundColor: bgColor ? bgColor : '#F8F8F8',
        },
      ]}>
      <Image
        source={search}
        style={[
          styles.searchImg,
          {
            height: height ? height / 2.5 : 24,
            width: height ? height / 2.4 : 24,
          },
        ]}
      />

      <TextInput
        style={[
          styles.input,
          {
            fontSize: height ? height / 3 : 14,
            width: secondIcon ? '70%' : '80%',
          },
        ]}
        placeholder={placeHolder}
        placeholderTextColor={'gray'}
        // value={text}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        // onSelectionChange={onEndEditing}
        {...otherProps}
      />
      {secondIcon && (
        <Pressable onPress={onOpenModalize}>
          <Image
            source={secondIcon}
            style={[
              styles.searchImg,
              {
                height: 22,
                width: 22,
                marginLeft: 10,
                tintColor: changeColor,
              },
            ]}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    height: 50,
    paddingLeft: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F8F8F8',
    height: 'auto',
    width: '80%',
    // paddingHorizontal: 19,
    paddingVertical: 0,
    marginLeft: 8,
    color: '#080C2F',
  },
  searchImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
