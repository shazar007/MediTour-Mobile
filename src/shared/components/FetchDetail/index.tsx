import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {tickVerified} from '@assets';

interface Props {
  item?: any;
  image?: any;
  DoctorName?: any;
  subtitle?: any;
  Education?: any;
  exp?: any;
}
const FetchDetail = (props: Props) => {
  const {item, image, DoctorName, subtitle, Education, exp} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View style={styles.Container}>
      <View style={styles.ViewStyles}>
        <Image source={image} style={styles.ImageView} />
      </View>
      <View style={styles.MainView}>
        <Text
          size={RF(12)}
          SFmedium
          color={colors.blueText}
          style={{marginTop: -1, width: RF(150)}}>
          {DoctorName}
        </Text>
        <Text
          size={RF(12)}
          SFregular
          color={colors.LightText}
          style={{marginTop: -5}}>
          {subtitle}
        </Text>
        <Text
          size={RF(9)}
          color={colors.blueText}
          SFregular
          style={{width: RF(170)}}>
          {Education}
        </Text>
        <Text size={RF(8)} color={colors.blueText} SFregular>
          {exp}
        </Text>
      </View>
      <Image
        source={tickVerified}
        style={[
          styles.TickViewStyle,
          {tintColor: item?.isVerified ? 'green' : 'grey'},
        ]}
      />
    </View>
  );
};

export default FetchDetail;
const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: RF(100),
    flexDirection: 'row',
    borderRadius: RF(16),
    elevation: 3,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  ViewStyles: {width: RF(80), height: '100%', overflow: 'visible'},
  ImageView: {width: '100%', height: '100%'},
  MainView: {
    flexDirection: 'column',
    gap: RF(4),
    marginVertical: RF(8),
  },
  TickViewStyle: {
    width: RF(12),
    height: RF(12),
    resizeMode: 'contain',
    marginTop: RF(12),
    right: RF(16),
  },
});
