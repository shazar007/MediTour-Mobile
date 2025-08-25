import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Text} from '@components';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {location} from '@assets';

const SectionTwo = ({value1, value2, value3, show}: any) => {
  const theme = useTheme();
  const colors = theme.colors;
  return (
    <View style={{gap: RF(4), width: '37.5%'}}>
      <Text size={14} color={colors.primary} SFmedium>
        {value1}
      </Text>
      <Text size={10} color={colors.primary} SFregular style={{width: '70%'}}>
        {value2}
      </Text>
      {show && (
        <Text size={10} color={colors.primary} SFregular style={{width: '70%'}}>
          {value3}
        </Text>
      )}
    </View>
  );
};

const SectionThree = ({label, value}: any) => {
  const theme = useTheme();
  const colors = theme.colors;
  return (
    <View style={styles.row}>
      <Image source={location} style={styles.image} />
      <View style={styles.textContainer}>
        <Text size={14} SFmedium color={colors.primary}>
          {label}
        </Text>
        <Text size={12} color={colors.primary} SFregular>
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  image: {
    width: RF(16),
    height: RF(16),
    tintColor: '#00276D',
    resizeMode: 'contain',
  },
  textContainer: {
    marginLeft: RF(8),
  },
});

export {SectionTwo, SectionThree};
