import React from 'react';
import Text from '../text';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {RF} from '@theme';

const CustomRating = ({
  rating,
  size,
  title,
  onSubmitRating,
  mt,
}: {
  size?: any;
  title?: any;
  rating?: any;
  onSubmitRating?: any;
  mt?: any;
}) => {
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  return (
    <View style={{marginTop: mt ? RF(16) : 0}}>
      <Text size={16} SFmedium>
        {title}
      </Text>
      <View style={styles.main}>
        <AirbnbRating
          size={size ? size : 14}
          isDisabled={true}
          showRating={false}
          selectedColor={changeColor}
          onFinishRating={onSubmitRating}
          defaultRating={rating ? rating : 0}
        />
        <Text size={16} SFregular style={styles.touchable}>
          {rating}
        </Text>
        {/* <Image source={_5stars} style={styles.star} /> */}
      </View>
    </View>
  );
};

export default CustomRating;

const styles = StyleSheet.create({
  touchable: {marginRight: 5},
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
