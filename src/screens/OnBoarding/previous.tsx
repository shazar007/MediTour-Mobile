import {background_1, background_4, onBoard1, SelectBackground} from '@assets';
import {Text} from '@components';
import {setOneTimeonBoarding} from '@redux';
import {navigate} from '@services';
import {RF, SCREEN_HEIGHT} from '@theme';
import * as React from 'react';
import {
  StatusBar,
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Animated,
  ImageBackground,
  BackHandler,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {useDispatch} from 'react-redux';
const {width} = Dimensions.get('window');

const quotes = [
  {
    quote: 'MediTour Global ',
    author: '',
    img: background_1,
  },
  {
    quote: 'All Doctor',
    author:
      'Make a Appointment for a consultation with doctors online at a convenient time',
    img: onBoard1,
  },
  {
    quote: 'Travels & tourism',
    author: 'Yours, Perfect Health and Vacation Destination!',
    img: background_4,
  },
];
const colors: any = [
  {
    initialBgColor: '#fff',
    bgColor: '#00276D',
    nextBgColor: '#00276D',
    arrow: '#fff',
  },
  {
    initialBgColor: '#fff',
    bgColor: '#00276D',
    nextBgColor: '#FFE357',
    arrow: '#00276D',
  },
  {
    initialBgColor: '#00276D',
    bgColor: '#FFE357',
    nextBgColor: '#EE7E37',
    arrow: '#FFE357',
  },
];
const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const DURATION = 1200;
const TEXT_DURATION = DURATION * 0.8;

const Circle = (props: any) => {
  const {onPress, index, quotes, animatedValue, animatedValue2} = props;
  const {initialBgColor, nextBgColor, bgColor, arrow} = colors[index];
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const backgroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });
  const dotBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        {backgroundColor},
      ]}>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: dotBgColor,
            transform: [
              {perspective: RF(500)},
              {
                rotateY: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },

              {
                scale: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 6, 1],
                }),
              },

              {
                translateX: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 50, 0],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.05, 0.2, 1],
                      outputRange: [1, 0, 0, 1],
                    }),
                  },
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ['0deg', '180deg', '180deg', '180deg'],
                    }),
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ]}>
            <AnimatedAntDesign name="arrowright" size={28} color={arrow} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const OnBoarding = () => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [...Array(quotes.length).keys()];
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const animate = (i: any) =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: TEXT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    animate((index + 1) % colors.length).start();
    setIndex((index + 1) % colors.length);
    if (index == 2) {
      navigate('PortalSelection');
      dispatch(setOneTimeonBoarding(true));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: index == 3 ? 0 : 80,
      }}>
      <StatusBar hidden />
      <Circle
        index={index}
        onPress={onPress}
        quotes={quotes}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
      />
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange,
                outputRange: quotes.map((_, i) => -i * width * 2),
              }),
            },
          ],
          opacity: sliderAnimatedValue.interpolate({
            inputRange: [...Array(quotes.length * 2 + 1).keys()].map(
              i => i / 2,
            ),
            outputRange: [...Array(quotes.length * 2 + 1).keys()].map(i =>
              i % 2 === 0 ? 1 : 0,
            ),
          }),
        }}>
        {quotes.slice(0, colors.length).map(({quote, author, img}, i) => {
          return (
            <View style={{paddingRight: width, width: width * 2}} key={i}>
              <Text
                size={36}
                SFbold
                center
                style={[{color: colors[i].nextBgColor}]}>
                {quote}
              </Text>

              <Text
                center
                style={[
                  {
                    color: colors[i].nextBgColor,
                    opacity: 0.8,
                    margin: 8,
                    width: '80%',
                    alignSelf: 'center',
                  },
                ]}>
                {author}
              </Text>
              {img && <Image source={img} style={styles.image} />}
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};
export default OnBoarding;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // zIndex: 100,
    padding: 8,
    paddingBottom: 50,
  },
  paragraph: {
    margin: 12,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Menlo',
    color: 'white',
  },
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'turquoise',
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    bottom: 50,
    zIndex: 100,
  },
  image: {
    height: RF(350),
    // borderWidth: 1,
    // borderColor: 'red',
    resizeMode: 'contain',
    marginTop: RF(20),
    width: '100%',
  },
});
