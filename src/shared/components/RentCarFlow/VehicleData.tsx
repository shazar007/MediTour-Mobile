import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import Text from '../text';

interface Props {
  name?: any;
  CarName?: any;
}
const VehicleData = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {name, CarName} = props;
  return (
    <View style={styles.FlatListStyle}>
      <View style={styles.RowStyle}>
        <Text size={16} SFsemiBold color={colors.primary}>
          •
        </Text>
        <Text size={14} color={colors.blueText} SFregular>
          {name}
        </Text>
      </View>
      <View style={{width: '45%', alignItems: 'flex-end'}}>
        <Text size={12} color={colors.blueText} SFregular>
          {CarName}
        </Text>
      </View>
    </View>
  );
};

export default VehicleData;

const styles = StyleSheet.create({
  FlatListStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(8),
    marginTop: RF(8),
    justifyContent: 'space-between',
  },
  RowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(8),
  },
});
