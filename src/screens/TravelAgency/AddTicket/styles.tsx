import {StyleSheet} from 'react-native';
import {RF} from '@theme';

const useStyles = () =>
  StyleSheet.create({
    mainContainer: {
      marginHorizontal: RF(20),
      marginVertical: RF(20),
    },
    IllustrationStyle: {
      width: '100%',
      height: RF(200),
      resizeMode: 'contain',
    },
    IllustrationStyle2: {
      width: '100%',
      height: RF(100),
      resizeMode: 'contain',
    },
    rowButt: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    PlusIcon: {
      width: RF(16),
      height: RF(16),
      resizeMode: 'contain',
    },
    rowStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(16),
    },
    flightDetails: {
      backgroundColor: '#F5F5F5',
      borderRadius: RF(4),
      padding: RF(8),
    },
    edit: {
      width: RF(17),
      height: RF(17),
      tintColor: '#0D47A1',
      resizeMode: 'contain',
    },
    container: {
      borderRadius: RF(8),
      overflow: 'hidden',
      backgroundColor: '#f9f9f9',
    },
    del: {
      width: RF(14),
      height: RF(18),
      tintColor: '#FD5650',
      resizeMode: 'contain',
    },
    header: {
      padding: RF(8),
      backgroundColor: '#f7f7f7',
      borderColor: '#ccc',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00276D',
    },
    content: {
      padding: 10,
      backgroundColor: '#f7f7f7',
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    contentText: {
      fontSize: 14,
      color: '#00276D', // Content text color
    },
    logo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    TouchBid: {
      width: '40%',
      height: RF(30),
      backgroundColor: '#0D47A1',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: RF(150),
    },
    TouchBid2: {
      width: '40%',
      height: RF(30),
      backgroundColor: '#0D47A1',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: RF(16),
    },
    stayFlight: {
      width: '30%',
      height: RF(30),
      backgroundColor: '#0D47A1',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: RF(16),
    },
    rowType: {
      alignItems: 'center',
      gap: RF(16),
      justifyContent: 'center',
      flexDirection: 'row',
    },

    contentView: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    UpLoad_S: {
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: RF(8),
      borderColor: '#00276D',
      padding: RF(8),
      marginVertical: RF(10),

      alignItems: 'center',
      flexDirection: 'row',
    },
    ViewContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(8),
    },
    row: {
      // flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    flight: {
      backgroundColor: '#EEEDED',
      borderRadius: RF(8),
      padding: RF(8),
      marginVertical: RF(8),
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    add: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(8),
      alignSelf: 'flex-end',
      marginTop: RF(8),
    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      padding: 10,
    },
    flightHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: RF(4),
    },
    removeText: {
      color: 'red',
    },
    addButton: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 10,
      width: RF(100),
    },
    saveButton: {
      backgroundColor: '#0D47A1',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      width: RF(110),
      marginTop: RF(16),
      alignSelf: 'center',
    },
    disabledButton: {
      backgroundColor: '#B0BEC5',
    },
    bidButton: {
      backgroundColor: '#28a745',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    editButton: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    crossStyle: {
      width: RF(16),
      height: RF(16),
      resizeMode: 'contain',
      tintColor: 'red',
    },
    summary: {
      backgroundColor: '#f0f0f0',
      padding: 15,
      borderRadius: 5,
    },
    summaryText: {
      fontSize: 16,
      marginBottom: 5,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
  });

export default useStyles;
