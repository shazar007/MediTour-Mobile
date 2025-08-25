import React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import moment from 'moment';
import Date from './Date';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';

const Calendar = ({onSelectDate, selected}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();
  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, 'days');
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);
  const getCurrentMonth = () => {
    const month = moment(dates[0])
      .add(scrollPosition / 60, 'days')
      .format('MMMM');
    setCurrentMonth(month);
  };

  useEffect(() => {
    getCurrentMonth();
  });

  return (
    <>
      <View style={styles.centered}>
        <Text size={18} SFsemiBold color={colors.blueText} style={styles.text}>
          Date
        </Text>
        <Text size={12} SFmedium color={colors.Month} style={styles.title}>
          {currentMonth}
        </Text>
      </View>

      <View style={styles.scroll}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.x)}>
          {dates.map((date, index) => (
            <Date
              key={index}
              date={date}
              onSelectDate={onSelectDate}
              selected={selected}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  centered: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: RF(24),
  },
  title: {
    lineHeight: RF(14.32),
  },
});
