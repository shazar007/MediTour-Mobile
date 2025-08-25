import {
  Text,
  CheckBox,
  AppButton,
  InputData,
  SaveModal,
  StarModal,
  HeaderCard,
  CustomLoader,
  LocationModal,
  CustomModalize,
  CustomDropDown,
  UserHeaderContent,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect, useRef} from 'react';
import {
  navigate,
  showToast,
  review_Rating,
  checkListData,
  GOOGLE_PLACES_API_KEY,
} from '@services';
import {setAmount, setStripeObj} from '@redux';
import {Modalize} from 'react-native-modalize';
import ImagePicker from 'react-native-image-crop-picker';
import {circum, drive, live, phone, UserIcon} from '@assets';
import {RouteProp, useTheme} from '@react-navigation/native';
import {FlatList, ScrollView, View} from 'react-native';
import {Alert} from '@utils';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      data?: any;
      lab?: any;
      selectedItems?: any;
    };
  }>;
}

const BookNowTest = (props: Props, navigation: any) => {
  const theme: any = useTheme();
  const styles = useStyles();
  const colors = theme.colors;
  const {data, lab, selectedItems} = props.route?.params;
  const [selected, setSelected] = useState<any>();
  const [clicked, setClicked] = useState(false);
  const [showInputData, setShowInputData] = useState(false);
  const [clickedYourDetails, setClickedYourDetails] = useState(false);
  const {user, location, selectedAddress, city} = useSelector(
    (state: any) => state.root.user,
  );
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [loading, setLoading] = useState<any>(false);
  const [visible, setVisible] = useState<any>(false);
  const [starVisible, setStarVisible] = useState<any>(false);
  const [tests, setTests] = useState<any>([]);
  const [totalAmount, setTotalAmount] = useState<any>();
  const [preference, setPreference] = useState<any>('');
  const [rating, setRating] = useState<any>(0);
  const [value, setValue] = useState<any>('');
  const [picker, setPicker] = useState<any>(false);
  const [file, setFile] = useState<any>();
  const modalizeRef = useRef<Modalize>(null);
  const dispatch: any = useDispatch();

  const handleSelect = (item: any) => {
    setSelected(selected === item.title ? '' : item.title);
    setShowInputData(item?.title === 'Home Sample');
    setPreference(item?.value);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    data.forEach((item: any) => {
      totalPrice += item?.userAmount;
    });
    return totalPrice;
  };

  const calculatedTotalPrice = calculateTotalPrice();

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    if (visible == true) {
      setTimeout(() => {
        setVisible(false);
        setStarVisible(true);
      }, 1000);
    }
  }, [visible]);

  useEffect(() => {
    if (preference == 'lab') {
      setPreference('visit');
    } else if (preference == 'home') {
      setPreference('homeSample');
    }
  }, [preference]);

  const confirmBooking = () => {
    if (preference == '') {
      Alert.showError('Please select preference');
    } else {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          setStripeObj({
            items: data,
            selectedItems: selectedItems,
            labDetail: data,
            vendorId: lab?._id,
            preference: preference,
          }),
        );
        dispatch(setAmount(calculatedTotalPrice));
        setLoading(false);
        navigate('StripeAlFalah', {
          type: 'lab',
          actualAmount: calculatedTotalPrice,
        });
      }, 2000);
    }
  };

  const onSubmit = () => {
    setLoading(true);
    let params = {
      vendorId: lab._id,
      rating: rating,
      review: value,
    };
    review_Rating(params)
      .then((res: any) => {
        setTimeout(() => {
          navigate('UserHome');
          Alert.showSuccess(res?.message);
        }, 500);

        setStarVisible(false);
      })
      .catch((err: any) => {
        setTimeout(() => {
          navigate('UserHome');
          Alert.showSuccess(err?.response?.data?.message);
        }, 500);
        setStarVisible(false);
      })
      .finally(() => setLoading(false));
  };

  const onChangeText = (i: any) => {
    setValue(i);
  };

  const onSubmitRating = (i: any) => {
    setRating(i);
  };

  const onCancel = () => {
    setValue('');
    setRating(0);
    setStarVisible(false);
    navigate('UserHome');
  };

  const onSelectLocation = () => {
    //
    // onOpen();
    //navigate('MapLocation', {type: 'bookTest'});
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const getAddress = () => {
    let latitude = location?.latitude;
    let longitude = location?.longitude;
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        latitude +
        ',' +
        longitude +
        '&key=' +
        GOOGLE_PLACES_API_KEY,
    )
      .then(response => response.json())
      .then(responseJson => {
        const addressComponents = responseJson.results[0].address_components;
      });
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={'Book Now'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      {/* <HeaderCard iconFlase numberOfIcons={'2'} title={'Continue Booking'}>
        <UserHeaderContent
          onlySearchIcon
          ScreenTitle={'Book Now'}
          onPressLocation={onOpen}
        />
      </HeaderCard> */}

      <ScrollView style={{marginBottom: 100}}>
        <View style={styles.TopView}>
          <View style={styles.MainContainer}>
            <CustomDropDown
              clicked={clicked}
              title={'Test Details'}
              setClicked={setClicked}
            />
            {clicked ? (
              <View style={styles.mt}>
                <FlatList
                  scrollEnabled={false}
                  data={data}
                  renderItem={({item, index}: any) => {
                    return (
                      <View key={index} style={styles.ClickedView}>
                        <Text size={16} SFsemiBold color={colors?.blueText}>
                          {item?.categoryName || item?.testNameId?.categoryName}
                        </Text>
                        <Text size={16} SFbold color={colors?.blueText}>
                          {item?.testName || item?.testNameId?.name}
                        </Text>
                        <Text size={12} SFregular color={colors?.blueText}>
                          {item?.testDescription}
                        </Text>
                        <Text size={16} SFsemiBold color={colors?.blueText}>
                          {item?.userAmount}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            ) : null}
          </View>

          <View style={[styles.MainContainer, {marginTop: RF(16)}]}>
            <CustomDropDown
              title={'Your Details'}
              clicked={clickedYourDetails}
              setClicked={setClickedYourDetails}
            />
            {clickedYourDetails ? (
              <View style={styles.view}>
                <InputData UserName={user?.name} source={UserIcon} />
                <InputData UserName={user?.mrNo} source={circum} />
                <InputData UserName={user?.phone} source={phone} />

                {showInputData && (
                  <InputData
                    source={live}
                    width={RF(20)}
                    height={RF(20)}
                    onPress={onSelectLocation}
                    UserName={selectedAddress.address}
                    // tintColor={colors.blueText}
                  />
                )}
              </View>
            ) : null}
          </View>

          <View style={styles.pref}>
            <Text size={16} SFsemiBold color={changeColor}>
              Select Your Preference
            </Text>
            <FlatList
              scrollEnabled={false}
              data={checkListData}
              renderItem={({item}) => (
                <View style={styles.check}>
                  <CheckBox
                    title={item.title}
                    checkboxSize={20}
                    selected={selected}
                    // paddingLeft={0.5}
                    c_b={colors.blueText}
                    colorMid={changeColor}
                    textColor={colors.blueText}
                    active={'rgba(245, 245, 245, 1)'}
                    onPress={() => handleSelect(item)}
                  />
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>

      <CustomModalize ref={modalizeRef} height={700}>
        <LocationModal onClose={onClose} />
      </CustomModalize>

      {visible && (
        <SaveModal
          Visible={visible}
          title={'Your Lab order has been Successfully Booked.'}
        />
      )}
      {starVisible && (
        <StarModal
          lab={lab}
          value={value}
          rating={rating}
          onSubmit={onSubmit}
          visible={starVisible}
          onChangeText={onChangeText}
          onSubmitRating={onSubmitRating}
          onCancel={onCancel}
        />
      )}
      {loading && <CustomLoader />}
      <View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 10,
          width: '100%',
        }}>
        <AppButton title="Confirm Booking" onPress={confirmBooking} />
      </View>
    </View>
  );
};

export default BookNowTest;

{
  /* <View style={styles.txt}>
                  <Text size={16} color={changeColor}>
                    Attach Prescription (Optional)
                  </Text>
                </View> */
}
{
  /* <View style={styles.FileUploadStyle}>
                  <Text>Upload File</Text>
                  <Pressable onPress={launchCamera}>
                    <Image source={drive} style={styles.ImageContainer} />
                  </Pressable>
                </View> */
}
// const launchCamera = () => {
//   ImagePicker.openPicker({
//     width: 300,
//     height: 400,
//     cropping: true,
//   })
//     .then((image: any) => {
//       if (image && image.path) {
//         let imageUrl = image.path;
//         let name = imageUrl.split('/').pop();

//         const formData = new FormData();
//         formData.append('file', {
//           uri: imageUrl,
//           type: 'image/jpg',
//           name: name,
//         });
//         // setFile(formData);
//         uploadImage(formData);
//       } else {
//
//       }
//     })
//     .catch(error => {
//
//     });
// };

// const uploadImage = async (data: any) => {
//   //
//   // setLoading(true);
//   let tempArr = [...file];
// };
