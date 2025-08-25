import Text from '../text';
import React, {useState} from 'react';
import {star, unselectStar} from '@assets';
import {globalStyles, margin, starData} from '@services';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';

interface Props {
  size?: any;
  colors?: any;
  rating?: any;
  setRating?: any;
}

const Ratings = ({colors, size, rating, setRating}: Props) => {
  const [selectedStars, setSelectedStars] = useState(
    Array(starData.length).fill(false),
  );
  const handleStarPress = (index: number) => {
    const newSelectedStars = selectedStars.map((_, i) => i <= index);
    setSelectedStars(newSelectedStars);

    const calculatedRating = newSelectedStars.filter(
      isSelected => isSelected,
    ).length;
    setRating(calculatedRating);
  };

  return (
    <View style={[styles?.row, margin.top_8]}>
      <View style={styles.container}>
        {starData.map((d, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => handleStarPress(index)}
            style={styles.touchable}>
            <Image
              source={selectedStars[index] ? star : unselectStar}
              style={[styles.imageStyle, {height: size, width: size}]}
            />
          </TouchableOpacity>
        ))}

        <View style={styles.view}>
          <Text size={16} SFregular color={colors} style={styles.touchable}>
            {rating !== null ? `${rating}.0-` : '0.0-'}{' '}
            {/* Display rating if available */}
            <Text size={16} SFregular color={colors} style={styles.touchable}>
              5.0
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Ratings;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'contain',
    marginRight: 5,
  },
  touchable: {marginRight: 5},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
