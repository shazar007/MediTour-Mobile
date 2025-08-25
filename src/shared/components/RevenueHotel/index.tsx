import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import Svg, {Circle} from 'react-native-svg';
import Text from '../text';
import {RF} from '@theme';

const data = [
  {
    value: 54,
    color: '#00276D',
    text: 'Check In',
  },
  {
    value: 20,
    color: '#599DFC',
    text: 'Check out',
  },
  {
    value: 26,
    color: '#FB3692',
    text: 'Booked',
  },
];

const RevenueHotel = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          radius={70}
          innerRadius={50}
          centerLabelComponent={() => (
            <View style={{alignItems: 'center'}}>
              <Text
                size={16}
                SFregular
                color={'#7D7D7D'}
                style={styles.centerLabel}>
                Revenue
              </Text>
              <Text size={16} SFmedium>
                19,258
              </Text>
            </View>
          )}
        />
        <View style={styles.legendContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Svg height="10" width="16">
                  <Circle cx="5" cy="5" r="5" fill={item.color} />
                </Svg>
                <Text
                  size={14}
                  SFsemiBold
                  color={'#0D47A1'}
                  style={{width: RF(116)}}>
                  {item.text}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
export default RevenueHotel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E3264',
  },
  chartContainer: {
    // position: 'relative',
    gap: RF(16),
    flexDirection: 'row',
    marginTop: RF(16),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  borderCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  legendContainer: {
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  legendText: {
    marginLeft: 5,
    marginRight: 10,
    color: '#000',
    fontSize: 14,
  },
  legendPercentage: {
    color: '#000',
    fontSize: 14,
  },
  footer: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3264',
  },
});
