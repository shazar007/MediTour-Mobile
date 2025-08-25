import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {LabDownload} from '@assets';
import {RF} from '@theme';
import Text from '../text';

const TravelerInformation = ({
  onPressVise,
  index,
  onPressPass,
  traveler,
}: {
  onPressVise?: any;
  index?: any;
  onPressPass?: any;
  traveler?: any;
}) => {
  return (
    <View key={traveler._id} style={styles.travelerCard}>
      <Text size={14} SFmedium color={'#0E54A3'}>
        Traveler {index + 1}
      </Text>
      <View style={styles.Row}>
        <View style={{marginTop: RF(8), gap: RF(4)}}>
          <Text size={12} SFregular color={'#0E54A3'}>
            Name
          </Text>
          <Text size={14} SFregular color={'#7D7D7D'}>
            {traveler.name}
          </Text>
        </View>
        <View style={{marginTop: RF(8), gap: RF(4)}}>
          <Text size={12} SFregular color={'#0E54A3'}>
            Passport No
          </Text>
          <Text size={14} SFregular color={'#7D7D7D'}>
            {traveler.passportNo}
          </Text>
        </View>
      </View>
      <View style={{marginTop: RF(8)}}>
        <Text size={12} SFregular color={'#0E54A3'}>
          Passport File
        </Text>
        <TouchableOpacity style={styles.Touchable} onPress={onPressPass}>
          <Text size={12} SFregular color={'#0E54A3'}>
            Passport File
          </Text>
          <Image source={LabDownload} style={styles.DownloadImage} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: RF(8)}}>
        <Text size={12} SFregular color={'#0E54A3'}>
          Visa File
        </Text>
        <TouchableOpacity style={styles.Touchable} onPress={onPressVise}>
          <Text size={12} SFregular color={'#0E54A3'}>
            Visa File
          </Text>
          <Image source={LabDownload} style={styles.DownloadImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TravelerInformation;

const styles = StyleSheet.create({
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Touchable: {
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: RF(8),
    borderStyle: 'dashed',
    padding: RF(12),
    marginTop: RF(8),
  },
  DownloadImage: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
    tintColor: '#0E54A3',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  travelerInfo: {
    marginVertical: RF(16),
    marginHorizontal: RF(24),
    // backgroundColor: 'red',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: RF(8),
    elevation: 5,
    padding: RF(8),
  },
  travelerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  File_S: {
    backgroundColor: '#F6F7F9',
    height: RF(75),
    borderRadius: RF(8),
    width: '100%',
    overflow: 'hidden',
    marginTop: RF(8),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#0D47A1',
  },
  ImageShow: {
    height: RF(32),
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RF(32),
    elevation: 5,
  },
  contentView: {
    width: '100%',
    height: '100%',
  },
  UpLoad_S: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: RF(16),
    marginTop: RF(16),
    marginHorizontal: RF(20),
    borderColor: '#7D7D7D',
    backgroundColor: '#E3EBED',
    padding: RF(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Cam_S: {width: RF(16), height: RF(16), resizeMode: 'contain'},
  Upload_Image: {
    width: RF(22),
    height: RF(26),
    resizeMode: 'contain',
    tintColor: '#00276D',
  },
  Gap_styles: {gap: RF(4), alignItems: 'center', marginTop: RF(16)},
  crossStyle: {
    width: RF(20),
    height: RF(20),
    resizeMode: 'contain',
    tintColor: 'red',
  },
  hitSlop: {
    top: RF(8),
    right: RF(8),
    left: RF(8),
    bottom: RF(8),
  },
  RowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    position: 'relative',
    marginTop: RF(8),
    marginRight: 10,
    borderWidth: 1,
    borderRadius: RF(8),
    borderColor: '#7D7D7D',
    borderStyle: 'dashed',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FA5400',
    borderRadius: 10,
    padding: 2,
  },
  travelerCard: {
    marginTop: RF(16),
    padding: RF(4),
    // borderWidth: 1,
    // borderRadius: 8,
    // borderColor: '#ddd',
  },
  travelerText: {
    fontSize: 16,
  },
  input: {
    marginTop: 8,
  },
  fileText: {
    marginTop: 8,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
