import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../text';
import {RF} from '@theme';
import {useDispatch} from 'react-redux';
import {setModalVisible} from '@redux';

interface Props {}

const GradientModalContent = (props: Props) => {
  const dispatch = useDispatch();
  const {} = props;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        padding: RF(20),
      }}>
      <BlurView
        style={styles.absolute}
        overlayColor={'transparent'}
        blurAmount={10}
      />
      <LinearGradient
        style={{
          height: RF(220),
          width: '100%',
          borderRadius: RF(12),
          padding: 20,
        }}
        colors={['rgba(26, 61, 124, 0.6)', 'rgba(26, 61, 124, 0.4)']}
        start={{x: 4, y: 2}}
        end={{x: 4, y: 5}}>
        <Text size={20} SFregular color={'#fff'} style={{marginTop: 20}}>
          To continue, turn on device location, which uses Google’s location
          service
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginTop: 55,
          }}>
          <Text size={16} SFsemiBold color={'#fff'} style={{marginRight: 32}}>
            No Thanks
          </Text>
          <Pressable onPress={() => dispatch(setModalVisible(false))}>
            <Text size={16} SFsemiBold color={'#fff'}>
              Ok
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
};

export default GradientModalContent;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
