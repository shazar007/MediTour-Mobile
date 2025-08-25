import {background_1, background_4, doctor_background} from '@assets';
import {AppButton, Text} from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {
  setChangeStack,
  setExchangeRate,
  setIsLoggedIn,
  setOneTimeonBoarding,
  setUser,
} from '@redux';
import {margin, navigate, rs, rv} from '@services';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@theme';
import React, {useState, useRef, useEffect} from 'react';

import {
  StatusBar,
  Dimensions,
  View,
  StyleSheet,
  Image,
  Animated,
  FlatList,
  Platform,
  Pressable,
} from 'react-native';

import {useDispatch} from 'react-redux';
const {width} = Dimensions.get('window');

const Data = [
  {
    title: 'MediTour Global',
    text1: '',
    text2:
      'Nature’s Heals and discover the healing power of Pakistan’s Natural Beauty, where everyone experiences the synergy of Medical Excellence and natural beauty in the heart of Pakistan as we redefine the boundaries of Medical Tourism and Wellness retreats',
    img: background_1,
  },
  {
    title: 'All Doctor',
    text1:
      'From Consultation to recovery, we are with you every step of the way',
    text2:
      "We connect you with world-class doctors and specialists across a range of medical fields. Whether you're seeking routine care, specialized treatments, or second opinions, our network of certified professionals is here",
    img: doctor_background,
  },
  {
    title: 'Travel & Tourism',
    text1:
      'Explore the Beauty of Pakistan. Experience the Best of Travel and Healthcare',
    text2:
      'From stunning mountains to lively cities, Pakistan offers the perfect blend of healthcare and adventure. Enjoy seamless travel with flights, visas, and transportation handled for you, along with guided cultural tours and top-rated accommodations tailored to your needs.',
    img: background_4,
  },
];

const OnBoarding = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const flatListRef = useRef(null);
  const dispatch = useDispatch();

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const handleGoToProvider = () => {
    navigate('JoinAsProvider');
  };

  const handleGoToLogin = () => {
    dispatch(setChangeStack('User'));
    navigate('New_Login');
  };

  const loginAsGuest = async () => {
    await dispatch(setChangeStack('User'));
    dispatch(setUser(null));
    dispatch(setIsLoggedIn(true));
  };

  const renderItem = ({item, index}: any) => {
    let indexCheck = index === 1 && true;

    return (
      <View
        key={index}
        style={{
          paddingTop: Platform.OS === 'ios' ? rv(75) : rv(60),
          alignItems: 'center',
          width: SCREEN_WIDTH,
          backgroundColor:
            activeIndex == 0
              ? colors.white
              : activeIndex == 1
              ? '#00276D'
              : activeIndex == 2
              ? colors.yellow
              : colors.white,
        }}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={activeIndex == 1 ? 'light-content' : 'dark-content'}
        />
        <Text
          size={36}
          SFbold
          center
          color={activeIndex == 1 ? colors.white : colors.text}
          style={[
            {
              fontWeight: Platform.OS === 'ios' ? '600' : '700',
            },
          ]}>
          {item.title}
        </Text>
        <Text
          size={12}
          SFregular
          color={activeIndex == 1 ? colors.white : colors.text}
          center
          style={[
            {
              width: index == 1 ? SCREEN_WIDTH - 40 : SCREEN_WIDTH - 20,
            },
          ]}>
          {item.text1}
        </Text>
        <View
          style={[
            styles.imageContainer,
            {
              width: '100%',
              height: '52%',
            },
          ]}>
          <Image source={item.img} style={styles.image} resizeMode="contain" />
        </View>

        <Text
          size={12}
          SFregular
          color={activeIndex == 1 ? colors.white : colors.text}
          center
          style={[
            {
              width: SCREEN_WIDTH - 40,
            },
          ]}>
          {item.text2}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            activeIndex == 0
              ? colors.white
              : activeIndex == 1
              ? '#00276D'
              : activeIndex == 2
              ? colors.yellow
              : colors.white,
        },
      ]}>
      <View style={{height: '70%'}}>
        <FlatList
          ref={flatListRef}
          data={Data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index: any) => index}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false, listener: handleScroll},
          )}
          scrollEventThrottle={16}
        />
      </View>
      <View style={styles.dotsContainer}>
        {Data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeIndex === index ? colors.LabOrange : '#ccc',
              },
            ]}
          />
        ))}
      </View>

      {/* <View>
        <FlatList
          ref={flatListRef}
          data={Data}
          horizontal
          pagingEnabled
          style={{borderWidth: 2, borderColor: 'green'}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index: any) => index}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false, listener: handleScroll},
          )}
          scrollEventThrottle={16}
        />
       
      </View> */}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 0,
          left: 0,
        }}>
        <AppButton
          title="SIGN IN"
          // width={RF(70)}
          containerStyle={{borderRadius: 40}}
          bgClr={colors.LabOrange}
          height={Platform.OS === 'ios' ? 40 : 40}
          onPress={handleGoToLogin}
          textcolor={'white'}
        />
        <Pressable onPress={handleGoToProvider} style={{alignSelf: 'center'}}>
          <Text
            size={Platform.OS === 'ios' ? 12 : 14}
            SFregular
            center
            color={activeIndex == 1 ? colors.white : colors.text}
            style={[
              {
                marginTop: 16,

                textDecorationLine: 'underline',
              },
            ]}>
            Join As a Provider
          </Text>
        </Pressable>
        <View style={styles?.RowButtonStyle}>
          <View
            style={{
              ...styles?.line,
              borderColor:
                activeIndex == 0
                  ? colors.light_grey
                  : activeIndex == 1
                  ? colors?.white
                  : colors.black,
            }}
          />
          <Text
            size={12}
            color={
              activeIndex == 0
                ? colors.extraLightText
                : activeIndex == 1
                ? colors?.white
                : colors.black
            }
            style={margin.Horizontal_8}>
            Or
          </Text>
          <View
            style={{
              ...styles?.line,
              borderColor:
                activeIndex == 0
                  ? colors.light_grey
                  : activeIndex == 1
                  ? colors?.white
                  : colors.black,
            }}
          />
        </View>
        <Text
          onPress={loginAsGuest}
          center
          size={12}
          color={
            activeIndex == 0
              ? '#0E54A3'
              : activeIndex == 1
              ? colors?.white
              : colors.black
          }
          style={margin.Vertical_16}>
          Explore our services as a guest
        </Text>
      </View>
    </View>
  );
};
export default OnBoarding;

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    imageContainer: {
      marginBottom: rv(24),
      marginTop: rv(16),
    },
    image: {
      width: '100%',
      height: '100%',
    },
    dotsContainer: {
      flexDirection: 'row',
      marginTop: rv(8),
      alignSelf: 'center',
    },
    dot: {
      height: 10,
      width: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: '#ccc',
    },
    RowButtonStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: rv(16),
      marginHorizontal: rs(24),
      //   marginBottom: Platform.OS == 'ios' ? rs(18) : rs(24),
    },
    line: {
      borderBottomWidth: 1,
      flexGrow: 1,
    },
  });
