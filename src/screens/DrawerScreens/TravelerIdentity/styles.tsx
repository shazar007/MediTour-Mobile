import {rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    travelerContainer: {
      margin: rs(16),
      padding: rs(16),
      backgroundColor: '#F5F5F5',
      borderRadius: RF(8),
      elevation: 5,
    },
    fixedBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      padding: RF(16),
      elevation: 10,
    },
    text: {
      marginLeft: RF(8),
    },
    errorText: {
      color: 'red',
    },
    content: {
      padding: 10,
      backgroundColor: '#f7f7f7',
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
      elevation: 5,
      backgroundColor: '#fff',
      marginHorizontal: rs(16),
      marginTop: RF(16),
    },
    header: {
      padding: RF(8),
      backgroundColor: '#fff',
      borderColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(16),
    },
    del: {
      width: RF(14),
      height: RF(18),
      tintColor: '#FD5650',
      resizeMode: 'contain',
    },
    TravelerStyle: {
      marginTop: RF(8),
      flexDirection: 'row',
      alignItems: 'center',
    },
    accordion: {
      // padding: RF(10),
      marginVertical: RF(10),
      overflow: 'hidden',
      borderRadius: RF(8),
      backgroundColor: '#fff',
      elevation: 5,
      marginHorizontal: RF(24),
    },
    personTitle: {
      fontSize: RF(16),
      color: '#00276D',
      marginBottom: RF(10),
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: RF(8),
      padding: RF(8),
      marginBottom: RF(10),
      fontSize: RF(14),
    },
    uploadButton: {
      borderStyle: 'dashed',
      borderWidth: 1,
      paddingVertical: RF(16),
      borderRadius: RF(8),
      alignItems: 'center',
      gap: RF(4),
      marginTop: RF(16),
    },
    uploadedFile: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // alignItems: 'center',
      width: '100%',
      paddingHorizontal: RF(8),
    },
    afterUpload: {
      flexDirection: 'row',
      // alignItems: 'center',
      borderWidth: 1,
      borderStyle: 'dashed',
      gap: RF(16),
      // width: '100%',
      padding: RF(8),
      borderRadius: RF(8),
    },
    saveButton: {
      borderRadius: RF(16),
      width: RF(100),
      height: RF(25),
      alignItems: 'center',
      marginTop: RF(20),
      backgroundColor: '#006838',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    saveButtonText: {
      fontSize: RF(16),
      color: '#00276D',
    },
    uploadText: {
      fontSize: RF(14),
      color: '#00276D',
    },
    addButton: {
      borderWidth: 1,
      borderColor: '#00276D',
      borderRadius: RF(8),
      padding: RF(10),
      alignItems: 'center',
      marginHorizontal: RF(20),
      marginTop: RF(20),
      width: RF(200),
      alignSelf: 'center',
    },
    addButtonText: {
      fontSize: RF(16),
      color: '#00276D',
    },
    totalInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    travelerList: {
      marginHorizontal: RF(20),
      marginTop: RF(20),
    },
    travelerItem: {
      padding: RF(10),
      elevation: 5,
      backgroundColor: '#fff',
      borderRadius: RF(8),
      marginTop: RF(8),
      gap: RF(9),
    },
    RoW: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(12),
    },
    RowView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(12),
    },
    ImageView: {
      width: RF(32),
      height: RF(32),
      resizeMode: 'contain',
      borderRadius: RF(32),
    },
    ImageView1: {
      width: RF(16),
      height: RF(16),
      resizeMode: 'contain',
    },
    travelerItemText: {
      fontSize: RF(16),
      color: '#00276D',
    },
    travelerInfoText: {
      fontSize: RF(14),
      color: '#7D7D7D',
    },
  });

export default useStyles;
