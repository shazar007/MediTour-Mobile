import {PADDING, rs} from '@services';
import {LAYOUT, RF, defaultTheme} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    Container: {
      marginHorizontal: RF(24),
      marginTop: LAYOUT.MARGIN.NORMAL,
    },
    bottomCard: {
      padding: RF(12),
      width: '100%',
      backgroundColor: '#fff',
      borderWidth: 1,
      alignSelf: 'center',
      borderRadius: 16,
      borderColor: colors.primary,
    },
    card: {justifyContent: 'center'},

    container2: {
      flexDirection: 'row',
      marginHorizontal: LAYOUT.MARGIN.HIGH,
      alignItems: 'center',
      gap: RF(8),
    },
    ImageStyle: {
      width: RF(16),
      height: RF(16),
    },
    TextStyle: {marginLeft: LAYOUT.MARGIN.LOW, lineHeight: 18},
    CalenderStyle: {
      marginLeft: RF(24),
      marginTop: RF(16),
    },
    TimeStyle: {
      marginHorizontal: LAYOUT.MARGIN.HIGH,
    },
    buttonStyle: {
      marginHorizontal: RF(24),
      marginTop: RF(16),
    },
    bottom: {marginBottom: 60},
    view: {
      flex: 1,
      backgroundColor: '#FAF9F6',
      padding: PADDING?._16,
    },
    content: {
      width: '100%',
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    ContentStyle: {
      justifyContent: 'flex-start',
      gap: RF(8),
    },
    btn: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 80,
      right: 0,
      left: 0,
    },
    smallCards: {
      paddingVertical: RF(4),
      paddingHorizontal: RF(8),
      elevation: 2,
      marginVertical: 5,
      marginLeft: 2,
      marginRight: RF(8),
      borderRadius: RF(8),
    },
  });

export default useStyles;
