import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../text';
import {RF} from '@theme';
import moment from 'moment';

const FlightDetail = ({flight, fileName}: any) => {
  return (
    <>
      <View style={styles.contentRow}>
        <Text size={14} SFlight color={'#7D7D7D'}>
          Company Name:
        </Text>
        <Text size={14} SFregular color={'#0E54A3'}>
          {flight?.companyName}
        </Text>
      </View>
      <View>
        <Text size={14} SFlight color={'#7D7D7D'}>
          Company Logo:
        </Text>
        <Text size={14} SFregular color={'#0E54A3'}>
          {fileName}
        </Text>
      </View>
      <View style={styles.contentRow}>
        <Text size={14} SFlight color={'#7D7D7D'}>
          From:{' '}
        </Text>
        <Text size={14} SFregular color={'#0E54A3'}>
          {flight?.from}
        </Text>
      </View>
      <View style={styles.contentRow}>
        <Text size={14} SFlight color={'#7D7D7D'}>
          To:{' '}
        </Text>
        <Text size={14} SFregular color={'#0E54A3'}>
          {flight?.to}
        </Text>
      </View>
      <View style={styles.contentRow}>
        <Text size={14} SFlight color={'#7D7D7D'}>
          Flight No:{' '}
        </Text>
        <Text size={14} SFregular color={'#0E54A3'}>
          {flight?.flightNo}
        </Text>
      </View>
      <View style={styles.contentRow}>
        <Text size={14} SFlight color={'#7D7D7D'}>
          Departure Date:{' '}
        </Text>
        <Text size={14} SFregular color={'#0E54A3'}>
          {flight?.departureDate}
        </Text>
      </View>
      <View style={styles.contentRow}>
        <Text size={14} SFlight color={'#7D7D7D'}>
          Departure Time:{' '}
        </Text>
        <Text size={14} SFregular color={'#0E54A3'}>
          {' '}
          {moment(flight?.departureTime).format('hh:mm A')}
        </Text>
      </View>
      <View style={styles.contentRow}>
        <Text size={14} SFlight color={'#7D7D7D'}>
          Arrival Date:{' '}
        </Text>
        <Text size={14} SFregular color={'#0E54A3'}>
          {flight?.arrivalDate}
        </Text>
      </View>
      <View style={styles.contentRow}>
        <Text size={14} SFlight color={'#7D7D7D'}>
          Arrival Time:{' '}
        </Text>
        <Text size={14} SFregular color={'#0E54A3'}>
          {moment(flight?.arrivalTime).format('hh:mm A')}
        </Text>
      </View>
      <View style={{gap: RF(4)}}>
        <Text size={14} SFregular color={'#0E54A3'}>
          Amenities
        </Text>
        <Text size={12} SFregular color={'#0E54A3'}>
          {flight?.amenities.join(', ')}
        </Text>
      </View>
      <View style={[styles.contentRow, {marginTop: RF(8)}]}>
        <Text size={14} SFlight color={'#7D7D7D'}>
          No. of Handbag:{' '}
        </Text>
        <Text size={14} SFregular color={'#0E54A3'}>
          {flight?.noOfHandbag}
        </Text>
      </View>
      <View style={styles.contentRow}>
        <Text size={14} SFlight color={'#7D7D7D'}>
          Baggage Weight:{' '}
        </Text>
        <Text size={14} SFregular color={'#0E54A3'}>
          {flight?.baggageWeight}
        </Text>
      </View>
    </>
  );
};

export default FlightDetail;

const styles = StyleSheet.create({
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RF(5),
    gap: RF(4),
  },
});
