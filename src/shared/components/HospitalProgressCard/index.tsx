import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import DotText from '../DotText';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';

const HospitalProgressCard = ({
  totalSession,
  video,
}: {
  totalSession?: any;
  video?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const props = {
    activeStrokeWidth: 10,
    inActiveStrokeWidth: 10,
    inActiveStrokeOpacity: 0.2,
  };

  return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Text size={16} SFsemiBold color={colors.bluE}>
          Sessions
        </Text>
        <View
          style={[
            styles.all,
            {
              backgroundColor: colors.Hospital,
            },
          ]}>
          <Text size={10} SFmedium color={colors.primary}>
            Today
          </Text>
        </View>
      </View>
      <View style={styles.graphView}>
        <View style={styles.outer}>
          <DotText
            title={'Total Sessions'}
            value={totalSession}
            clr={colors._gray}
          />
          <DotText
            value={video}
            clr={colors.Donationcard}
            title={'Video Consultation'}
          />
        </View>
        <CircularProgressBase
          {...props}
          value={totalSession}
          radius={63}
          inActiveStrokeColor={'#E9EBF3'}
          activeStrokeColor={colors.Donationcard}>
          <CircularProgressBase
            {...props}
            value={video}
            radius={50}
            inActiveStrokeColor={'#E9EBF3'}
            activeStrokeColor={colors._gray}
          />
        </CircularProgressBase>
      </View>
    </View>
  );
};

export default HospitalProgressCard;

const styles = StyleSheet.create({
  mL: {marginLeft: 5},
  inner: {
    width: RF(8),
    height: RF(8),
    borderRadius: RF(4),
    backgroundColor: '#9293CE',
  },
  outer: {marginHorizontal: RF(8), marginLeft: 0},
  graphView: {
    marginTop: RF(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: RF(16),
    height: RF(16),
  },
  all: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RF(12),
    paddingVertical: RF(4),
    borderRadius: RF(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    elevation: 1,
    padding: RF(16),
    borderRadius: RF(24),
    backgroundColor: '#fff',
    marginHorizontal: RF(16),
  },
});
