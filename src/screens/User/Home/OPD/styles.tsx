import {rs, rv} from '@services';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    card: {justifyContent: 'center'},
    view: {flex: 1, backgroundColor: '#FAF9F6'},
    main: {marginTop: rv(10)},
    mb: {marginBottom: rv(4)},
    subContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });

export default useStyles;
