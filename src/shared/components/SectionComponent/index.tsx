import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Card from '../ResponsiveCard';
import CustomIcon from '../CustomIcon';
import {RF} from '@theme';
import {PARA} from '@assets';
import Text from '../text';
interface Props {
  img1?: any;
  screen: any;
  ServiceName: any;
  description: any;
  source: any;
  color: any;
}
const SectionComponent = (props: Props): any => {
  const {img1, screen, ServiceName, description, source, color} = props;
  return (
    <View style={{marginTop: RF(16)}}>
      <Card height={RF(120)} color={color} screen={screen}>
        <CustomIcon source={source} />
        <View style={styles.innerRow}>
          <Text size={14} SFbold color={'#fff'}>
            {ServiceName}
          </Text>
          <Text size={12} SFregular color={'#fff'} style={styles.marginTop}>
            {description}
          </Text>
        </View>
        {img1 && (
          <View style={styles.image1}>
            <Image
              style={styles.cardImage}
              source={PARA}
              resizeMode={'contain'}
            />
          </View>
        )}
      </Card>
    </View>
  );
};
export default SectionComponent;
const styles = StyleSheet.create({
  cardImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    right: 0,
    bottom: -10,
  },
  innerRow: {
    marginLeft: 8,
  },
  image1: {
    width: RF(100),
    height: '100%',
    right: 0,
  },
  marginTop: {marginTop: RF(4)},
});
