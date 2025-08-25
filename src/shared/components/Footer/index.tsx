import {View} from 'react-native';
import React from 'react';
import AppButton from '../AppButton';
import Text from '../text';
import { RF } from '@theme';

const Footer = ({
  travelers,
  totalTravelers,
  styles,
  handleContinue,
  item,
}: {
  travelers?: any;
  styles?: any;
  totalTravelers?: any;
  handleContinue?: any;
  item?: any;
}) => {
  return (
    <View style={styles.fixedBottom}>
      <View style={styles.totalInfoContainer}>
        <Text>Total Traveler Information</Text>
        <Text>
          {travelers?.length}/{totalTravelers}
        </Text>
      </View>
      <View style={styles.TravelerStyle}>
        <Text size={16} SFmedium color={'#00276D'}>
          PKR {item?.ticketPrice}
        </Text>
        <Text size={16} SFmedium color={'#00276D'}>
          . {totalTravelers} Traveler
        </Text>
      </View>
      <AppButton title="Continue" m_Top={RF(22)} onPress={handleContinue} />
    </View>
  );
};

export default Footer;
