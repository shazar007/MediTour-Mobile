import {
  View,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {margin} from '@services';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

interface Props {
  pH?: any;
  pV?: any;
  selectColor?: any;
  c_b?: any;
  bgClr?: any;
  brWd?: any;
  width?: any;
  title?: any;
  title1?: any;
  onEdit?: any;
  rowStyle?: any;
  active?: any;
  colorMid?: any;
  bgColor?: any;
  styling?: any;
  selected?: any;
  titleSize?: any;
  startIcon?: any;
  textStyle?: any;
  textColor?: any;
  textColor1?: any;
  backCircle?: any;
  checkboxSize?: any;
  containerStyle?: any;
  tintColorStart?: any;
  title2?: any;
  onPress?: (i?: any) => void;
}
const CheckBox = (props: Props) => {
  const {
    c_b,
    pH,
    pV,
    brWd,
    bgClr,
    title,
    onEdit,
    title1,
    onPress,
    rowStyle,
    selected,
    textColor,
    textStyle,
    colorMid,
    selectColor,
    textColor1,
    startIcon,
    width,
    backCircle,
    checkboxSize,
    containerStyle,
    tintColorStart,
    title2,
  } = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const isSelected = selected == title;

  return (
    <Pressable
      onPress={() => onPress({id: 1, title: title})}
      style={[
        containerStyle,
        styles.conatiner,
        {
          paddingVertical: pV ? pV : 0,
          borderBottomWidth: brWd ? brWd : 0,
          paddingHorizontal: pH ? RF(pH) : 0,
          backgroundColor: isSelected ? bgClr : '',
          width: width ? width : '100%',
        },
      ]}>
      <View style={[styles.row, rowStyle]}>
        <View
          style={[
            styles.mainView,
            {
              width: checkboxSize ? RF(checkboxSize) : RF(16),
              borderColor: isSelected ? c_b : colors.blueText,
              height: checkboxSize ? RF(checkboxSize) : RF(16),
              backgroundColor: isSelected ? backCircle : '#fff',
            },
          ]}>
          <View
            style={[
              styles.view,
              {
                backgroundColor:
                  // active || isSelected ? colors.primary : 'transparent',
                  isSelected ? colorMid : 'transparent',
              },
            ]}></View>
        </View>

        <View>
          {title2 && (
            <Text
              style={[styles.txt, textStyle]}
              size={16}
              color={colors.primary}
              SFsemiBold>
              {title2}
            </Text>
          )}
          {title && (
            <Text
              SFmedium
              size={16}
              SFregular
              numberOfLines={1}
              style={[styles.txt, textStyle]}
              color={
                textColor
                  ? textColor
                  : // : active && isSelected
                  !isSelected
                  ? '#7d7d7d'
                  : selectColor
              }>
              {title}
            </Text>
          )}
          {title1 && (
            <Text
              size={16}
              SFregular
              style={[margin.left_8, textStyle]}
              color={textColor1 ? textColor1 : '#7d7d7d'}>
              {title1}
            </Text>
          )}
        </View>
      </View>
      {startIcon && (
        <TouchableOpacity onPress={onEdit} style={styles.lastView}>
          <Image
            source={startIcon}
            resizeMode={'contain'}
            style={[
              styles.img,
              {
                tintColor: tintColorStart,
              },
            ]}
          />
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    lastView: {
      width: '25%',
      alignItems: 'flex-end',
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
    },
    txt: {
      marginLeft: RF(8),
    },
    conatiner: {
      // paddingVertical: RF(8),
      borderColor: colors.blueText,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    column: {flexDirection: 'column'},
    mainView: {
      borderWidth: 1,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      width: '100%',
      marginTop: RF(8),
      flexDirection: 'row',
      alignItems: 'center',
    },
    view: {
      width: RF(10),
      height: RF(10),
      borderRadius: 100,
    },
    img: {
      width: RF(24),
      height: RF(24),
      marginLeft: RF(66),
    },
  });

export default CheckBox;
