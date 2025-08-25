import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {
  UserBell,
  backIcon,
  starfilter,
} from '@assets';
import {
  colors,
  globalStyles,
  margin,
  navigate,
} from '@services';
import {RF} from '@theme';
import {AirbnbRating} from 'react-native-ratings';
import {Image} from 'react-native-animatable';
import {useSelector} from 'react-redux';

const Reviews = ({navigation, route}: any) => {
  const [toggle, setToggle] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const {ratings} = route.params;
  const {rentACarName} = route.params;
  const {AvrgRating} = route.params;
  const {AverageCount} = route.params;
  const ratingCompleted = (rating: any) => {};

  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const handleToggleFavorite = () => {
    setIsFavorited(prevState => !prevState);
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'dark-content'}>
      <HeaderCard
        navigation={navigation}
        icon1={backIcon}
        numberOfIcons={'3'}
        twoInRow
        icon3={UserBell}>
        <UserHeaderContent ScreenTitle={rentACarName} />
      </HeaderCard>
      <View style={{marginHorizontal: RF(16), marginTop: RF(16)}}>
        <View style={[globalStyles.rowSimple, {gap: RF(8)}, margin.Vertical_4]}>
          <Image
            source={starfilter}
            style={{width: RF(16), height: RF(16), tintColor: colors.primary}}
          />
          <Text size={14} SFmedium color={colors.primary}>
            {AvrgRating}
          </Text>
          <Text size={14} SFmedium color={colors.primary}>
            {`(${AverageCount}) review`}
          </Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={ratings}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: RF(8),
                elevation: 1,
                marginVertical: RF(4),
                marginHorizontal: RF(4),
              }}>
              <View style={{marginHorizontal: RF(16), marginVertical: RF(8)}}>
                <Text size={14} SFmedium color={colors.primary}>
                  {item?.userName}
                </Text>
                <Text size={12} SFregular color={colors.primary}>
                  {item?.timeAgo}
                </Text>
                <Text size={12} SFlight color={colors.primary}>
                  {item?.review}
                </Text>
                <View
                  style={[
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      // borderWidth: 1,
                      marginTop: RF(4),
                      // justifyContent: 'space-between',
                      gap: RF(41),
                    },
                  ]}>
                  <AirbnbRating
                    size={24}
                    showRating={false}
                    isDisabled={true}
                    selectedColor={changeColor}
                    onFinishRating={ratingCompleted}
                    defaultRating={item?.rating ? item?.rating : 0}
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </Wrapper>
  );
};

export default Reviews;

const styles = StyleSheet.create({});
