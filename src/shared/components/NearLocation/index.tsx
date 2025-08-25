import {RF} from '@theme';
import React from 'react';
import Text from '../text';
import {useSelector} from 'react-redux';
import {globalStyles, margin, rs} from '@services';
import {_5stars, fill_favourite, mediLogo} from '@assets';
import {useTheme} from '@react-navigation/native';
import {AirbnbRating} from 'react-native-ratings';
import {Image, Pressable, StyleSheet, View} from 'react-native';

interface Props {
  uri?: any;
  FVT?: any;
  item?: any;
  title?: any;
  source?: any;
  description?: any;
  DescriptionText?: any;
  onPress?: (item: any) => void;
}

const NearLocation = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {item, onPress, title, uri, source, FVT, description, DescriptionText} =
    props;
  const ratingCompleted = (rating: any) => {};

  //

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => onPress && onPress(item)}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.imgContainer}>
          <Image source={uri ? {uri: uri} : source} style={styles.image} />
        </View>
        <View style={styles.innerView}>
          <Text
            SFmedium
            size={13}
            numberOfLines={2}
            color={colors.blueText}
            style={{width: RF(180)}}>
            {title}
          </Text>

          <View
            style={[
              margin.top_4,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <AirbnbRating
              size={10}
              isDisabled={true}
              showRating={false}
              selectedColor={changeColor}
              onFinishRating={ratingCompleted}
              defaultRating={item?.averageRating ? item?.averageRating : 0}
            />
            <Text style={margin.left_16}>
              {item?.averageRating ? item?.averageRating : 0}
            </Text>

            {/* <Image source={_5stars} style={styles.star} /> */}
          </View>
          {DescriptionText && (
            <Text
              SFregular
              size={12}
              numberOfLines={2}
              color={colors.blueText}
              style={{width: '100%'}}>
              {description}
            </Text>
          )}
        </View>
      </View>
      {FVT && (
        <Image
          source={fill_favourite}
          style={{
            marginTop: RF(8),
            width: RF(16),
            height: RF(16),
            tintColor: 'red',
          }}
        />
      )}
    </Pressable>
  );
};

export default NearLocation;

const styles = StyleSheet.create({
  cardContainer: {
    // height: RF(75),
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: rs(8),
    elevation: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingRight: RF(8),
  },
  star: {height: RF(12), width: RF(92), resizeMode: 'contain'},
  innerView: {padding: RF(8)},
  image: {height: '100%', width: '100%'},
  imgContainer: {
    height: RF(75),
    width: RF(80),
    overflow: 'hidden',
  },
});
