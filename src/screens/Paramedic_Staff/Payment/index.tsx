import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CustomHeader, Text, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {Modalize} from 'react-native-modalize';
import {Image} from 'react-native';
import {RF} from '@theme';
import {DoctorsRequestsItems, getPaymentComplete} from '@services';
import {useSelector} from 'react-redux';
import moment from 'moment';

const ParamedicStaffPayment = ({navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  console.log('🚀 ~ ParamedicStaffPayment ~ payments:', payments);
  const {user} = useSelector((state: any) => state?.root?.user);

  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  useEffect(() => {
    fetchPayments(1, '');
  }, []);

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = (item: any) => {
    modalizeRef.current?.open();
    setSelectedItem(item);
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };

  const fetchPayments = (pageno: number, keyword: any) => {
    setLoading(true);
    getPaymentComplete('Doctor', '', user?._id, pageno, keyword)
      .then((res: any) => {
        setPayments(res?.data?.payments);
        // setLength(res?.data?.paymentsLength);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={'Patient Payment'} titleColor={'#fff'} notify />

      <View
        style={{
          paddingHorizontal: RF(16),
          paddingVertical: RF(8),
          flexDirection: 'row',
        }}>
        {/* <Text size={16} SFmedium color={colors.blueText}>
          Total Payments = 1234
        </Text> */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: RF(16), paddingBottom: RF(72)}}>
          {payments.map((item: any, index: any) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: colors.background,
                  elevation: 2,
                  padding: RF(16),
                  borderRadius: RF(8),
                  borderLeftColor: colors.paramedic,
                  borderLeftWidth: 2,
                  marginVertical: RF(8),
                }}>
                <Text size={14} SFsemiBold color={colors.paramedic}>
                  {`${item.paymentId}`}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text size={14} SFmedium color={colors.primary}>
                    Payment Date
                  </Text>
                  <Text size={14} SFregular color={colors.primary}>
                    {moment(item?.createdAt)?.format('DD/MM/YYYY')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text size={14} SFmedium color={colors.primary}>
                    Payment Quantity
                  </Text>
                  <Text size={14} SFregular color={colors.primary}>
                    {`${item.noOfitems}`}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text size={14} SFregular color={colors.primary}>
                    Received Amount
                  </Text>
                  <Text size={14} SFregular color={colors.primary}>
                    {`${item.payableAmount}`}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default ParamedicStaffPayment;

const styles = StyleSheet.create({});
