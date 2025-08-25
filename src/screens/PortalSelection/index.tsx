import {
  View,
  Platform,
  Dimensions,
  ImageBackground,
  Animated,
  Easing,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Carousel from 'react-native-snap-carousel';
import {SelectCard, Text, Wrapper} from '@components';
import useStyles from './styles';
import {SelectBackground} from '@assets';
import {useTheme} from '@react-navigation/native';
import {coffeeItems} from '@services';
import {useDispatch} from 'react-redux';
import {setChangeStack} from '@redux';

const {width} = Dimensions.get('window');

const PortalSelection = () => {
  const styles = useStyles({});
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();
  const slideAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const backAction = () => true;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handlePress = (itemName: any) => {
    dispatch(setChangeStack(itemName));
  };

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);

  const slideFromBottom = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'dark-content'}>
      <ImageBackground source={SelectBackground} style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.textContainer}>
            <Text size={32} SFbold color={colors.background}>
              Who are you
            </Text>
            <Text size={16} SFmedium color={colors.background}>
              Login/SignUp as a
            </Text>
          </View>
          <View style={styles.CarousalContainer}>
            <Carousel
              data={coffeeItems}
              renderItem={({item, id}: any) => (
                <Animated.View
                  style={{
                    translateY: slideFromBottom,
                  }}>
                  <SelectCard
                    item={item}
                    id={id}
                    colors={colors}
                    onPress={handlePress}
                  />
                </Animated.View>
              )}
              loopClonesPerSide={coffeeItems.length}
              autoplayDelay={0}
              autoplayInterval={1000}
              inactiveSlideScale={0.74}
              inactiveSlideOpacity={1}
              sliderWidth={width}
              itemWidth={width * 0.58}
              slideStyle={{
                display: 'flex',
                alignItems: 'center',
              }}
              decelerationRate={'fast'}
            />
          </View>
        </View>
      </ImageBackground>
    </Wrapper>
  );
};

export default PortalSelection;
