import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@theme';
import {useSelector} from 'react-redux';

const FadedView = () => {
  const {handleModal} = useSelector((state: any) => state.root.modal);

  return (
    <>
      {handleModal == true && (
        <View
          style={{
            position: 'absolute',
            height: SCREEN_HEIGHT,
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: SCREEN_WIDTH,
          }}></View>
      )}
    </>
  );
};

export default FadedView;

const styles = StyleSheet.create({});
