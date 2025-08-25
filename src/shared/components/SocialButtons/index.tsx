import {TouchableOpacity, Image, TouchableOpacityProps} from 'react-native';
import React, {useState} from 'react';
import useStyles from './styles';
interface Props extends TouchableOpacityProps {
  onPress?: any;
  icon: any;
}
const SocialButtons = (props: Props) => {
  const {onPress, icon, ...otherProps} = props;
  const styles = useStyles({});
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={icon} resizeMode="contain" style={styles.icon} />
    </TouchableOpacity>
  );
};
export default SocialButtons;
