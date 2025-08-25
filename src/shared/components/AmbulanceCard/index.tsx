import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {del} from '@assets';
import {RF} from '@theme';
import {navigate} from '@services';
import Text from '../text';
const AmbulanceCard = ({item, onOpen}: any) => {
  return (
    <View style={styles.contentView}>
      <View style={styles.viewContainer}>
        <Text size={9} SFlight color={'#7D7D7D'}>
          From
        </Text>
        <TouchableOpacity onPress={onOpen}>
          <Image source={del} style={styles.DEL} />
        </TouchableOpacity>
      </View>
      <Text size={12} SFregular color={'#7D7D7D'}>
        {`${item?.pickUp?.address}`}
      </Text>
      <Text size={9} SFlight color={'#7D7D7D'}>
        To
      </Text>
      <Text size={12} SFregular color={'#7D7D7D'}>
        {`${item?.dropOff?.address}`}
      </Text>
      <TouchableOpacity
        style={styles.bleButton}
        onPress={() => navigate('RequestDetails', {item: item})}>
        <Text size={12} SFregular color={'#fff'}>
          Bids
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmbulanceCard;

const styles = StyleSheet.create({
  contentView: {
    padding: RF(8),
    borderRadius: RF(16),
    elevation: 5,
    backgroundColor: '#fff',
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bleButton: {
    backgroundColor: '#00276D',
    width: RF(100),
    height: RF(30),
    borderRadius: RF(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(8),
    alignSelf: 'flex-end',
  },
  DEL: {width: RF(16), height: RF(16), resizeMode: 'contain'},
});
