import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  view: {
    marginTop: RF(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    backgroundColor: 'white',
    marginVertical: RF(20),
    borderRadius: 10,
    paddingLeft: RF(10),
    height: RF(94),
    textAlignVertical: 'top',
  },
  pb: {paddingBottom: 100},
  line: {
    height: RF(1),
    alignSelf: 'center',
    backgroundColor: '#1A3D7C',
    borderRadius: RF(8),
    width: '100%',
    marginVertical: RF(10),
  },
});

export default styles;
