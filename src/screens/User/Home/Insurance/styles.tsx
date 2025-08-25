import {rs, rv} from '@services';
import {RF, SCREEN_WIDTH} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    subContainer: {
      flex: 1,
      padding: rs(16),
      backgroundColor: 'f9f9f9',
    },

    ButtonContainer: {
      alignItems: 'center',
      marginTop: rv(16),
      height: rv(100),
      flexDirection: 'row',
      justifyContent: 'center',
      gap: rs(24),
    },
    container: {
      marginVertical: 10,
      marginHorizontal: 15,
    },
    card: {
      backgroundColor: '#fff', // Example background color
      borderRadius: rs(10),
      padding: rs(12),
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 2, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
    },
    imageView: {
      width: rs(50),
      height: rs(50),
      borderRadius: rs(25),
      overflow: 'hidden',
      backgroundColor: '#fff', // Placeholder color
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: RF(10),
    },
    img: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    text: {
      width: '70%',
      fontWeight: '600',
    },

    Container: {
      borderRadius: RF(8),
      padding: RF(8),
      backgroundColor: 'rgba(52, 152, 219, 1)',
      marginRight: RF(4),
      marginVertical: RF(8),
    },

    coulmnView: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: RF(8),
    },

    viewStyle: {flexDirection: 'row', alignItems: 'center', gap: RF(8)},

    ContentDirection: {
      backgroundColor: '#fff',
      width: RF(48),
      height: RF(48),
      justifyContent: 'center',
      borderRadius: RF(32),
      alignItems: 'center',
    },
    ImageStyle: {
      width: RF(44),
      height: RF(29),
      resizeMode: 'contain',
    },
    meditourStyle: {
      borderWidth: 1,
      borderColor: '#746CA2',
      marginHorizontal: RF(16),
    },
    ColumnStyle: {
      width: '100%',
    },
    view: {flex: 1, backgroundColor: '#FAF9F6'},
    cardView: {
      width: rs(116),
      height: rs(104),
      alignItems: 'center',
      borderWidth: 2,
      justifyContent: 'center',

      borderRadius: RF(8),
    },
    ImageView: {
      width: RF(40),
      height: RF(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default useStyles;
