import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {globalStyles} from '@services';
import Text from '../text';
import moment from 'moment';

const PaymentListingB2B = ({
  handleOnPress,
  item,
}: {
  handleOnPress?: any;
  item?: any;
}) => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  return (
    <>
      <TouchableOpacity onPress={handleOnPress} style={styles?.container}>
        <View style={globalStyles.row}>
          <Text size={14} SFmedium color={'#EE7E37'}>
            {item?.paymentId}
          </Text>
        </View>
        <Text size={14} SFregular color={colors.primary}>
          Quantity: {item?.noOfitems}
        </Text>
        <View style={globalStyles.row}>
          <Text size={14} SFregular color={colors.primary}>
            {moment(item?.createdAt).format('DD MMM YYYY hh:mm A')}
          </Text>

          <Text
            size={14}
            SFregular
            color={colors.primary}
            style={{textAlign: 'right'}}>
            {item?.payableAmount}/-only
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PaymentListingB2B;

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    padding: RF(16),
    borderRadius: RF(8),
    marginVertical: RF(8),
    marginHorizontal: RF(20),
    borderLeftWidth: RF(2),
    borderLeftColor: '#00276D',
    backgroundColor: '#fff',
  },
});
