import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {dropIcon} from '@assets';
import {globalStyles} from '@services';
import Doughnut from 'react-native-pie-chart';

const DonationProgresscard = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const widthAndHeight = 130;
  const series = [321, 221, 133, 321];
  const sliceColor = ['#DDF7FF', '#0F718C', '#71D3EE', '#BDF1FF'];

  return (
    <View
      style={{
        backgroundColor: '#fff',
        elevation: 1,
        padding: RF(16),
        borderRadius: RF(24),
        marginHorizontal: RF(16),
        marginTop: RF(8),
      }}>
      <Text size={16} SFmedium color={colors.primary}>
        Donation By Type
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: RF(16),
        }}>
        <View
          style={[
            globalStyles.columnstart,
            {marginHorizontal: RF(8), marginLeft: 0},
          ]}>
          <View style={[globalStyles.rowSimple, {marginBottom: 5}]}>
            <View
              style={{
                width: RF(8),
                height: RF(8),
                backgroundColor: '#0F718C',
                borderRadius: RF(4),
              }}
            />
            <Text size={11} SFmedium color="#0F718C" style={{marginLeft: 5}}>
              General
            </Text>
          </View>
          <View style={[globalStyles.rowSimple, {marginBottom: 5}]}>
            <View
              style={{
                width: RF(8),
                height: RF(8),
                backgroundColor: '#71D3EE',
                borderRadius: RF(4),
              }}
            />
            <Text size={11} SFmedium color="#71D3EE" style={{marginLeft: 5}}>
              Medical
            </Text>
          </View>
          <View style={[globalStyles.rowSimple, {marginBottom: 5}]}>
            <View
              style={{
                width: RF(8),
                height: RF(8),
                backgroundColor: '#BDF1FF',
                borderRadius: RF(4),
              }}
            />
            <Text size={11} SFmedium color="#BDF1FF" style={{marginLeft: 5}}>
              Mission Trips
            </Text>
          </View>
          <View style={[globalStyles.rowSimple, {marginBottom: 5}]}>
            <View
              style={{
                width: RF(8),
                height: RF(8),
                backgroundColor: '#DDF7FF',
                borderRadius: RF(4),
              }}
            />
            <Text size={11} SFmedium color="#DDF7FF" style={{marginLeft: 5}}>
              Food
            </Text>
          </View>
        </View>
        <Doughnut
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={'#FFF'}
        />
      </View>
    </View>
  );
};

export default DonationProgresscard;

const styles = StyleSheet.create({});
