import {RF} from '@theme';
import React, {useEffect, useState} from 'react';
import Text from '../text';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BarChart} from 'react-native-gifted-charts';
import moment from 'moment';

const BarChartComponent = ({
  title,
  title1,
  value1,
  value2,
}: {
  title?: any;
  title1?: any;
  value1?: any;
  value2?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [data, setData] = useState<any>();

  const val1 = value1?.map((item: any, index: any) => {
    return {
      spacing: 35,
      value: item?.totalAmount,
      frontColor: colors._blue,
      labelTextStyle: {color: '#00276D'},
      label: moment(item?._id).format('ddd'),
    };
  });

  const val2 = value2?.map((item: any, index: any) => {
    return {
      value: item?.totalAmount,
      frontColor: colors.parrot,
    };
  });

  // const _data = val1?.map((item: any, index: any) => ({
  //   label: item?.label,
  //   bars: [
  //     {value: item, frontColor: '#0095FF'},
  //     {value: val2[index], frontColor: '#00E096'},
  //   ],
  // }));

  return (
    <View style={styles.graphView}>
      <View style={styles.view}>
        <Text size={20} SFsemiBold color={colors?.bluE}>
          {title}
        </Text>
        <Text size={20} SFsemiBold color={colors?.bluE}>
          {title1}
        </Text>
      </View>
      <BarChart
        hideRules
        roundedTop
        barWidth={8}
        spacing={24}
        roundedBottom
        animationDuration={1000}
        // maxValue={75}
        data={val1}
        noOfSections={3}
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{color: '#00276D'}}
        formatYLabel={(yValue: any) => `${yValue / 1000}k`}
      />
    </View>
  );
};
export default BarChartComponent;

const styles = StyleSheet.create({
  graphView: {
    width: '100%',
    padding: RF(15),
    marginTop: RF(20),
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 20,
  },
  view: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: RF(10),
    justifyContent: 'space-between',
  },
  txt: {
    // marginVertical: 10,
  },
  week: {
    // marginVertical: 15,
  },
});
