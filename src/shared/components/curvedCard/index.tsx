import React, {useEffect, useRef} from 'react';
import {
  View,
  Animated,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Text from '../text';
import GoBack from '../GoBack';
import {useDispatch} from 'react-redux';
import {setChangeStack} from '@redux';
import {navigationRef, rs, rv} from '@services';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@theme';

interface Props {
  source?: any;
  children?: any;
  title?: string;
  resizeMode?: 'contain' | 'cover' | 'stretch';
  backIcon?: boolean;
  onPressBack?: any;
}

const CurvedCard = (props: Props) => {
  const {source, children, title, resizeMode, backIcon, onPressBack} = props;
  const theme = useTheme();
  const colors = theme.colors;
  const slideAnimation = useRef(new Animated.Value(1)).current;
  const dispatch = useDispatch();

  // Slide-in animation
  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const slideFromBottom = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const handleback = () => {
    dispatch(setChangeStack(''));
  };

  return (
    <ImageBackground source={source} style={styles.background}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          {backIcon ? (
            <GoBack
              onPress={onPressBack ? onPressBack : handleback}
              tintColor={colors.primary}
            />
          ) : (
            <View style={{height: 24, width: 24}} />
          )}
          {title && (
            <Text size={rs(20)} SFsemiBold color={colors.text}>
              {title}
            </Text>
          )}
          <View style={{height: 24, width: 24}} />
        </View>

        <View
          style={{
            width: '100%',
            flexGrow: 1,
            marginTop: rv(24),
          }}>
          {children}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    // height: SCREEN_HEIGHT * 0.69,
    height: '68%',
    // width: SCREEN_WIDTH,
    marginTop: 'auto',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: rs(16),
    paddingTop: rv(24),
    // justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
    paddingHorizontal: rs(16),
  },

  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CurvedCard;
