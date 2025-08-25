import {StyleSheet} from 'react-native';
import {RF} from '@theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: RF(16),
  },
  listContentContainer: {
    paddingBottom: RF(100),
  },
  apartmentCard: {
    backgroundColor: '#FFFFFF',
    padding: RF(16),
    marginVertical: RF(8),
    borderRadius: RF(8),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: RF(8),
    elevation: 4,
  },
  apartmentTitle: {
    fontSize: RF(16),
    fontWeight: 'bold',
    marginBottom: RF(8),
  },
  apartmentDetail: {
    fontSize: RF(14),
    marginBottom: RF(4),
  },
  addButton: {
    position: 'absolute',
    bottom: RF(20),
    right: RF(20),
    backgroundColor: '#0D47A1',
    padding: RF(16),
    borderRadius: RF(30),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: RF(8),
    elevation: 4,
  },
  addIcon: {
    width: RF(24),
    height: RF(24),
  },
  imagePreview: {
    width: RF(50),
    height: RF(50),
    marginRight: RF(8),
    borderRadius: RF(8),
  },
});
