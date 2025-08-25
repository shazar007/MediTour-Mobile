import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {LineChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {G, Circle, Rect, Text as SVGText} from 'react-native-svg';
import {RF} from '@theme';
import Text from '../text';
const HotelGraph = ({graphData}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    index: null,
    value: null,
    dataset: null,
  });

  const dataBooked = graphData.map(item => item.confirmedBookings);
  const dataVisited = graphData.map(item => item.reservationsCount);

  const handlePress = (dataset, index) => {
    setTooltipData({value: dataset[index], index, dataset});
    setTooltipVisible(true);
  };

  const TooltipComponent = ({x, y}) =>
    tooltipVisible && (
      <G x={x(tooltipData.index) - 75} y={y(tooltipData.value) - 50}>
        <Rect
          width={150}
          height={50}
          stroke="black"
          fill="white"
          ry={10}
          rx={10}
        />
        <SVGText x={75} dy={20} alignmentBaseline="middle" textAnchor="middle">
          {`Booked: ${
            tooltipData.dataset === dataBooked
              ? tooltipData.value
              : dataBooked[tooltipData.index]
          }`}
        </SVGText>
        <SVGText x={75} dy={40} alignmentBaseline="middle" textAnchor="middle">
          {`Visited: ${
            tooltipData.dataset === dataVisited
              ? tooltipData.value
              : dataVisited[tooltipData.index]
          }`}
        </SVGText>
      </G>
    );

  const Decorator = ({x, y, data, dataset}) => {
    return data.map((value, index) => (
      <Circle
        key={index}
        cx={x(index)}
        cy={y(value)}
        r={4}
        stroke={
          dataset === dataBooked ? 'rgb(255, 0, 132)' : 'rgb(0, 122, 255)'
        }
        fill={'white'}
        onPress={() => handlePress(dataset, index)}
      />
    ));
  };

  const totalBooked = dataBooked.reduce((sum, value) => sum + value, 0);
  const totalVisited = dataVisited.reduce((sum, value) => sum + value, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Property Overall</Text>
      <View style={styles.dropdown}>
        <Text style={styles.dropdownText}>Last year</Text>
      </View>
      <View style={{flexDirection: 'row', height: 220, paddingVertical: 16}}>
        <YAxis
          data={dataBooked}
          contentInset={{top: 20, bottom: 20}}
          svg={{fontSize: 10, fill: 'grey'}}
          numberOfTicks={10}
          formatLabel={value => `${value}`}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart
            style={{flex: 1}}
            data={dataBooked}
            svg={{stroke: 'rgb(255, 0, 132)', strokeWidth: 2}}
            contentInset={{top: 20, bottom: 20}}
            curve={shape.curveNatural}>
            <Grid />
            <Decorator dataset={dataBooked} />
            <TooltipComponent />
          </LineChart>
          <LineChart
            style={StyleSheet.absoluteFill}
            data={dataVisited}
            svg={{stroke: 'rgb(0, 122, 255)', strokeWidth: 2}}
            contentInset={{top: 20, bottom: 20}}
            curve={shape.curveNatural}>
            <Grid />
            <Decorator dataset={dataVisited} />
          </LineChart>
          <XAxis
            style={{marginHorizontal: -10}}
            data={dataBooked}
            formatLabel={(value, index) =>
              [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sept',
                'Oct',
                'Nov',
                'Dec',
              ][index]
            }
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 10, fill: 'grey'}}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Booked</Text>
          <Text color={'#FB3692'}>{totalBooked}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Visited</Text>
          <Text style={styles.footerValue}>{totalVisited}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: RF(16),
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dropdown: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#000080',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerValue: {
    fontSize: 16,
    color: '#599DFC',
  },
});

export default HotelGraph;
