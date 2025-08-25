import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {StyleSheet, View} from 'react-native';
import {RF} from '@theme';
import Text from '../text';

const ChartConfig = ({graphData}: any) => {
  //
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [tooltip, setTooltip] = useState<any>({
    visible: false,
    value: '',
    month: '',
    posX: 0,
    posY: 0,
  });

  useEffect(() => {
    if (graphData && graphData?.currentWeekData?.length > 0) {
      updateChartData();
    }
  }, [graphData]);

  const updateChartData = () => {
    const labels = graphData?.currentWeekData?.map((item: any) =>
      new Date(item.date)
        .toLocaleDateString('en-US', {
          weekday: 'short',
        })
        .slice(0, 3),
    );
    const currentData = graphData.currentWeekData.map(
      (item: any) => item.appointmentCount,
    );
    const previousData = graphData.previousWeekData.map(
      (item: any) => item.appointmentCount,
    );

    setData({
      labels,
      datasets: [
        {
          data: currentData,
          color: (opacity = 1) => `#00276D`,
          strokeWidth: 2,
        },
        {
          data: previousData,
          color: (opacity = 1) => `#A8C5DA`,
          strokeWidth: 2,
        },
      ],
      legend: ['Current Week', 'Previous Week'],
    });
  };

  const handleDataPointClick = (data: any) => {
    setTooltip({
      visible: true,
      value: `Current: ${data.value} Previous: ${
        graphData?.previousWeekData[data.index]?.appointmentCount
      }`,
      month: data.index,
      posX: data.x,
      posY: data.y,
    });
  };

  if (
    data.labels.length === 0 ||
    data.datasets.some((ds: any) => ds.data.length === 0)
  ) {
    return <Text>Loading chart data...</Text>;
  }

  return (
    <View>
      <LineChart
        data={data}
        width={RF(300)}
        height={RF(200)}
        withHorizontalLines={false}
        withShadow={false}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2,
          barPercentage: 0.5,
        }}
        bezier
        onDataPointClick={handleDataPointClick}
      />
      {tooltip.visible && (
        <View
          style={[
            styles.tooltip,
            {top: tooltip.posY - 50, left: tooltip.posX - 40},
          ]}>
          <Text size={9} SFsemiBold color={'#00276D'} style={{width: RF(100)}}>
            {tooltip.value}
          </Text>
          <Text size={9} SFsemiBold color={'#00276D'}>
            Date: {tooltip.month}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  line: {
    position: 'absolute',
    backgroundColor: '#00276D',
    width: 2,
    height: 60,
  },
});

export default ChartConfig;
