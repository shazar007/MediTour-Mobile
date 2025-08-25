import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomCard from './CustomCard';
import Text from '../text';
import {dropIcon, framOffer} from '@assets';
import {RF} from '@theme';
import TimeInput from './TimeInput';
import AppButton from '../AppButton';

const OfferDetail = () => {
  return (
    <View style={styles.backgroundContainer}>
      <CustomCard>
        <View style={styles.Container}>
          <Text size={14} SFsemiBold color={'rgba(18, 31, 62, 1)'}>
            Order Details
          </Text>
          <TouchableOpacity>
            <Image source={dropIcon} style={styles.ImageStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.orderStyle}>
          <Image source={framOffer} style={styles.styleImage} />
          <Text
            size={12}
            center
            SFregular
            color={'rgba(148, 148, 148, 1)'}
            style={{marginLeft: RF(8), width: RF(136)}}>
            I will do ui design, ui ux design and mobile apps
          </Text>
        </View>
        <View style={{marginTop: RF(16)}}>
          <Text size={14} SFsemiBold color={'rgba(67, 67, 67, 1)'}>
            Your offer
          </Text>
          <View style={styles.ContainerView}>
            <TextInput
              style={styles.TextInputStyle}
              multiline
              placeholder="Buyer says 2 screens of mobile app
onboarding screens...logo will be provided cheme also... I will give thce figma file...Thank you"
            />
          </View>
          <View style={styles.rowStyle}>
            <TimeInput title={'Delivery Time'} placeholder={'38$'} />
            <TimeInput title={'No Of Revisions'} placeholder={'5'} />
          </View>
          <TimeInput title={'Total Price'} width={'100%'} placeholder={'38$'} />
          <AppButton title="Continue" m_Top={RF(16)} />
        </View>
      </CustomCard>
    </View>
  );
};

export default OfferDetail;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backgroundContainer: {
    marginHorizontal: RF(18),
    backgroundColor: 'rgba(248, 248, 248, 1)',
  },
  ImageStyle: {width: RF(20), height: RF(20), resizeMode: 'contain'},
  orderStyle: {
    marginTop: RF(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleImage: {width: '43%', height: RF(65), resizeMode: 'contain'},
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TextInputStyle: {
    textAlignVertical: 'top',
    fontSize: RF(14),
    color: 'rgba(148, 148, 148, 1)',
    fontWeight: '400',
  },
  ContainerView: {
    backgroundColor: 'rgba(248, 248, 248, 1)',
    paddingHorizontal: RF(16),
    paddingVertical: RF(12),
    marginTop: RF(8),
  },
});
