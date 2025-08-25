import { rs } from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    // card: {
    //   backgroundColor: colors.background,
    //   elevation: 2,
    //   padding: RF(16),
    //   borderRadius: RF(8),
    // },
    innerContainer: {
      padding: rs(16),
      paddingBottom: RF(120),
      gap: rs(16),
    },
    cardText: {
      fontSize: 16,
      marginBottom: 4,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 8,
      padding: 8,
    },
    addButton: {
      backgroundColor: 'blue',
      color: 'white',
      padding: 8,
      borderRadius: 4,
      textAlign: 'center',
      marginBottom: 16,
    },

    cardButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 8,
    },
    updateButton: {
      backgroundColor: 'orange',
      color: 'white',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 8,
    },
    deleteButton: {
      backgroundColor: 'red',
      color: 'white',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
  });

export default useStyles;
