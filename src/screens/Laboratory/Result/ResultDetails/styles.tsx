import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  txt1: {marginTop: RF(20), textAlign: 'right'},
  txt2: {marginTop: RF(5), textAlign: 'right'},
  view: {marginHorizontal: RF(20), },
  dot: {
    borderStyle: 'dashed',
    borderWidth: 1,
    marginTop: RF(30),
  },
  rowView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt3: {marginTop: RF(20), textAlign: 'right'},
});

export default styles;
