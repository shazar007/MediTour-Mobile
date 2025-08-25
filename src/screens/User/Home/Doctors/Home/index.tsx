import {
  EmptyList,
  CustomLoader,
  CardComponent,
  UserSelectModal,
  SwapCards,
  CustomFlatTab,
  TreatmentComponent,
  CustomHeader,
  SearchInput,
  NewLoader,
  Text,
} from '@components';
import {
  navigate,
  customTabData,
  getSpecialtiesDoctor,
  rs,
  rv,
  PADDING,
  GAP,
  getAll_Doctors,
  getAll_Hospitals,
} from '@services';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import {RouteProp, useTheme} from '@react-navigation/native';
import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Modal,
} from 'react-native';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      specialityTitle?: any;
      type?: any;
    };
  }>;
}

const UserDoctor = (props: Props) => {
  const {type, specialityTitle} = props?.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  const modalizeRef = useRef<Modalize>(null);
  const [toggle, setToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showBy, setShowBy] = useState('All');

  const [page, setPage] = useState(1);
  const [recieveCity, setRecieveCity] = useState('');

  const [searchDoctorText, setSearchDocterText] = useState<any>('');
  const [searchHospitalText, setSearchHospitalText] = useState<any>('');
  const {selectedAddress} = useSelector((state: any) => state.root.user);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  /////........................New States....................................
  const [selectedTab, setSelectedTab] = useState('Doctor');
  const [data, setData] = useState<any>({
    doctors: [],
    hospitals: [],
    specialties: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  /////........................New States....................................

  // ................................. ALL DOCTORS PARAMS ..................................

  const docParams: any = {
    allDoctor: {
      lat: showBy == 'Nearby' ? selectedAddress?.lat : '',
      long: showBy == 'Nearby' ? selectedAddress?.lng : '',
      search: searchDoctorText,
      doctorType:
        type == 'speciality'
          ? ''
          : type == 'homeServices'
          ? specialityTitle?.toLowerCase()
          : selectedTab?.toLowerCase(),
      page: page,
      filter: showBy.toLowerCase(),
      city: showBy == 'City' ? recieveCity : '',
      speciality: type == 'speciality' ? specialityTitle : '',
    },
  };
  const hospitalParams: any = {
    allHospital: {
      page: page,
      search: searchHospitalText,
    },
  };
  console.log('🚀 ~ UserDoctor ~ hospitalParams:', hospitalParams);
  const treatmentParams: any = {
    allTreatment: {
      page: page,
    },
  };

  //.................New Work.................../.................

  useEffect(() => {
    fetchAllData();
  }, []);

  // Function to fetch all APIs initially
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [doctorsRes, hospitalsRes, specialtiesRes] = await Promise.all([
        getAll_Doctors(docParams.allDoctor).then(res => res?.data?.doctors),
        getAll_Hospitals(hospitalParams.allHospital).then(
          res => res?.data?.hospitals,
        ),
        getSpecialtiesDoctor(treatmentParams.allTreatment?.page).then(
          res => res?.data?.specialities,
        ),
      ]);

      setData({
        doctors: doctorsRes,
        hospitals: hospitalsRes,
        specialties: specialtiesRes,
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const ListData = () => {
    if (selectedTab === 'Doctor') return data.doctors;
    if (selectedTab === 'Hospital') return data.hospitals;
    if (selectedTab === 'Specialties') return data.specialties;
    return [];
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      let updatedData = {}; // Object to store refreshed data

      if (selectedTab === 'Doctor') {
        const doctorsRes = await getAll_Doctors(docParams.allDoctor).then(
          res => res?.data?.doctors,
        );
        updatedData = {doctors: doctorsRes};
      } else if (selectedTab === 'Hospital') {
        const hospitalsRes = await getAll_Hospitals(
          hospitalParams.allHospital,
        ).then(res => res?.data?.hospitals);
        updatedData = {hospitals: hospitalsRes};
      } else if (selectedTab === 'Specialties') {
        const specialtiesRes = await getSpecialtiesDoctor(
          treatmentParams.allTreatment?.page,
        ).then(res => res?.data?.specialities);
        updatedData = {specialties: specialtiesRes};
      }

      // Update only the selected tab's data, keeping others unchanged
      setData((prevData: any) => ({...prevData, ...updatedData}));
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const onSubmitEditing = async () => {
    try {
      setLoading(true);
      let updatedData = {};

      if (selectedTab === 'Doctor') {
        console.log('Fetching doctors with:', docParams.allDoctor);
        const doctorsRes = await getAll_Doctors(docParams.allDoctor).then(
          res => res?.data?.doctors,
        );
        updatedData = {doctors: doctorsRes};
      } else if (selectedTab === 'Hospital') {
        console.log('Fetching hospitals with:', hospitalParams.allHospital);
        const hospitalsRes = await getAll_Hospitals(
          hospitalParams.allHospital,
        ).then(res => res?.data?.hospitals);
        updatedData = {hospitals: hospitalsRes};
      } else if (selectedTab === 'Specialties') {
        console.log('Fetching specialties with:', treatmentParams.allTreatment);
        const specialtiesRes = await getSpecialtiesDoctor(
          treatmentParams.allTreatment,
        ).then(res => res?.data?.specialities);
        updatedData = {specialties: specialtiesRes};
      }

      setData((prevData: any) => ({...prevData, ...updatedData}));
    } catch (err) {
      console.error('Error fetching search results:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const doctorsRes = await getAll_Doctors(docParams.allDoctor).then(
        res => res?.data?.doctors,
      );

      setData((prevData: any) => ({
        ...prevData,
        doctors: doctorsRes || [], // Only update doctors, keep others
      }));
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab === 'Doctor') {
      fetchDoctors();
    }
  }, [showBy]);

  const onClose = () => {
    setLoading(true);
    setModalVisible(false);
    // getList_AllDoctors();
    fetchDoctors();
  };

  const handleItemPress = (item: any) => {
    setSelectedTab(item);
  };

  const handleShowList = (item: any) => {
    setShowBy(item);
    setPage(1);
    if (item === 'City') {
      setModalVisible(true);
      setSearchDocterText('');
    }
  };

  const onChangeText = (val: any) => {
    if (selectedTab == 'Doctor') {
      setSearchDocterText(val);
    } else {
      setSearchHospitalText(val);
    }
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={specialityTitle ? specialityTitle : selectedTab}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View
        style={{
          backgroundColor: colors.background,
          flex: 1,
        }}>
        <View
          style={{
            gap: GAP?._8,
            padding: PADDING._16,
            paddingBottom: rs(8),
          }}>
          {selectedTab !== 'Specialties' && (
            <SearchInput
              onChangeText={onChangeText}
              value={
                selectedTab == 'Doctor' ? searchDoctorText : searchHospitalText
              }
              onSubmitEditing={onSubmitEditing}
            />
          )}

          {selectedTab == 'Doctor' && (
            <CustomFlatTab
              data={customTabData}
              initialState={showBy}
              handlePress={handleShowList}
            />
          )}
        </View>

        <MyList
          selectedTab={selectedTab}
          ListData={ListData}
          refreshing={refreshing}
          handleRefresh={handleRefresh}
          changeColor={changeColor}
          loading={loading}
          navigate={navigate}
          styles={styles}
          colors={colors}
        />

        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={{padding: rs(16), flex: 1}}>
            <UserSelectModal onClose={onClose} setCity={setRecieveCity} />
          </View>
        </Modal>

        {type == 'Doctor' ? (
          <SwapCards
            card1={'Doctor'}
            card2={'Hospital'}
            card3={'Specialties'}
            initialState={selectedTab}
            activeTextColor={'#fff'}
            activeColor={changeColor}
            width
            // height
            padding
            handlePress={handleItemPress}
            inActiveTextColor={changeColor}
          />
        ) : null}
      </View>
      {loading && <CustomLoader />}
    </View>
  );
};

export default UserDoctor;

const MyList = ({
  selectedTab,
  ListData,
  refreshing,
  handleRefresh,
  changeColor,
  indicator,
  navigate,
  styles,
  colors,
  loading,
}: any) => {
  // Memoized Data
  const data = useMemo(() => ListData(), [ListData]);

  // Memoized RenderItem
  const renderItem = useCallback(
    ({item}: any) => {
      if (selectedTab === 'Doctor') {
        return (
          <CardComponent
            showValues
            RatingTrue
            item={item}
            name={item?.name}
            style={styles.card}
            color={colors.blueText}
            title2={item?.speciality?.join(', ')}
            title3={item?.qualifications}
            logo={{
              uri:
                item?.doctorImage ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
            }}
            onPress={() =>
              navigate('UserDoctorDetails', {
                item,
                type: 'doctor',
                doctorType: 'doctor',
              })
            }
          />
        );
      }

      if (selectedTab === 'Hospital') {
        return (
          <CardComponent
            showImg
            isVerify
            showValues
            item={item}
            noRating
            showLocation
            logo={{uri: item?.logo}}
            color={colors.LightText}
            title2={`${item?.openTime} - ${item?.closeTime}`}
            title3={item?.location?.address}
            onPress={() => navigate('HospitalDetails', {item})}
          />
        );
      }

      return (
        <TreatmentComponent
          item={item}
          screenOnPress={() =>
            navigate('SymptomsDoctor', {type: 'speciality', item})
          }
        />
      );
    },
    [selectedTab, navigate],
  );

  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: rs(120),
        gap: GAP._16,
        paddingHorizontal: PADDING._16,
      }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      data={data}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      refreshControl={
        <RefreshControl
          enabled
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[changeColor, changeColor]}
        />
      }
      ListFooterComponent={
        indicator ? (
          <ActivityIndicator size={'large'} color={changeColor} />
        ) : null
      }
      ListEmptyComponent={!loading ? <EmptyList /> : null}
      renderItem={renderItem}
    />
  );
};
