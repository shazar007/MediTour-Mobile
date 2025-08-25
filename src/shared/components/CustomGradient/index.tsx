import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

interface Props {
  children?: any;
}

const CustomGradient = (props: Props) => {
  const {modalVisible} = useSelector((state: any) => state.root.modal);

  const {children} = props;
  return (
    <LinearGradient
      colors={
        modalVisible == true
          ? ['rgba(45, 45, 45, 0.6)', 'rgba(62, 62, 62, 0.4)']
          : ['#fff', '#fff']
      }
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0}}>
      {children}
    </LinearGradient>
  );
};

export default CustomGradient;

const styles = StyleSheet.create({});
