import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {globalStyles} from '@services';
import Text from '../../text';
import {RF} from '@theme';
import {tick} from '@assets';

interface Props {
  title?: any;
  icon?: any;
  colors?: any;
}

const List = (props: Props) => {
  const {title, icon, colors} = props;
  return (
    <View style={globalStyles.rowSimple}>
      <Image style={[styles.icon]} source={icon ? icon : tick} />
      <Text color={colors ? colors : 'rgba(70, 92, 103, 1)'}>{title}</Text>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  icon: {
    height: RF(14),
    width: RF(14),
    resizeMode: 'contain',
    marginRight: RF(4),
  },
});
