import React from 'react';
import Text from '../text';
import {RF, SCREEN_WIDTH} from '@theme';
import {StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useTheme} from '@react-navigation/native';

const LineCharts = ({
  data,
  label,
  title,
  title1,
}: {
  data?: any;
  label?: any;
  title?: any;
  title1?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;

  return (
    <View style={styles.main}>
      <View style={styles.view}>
        <Text size={20} SFsemiBold color={colors?.bluE}>
          {title}
        </Text>
        <Text size={20} SFsemiBold color={colors?.bluE}>
          {title1}
        </Text>
      </View>
      <LineChart
        data={{
          labels: label,
          datasets: [
            {
              data: data,
              // data: data.length >= 0 ? [0, 5, 10, 15, 20] : data,
              color: (opacity = 1) => `rgba(240, 166, 176, 1), ${opacity})`,
            },
          ],
        }}
        height={RF(220)}
        // yAxisSuffix="K"
        yAxisInterval={1}
        withVerticalLines={false}
        width={SCREEN_WIDTH / 1.3}
        formatYLabel={label => {
          const labelVal = Number(label);
          //   if (labelVal >= 1000000) return (labelVal / 1000000).toFixed(0) + 'M';
          if (labelVal >= 1000) return (labelVal / 1000).toFixed(0) + 'K';
          return label;
        }}
        chartConfig={{
          propsForLabels: {
            // wordSpacing: 5,
          },
          propsForHorizontalLabels: {
            // wordSpacing: 20,
          },
          backgroundColor: '#ffff',
          backgroundGradientTo: '#ffff',
          backgroundGradientFrom: '#fff',
          color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(00,00,00, ${opacity})`,
          style: {
            marginTop: RF(10),
            borderWidth: 1,
          },
          propsForDots: {
            stroke: '#A7AEFF',
            fill: '#A7AEFF',
          },
          propsForBackgroundLines: {
            stroke: '#e3e3e3',
            strokeWidth: 1,
            strokeDasharray: '',
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: RF(10),
    justifyContent: 'space-between',
  },
  main: {
    backgroundColor: 'white',
    elevation: 10,
    height: RF(270),
    width: '88%',
    padding: 10,
    marginHorizontal: RF(20),
    marginTop: RF(20),
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default LineCharts;

{
  /* <LineChart
        isAnimated
        data={data}
        adjustToWidth
        color="#FEA6B0"
        height={RF(200)}
        formatYLabel={label => {
          const labelVal = Number(label);
          if (labelVal >= 1000000) return (labelVal / 1000000).toFixed(0) + 'M';
          if (labelVal >= 1000) return (labelVal / 1000).toFixed(0) + 'K';
          return label;
        }}
        // yAxisLabelTexts={['0', '7', '14']}
        dataPointsColor="#A7AEFF"
        width={SCREEN_WIDTH / 1.5}
        yAxisTextStyle={{color: '#666666'}}
        xAxisLabelTextStyle={{color: '#666666'}}
      /> */
}
// res?.data?.currentWeekData?.map(
//   (item: any) => setGraph(item?.totalAmount),
//   {
//     // value: item.totalAmount,
//     // label: moment(item?.date).format('ddd'),
//   },
// );
