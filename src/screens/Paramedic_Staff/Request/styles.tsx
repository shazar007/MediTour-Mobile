import { RF } from '@theme';
import { StyleSheet } from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    Container: { padding: RF(8), backgroundColor: '#fff', borderRadius: RF(8), elevation: 5, marginHorizontal: RF(20), marginVertical: RF(20),gap:RF(4) }
    , rowContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },openView:{
                          position: 'absolute',
                          top: RF(32),
                          backgroundColor: '#fff',
                          borderRadius: RF(4),
                          elevation: 5,
                          right: 0,
                          zIndex: 1000,
                          padding: RF(8),
                          width: RF(150),
                        },mainView:{
                          padding: RF(8),
                          justifyContent: 'space-between',
                          borderRadius: RF(4),
                          backgroundColor: '#fff',
                          elevation: 5,
                          flexDirection: 'row',
                          width: RF(150),
                        },
  });

export default useStyles;
