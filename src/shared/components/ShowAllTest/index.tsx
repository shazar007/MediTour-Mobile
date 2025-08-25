import {
  margin,
  navigate,
  showToast,
  getAll_Tests,
  globalStyles,
  rs,
  rv,
} from '@services';
import {RF} from '@theme';
import useStyles from './styles';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import CustomModalize from '../CustomModalize';
import Text from '../text';
import AppButton from '../AppButton';
import EmptyList from '../emptyComponent';
import CustomLoader from '../CustomLoader';
import SearchInput from '../AA_New_Components/SearchInput';
import {Alert} from '@utils';
import LoginReminder from '../LoginReminder';
const ShowAllTest = (props: any) => {
  const {product, labId} = props;
  const modalizeRef = useRef<Modalize>(null);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [searchText, setSearchText] = useState<any>('');
  const dispatch: any = useDispatch();
  const [data, setData] = useState<any>();
  const [show, setShow] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [selected, setSelected] = useState<any>();
  const [selected_List, setSeletected_List] = useState<any>([]);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [modalVisible, setModalVisible] = useState(false);

  const {user} = useSelector((state: any) => state.root.user);
  useEffect(() => {
    get_Test();
  }, []);
  const get_Test = () => {
    setLoading(true);
    let params = {
      labId: labId,
      testName: searchText,
    };

    getAll_Tests(params)
      .then((res: any) => {
        setData(res?.data?.tests);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const onOpen = () => {
    if (selected_List) {
      modalizeRef.current?.open();
    } else {
      setShow(true);
    }
  };

  const onSelect = (index: any, item: any) => {
    setSelected(item);
    onOpen();
  };

  const onCancel = () => {
    setSelected(null);
    modalizeRef.current?.close();
  };

  const onPressSelect = (item: any) => {
    setSelected(null);
    let tempArr = [...selected_List];
    if (!tempArr.includes(item)) {
      tempArr.push(item);
      setSeletected_List(tempArr);
    }

    modalizeRef.current?.close();
  };
  const onClear = () => {
    setSeletected_List([]);
  };
  const bookNow = () => {
    const formattedData = mapSelectedItems(selected_List);
    navigate('BookNowTest', {
      data: selected_List,
      lab: product.lab,
      selectedItems: formattedData,
    });
  };

  const mapSelectedItems = (list: any[]) => {
    return list?.map(item => ({
      itemId: item?._id,
      quantity: 1,
    }));
  };

  const onSubmitEditing = () => {
    get_Test();
  };

  const handleBook = () => {
    if (user === null) {
      setModalVisible(true);
    } else if (selected_List.length > 0) {
      bookNow();
    } else {
      Alert.showSuccess('Bid add Successfully');
    }
  };
  return (
    <View>
      <SearchInput
        value={searchText}
        onChangeText={val => setSearchText(val)}
        onSubmitEditing={onSubmitEditing}
      />
      {selected_List && (
        <CustomModalize ref={modalizeRef} height={rv(250)}>
          <View style={{marginHorizontal: RF(15)}}>
            <View style={{marginTop: RF(24), gap: RF(4)}}>
              <Text size={16} SFsemiBold color={'rgba(238, 126, 55, 1)'}>
                {selected?.categoryName}
              </Text>
              <Text size={16} SFbold color={'rgba(70, 92, 103, 1)'}>
                {selected?.testName || selected?.testNameId?.name}
              </Text>
            </View>
            <View style={styles.view}>
              <Text size={22} SFmedium color={'rgba(238, 126, 55, 1)'}>
                Total Price
              </Text>
              <Text size={22} SFmedium color={'rgba(0, 104, 56, 1)'}>
                Rs. {selected?.userAmount}
              </Text>
            </View>
            <View style={styles.btnView}>
              <AppButton
                height={42}
                title="CANCEL"
                width={RF(120)}
                onPress={onCancel}
              />
              <AppButton
                height={42}
                title="SELECT"
                width={RF(120)}
                bgColor={changeColor}
                onPress={() => onPressSelect(selected)}
              />
            </View>
          </View>
        </CustomModalize>
      )}
      <ScrollView
        contentContainerStyle={{paddingBottom: 90}}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <CustomLoader />
        ) : (
          <FlatList
            data={data}
            scrollEnabled={false}
            contentContainerStyle={{
              marginVertical: rs(16),
            }}
            renderItem={({index, item}: any) => {
              //

              let testSelect = selected_List?.includes(item);
              return (
                <>
                  <Pressable
                    style={[styles.pressable]}
                    onPress={() => onSelect(index, item)}>
                    <View
                      style={[
                        styles.card,
                        {
                          borderWidth: testSelect ? 1 : 0,
                          borderColor: testSelect ? changeColor : '',
                        },
                      ]}>
                      <Text size={16} SFsemiBold color={colors.primary}>
                        {item?.categoryName
                          ? item?.categoryName
                          : item?.testNameId
                          ? item?.testNameId?.name
                          : data?.testName}
                      </Text>
                      <Text
                        size={12}
                        color={colors.detailText}
                        style={margin.top_8}>
                        Description
                      </Text>
                      <Text size={12} color={colors.detailText}>
                        {item?.testName
                          ? item?.testName
                          : item?.testDescription
                          ? item?.testDescription
                          : data?.testDescription}
                      </Text>
                      <View style={[globalStyles.row, margin.top_16]}>
                        <Text size={16} SFsemiBold color={colors.primary}>
                          {
                            // item?.price
                            //   ? item?.price
                            //   :
                            item?.userAmount ? item?.userAmount : data?.price
                          }{' '}
                          PKR
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </>
              );
            }}
            ListEmptyComponent={
              loading ? null : <EmptyList description={'No data found'} />
            }
          />
        )}
        <View style={styles.btn}>
          {selected_List.length > 0 && (
            <View style={styles.row}>
              <Text color={colors?.darkGreen} size={16} SFsemiBold>
                {selected_List?.length} Test Select
              </Text>
              <Pressable onPress={onClear}>
                <Text color={'red'} size={16} SFsemiBold>
                  Clear
                </Text>
              </Pressable>
            </View>
          )}
          {data?.length > 0 && (
            <AppButton title="Book Now" onPress={handleBook} />
          )}
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{flexGrow: 1}}>
            <LoginReminder />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* {show &&
          showToast('Error', 'Please Select atleast 1 test to book', false)} */}
    </View>
  );
};

export default ShowAllTest;
