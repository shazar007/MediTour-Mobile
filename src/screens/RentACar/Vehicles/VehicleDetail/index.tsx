import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import {CustomHeader, Text, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {globalStyles, margin} from '@services';
import {RF, SCREEN_WIDTH} from '@theme';
const VehicleDetail = ({route}: any) => {
  const {item} = route?.params;
  const Images = item?.vehicleImages;

  const theme: any = useTheme();
  const colors = theme.colors;
  const data = [
    {id: 0, title: 'Vehicle Type:', response: item?.vehicleType},
    {id: 1, title: 'Vehicle Modal:', response: item?.vehicleModel},
    {id: 2, title: 'Vehicle Year:', response: item?.vehicleYear},
    {id: 3, title: 'Vehicle Colour:', response: item?.vehicleColour},
    {id: 4, title: 'Vehicle ID No:', response: item?.vehicleVinNo},
    {
      id: 5,
      title: 'Registration Number:',
      response: item?.vehicleRegisterationNo,
    },
  ];

  const [activeSlide, setActiveSlide] = useState(1);

  const _renderItem = useCallback(({item, index}: any) => {
    return (
      <View style={styles?.imgView}>
        <Image source={{uri: item}} style={{height: '100%', width: '100%'}} />
      </View>
    );
  }, []);

  const Paginations = () => {
    return (
      <Pagination
        dotsLength={Images.length}
        activeDotIndex={activeSlide}
        containerStyle={styles?.container}
        dotStyle={styles.dot}
        inactiveDotStyle={styles?.inActiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Vehicle Detail'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <View style={margin?.top_24}>
        <Carousel
          data={Images}
          contentContainerStyle={{borderWidth: 1}}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={280}
          renderItem={_renderItem}
          onSnapToItem={index => setActiveSlide(index)}
          firstItem={1}
        />
        <Paginations />
      </View>

      <FlatList
        data={data}
        contentContainerStyle={{paddingHorizontal: RF(24)}}
        renderItem={({item}: any) => {
          return (
            <View style={{...globalStyles?.row, marginTop: RF(24)}}>
              <Text SFmedium color={colors?.primary}>
                {item?.title}
              </Text>
              <Text>{item?.response}</Text>
            </View>
          );
        }}
      />
    </Wrapper>
  );
};

export default VehicleDetail;

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  inActiveDot: {
    backgroundColor: 'gray',
  },
  container: {
    padding: 0,
    paddingVertical: 10,
  },
  imgView: {
    width: 280,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
