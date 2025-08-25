import {
  margin,
  navigate,
  showToast,
  getAll_Tests,
  globalStyles,
  rs,
} from '@services';
import {
  Text,
  AppButton,
  EmptyList,
  HeaderCard,
  CustomLoader,
  CustomModalize,
  UserHeaderContent,
  CustomHeader,
  SearchInput,
} from '@components';
import {RF} from '@theme';
import useStyles from './styles';
import {setAmount} from '@redux';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Pressable, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RouteProp, useTheme} from '@react-navigation/native';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      product?: any;
      category?: any;
      labId?: any;
    };
  }>;
}

const ProductDetail = (props: Props, navigation: any) => {
  const {product, category, labId} = props.route?.params;
  const modalizeRef = useRef<Modalize>(null);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const dispatch: any = useDispatch();
  const [data, setData] = useState<any>();
  const [show, setShow] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [selected, setSelected] = useState<any>();
  const [selectedOne, setSelectedOne] = useState<any>();
  const [bookNowList, setBookNowList] = useState<any>();
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const [selected_List, setSeletected_List] = useState<any>([]);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  //

  useEffect(() => {
    get_Test();
  }, []);

  const get_Test = () => {
    setLoading(true);
    let params = {
      labId: labId,
      // categoryName: category?.categoryName,
    };

    getAll_Tests(params)
      .then((res: any) => {
        //

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
    return list.map(item => ({
      itemId: item._id,
      quantity: 1,
    }));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FAF9F6'}}>
      <CustomHeader
        title={category?.categoryName + ' '}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <View style={{padding: rs(16), paddingBottom: rs(8)}}>
        <SearchInput
        // onChangeText={onChangeText}
        // onSubmitEditing={onSubmitEditing}
        />
      </View>
      {selected_List && (
        <CustomModalize ref={modalizeRef}>
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

      <FlatList
        data={data}
        contentContainerStyle={{
          margin: rs(16),
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
          <AppButton
            title="Book Now"
            onPress={
              selected_List.length > 0
                ? bookNow
                : () => showToast('Hey!', 'Select item first', false)
            }
          />
        )}
      </View>

      {loading && <CustomLoader />}
      {/* {show &&
        showToast('Error', 'Please Select atleast 1 test to book', false)} */}
    </View>
  );
};

export default ProductDetail;
