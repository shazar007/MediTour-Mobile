import { View, Image} from 'react-native';
import React from 'react';
import {globalStyles, margin} from '@services';
import {LAYOUT, RF} from '@theme';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {Arraydata} from '@services';

const ArryData = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles({});
  return (
    <View style={styles.Container1}>
      {Arraydata.map((item, index) => (
        <View key={index} style={globalStyles.ColumnSimple}>
          <Text size={9} SFsemiBold color={colors.subtitle}>
            {item.text}
          </Text>
          <View style={[globalStyles.rowSimple, margin.top_4]}>
            <Image
              source={item.image}
              style={{width: RF(16), height: RF(16)}}
            />
            <Text
              size={12}
              SFregular
              style={{
                marginLeft: LAYOUT.MARGIN.VERYLOW,
                lineHeight: RF(14.32),
              }}>
              {item.dis}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ArryData;
