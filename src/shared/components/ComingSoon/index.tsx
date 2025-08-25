import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  circle,
  comingSoon,
  comingSoon2,
  rect1,
  rect2,
  rect3,
  rect4,
} from '@assets';
import {Image} from 'react-native-animatable';
import {RF, SCREEN_HEIGHT, SCREEN_WIDTH} from '@theme';
import * as Animatable from 'react-native-animatable';
const ComingSoon = () => {
  return (
    <Animatable.View
      duration={2000}
      animation="zoomIn"
      // iterationCount="infinite"
      style={{flex: 1}}>
      <ImageBackground
        style={styles.backImg}
        source={comingSoon}
        resizeMode={'contain'}>
        <View style={styles.centerImg}>
          <Image source={comingSoon2} style={styles.fullLength} />
          {/* rect 1........ */}

          <Animatable.View
            duration={3000}
            animation="slideInUp"
            style={styles.rect_1}
            // iterationCount="infinite"
          >
            <Image style={styles.fullLength} source={rect1} />
          </Animatable.View>

          {/* rect 2........ */}

          <Animatable.View
            duration={2000}
            animation="slideInUp"
            style={styles.rect_2}
            // iterationCount="infinite"
          >
            <Image style={styles.fullLength} source={rect2} />
          </Animatable.View>

          {/* rect 3........ */}

          <Animatable.View
            duration={3000}
            animation="slideInUp"
            style={styles.rect_3}
            // iterationCount="infinite"
          >
            <Image style={styles.fullLength} source={rect3} />
          </Animatable.View>

          {/* rect 4........ */}

          <Animatable.View
            duration={3000}
            animation="slideInUp"
            style={styles.rect_4}
            // iterationCount="infinite"
          >
            <Image style={styles.fullLength} source={rect4} />
          </Animatable.View>

          {/* circle........ */}

          <Animatable.View
            duration={3000}
            animation="slideInUp"
            style={styles.circle}
            // iterationCount="infinite"
          >
            <Image style={styles.fullLength} source={circle} />
          </Animatable.View>
        </View>
      </ImageBackground>
    </Animatable.View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  fullLength: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  rect_1: {
    height: RF(35),
    width: RF(35),
    top: SCREEN_HEIGHT / 9,
    position: 'absolute',
    zIndex: 1,
  },
  rect_2: {
    height: RF(35),
    width: RF(35),
    top: SCREEN_HEIGHT / 14,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  rect_3: {
    height: RF(35),
    width: RF(35),
    top: SCREEN_HEIGHT / 3,
    left: SCREEN_WIDTH / 3.2,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  rect_4: {
    height: RF(35),
    width: RF(35),
    top: SCREEN_HEIGHT / 3.1,
    left: SCREEN_WIDTH / 1.9,
    position: 'absolute',
    zIndex: 1,
  },
  circle: {
    height: RF(50),
    width: RF(50),
    top: SCREEN_HEIGHT / 3.5,
    left: SCREEN_WIDTH / 55,
    position: 'absolute',
    zIndex: 1,
  },
  centerImg: {height: '50%', width: '80%'},
  backImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: RF(24),
  },
});
