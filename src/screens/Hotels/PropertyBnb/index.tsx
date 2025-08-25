import {Image, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppButton,
  CustomFlatTab,
  CustomHeader,
  CustomModalize,
  EmptyList,
  HeaderCard,
  LottieAnimation,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {CheckBox} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import * as Yup from 'yup';
import {Bnb, NoDataAnimation, backIcon} from '@assets';
import useStyles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {
  getAllBNB,
  getAllHomesHotel,
  getAllHotelApart,
  navigate,
  rv,
} from '@services';
import {useFormik} from 'formik';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';

const drOptions = [
  {
    card1: 'B&B',
  },
  {
    card1: 'Apartment',
  },
  {
    card1: 'Home',
  },
];
const propertyInformation = [
  {id: 1, name: 'Hotel', source: Bnb},
  {id: 2, name: 'Guest House', source: Bnb},
  {id: 3, name: 'Hostels', source: Bnb},
  {id: 4, name: 'Bed & Breakfast', source: Bnb},
  {id: 5, name: 'Condo Hotel', source: Bnb},
  {id: 6, name: 'Farmhouse', source: Bnb},
];
const dataHotel = [
  {id: 1, name: 'Apartments'},
  {id: 1, name: 'Homes'},
  {id: 1, name: 'Hotels, B&Bs & More'},
];
const validationSchema = Yup.object().shape({
  HomeQuestion: Yup.string().required('multipleApartments is required'),
});
const PropertyBnb = () => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles: any = useStyles();
  const modalizeRef = useRef<any>(null);
  const modalizeRef1 = useRef<any>(null);
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const [data, setData] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const lab = B2B?.hotel;
  const [response, setResponse] = useState('B&B');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const HotelCard = ({
    name,
    source,
    location,
    handleNext,
  }: {
    item?: any;
    name?: any;
    source?: any;
    location?: any;
    handleNext?: any;
  }) => (
    <TouchableOpacity style={styles.card} onPress={handleNext}>
      <View style={styles.WidthSyle}>
        <Image
          source={{
            uri:
              source ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.ContentDetails}>
        <Text style={styles.hotelName} size={14} SFmedium color={'#00276D'}>
          {name}
        </Text>
      </View>
      <Text size={14} SFmedium color={'#00276D'} style={styles.hotelAddress}>
        {location}
      </Text>
    </TouchableOpacity>
  );
  useEffect(() => {
    if (response == 'B&B') {
      getAllBnb();
    } else if (response == 'Apartment') {
      getApart();
    } else if (response == 'Home') {
      getAllHomes();
    }
  }, [response]);

  const getAllBnb = (pageNumber = 1) => {
    setLoading(true);
    let params = {
      page: pageNumber,
    };
    getAllBNB(params)
      .then((res: any) => {
        setData((prevData: any) =>
          pageNumber === 1 ? res.data.bnbs : [...prevData, ...res.data.bnbs],
        );
        setPage(pageNumber);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIsLoadingMore(false);
      });
  };

  const getApart = (pageNumber = 1) => {
    setLoading(true);
    const params = {
      page: pageNumber,
    };
    getAllHotelApart(params)
      .then((res: any) => {
        setData((prevData: any) =>
          pageNumber === 1
            ? res.data.appartments
            : [...prevData, ...res.data.appartments],
        );
        setPage(pageNumber);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIsLoadingMore(false);
      });
  };

  const getAllHomes = (pageNumber = 1) => {
    setLoading(true);
    const params = {
      page: pageNumber,
    };
    getAllHomesHotel(params)
      .then((res: any) => {
        setData((prevData: any) =>
          pageNumber === 1 ? res.data.homes : [...prevData, ...res.data.homes],
        );
        setPage(pageNumber);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIsLoadingMore(false);
      });
  };

  const handleItemPress = (item: any) => {
    setResponse(item);
    setPage(1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      if (response == 'B&B') {
        getAllBnb(1);
      } else if (response == 'Apartment') {
        getApart(1);
      } else if (response == 'Home') {
        getAllHomes(1);
      }
      setRefreshing(false);
    }, 100);
  };

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      if (response == 'B&B') {
        getAllBnb(nextPage);
      } else if (response == 'Apartment') {
        getApart(nextPage);
      } else if (response == 'Home') {
        getAllHomes(nextPage);
      }
    }
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const Open = (item: any) => {
    setSelectedItem(item);
    modalizeRef.current?.close();
    if (item === 'Apartments') {
      navigate('HotelInfoFom', {item: item});
    } else {
      modalizeRef1.current?.open();
    }
  };
  const onCloseBar = () => {
    modalizeRef1.current?.close();
  };
  const onPressTap = (item: any, item1: any) => {
    modalizeRef1.current?.close();
    navigate('HotelInfoFom', {item: item, selectedItem: item1});
  };
  const formik = useFormik({
    initialValues: {
      HomeQuestion: false,
    },
    validationSchema,
    onSubmit: (values: any) => {
      let val: any =
        values.HomeQuestion === true ? 'Entire place' : 'A private room';
      modalizeRef1.current?.close();
      navigate('HotelInfoFom', {item: val, selectedItem: selectedItem});
    },
  });
  const showErrorToast = (error: any) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error,
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });
  };
  const onPress = () => {
    if (!formik.isValid && formik.submitCount > 0) {
      const firstError = Object.values(formik.errors)[0];
      showErrorToast(firstError);
    } else {
      formik.handleSubmit();
    }
  };
  const onClose = () => {
    modalizeRef1.current?.close();
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Property'}
          leftIcon
          titleColor={colors.white}
          notify
        />
        <View style={{paddingLeft: rv(16), marginTop: rv(8)}}>
          <CustomFlatTab
            data={drOptions}
            initialState={response}
            handlePress={handleItemPress}
          />
        </View>

        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginHorizontal: RF(16),
              marginTop: RF(16),
              paddingBottom: RF(80),
            }}
            data={data}
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            ListEmptyComponent={
              <EmptyList
                description={loading ? 'Loading.....' : 'No data found'}
              />
            }
            renderItem={({item}) => (
              <HotelCard
                item={item}
                source={
                  response === 'B&B'
                    ? item?.bnb?.propertyphoto?.[0]
                    : item?.propertyphoto?.[0]
                }
                name={
                  response === 'B&B'
                    ? item?.bnb?.rooms?.[0]?.roomName
                    : item?.propertyName
                }
                location={
                  response === 'B&B'
                    ? item?.bnb?.hotelId?.location?.address
                    : item?.location?.address
                }
                handleNext={() =>
                  navigate('SinglePropertyDetails', {
                    item: item,
                    response: response,
                  })
                }
              />
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
          <View
            style={{
              position: 'absolute',
              zIndex: 100,
              bottom: 100,
              width: RF(150),
              right: 0,
            }}>
            <AppButton title="Add Property" onPress={onOpen} />
          </View>
        </>
      </View>
      <CustomModalize ref={modalizeRef} height={RF(500)}>
        <View style={{marginTop: RF(8)}}>
          <Text center size={12} SFregular color={'#0D47A1'}>
            Book with us, and unlock your dream stay on MediTour!"
          </Text>
          <Text size={14} SFmedium color={'#0D47A1'} center>
            Select Your Comfort Zone On MediTour{' '}
          </Text>
          <FlatList
            data={dataHotel}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.CommonStyle}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => Open(item.name)}
                style={styles.propertyStyle}>
                <Image source={Bnb} style={styles.ImgV} />
                <Text center size={16} SFregular color={'#0D47A1'}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </CustomModalize>
      <CustomModalize
        ref={modalizeRef1}
        height={
          selectedItem && selectedItem === 'Hotels, B&Bs & More'
            ? RF(518)
            : RF(250)
        }>
        {selectedItem && selectedItem === 'Hotels, B&Bs & More' ? (
          <View style={{marginTop: RF(8)}}>
            <View style={styles.RowStyle}>
              <TouchableOpacity onPress={onClose}>
                <Image source={backIcon} style={styles.BackIconStyle} />
              </TouchableOpacity>
              <Text
                center
                size={14}
                SFregular
                color={'#0D47A1'}
                style={{width: RF(280)}}>
                Which category is the best for your place? choose your comfort
                zone
              </Text>
            </View>
            <View style={{height: RF(16)}} />
            <FlatList
              data={propertyInformation}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.ColumnStyle}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.propertyStyle2}
                  onPress={() => onPressTap(item, selectedItem)}>
                  <Image source={item?.source} style={styles.ImageView} />
                  <Text center size={16} SFregular color={'#0D47A1'}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <>
            <View style={styles.RowStyle}>
              <TouchableOpacity onPress={onCloseBar}>
                <Image source={backIcon} style={styles.BackIconStyle} />
              </TouchableOpacity>
              <Text
                center
                size={14}
                SFregular
                color={'#0D47A1'}
                style={{width: RF(280)}}>
                What can guest book?
              </Text>
            </View>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                title="Entire Place"
                checked={formik.values.HomeQuestion}
                onPress={() => formik.setFieldValue('HomeQuestion', true)}
                containerStyle={styles.checkBox}
                checkedColor={colors.primary}
              />
              <CheckBox
                title="A Private Room"
                checked={!formik.values.HomeQuestion}
                onPress={() => formik.setFieldValue('HomeQuestion', false)}
                containerStyle={styles.checkBox}
                checkedColor={colors.primary}
              />
              <AppButton title="Next" m_Top={RF(32)} onPress={onPress} />
            </View>
          </>
        )}
      </CustomModalize>
    </Wrapper>
  );
};

export default PropertyBnb;
