import {Image, StyleSheet, View} from 'react-native';
import Text from '../text';
import React from 'react';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {Ambulancedriver, ambulance, driver} from '@assets';

const AmbulanceSectionCards = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: RF(16),
        }}>
        <View
          style={{
            backgroundColor: '#D7EAF0',
            height: RF(200),
            borderRadius: RF(16),
            paddingHorizontal: RF(16),
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginRight: RF(8),
            marginLeft: RF(0),
            elevation: 2,
          }}>
          <Image source={ambulance} style={{width: RF(100), height: RF(70)}} />
          <Text size={16} SFsemiBold color={colors.primary}>
            Total
          </Text>
          <Text size={16} SFsemiBold color={colors.primary}>
            Ambulances
          </Text>
          <Text size={16} SFsemiBold color={colors.InactiveTabColor}>
            10
          </Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              backgroundColor: '#D7EAF0',
              height: RF(96),
              width: '114%',
              justifyContent: 'center',
              paddingHorizontal: RF(16),
              borderRadius: RF(16),
              marginBottom: RF(9),
              elevation: 2,
            }}>
            <Image
              source={Ambulancedriver}
              style={{width: RF(36), height: RF(39)}}
            />
            <Text size={16} SFmedium color={colors.primary}>
              On
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text size={16} SFmedium color={colors.primary}>
                Route
              </Text>
              <Text size={14} SFmedium color={colors.InactiveTabColor}>
                10
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#D7EAF0',
              height: RF(95),
              width: '114%',
              borderRadius: RF(16),
              paddingHorizontal: RF(16),
              paddingTop: RF(8),
              elevation: 2,
            }}>
            <Image source={driver} style={{width: RF(36), height: RF(38)}} />
            <Text size={14} SFmedium color={colors.primary}>
              Served
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text size={14} SFmedium color={colors.primary}>
                Patients
              </Text>
              <Text size={14} SFmedium color={colors.InactiveTabColor}>
                100k+
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AmbulanceSectionCards;
