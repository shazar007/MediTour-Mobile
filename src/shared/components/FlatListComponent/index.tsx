import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {RF, SCREEN_WIDTH} from '@theme';

const FlatListComponent = ({data}: {data?: any}) => {
  return (
    <Carousel
      data={data?.propertyphoto}
      renderItem={({item}: any) => {
        //
        return (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  item ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
              }}
              style={styles.mainImage}
            />
          </View>
        );
      }}
      firstItem={0}
      loop={true}
      autoplay
      autoplayInterval={3000}
      inactiveSlideScale={0.8}
      inactiveSlideOpacity={2}
      sliderWidth={SCREEN_WIDTH}
      itemWidth={SCREEN_WIDTH}
    />
  );
};

export default FlatListComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  imageContainer: {
    height: RF(100),
    width: SCREEN_WIDTH - 42,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: RF(150),
    resizeMode: 'cover',
  },
});
