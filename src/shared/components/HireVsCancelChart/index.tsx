import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import Svg, {Circle} from 'react-native-svg';
import Text from '../text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RF} from '@theme';

const HireVsCancelChart = ({detail}: {detail?: any}) => {
  const convertPercentage = (percentageString: any) => {
    return parseFloat(percentageString?.replace('%', ''));
  };

  const requestPenPercentageNumber = convertPercentage(
    detail?.requestPenPercentage,
  );
  const requestPercentageChangeNumber = convertPercentage(
    detail?.requestPercentageChange,
  );

  const data = [
    {
      id: 0,
      value: requestPercentageChangeNumber,
      color: '#FF947A',
      text: 'Total Request',
    },
    {id: 1, value: 20, color: '#D83C3C', text: 'Total Canceled'},
    {
      id: 2,
      value: requestPenPercentageNumber,
      color: '#4679F9',
      text: 'Total Pending',
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text size={16} SFsemiBold color={'#0D47A1'}>
          Hire vs Cancel
        </Text>
        <Text size={12} SFregular color={'#00276D'}>
          Last Week
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          radius={45}
          innerRadius={30}
          centerLabelComponent={() => <Text style={styles.centerLabel}></Text>}
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.legendPercentage}>{item.value}%</Text>
                <Icon
                  name="arrow-upward"
                  size={16}
                  color={index === 1 ? 'green' : index === 2 ? 'red' : 'green'}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F7F1',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    marginTop: RF(16),
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E3264',
  },
  chartContainer: {
    position: 'relative',
    gap: RF(16),
    flexDirection: 'row',
    marginTop: RF(16),
  },
  borderCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  legendContainer: {
    alignItems: 'flex-start',
    width: '100%',
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

export default HireVsCancelChart;
