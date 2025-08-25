import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import {
  Text,
  Wrapper,
  AppButton,
  CheckButton,
  CustomLoader,
  Custom_Date_Picker,
  CustomFloatingLabelInput,
  CustomHeader,
} from '@components';
import useStyles from './styles';
import {RF, getColorCode, SCREEN_HEIGHT, SCREEN_WIDTH} from '@theme';
import {RouteProp, useTheme} from '@react-navigation/native';
import {clock2, dropIcon, LabCalender, uploadImage, del} from '@assets';
import {
  Class,
  YesNo,
  navigate,
  onSelectImage,
  travelAgency_AddTour,
  travelAgency_EditTour,
  showToast,
} from '@services';
import {setPlanImg} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      data?: any;
      type?: any;
    };
  }>;
}

const TravelAgency_Add_Edit_Booking = (props: Props, navigation: any) => {
  const {data, type} = props.route?.params;
  const {endPoints} = getColorCode();
  const theme: any = useTheme();
  const dispatch: any = useDispatch();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {planImg} = useSelector((state: any) => state.root.b2b);
  const [image, setImage] = useState<any>(data?.images ? data?.images : []);
  const [url, setUrl] = useState<any>('');
  const [lunch, setLunch] = useState<any>(
    data?.lunchQuantity ? data?.lunchQuantity : '',
  );
  const [dinner, setDinner] = useState<any>(
    data?.dinnerQuantity ? data?.dinnerQuantity : '',
  );
  const [loading, setLoading] = useState<any>(false);
  const [breakfast, setBreakfast] = useState<any>(
    data?.breakfastQuantity ? data?.breakfastQuantity : '',
  );
  const [date, setDate] = useState<any>(
    data?.departDate ? moment(data?.departDate).format('MM/DD/YYYY') : '',
  );
  const [rDate, setRDate] = useState<any>(
    data?.returnDate ? moment(data?.returnDate).format('MM/DD/YYYY') : '',
  );
  const [rTime, setRTime] = useState<any>(
    data?.destinationTime ? data?.destinationTime : '',
  );
  const [time, setTime] = useState<any>(
    data?.departTime ? data?.departTime : '',
  );
  const [_class, setClass] = useState<any>(
    data?.className ? data?.className : '',
  );
  const [showReturnDate, setShowReturnDate] = useState<any>('');
  const [showReturnTime, setShowReturnTime] = useState<any>('');
  const [showDate, setShowDate] = useState<any>(false);
  const [showList, setShowList] = useState<any>(false);
  const [fileSize, setFileSize] = useState<any>('');
  const [showTime, setShowTime] = useState<any>(false);
  const [timeModal, setTimeModal] = useState<any>(false);
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [returnlVisible, setReturnVisible] = useState<any>(false);
  const [returnlTimeVisible, setReturnTimeVisible] = useState<any>(false);

  useEffect(() => {
    if (url) {
      let clone = JSON.parse(JSON.stringify(image));
      clone.push(url);
      setImage(clone);
    }
  }, [url]);

  const [obj, setObj] = useState({
    to: data?.to ? data?.to : '',
    name: data?.packageName ? data?.packageName : '',
    head: data?.pricePerHead ? data?.pricePerHead : '',
    from: data?.from ? data?.from : '',
    seats: data?.limitedSeats ? data?.limitedSeats : '',
    couple: data?.pricePerCouple ? data?.pricePerCouple : '',
    policies: data?.recentTourPolicy ? data?.recentTourPolicy : '',
    duration: data?.packageDuration ? data?.packageDuration : '',
    tourPolicy: data?.dayByDayPlans ? data?.dayByDayPlans : '',
  });

  const editTour = () => {
    setLoading(true);
    let params = {
      to: obj?.to,
      from: obj?.from,
      packageDuration: obj?.duration,
      packageName: obj?.name,
      departDate: date,
      returnDate: rDate,
      departTime: time,
      destinationTime: rTime,
      //   iamges: image,
    };
    travelAgency_EditTour(data?._id, params)
      .then((res: any) => {
        dispatch(setPlanImg([]));
        navigate('TravelAgencyBooking');
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const addTour = () => {
    if (
      obj?.to == '' ||
      obj?.from == '' ||
      obj?.duration == '' ||
      obj?.name == '' ||
      obj?.couple == '' ||
      obj?.head == '' ||
      obj?.policies == '' ||
      obj?.couple == '' ||
      obj?.seats == '' ||
      obj?.tourPolicy == '' ||
      image.length === 0
    ) {
      showToast('error', 'Please fill all fields', false);
      return;
    }
    const departDate = new Date(date);
    const returnDate = new Date(rDate);

    if (departDate >= returnDate) {
      showToast(
        'error',
        'Departure date and time must be earlier than return date and time',
        false,
      );
      return;
    }
    if (!breakfast) {
      showToast('error', 'Breakfast preference is required', false);
      return;
    }

    if (!lunch) {
      showToast('error', 'Lunch preference is required', false);
      return;
    }

    if (!dinner) {
      showToast('error', 'Dinner preference is required', false);
      return;
    }
    setLoading(true);
    let params = {
      packageName: obj?.name,
      packageDuration: obj?.duration,
      from: obj?.from,
      to: obj?.to,
      departTime: time,
      destinationTime: rTime,
      departDate: date,
      returnDate: rDate,
      limitedSeats: obj?.seats,
      className: _class,
      images: image,
      breakfastQuantity: breakfast,
      lunchQuantity: lunch,
      dinnerQuantity: dinner,
      dayByDayPlans: obj?.tourPolicy,
      recentTourPolicy: obj?.policies,
      pricePerHead: obj?.head,
      pricePerCouple: obj?.couple,
    };
    travelAgency_AddTour(params)
      .then((res: any) => {
        navigate('TravelAgencyBooking');
      })
      .catch((err: any) => {
        showToast('error', err?.response?.data?.message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSelect_B = (item: any, index: number) => {
    setBreakfast(item?.title);
  };
  const handleSelect_L = (item: any, index: number) => {
    setLunch(item?.title);
  };
  const handleSelect_D = (item: any, index: number) => {
    setDinner(item?.title);
  };
  const onChangeText = (text: any, type: any) => {
    let clone = JSON.parse(JSON.stringify(obj));
    Object.keys(clone).map((key: any, ind: any) => {
      if (type == key) {
        clone[key] = text;
      }
    });
    setObj(clone);
  };
  const onSave = () => {
    if (type == 'Add') {
      addTour();
    } else if (type == 'Edit') {
      editTour();
    }
  };
  const openList = () => {
    setShowList(true);
  };
  const onUploadImage = async () => {
    if (image?.length === 7) {
      showToast('error', 'Cannot upload more than 7 images', false);
    } else {
      onSelectImage(endPoints, setUrl, setLoading, setFileSize);
    }
  };
  const removeImage = (uri: any) => {
    setImage((prevImages: any) =>
      prevImages.filter((item: any) => item !== uri),
    );
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={`${type} Tour`}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={false}>
          <Text size={20} SFsemiBold>
            Itinerary
          </Text>

          <CustomFloatingLabelInput
            value={obj?.name}
            m_Top={RF(10)}
            label={'Package Name'}
            onChangeText={(text: any) => onChangeText(text, 'name')}
          />
          <CustomFloatingLabelInput
            value={obj?.duration}
            m_Top={RF(10)}
            label={'Package Duration'}
            onChangeText={(text: any) => onChangeText(text, 'duration')}
          />

          <View style={styles.row}>
            <CustomFloatingLabelInput
              wd={'45%'}
              m_Top={RF(10)}
              value={obj?.from}
              label={'From'}
              onChangeText={(text: any) => onChangeText(text, 'from')}
            />
            <CustomFloatingLabelInput
              value={obj?.to}
              wd={'45%'}
              m_Top={RF(10)}
              label={'To'}
              onChangeText={(text: any) => onChangeText(text, 'to')}
            />
          </View>

          <View style={styles.row}>
            <CustomFloatingLabelInput
              wd={'45%'}
              value={date}
              m_Top={RF(10)}
              maxLength={15}
              editable={false}
              label={'Depart Date'}
              keyboardType="numeric"
              endIcon={LabCalender}
              enablePress={() => {
                setShowDate(true);
                setModalVisible(true);
              }}
              onChangeText={(text: any) => onChangeText(text, 'date')}
            />
            <CustomFloatingLabelInput
              value={time}
              wd={'45%'}
              m_Top={RF(10)}
              maxLength={15}
              editable={false}
              endIcon={clock2}
              label={'Depart Time'}
              keyboardType="numeric"
              enablePress={() => {
                setModalVisible(false);
                setShowTime(true);
                setTimeModal(true);
              }}
              onChangeText={(text: any) => onChangeText(text, 'time')}
            />
          </View>

          <View style={styles.row}>
            <CustomFloatingLabelInput
              wd={'45%'}
              value={rDate}
              m_Top={RF(10)}
              maxLength={15}
              editable={false}
              label={'Return Date'}
              keyboardType="numeric"
              endIcon={LabCalender}
              enablePress={() => {
                setShowReturnDate(true);
                setReturnVisible(true);
              }}
              onChangeText={(text: any) => onChangeText(text, 'rDate')}
            />
            <CustomFloatingLabelInput
              value={rTime}
              wd={'45%'}
              m_Top={RF(10)}
              maxLength={15}
              editable={false}
              endIcon={clock2}
              label={'Return Time'}
              keyboardType="numeric"
              enablePress={() => {
                setReturnVisible(false);
                setShowReturnTime(true);
                setReturnTimeVisible(true);
              }}
              onChangeText={(text: any) => onChangeText(text, 'rTime')}
            />
          </View>

          <View style={styles.row}>
            <CustomFloatingLabelInput
              wd={'45%'}
              m_Top={RF(10)}
              value={obj?.seats?.toString()}
              label={'Seats Limited'}
              keyboardType={'numeric'}
              onChangeText={(text: any) => onChangeText(text, 'seats')}
            />
            <CustomFloatingLabelInput
              containerStyle={showList && styles?.forDrop}
              wd={'45%'}
              value={_class}
              m_Top={RF(10)}
              label={'Class'}
              editable={false}
              endIcon={dropIcon}
              enablePress={openList}
            />
          </View>

          {showList && (
            <View
              style={{
                backgroundColor: '#fff',
                width: '45%',
                elevation: 1,
                marginRight: RF(1),
                alignSelf: 'flex-end',
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
              }}>
              {Class.map((i: any) => {
                return (
                  <View style={{padding: RF(8)}}>
                    <Pressable
                      onPress={() => {
                        setClass(i?.title);
                        setShowList(false);
                      }}
                      style={styles.down}>
                      <Text color={colors?.bluE}>{i?.title}</Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}

          <Pressable
            style={styles.imgView}
            // disabled={image.length >= 7 ? true : false}
            onPress={onUploadImage}>
            {/* {image.length > 0 ? (
              <>
              
                <Image source={uploadImage} style={styles.image} />
              </>
            ) : (
              <> */}
            <Image source={uploadImage} style={styles.image} />
            <Text size={10} SFregular>
              Browse Image here
            </Text>
            <Text size={9} SFregular>
              Supports JPG, PNG,, pdf
            </Text>
            {/* </>
            )} */}
          </Pressable>

          <Text align>Max 7 images</Text>

          {/* .......................................FlatlistImages...................... */}
          <FlatList
            data={image}
            renderItem={({item}: any) => {
              return (
                // <View style={styles.v}>
                //   <Image source={{uri: i?.item}} style={styles.i} />
                // </View>
                <FlatlistImages
                  styles={styles}
                  item={item}
                  onRemove={removeImage}
                  fileSize={fileSize}
                />
              );
            }}
          />

          <Text size={20} SFsemiBold style={{marginTop: RF(20)}}>
            Plans
          </Text>

          <View style={styles.view}>
            <View>
              <Text size={16} SFregular color={colors?.bluE}>
                Breakfast
              </Text>
              <FlatList
                horizontal
                data={YesNo}
                renderItem={({item, index}: any) => {
                  return (
                    <CheckButton
                      title={item?.title}
                      selected={breakfast}
                      onPress={() => handleSelect_B(item, index)}
                    />
                  );
                }}
              />
            </View>

            <View>
              <Text size={16} SFregular color={colors?.bluE}>
                Lunch
              </Text>
              <FlatList
                horizontal
                data={YesNo}
                renderItem={({item, index}: any) => {
                  return (
                    <CheckButton
                      title={item?.title}
                      selected={lunch}
                      onPress={() => handleSelect_L(item, index)}
                    />
                  );
                }}
              />
            </View>
          </View>

          <View>
            <Text size={16} SFregular color={colors?.bluE}>
              Dinner
            </Text>
            <FlatList
              horizontal
              data={YesNo}
              renderItem={({item, index}: any) => {
                return (
                  <CheckButton
                    title={item?.title}
                    selected={dinner}
                    onPress={() => handleSelect_D(item, index)}
                  />
                );
              }}
            />
          </View>

          <Text size={20} SFsemiBold style={{marginTop: RF(20)}}>
            Policies
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Day by Day plan description"
              placeholderTextColor="#6c757d"
              value={obj?.policies}
              onChangeText={(text: any) => onChangeText(text, 'policies')}
              multiline={true}
              scrollEnabled={true}
              textAlignVertical="top"
            />
          </View>
          <Text size={20} SFsemiBold style={{marginTop: RF(20)}}>
            Tour Policy
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Write down your recent Tour policy"
              placeholderTextColor="#6c757d"
              value={obj?.tourPolicy}
              onChangeText={(text: any) => onChangeText(text, 'tourPolicy')}
              multiline={true}
              scrollEnabled={true}
              textAlignVertical="top"
            />
          </View>
          <Text size={20} SFsemiBold style={{marginTop: RF(20)}}>
            Price
          </Text>

          <CustomFloatingLabelInput
            value={obj?.couple}
            keyboardType="numeric"
            label={'Price per couple'}
            onChangeText={(text: any) => onChangeText(text, 'couple')}
          />

          <CustomFloatingLabelInput
            value={obj?.head}
            keyboardType="numeric"
            label={'Price per head'}
            onChangeText={(text: any) => onChangeText(text, 'head')}
          />

          <AppButton
            title="Save"
            disabled={loading}
            onPress={onSave}
            containerStyle={{marginVertical: RF(24)}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {showDate && (
        <Custom_Date_Picker
          setDate={setDate}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}

      {showReturnDate && (
        <Custom_Date_Picker
          setDate={setRDate}
          modalVisible={returnlVisible}
          setModalVisible={setReturnVisible}
        />
      )}

      {showTime && (
        <Custom_Date_Picker
          setTime={setTime}
          timeModal={timeModal}
          setTimeModal={setTimeModal}
        />
      )}

      {showReturnTime && (
        <Custom_Date_Picker
          setTime={setRTime}
          timeModal={returnlTimeVisible}
          setTimeModal={setReturnTimeVisible}
        />
      )}
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default TravelAgency_Add_Edit_Booking;

const FlatlistImages = ({
  styles,
  item,
  onRemove,
  fileSize,
}: {
  styles?: any;
  item?: any;
  onRemove?: any;
  fileSize?: any;
}) => {
  const handleRemove = () => {
    onRemove(item);
  };
  return (
    <View style={styles?.rectangleCard}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <View style={styles?.imgCard}>
          <Image style={{height: '100%', width: '100%'}} source={{uri: item}} />
        </View>
        <View style={{width: '70%', gap: 5}}>
          <Text numberOfLines={1}>{item}</Text>
          <Text numberOfLines={1}>{fileSize}</Text>
        </View>
      </View>
      <Pressable onPress={handleRemove}>
        <Image style={styles?.icon} source={del} />
      </Pressable>
    </View>
  );
};
