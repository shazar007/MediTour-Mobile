import React from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import {HP, LAYOUT, RF, WP, defaultTheme} from '@theme';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

interface Props {
  date?: any;
  onSelectDate?: any;
  selected?: any;
}
const Date = (props: Props) => {
  const {date, onSelectDate, selected} = props;
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const theme: any = useTheme();
  const colors = theme.colors;

  const day =
    moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? 'Today'
      : moment(date).format('ddd');

  const dayNumber = moment(date).format('D');

  const fullDate = moment(date).format('YYYY-MM-DD');
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[
        styles.card,
        selected === fullDate && {backgroundColor: changeColor},
      ]}>
      <Text
        size={14}
        SFregular
        color={colors.blueText}
        style={[
          styles.big,
          selected === fullDate && {color: colors.background},
        ]}>
        {day}
      </Text>
      <View style={{height: 4}} />
      <Text
        size={16}
        color={colors.blueText}
        SFmedium
        style={[
          styles.medium,
          selected === fullDate && {
            color: colors.background,
            fontSize: 16,
          },
        ]}>
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default Date;

const styles = StyleSheet.create({
  card: {
    // backgroundColor: defaultTheme.colors.background,
    borderRadius: LAYOUT.RADIUS.BOX,
    // borderColor: defaultTheme.colors.background,
    marginVertical: LAYOUT.MARGIN.LOW,
    justifyContent: 'center',
    alignItems: 'center',
    height: HP(8),
    width: WP(18),
    elevation: 3,
    marginRight: RF(8),
    marginLeft: RF(1),
  },
  big: {
    // fontWeight: 'bold',
    // fontSize: 16,
  },
  medium: {
    // fontSize: 16,
  },
});
