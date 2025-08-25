import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AmbulanceCard,
  CustomFlatTab,
  CustomHeader,
  CustomLoader,
  EmptyList,
  FlightsContent,
  HeaderCard,
  SwapCards,
  Text,
  UserHeaderContent,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {
  delFlight,
  deleteRequest,
  getAllFlights,
  getUserReq,
  requestDrop,
  showToast,
  rs,
  rv,
} from '@services';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {Alert} from '@utils';

const Request = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [refreshing, setRefreshing] = useState(false);
  const styles = useStyles();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [flightData, setFlightData] = useState<any>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [response, setResponse] = useState('Flights');
  const handleItemPress = (item: any) => {
    setResponse(item);
    setPage(1);
    setHasMoreData(true);
  };

  useEffect(() => {
    setLoading(true);
    if (response === 'Ambulance') {
      getRequestUser(1);
    }
    if (response === 'Flights') {
      flightsRequest(1);
    }
  }, [response]);

  const flightsRequest = (pageNumber: any) => {
    if (!hasMoreData && pageNumber > 1) return;
    let data = {
      page: pageNumber,
    };
    getAllFlights(data)
      .then((res: any) => {
        const newFlightData = res.data.flightRequests || [];
        setFlightData((prevData: any) =>
          pageNumber === 1
            ? newFlightData
            : [...prevData, ...res.data.flightRequests],
        );
        if (newFlightData.length === 0 || newFlightData.length < 10) {
          setHasMoreData(false);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setPage(pageNumber);
      });
  };

  const getRequestUser = (pageNumber: any) => {
    if (!hasMoreData && pageNumber > 1) return;
    let data = {
      page: pageNumber,
    };
    getUserReq(data)
      .then((res: any) => {
        const newRequest = res.data.userRequests;
        setData((prevData: any) =>
          pageNumber === 1
            ? newRequest
            : [...prevData, ...res.data.userRequests],
        );
        if (newRequest.length === 0 || newRequest.length < 10) {
          setHasMoreData(false);
        }
      })

      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setPage(pageNumber);
      });
  };

  const deletefetchRequest = () => {
    setLoading(true);
    let params = {
      requestId: selectedRequestId,
    };
    deleteRequest(params)
      .then((res: any) => {
        setData(data.filter((item: any) => item._id !== selectedRequestId));
        Alert.showSuccess('Deleted Successfully');
        setModalVisible(false);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteFlight = () => {
    setLoading(true);
    let params = {
      flightRequestsId: selectedRequestId,
    };
    delFlight(params)
      .then(() => {
        setFlightData(
          flightData.filter((item: any) => item._id !== selectedRequestId),
        );
        Alert.showSuccess('Deleted Successfully');
        setModalVisible(false);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      if (response == 'Ambulance') {
        getRequestUser(1);
      }
      if (response == 'Flights') {
        flightsRequest(1);
      }
      setRefreshing(false);
    }, 100);
  };
  const loadMoreData = () => {
    if (hasMoreData && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };
  const openModal = (requestId: any) => {
    setSelectedRequestId(requestId);
    setModalVisible(true);
  };

  const handleDelete = () => {
    if (response === 'Ambulance') {
      deletefetchRequest();
    } else if (response === 'Flights') {
      deleteFlight();
    }
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={response}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[changeColor, changeColor]}
          />
        }>
        {/* <View style={{marginTop: RF(8), marginHorizontal: RF(8)}}>
          <CustomFlatTab
            data={requestDrop}
            initialState={response}
            handlePress={handleItemPress}
          />
        </View> */}
        <Text
          size={18}
          SFmedium
          color={colors.blueText}
          style={{marginLeft: rs(16), marginTop: rs(16)}}>
          {response === 'Flights' ? 'Flights' : 'Ambulance'}
        </Text>
        <>
          <FlatList
            data={response == 'Ambulance' ? data : flightData}
            // data={[1, 2, 3, 4, 5, 6, 7]}
            keyExtractor={(item: any) => item._id?.toString()}
            contentContainerStyle={{
              gap: rs(16),
              padding: rs(16),
              paddingBottom: rv(130),
            }}
            scrollEnabled={false}
            onEndReached={() => {
              if (response === 'Ambulance') {
                getRequestUser(page + 1);
              } else {
                flightsRequest(page + 1);
              }
            }}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <EmptyList
                description={loading ? 'Loading.....' : 'No data found'}
              />
            }
            renderItem={({item}) => {
              return response == 'Ambulance' ? (
                <AmbulanceCard item={item} onOpen={() => openModal(item._id)} />
              ) : (
                <FlightsContent
                  item={item}
                  onDel={() => openModal(item._id)}
                  type2={item?.status === 'bidSent' ? '#FDCB2E' : '#fff'}
                  type3={item?.status === 'bidSent' ? '#fff' : colors?.blueText}
                />
              );
            }}
          />
        </>

        {loading && <CustomLoader />}
      </ScrollView>
      <SwapCards
        card1={'Flights'}
        card2={'Ambulance'}
        initialState={response}
        activeTextColor={'#fff'}
        activeColor={changeColor}
        handlePress={handleItemPress}
        inActiveTextColor={changeColor}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Are you sure?</Text>
            <Text style={modalStyles.modalMessage}>
              You want to delete this "Request"
            </Text>
            <View style={modalStyles.modalButtons}>
              <TouchableOpacity
                style={modalStyles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={modalStyles.cancelButtonText}>No. Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.deleteButton}
                onPress={handleDelete}>
                <Text style={modalStyles.deleteButtonText}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Request;

const modalStyles = StyleSheet.create({
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
