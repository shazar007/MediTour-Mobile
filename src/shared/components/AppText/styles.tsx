import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    text: {
      fontSize: 16,
      fontWeight: 'normal',
      color: 'black', // You can customize the text color here
    },
  });

export default useStyles;
