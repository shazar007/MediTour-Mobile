import {RF, SCREEN_HEIGHT, SCREEN_WIDTH} from '@theme';
import Text from '../text';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {dropIcon} from '@assets';
import {rs} from '@services';

interface Props {
  type?: any;
  noMargin?: any;
  title?: any;
  children?: any;
  style?: any;
  f_size?: any;
  width?: any;
  containerStyle?: any;
  icon1Style?: any;
  iconSource_1?: any;
  renderIcon_2?: any;
  titleStyle?: any;
  dropDownData?: any;
  renderDropDownData?: any;
  onOpen?: any;
  open?: any;
  box?: any;
  lines?: any;
  flatListStyle?: any;
  dropIconStyle?: any;
  disabled?: any;
  backgroundColor?: any;
  mainContainerStyle?: any;
}

const RNDropDown = (props: Props) => {
  const {
    title,
    box,
    children,
    noMargin,
    style,
    f_size,
    width,
    containerStyle,
    icon1Style,
    iconSource_1,
    renderIcon_2,
    titleStyle,
    dropDownData,
    onOpen,
    type,
    open,
    lines,
    renderDropDownData,
    flatListStyle,
    dropIconStyle,
    disabled,
    backgroundColor,
    mainContainerStyle,
  } = props;

  return (
    <Pressable
      disabled={disabled}
      style={
        box == 'box'
          ? [styles.boxview, mainContainerStyle, mainContainerStyle]
          : [
              styles.open,
              {
                width: width ? width : '100%',
                borderBottomWidth: open ? 0 : 1,
              },
              containerStyle,
            ]
      }
      onPress={onOpen}>
      <View style={[styles.view, style]}>
        <View style={styles.row}>
          {iconSource_1 && (
            <Image
              source={(iconSource_1 && iconSource_1) || dropIcon}
              style={[
                (icon1Style && icon1Style) || styles.img,
                {marginRight: RF(15)},
              ]}
            />
          )}
          <Text
            style={titleStyle}
            size={f_size ? f_size : 14}
            numberOfLines={lines}>
            {title}
          </Text>
        </View>
        {(renderIcon_2 && <View>{renderIcon_2()}</View>) || (
          <Image source={dropIcon} style={[dropIconStyle, styles.img]} />
        )}
      </View>
      {open && (
        // <FlatList
        //   // scrollEnabled={false}
        //   nestedScrollEnabled
        //   data={dropDownData}
        //   style={flatListStyle}
        //   renderItem={({item}: any) => (
        //     <View>{renderDropDownData(item) && renderDropDownData(item)}</View>
        //   )}
        // />
        <ScrollView style={flatListStyle} nestedScrollEnabled>
          {dropDownData?.map((item: any, index: any) => (
            <View key={index}>
              {renderDropDownData(item) && renderDropDownData(item)}
            </View>
          ))}
        </ScrollView>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  _img: {width: RF(114), height: RF(64), resizeMode: 'contain'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  v: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  boxview: {
    // flexDirection: 'row',
    marginTop: RF(8),
    // alignItems: 'flex-end',
    backgroundColor: '#EDF1F3',
    paddingBottom: RF(16),
    color: '#000',
    borderColor: '#4A5568',
    paddingHorizontal: rs(14),
    paddingVertical: rs(17),
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: rs(14),
    borderRadius: 10,
  },
  line: {
    height: RF(1),
    backgroundColor: '#817E7E',
    opacity: 0.2,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
    justifyContent: 'space-between',
  },
  img: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
  },
  open: {
    width: '100%',
  },
  main: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default RNDropDown;
