import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    image: {
      width: RF(40),
      height: RF(28),
      resizeMode: 'contain',
    },
    view: {
      paddingHorizontal: RF(12),
      paddingVertical: RF(16),
      // backgroundColor: '#f5f5f5',
      flex: 1,
    },
    vsCode:{backgroundColor:'#fff',elevation:5,borderRadius:RF(8),marginVertical:RF(8),marginHorizontal:RF(2)},
    press: {
      backgroundColor: colors.background,
      elevation: 5,
      padding: RF(16),
      borderRadius: RF(8),
      marginVertical: RF(8),
      marginHorizontal:RF(4),
    },
    txtV: {flexDirection: 'row', alignItems: 'center'},
    wd: {width: '60%'},
    img: {width: RF(110), height: RF(80), resizeMode: 'contain'},
    line: {
      height: RF(1),
      alignSelf: 'center',
      backgroundColor: '#1A3D7C',
      borderRadius: RF(8),
      width: '100%',
      marginVertical: RF(10),
    },
    content: {
      paddingBottom: RF(50),
    },
    accordion: {marginHorizontal: -5, marginTop: RF(20)},
    pressBtn: {
      width: RF(70),
      height: RF(30),
      alignSelf: 'center',
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginVertical: RF(16),
    },
    vImg: {
      width: '100%',
      height: RF(180),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F4EFFF8F',
    },
  });

export default useStyles;
