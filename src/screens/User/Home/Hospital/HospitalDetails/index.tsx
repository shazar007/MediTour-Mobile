import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CardComponent,
  CustomLoader,
  Text,
  Wrapper,
  EmptyList,
  HeaderCard,
  Department,
  UserHeaderContent,
  CustomHeader,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {
  padding,
  navigate,
  getHospital_Doctors,
  getHospital_Departments,
  getSingle_UserHospital,
  rs,
  PADDING,
  GAP,
} from '@services';
import {RF, SCREEN_WIDTH} from '@theme';
import useStyles from './styles';
import {setHospitalId, setStripeObj} from '@redux';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {
  UserBell,
  backIcon,
  dummyProfileIcon,
  marker,
  logo,
  Avatar1,
  dummy,
  doc,
} from '@assets';

const HospitalDetails = ({navigation, route}: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [hospitalDoc, setHospitalDoc] = useState<any>();
  const [hospitalDepartment, setHospitalDepartments] = useState<any>();
  const [selectDep, setSelectDep] = useState<any>('');
  const [refreshing, setRefreshing] = useState(false);
  const {user, location, hospitalId} = useSelector(
    (state: any) => state.root.user,
  );
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const dispatch = useDispatch();
  const styles = useStyles({});
  const theme: any = useTheme();
  const colors = theme.colors;
  const {item} = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getHospitalDetails();
  }, []);

  const getHospitalDetails = async () => {
    setLoading(true);
    try {
      await getSingleHospital();
      await getHospitalDoctors();
      await getHospitalDepartments();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getSingleHospital = async () => {
    let params = {
      hospitalId: item._id,
    };
    try {
      const res = await getSingle_UserHospital(params);

      setData(res?.data);
      dispatch(
        setStripeObj({
          hospitalName: res?.data?.hospital?.name,
          hospitalId: res?.data?.hospital?._id,
        }),
      );
      dispatch(setHospitalId(res?.data?.hospital?._id));
    } catch (error) {}
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getSingleHospital();
  };

  const getHospitalDoctors = async () => {
    let params = {
      hospitalId: item._id,
    };
    try {
      const res = await getHospital_Doctors(params);

      setHospitalDoc(res?.data?.doctors);
    } catch (error) {}
  };

  const getHospitalDepartments = async () => {
    let params = {
      hospitalId: item._id,
    };
    try {
      const res = await getHospital_Departments(params);
      setHospitalDepartments(res?.data?.departments);
    } catch (error) {}
  };
  //

  let position = {
    latitude: data?.hospital?.location?.lat,
    longitude: data?.hospital?.location?.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={'Hospitals Details'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView nestedScrollEnabled={true}>
          <View style={[padding.Horizontal_16, {marginTop: RF(rs(16))}]}>
            <View style={styles.Container}>
              <FlatList
                data={[data]}
                scrollEnabled={false}
                refreshControl={
                  <RefreshControl
                    enabled={true}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[changeColor, changeColor]}
                  />
                }
                ListEmptyComponent={
                  loading ? null : <EmptyList description={'No data found'} />
                }
                renderItem={({item}) => {
                  return (
                    <CardComponent
                      container={{marginHorizontal: RF(8)}}
                      disable={true}
                      loading={loading}
                      showValues
                      item={item}
                      showOutlined
                      bgColor={'#FAF9F6'}
                      color={colors.LightText}
                      name={item?.hospital?.name}
                      title2={`${item?.hospital?.openTime} - ${item?.hospital?.closeTime}`}
                      title3={item?.hospital?.location?.address}
                      logo={
                        item ? {uri: item?.hospital?.logo} : dummyProfileIcon
                      }
                      doctorquantity={item?.doctorCount + ' Doctors'}
                      showImg
                      Size={12}
                      showLocation
                      isVerify
                      noRating
                      // doctorquantity={data.}
                    />
                  );
                }}
              />

              <View style={{marginTop: RF(16), marginHorizontal: RF(8)}}>
                {/* <Text SFmedium size={16} color={colors.blueText}>
                      About
                    </Text>
                    <Text
                      size={12}
                      SFregular
                      style={styles.text}
                      color={colors.LightText}>
                      {data?.hospital?.description}
                    </Text> */}
                {data?.hospital?.location && (
                  <View style={styles.Container2}>
                    <MapView style={styles.map} initialRegion={position}>
                      {/* <Marker coordinate={position} draggable>
                            <Image
                              source={marker}
                              style={{
                                width: RF(50),
                                height: RF(50),
                                resizeMode: 'contain',
                              }}
                            />
                            
                          </Marker> */}
                      <Marker
                        coordinate={position}
                        // image={{uri: 'custom_pin'}}
                      />
                    </MapView>
                  </View>
                )}
                {/* ...... Please do not Remove the Custom rating Component....... */}

                {/* <CustomRating rating={data?.hospital?.averageRating} /> */}

                {/* ...../ */}
              </View>
            </View>
            <View style={styles.viewHos}>
              <Text size={18} SFmedium color={colors.blueText}>
                Hospital’s Doctors
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigate('HospitalDoctor', {
                    data: hospitalDoc,
                    title: 'All Doctors',
                  })
                }>
                {hospitalDoc?.length > 0 && (
                  <Text size={12} SFregular color={colors.blueText}>
                    See All
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            horizontal
            data={hospitalDoc}
            nestedScrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              borderWidth: 1,
              borderColor: 'red',
              padding: PADDING._16,
              gap: GAP._16,
            }}
            ListEmptyComponent={() => <Text>No Doctor Found</Text>}
            renderItem={({item}) => {
              return (
                <CardComponent
                  overAll
                  loading={loading}
                  Size={10}
                  showValues
                  item={item}
                  height={102}
                  marginRight={8}
                  name={item?.name || 'name'}
                  color={colors.blueText}
                  title2={item?.speciality}
                  title3={item?.qualifications}
                  logo={
                    item?.doctorImage
                      ? {uri: item?.doctorImage}
                      : {
                          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                        }
                  }
                  yrsExp={`${item?.clinicExperience} of Experience`}
                  onPress={() =>
                    navigate('UserDoctorDetails', {
                      item: item,
                      title: hospitalDoc?.name,
                      doctorType: 'doctor',
                      type: 'hospital',
                      hospitalName: data?.hospital?.name,
                    })
                  }
                />
              );
            }}
          />

          <View>
            <View style={[styles.viewHos, padding.Horizontal_16]}>
              <Text size={18} SFmedium color={colors.blueText}>
                Department
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigate('ViewMoreDepart', {
                    data: hospitalDepartment,
                    type: 'Department',
                    title: data?.hospital?.name,
                  })
                }>
                {hospitalDepartment?.length > 0 && (
                  <Text size={12} SFregular color={colors.blueText}>
                    View More
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <Department
              data={hospitalDepartment?.slice(0, 3)}
              selected={selectDep}
            />
          </View>

          <View style={{height: RF(100)}} />
        </ScrollView>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default HospitalDetails;
