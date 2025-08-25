import {Text, View, TextProps} from 'react-native';
import React from 'react';
import useStyles from './styles';

interface Props extends TextProps {
  content?: any;
}

const AppText = (props: Props) => {
  const {content, style, ...otherProps} = props;
  const styles = useStyles({});
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {content}
    </Text>
  );
};
export default AppText;
