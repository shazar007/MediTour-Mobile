import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {Pressable, StyleSheet, View} from 'react-native';
import {rs, rv} from '@services';

interface Props {
  size?: any;
  card1?: any;
  card2?: any;
  initialState?: any;
  activeColor?: any;
  inActiveColor?: any;
  activeTextColor?: any;
  bottom?: any;
  inActiveTextColor?: any;
  card3?: any;
  height?: any;
  padding?: any;
  width?: any;
  handlePress: (item: any) => void;
}

const SwapCards = (props: Props) => {
  const {
    size,
    card1,
    card2,
    initialState,
    activeColor,
    handlePress,
    activeTextColor,
    inActiveTextColor,
    bottom,
    card3,
    height,
    padding,
    width,
  } = props;

  return (
    <View
      style={[
        styles.cardContainer,
        {
          height: height ? null : rv(40),
          width: width ? null : rs(230),
          bottom: bottom ? bottom : rv(10),
        },
      ]}>
      <Pressable
        onPress={() => handlePress(card1)}
        style={[
          styles.main,
          {
            width: width ? null : '50%',
            height: height ? null : '100%',
            padding: padding ? RF(10) : 0,
            backgroundColor: initialState == card1 ? activeColor : '#F5F5F5',
            borderRightWidth: 2,
            borderColor: '#fff',
          },
        ]}>
        <Text
          size={size ? size : 16}
          style={{fontWeight: '600'}}
          SFmedium
          color={initialState == card1 ? activeTextColor : inActiveTextColor}>
          {card1}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => handlePress(card2)}
        style={[
          styles.main,
          {
            backgroundColor: initialState == card2 ? activeColor : '#F5F5F5',
            borderLeftWidth: 2,
            borderColor: '#fff',
            width: width ? null : '50%',
            height: height ? null : '100%',
            padding: padding ? RF(10) : 0,
          },
        ]}>
        <Text
          size={size ? size : 16}
          SFmedium
          color={initialState == card2 ? activeTextColor : inActiveTextColor}>
          {card2}
        </Text>
      </Pressable>
      {card3 && (
        <Pressable
          onPress={() => handlePress(card3)}
          style={[
            styles.main,
            {
              backgroundColor: initialState == card3 ? activeColor : '#F5F5F5',
              borderLeftWidth: 2,
              borderColor: '#fff',
              width: width ? null : '50%',
              height: height ? null : '100%',
              padding: padding ? RF(10) : 0,
            },
          ]}>
          <Text
            size={size ? size : 16}
            SFmedium
            color={initialState == card3 ? activeTextColor : inActiveTextColor}>
            {card3}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default SwapCards;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    // height: RF(42),
    // width: RF(230),
    borderRadius: 30,
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 0.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
