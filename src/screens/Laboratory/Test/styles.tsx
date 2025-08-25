import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    align: {textAlign: 'center'},
    main: {backgroundColor: '#F5F5F5', flex: 1},
    del: {height: RF(16), width: RF(16), resizeMode: 'contain'},
    img: {
      height: RF(16),
      width: RF(16),
      resizeMode: 'contain',
    },
    AgeDropDownStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      // paddingBottom: RF(10),
      padding: RF(8),
      borderColor: '#00276D',
      width: '100%',
      marginBottom: RF(8),
    },
    ImageStyles: {width: RF(16), height: RF(16), resizeMode: 'contain'},
    input: {
      backgroundColor: '#FFF',
      width: '80%',
      paddingVertical: 1,
      marginLeft: 8,
      color: '#080C2F',
    },
    ContainerDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 5,
      backgroundColor: '#fff',
      padding: RF(4),
      marginHorizontal: RF(10),
      borderRadius: RF(8),
      marginTop: RF(4),
      marginBottom: RF(8),
    },
    bgView: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    Container2: {
      elevation: 5,
      // marginHorizontal: RF(24),
      backgroundColor: '#fff',
      width: '90%',
      padding: RF(12),
      borderRadius: RF(8),
    },
    TouchableStyle: {
      width: '100%',
      padding: RF(4),
      zIndex: 10,
    },
    dropDownImage: {
      width: RF(20),
      height: RF(20),
      resizeMode: 'contain',
    },
    CardDesign: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(8),
      borderRadius: RF(8),
      borderLeftColor: colors.orange,
      borderLeftWidth: 2,
      marginVertical: RF(5),
    },
    buttoncon: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingHorizontal: RF(16),
      paddingVertical: RF(80),
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
    catListView: {
      borderBottomWidth: 1,
      marginTop: RF(10),
      padding: RF(4),
    },
    listingText: {
      width: '100%',
    },
  });

export default useStyles;
