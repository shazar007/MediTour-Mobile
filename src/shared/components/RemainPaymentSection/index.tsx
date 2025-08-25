import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../text';
import {RF, SCREEN_WIDTH} from '@theme';
import {colors, rs, rv} from '@services';
import AppButton from '../AppButton';

const RemainPaymentSection = ({
  paymentDetails,
  onPress,
}: {
  paymentDetails?: any;
  onPress?: any;
}) => {
  return (
    <View style={styles.container}>
      {/* Title Section with Gradient Background */}
      <View style={styles.titleWrapper}>
        <Text size={24} SFsemiBold color={'#D61C4E'} style={styles.title}>
          Payment Details
        </Text>
      </View>

      {/* Payment Details List */}
      {paymentDetails?.map((item: any, index: any) => {
        if (!item?.label || !item?.amount) return null;

        return (
          <>
            <View key={index} style={styles.paymentItemWrapper}>
              <View style={styles.paymentItem}>
                <Text
                  size={13}
                  SFsemiBold
                  color={item?.labelColor || colors?.primary}>
                  {item?.label}
                </Text>
                <Text
                  size={11}
                  SFsemiBold
                  style={{
                    letterSpacing: 0.5,
                    width: '40%',
                    textAlign: 'right',
                  }}
                  color={item?.amountColor || '#D61C4E'}>
                  {item?.amount}
                </Text>
              </View>
            </View>
            {item?.dottedLine && (
              <View
                style={{
                  borderBottomWidth: 1,
                  marginBottom: rs(16),
                  marginLeft: -40,
                  width: SCREEN_WIDTH,
                  borderStyle: 'dashed',
                }}
              />
            )}
          </>
        );
      })}

      <AppButton
        containerStyle={{marginTop: 20, width: '100%'}}
        // bgClr="#FF7E5F"
        title={'PAYMENT'}
        onPress={onPress}
      />
    </View>
  );
};

export default RemainPaymentSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rs(24),
    paddingVertical: rv(16),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderRadius: RF(18),
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: RF(15),
    elevation: 2,
    marginVertical: rs(16),
  },
  titleWrapper: {
    backgroundColor: 'linear-gradient(45deg, #FF7E5F, #FEB47B)', // Gradient background
    paddingHorizontal: rs(16),
    borderTopLeftRadius: RF(18),
    borderTopRightRadius: RF(18),
    alignItems: 'center',
    marginBottom: RF(20),
  },
  title: {
    fontWeight: '700',
  },
  paymentItemWrapper: {
    marginBottom: RF(12),
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RF(8),
    paddingHorizontal: RF(12),
    backgroundColor: '#F9FAFB', // Light gray background
    borderRadius: RF(12),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    alignItems: 'center',
    shadowRadius: RF(10),
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#FF7E5F', // Accent color on the left side
    marginBottom: RF(10),
    transitionDuration: '0.3s', // Smooth hover effect
  },

  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB', // Light gray dashed line
  },

  button: {
    justifyContent: 'center',
    borderLeftColor: '#FF7E5F',
    borderLeftWidth: 5,
    borderWidth: 5,
    borderTopColor: '#1A3D7C',
    borderBlockColor: '#1A3D7C',
    borderRightColor: '#FF7E5F',
    height: rv(48),
    marginTop: rv(16),
    borderRadius: rs(12),
  },

  innerButton: {
    height: '100%',
    width: '100%',
    borderRadius: rs(8),
    elevation: 8,
    shadowOpacity: 0.1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'red',
  },
});

{
  /* <View style={[styles.button]}>
        <View style={styles.innerButton}>
          <Text
            size={16}
            SFbold
            color={colors?.primary}
            style={{letterSpacing: 2}}>
            PAYMENT
          </Text>
        </View>
      </View> */
}
