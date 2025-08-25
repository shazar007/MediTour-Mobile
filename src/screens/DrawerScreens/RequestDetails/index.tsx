import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  HeaderCard,
  Text,
  UserHeaderContent,
} from '@components';
import {RF} from '@theme';
import {
  acceptAmbulanceReq,
  bidReqGet,
  declineAmbulance,
  navigate,
  rs,
  showToast,
} from '@services';
import {useDispatch} from 'react-redux';
import {setAmount, setStripeObj} from '@redux';
import {useTheme} from '@react-navigation/native';

const RequestDetails = ({route}: any) => {
  const {item} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch: any = useDispatch();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchBid();
  }, []);

  const fetchBid = () => {
    let params: any = {
      requestId: item?._id,
    };
    bidReqGet(params)
      .then((res: any) => {
        const filteredBids = res.data?.bidRequests.filter(
          (bid: any) => bid.status !== 'rejected',
        );
        setData(filteredBids);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const declineRequest = () => {
    setLoading(true);
    let params = {
      requestId: selectedRequestId,
    };
    declineAmbulance(params)
      .then((res: any) => {
        setData(data.filter((item: any) => item._id !== selectedRequestId));
        setModalVisible(false);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const openModal = (requestId: any) => {
    setSelectedRequestId(requestId);
    setModalVisible(true);
  };

  const acceptBid = (item: any) => {
    let params = {
      bidRequestId: item?._id,
    };
    dispatch(setStripeObj({data: [item], params: params}));
    dispatch(setAmount(item?.price));
    navigate('StripeAlFalah', {actualAmount: item?.price, type: 'Ambulance'});

    // acceptAmbulanceReq(params)
    //   .then((res: any) => {
    //     setData(data.filter((item: any) => item._id !== bidRequestId));
    //     showToast('success', 'Accepted SuccessFully', true);
    //     navigate('PaymentRequest');
    //   })
    //   .catch((err: any) => {
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Bid'} leftIcon titleColor={colors.white} notify />

      <ScrollView>
        <View style={styles.ViewContent}>
          <View
            style={[
              styles.contentView,
              {
                gap: RF(4),
                backgroundColor: data.length >= 1 ? '#FDCB2E' : '#fff',
              },
            ]}>
            <Text
              size={9}
              SFlight
              color={data.length >= 1 ? '#fff' : '#7D7D7D'}>
              From
            </Text>
            <Text
              size={12}
              SFregular
              color={data.length >= 1 ? '#00276D' : '#7D7D7D'}>
              {`${item?.pickUp?.address},${item?.pickUp?.city}`}
            </Text>
            <Text
              size={9}
              SFlight
              color={data?.length >= 1 ? '#fff' : '#7D7D7D'}>
              To
            </Text>
            <Text
              size={12}
              SFregular
              color={data?.length >= 1 ? '#00276D' : '#7D7D7D'}>
              {`${item?.dropOff?.address},${item?.dropOff?.city}`}
            </Text>
          </View>
          <FlatList
            data={data}
            scrollEnabled={false}
            contentContainerStyle={{
              paddingHorizontal: rs(16),
              gap: rs(16),
              padding: rs(16),
            }}
            ListEmptyComponent={
              <EmptyList description={loading ? 'Loading.....' : 'No bid '} />
            }
            renderItem={({item}: any) => (
              <View style={[styles.contentView_2, {backgroundColor: '#fff'}]}>
                <View style={styles.row}>
                  <Image
                    source={{uri: item?.ambulanceId?.logo}}
                    style={styles.ImageView}
                  />
                  <Text size={16} SFmedium color={'#00276D'}>
                    {item?.ambulanceId?.name}
                  </Text>
                </View>
                <View style={styles.rowV}>
                  <Text size={12} SFregular color={'#00276D'}>
                    {item?.ambulanceName}
                  </Text>
                  <Text size={12} SFregular color={'#00276D'}>
                    {item?.ambulanceNo}
                  </Text>
                </View>
                <View style={{marginTop: RF(4)}}>
                  <Text size={12} SFregular color={'#00276D'}>
                    {`Price:${item?.price}/-`}
                  </Text>
                </View>
                <View style={styles.ViewRow}>
                  <TouchableOpacity
                    style={styles.TouchableStyle}
                    onPress={() => openModal(item._id)}>
                    <Text size={12} color={'#D2092D'} SFregular>
                      Decline
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.TouchStyle}
                    onPress={() => acceptBid(item)}>
                    <Text size={12} color={'#fff'} SFregular>
                      Accept
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
      {loading && <CustomLoader />}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalMessage}>
              You want to delete this "Request"
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>No. Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={declineRequest}>
                <Text style={styles.deleteButtonText}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RequestDetails;

const styles = StyleSheet.create({
  ViewContent: {
    paddingBottom: RF(30),
  },
  contentView: {
    padding: RF(8),
    borderRadius: RF(16),
    elevation: 5,
    margin: rs(16),
    marginBottom: 0,
  },
  contentView_2: {
    padding: RF(8),
    borderRadius: RF(16),
    elevation: 5,
    backgroundColor: '#fff',
  },
  ViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(12),
    gap: RF(16),
  },
  TouchableStyle: {
    borderWidth: 1,
    width: RF(120),
    height: RF(30),
    borderRadius: RF(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#D2092D',
  },
  TouchStyle: {
    width: RF(120),
    height: RF(30),
    borderRadius: RF(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006838',
  },
  ImageView: {
    resizeMode: 'contain',
    width: RF(48),
    height: RF(48),
    borderRadius: RF(32),
  },
  row: {flexDirection: 'row', alignItems: 'center', gap: RF(8)},
  rowV: {
    marginTop: RF(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: RF(20),
    borderRadius: RF(10),
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: RF(18),
    fontWeight: 'bold',
    marginBottom: RF(10),
  },
  modalMessage: {
    fontSize: RF(14),
    color: '#7D7D7D',
    marginBottom: RF(20),
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: RF(10),
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    padding: RF(10),
    borderRadius: RF(5),
  },
  cancelButtonText: {
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#D2092D',
    padding: RF(10),
    borderRadius: RF(5),
  },
  deleteButtonText: {
    color: '#fff',
  },
});
