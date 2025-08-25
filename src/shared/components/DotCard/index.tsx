import React from 'react';
import Text from '../text';
import {RF} from '@theme';
import {globalStyles} from '@services';
import {Image, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const DotCard = ({
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
  _title3,
  _title4,
  _title5,
  _title6,
  src,
}: {
  title?: any;
  src?: any;
  title1?: any;
  title2?: any;
  title3?: any;
  title4?: any;
  title5?: any;
  title6?: any;
  _title3?: any;
  _title4?: any;
  _title5?: any;
  _title6?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;

  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', alignItems: 'center',gap:RF(8)}}>
        <Image source={{uri: src}} style={styles.img} />
        <View>
          <Text size={14} SFmedium color={colors?.bluE}>
            {title1}
          </Text>
          <Text size={12} SFmedium color={colors?.bluE}>
            {title2}
          </Text>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.row}>
        <View>
          <Text size={12} SFmedium color={colors?.bluE}>
            {_title3}
          </Text>
          <Text size={12} SFmedium color={colors?.bluE}>
            {title3}
          </Text>
        </View>
        <View>
          <Text size={12} SFmedium color={colors?.bluE}>
            {_title4}
          </Text>
          <Text size={12} SFmedium color={colors?.bluE}>
            {title4}
          </Text>
        </View>
        <View>
          <Text size={12} SFmedium color={colors?.bluE}>
            {_title5}
          </Text>
          <Text size={12} SFmedium color={colors?.bluE}>
            {title5}
          </Text>
        </View>
        <View>
          <Text size={12} SFmedium color={colors?.bluE}>
            {_title6}
          </Text>
          <Text size={12} SFmedium color={colors?.bluE}>
            {title6}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {borderTopWidth: 1, borderStyle: 'dashed', marginVertical: RF(10)},
  img: {
    width: RF(40),
    height: RF(40),
    resizeMode: 'contain',
    borderRadius: 100,
  },
  main: {
    backgroundColor: 'white',
    height: RF(130),
    marginHorizontal: RF(20),
    marginTop: RF(20),
    padding: RF(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default DotCard;
