import {
  Animated,
  Image,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  CustomHeader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import {setChangeColor} from '@redux';
import {margin, navigate} from '@services';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {Rent, TravelFlight, TravelTour, UserBell, hotel, t} from '@assets';
import {RF, SCREEN_WIDTH} from '@theme';
import Carousel from 'react-native-snap-carousel';
import {TravelCrousalProps} from '../userProps';

const MainHTR = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [activeIndex, setActiveIndex] = useState(0);
  const translateY = useRef(new Animated.Value(-100)).current;
  const translateX = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  const styles = useStyles();
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setChangeColor('#00276D'));
    }, []),
  );

  const handlePress = (index: number) => {
    if (index === 0) {
    }
    // else if (index === 1) {
    //   navigateToHotel();
    // }
    else if (index === 1) {
      navigateToRentAcar();
    }
  };

  // const navigateToHotel = () => {
  //   handleTour('UserTravelAndTourism', '#2D6977');
  // };

  const navigateToRentAcar = () => {
    handleTour('UserRentCarHome', '#2A8FAF');
  };

  const handleTour = (screenName: string, colorCode: string) => {
    navigate(screenName);
    dispatch(setChangeColor(colorCode));
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={'Travel & Tourism'}
          leftIcon
          titleColor={colors.white}
          notify
        />
        <View style={styles.MainContainer}>
          <View style={{marginHorizontal: RF(16)}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: RF(32),
              }}>
              {[t, Rent].map((source, index) => (
                <TouchableHighlight
                  key={index}
                  style={{
                    width: RF(48),
                    height: RF(48),
                    borderRadius: RF(24),
                    elevation: 0.7,
                    marginLeft: RF(24),
                  }}
                  underlayColor="#DDDDDD"
                  onPress={() => handlePress(index)}>
                  <View
                    style={{
                      backgroundColor:
                        activeIndex === index ? '#396DB2' : '#FFF',
                      borderRadius: RF(24),
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: RF(48),
                      height: RF(48),
                    }}>
                    <Image
                      source={source}
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        width: RF(32),
                        height: RF(32),
                        tintColor:
                          activeIndex === index ? '#fff' : colors.primary,
                      }}
                    />
                  </View>
                </TouchableHighlight>
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: RF(32),
              }}>
              <Text size={14} SFsemiBold color={colors.primary}>
                Travel agency
              </Text>
              <Text size={14} SFsemiBold color={colors.primary}>
                Rent a Car
              </Text>
            </View>
          </View>

          {activeIndex !== 1 && activeIndex !== 2 ? (
            <View
              style={{
                flexDirection: 'row',
                gap: RF(8),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => handleTour('TourHome', '#4D4E8D')}
                style={{marginTop: RF(24), width: '48%', height: RF(120)}}>
                <ImageBackground
                  source={TravelTour}
                  resizeMode="cover"
                  imageStyle={{borderRadius: RF(16)}}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: RF(120),
                    borderRadius: RF(16),
                    overflow: 'hidden',
                  }}>
                  <View style={styles.overlay} />
                  <Text
                    size={14}
                    SFmedium
                    color={colors.white}
                    style={{position: 'absolute', top: RF(20), left: RF(16)}}>
                    Tours
                  </Text>
                  <Text
                    size={14}
                    SFregular
                    color={colors.white}
                    style={{position: 'absolute', top: RF(38), left: RF(16)}}>
                    Best Place
                  </Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleTour('UserTravelAgency', '#396DB2')}
                style={{marginTop: RF(24), width: '48%', height: RF(120)}}>
                <ImageBackground
                  source={TravelFlight}
                  resizeMode="cover"
                  imageStyle={{borderRadius: RF(16)}}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: RF(120),
                    borderRadius: RF(16),
                    overflow: 'hidden',
                  }}>
                  <View style={styles.overlay2} />
                  <Text
                    size={14}
                    SFmedium
                    color={colors.white}
                    style={{position: 'absolute', top: RF(20), left: RF(16)}}>
                    Flights
                  </Text>
                  <Text
                    size={14}
                    SFregular
                    color={colors.white}
                    style={{position: 'absolute', top: RF(38), left: RF(16)}}>
                    Book Tickets
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {activeIndex !== 1 && activeIndex !== 2 ? (
          <View style={[margin.top_24, margin.Horizontal_16]}>
            <Text
              size={18}
              SFmedium
              color={colors.primary}
              style={{
                textAlign: 'center',
                marginHorizontal: RF(24),
                marginVertical: RF(24),
              }}>
              Let’s Discover a New Adventure !
            </Text>
            <Carousel {...TravelCrousalProps} renderItem={renderItem} />
          </View>
        ) : null}
      </View>
    </Wrapper>
  );
};

export default MainHTR;

const renderItem = ({item, index}: any) => {
  return (
    <View
      style={{
        height: RF(140),
        width: SCREEN_WIDTH - 42,
        // backgroundColor: 'red',
        borderRadius: 16,
        overflow: 'hidden',
      }}>
      <ImageBackground
        source={item?.img}
        imageStyle={{width: '100%'}}
        style={{
          height: '100%',
          width: '100%',
          // backgroundColor: 'red',
        }}
        resizeMode={'cover'}></ImageBackground>
    </View>
  );
};
