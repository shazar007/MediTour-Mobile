import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

interface Props {
  title?: any;
  midText?: any;
  subtitle?: any;
}

const RowText = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {title, subtitle, midText} = props;

  return (
    <View style={styles.main}>
      <Text size={14} SFregular color={colors.blueText}>
        {title}
      </Text>

      {midText && (
        <Text
          size={12}
          SFregular
          color={colors.blueText}
          style={{
            marginLeft: 20,
            alignItems: 'center',
          }}>
          {midText}
        </Text>
      )}

      <Text
        size={12}
        SFregular
        numberOfLines={1}
        color={colors.blueText}
        style={[
          styles.txt,
          {textAlign: midText ? 'auto' : 'right', left: midText ? RF(40) : 0},
        ]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: RF(8),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt: {width: '50%', height: RF(20)},
});

export default RowText;
