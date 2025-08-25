import {
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppButton,
  CustomAccordion,
  CustomHeader,
  CustomLoader,
  CustomModalize,
  DoctorPatient,
  EmptyList,
  Prescription,
  Referral,
  Text,
  Wrapper,
} from '@components';

import {Miuns, Plus, search} from '@assets';
import {getColorCode, RF} from '@theme';
import {
  getAllHospitals,
  getAllSpecialities,
  getSearchDoctor,
  getSingleDoctorAppointment,
} from '@services';

import {useTheme} from '@react-navigation/native';
import Section from './Section';
import useStyles from './styles';
import {Modalize} from 'react-native-modalize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AppointmentPrescription = ({route}: any) => {
  const {item} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [open, setOpen] = useState<any>(false);
  const [activeSections, setActiveSections] = useState<string[]>([]);
  const {
    single_Appointment,
    search_Doctor,
    get_allDoctorSpecialities,
    getAll_HosVendor,
  } = getColorCode();
  const [apiType, setApiType] = useState('');
  const [data, setData] = useState<any>([]);
  const [doctor, setDoctor] = useState<any>([]);
  const modalizeRef = useRef<Modalize>(null);
  const [searchDoctorText, setSearchDoctorText] = useState<any>('');
  const [searchSpecialityText, setSearchSpecialityText] = useState<any>('');
  const [searchHospitalText, setSearchHospitalText] = useState<any>('');
  const [showReferOptions, setShowReferOptions] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [Visible, setVisible] = useState(false);
  const [loading, setLoading] = useState<any>(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  useEffect(() => {
    singleAppointment();
  }, []);

  const singleAppointment = async () => {
    setLoading(true);
    const params = {
      appointmentId: item._id,
    };
    try {
      const res = await getSingleDoctorAppointment(params, single_Appointment);
      setData(res.data.appointment);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const onOpen = async () => {
    setDoctor([]);
    setSearchDoctorText('');
    setSearchSpecialityText('');
    setSearchHospitalText('');
    modalizeRef.current?.open();
    setPage(1);
    await getSearch();
  };

  const getSearch = async () => {
    if (loading) return; // Prevent multiple calls when loading

    setLoading(true);
    try {
      let res;
      if (apiType === 'Doctor') {
        const params = {name: searchDoctorText, page};
        res = await getSearchDoctor(params, search_Doctor);

        const newDoctors = res?.data?.doctors || [];
        const hasMorePages = res?.data?.nextPage || false;

        if (page > 1) {
          setDoctor((prev: any) => [...prev, ...newDoctors]); // Append new data
        } else {
          setDoctor(newDoctors);
        }

        setNextPage(hasMorePages);
      } else if (apiType === 'Specialities') {
        const params = {search: searchSpecialityText};
        res = await getAllSpecialities(params, get_allDoctorSpecialities);
        setDoctor(res?.data?.specialities || []);
      } else if (apiType === 'Hospital') {
        const params = {search: searchHospitalText};
        res = await getAllHospitals(params, getAll_HosVendor);
        setDoctor(res?.data?.hospitals || []);
      }
    } catch (err) {
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiType) {
      if (apiType === 'Doctor') {
        setSearchDoctorText('');
      } else if (apiType === 'Specialities') {
        setSearchSpecialityText('');
      } else if (apiType === 'Hospital') {
        setSearchHospitalText('');
      }
      setDoctor([]);
      setPage(1);
      getSearch();
    }
  }, [apiType]);
  useEffect(() => {
    if (page > 1) {
      getSearch(); // Fetch new data when page changes
    }
  }, [page]);
  const onChangeTextSearch = (val: any) => {
    if (apiType === 'Doctor') {
      setSearchDoctorText(val);
    } else if (apiType === 'Specialities') {
      setSearchSpecialityText(val);
    } else if (apiType === 'Hospital') {
      setSearchHospitalText(val);
    }
  };

  const onSubmitEditing = () => {
    getSearch();
  };

  const openModel = (selectedItem: any) => {
    setSelectedDoctor(selectedItem.item);
    setVisible(true);
  };
  const onClose = async () => {
    setDoctor([]);
    setSearchDoctorText('');
    setSearchSpecialityText('');
    setSearchHospitalText('');
    setPage(1);
    await getSearch();
  };
  const fetchNextPage = () => {
    if (!nextPage || loading) return; // Prevent loading if no more pages or already loading
    setPage(prev => prev + 1); // Increment page
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Appointments'}
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraHeight={25}
          enableOnAndroid={true}>
          <View style={{paddingBottom: RF(100)}}>
            <DoctorPatient data={data} />
            <CustomAccordion
              data={[
                {title: 'History', content: ''},
                {title: 'Prescription', content: ''},
              ]}
              open={open}
              CCI={open ? Miuns : Plus}
              setOpen={setOpen}
              style={styles.accordion}
              setActiveSections={setActiveSections}
              activeSections={activeSections}
              renderindex1={() => (
                <Section
                  colors={colors}
                  saveHistory={data}
                  singleAppointment={singleAppointment}
                  setLoading={setLoading}
                />
              )}
              renderindex2={() => (
                <>
                  <Prescription
                    appointment={data}
                    setData={setData}
                    setLoading={setLoading}
                    item={item}
                  />
                </>
              )}
            />

            <View style={{marginTop: RF(24), marginHorizontal: RF(24)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <AppButton
                  width={RF(100)}
                  title="Refer"
                  height={RF(25)}
                  bgClr={'#0B7328'}
                  onPress={() => setShowReferOptions(true)}
                />
              </View>
              {showReferOptions && (
                <View style={styles.referStyle}>
                  <AppButton
                    width={'25%'}
                    onPress={() => {
                      setApiType('Doctor');
                      onOpen();
                    }}
                    title="Doctor"
                    height={RF(20)}
                    bgClr={'#E2F0F8'}
                    textcolor={'#00276D'}
                  />
                  <AppButton
                    width={'30%'}
                    title="Specialities"
                    height={RF(20)}
                    onPress={() => {
                      setApiType('Specialities');
                      onOpen();
                    }}
                    bgClr={'#E2F0F8'}
                    textcolor={'#00276D'}
                  />
                  <AppButton
                    width={'25%'}
                    title="Hospital"
                    onPress={() => {
                      setApiType('Hospital');
                      onOpen();
                    }}
                    height={RF(20)}
                    bgClr={'#E2F0F8'}
                    textcolor={'#00276D'}
                  />
                </View>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
        <CustomModalize ref={modalizeRef} height={RF(500)} onClose={onClose}>
          <View style={styles.ContainerDetails}>
            <Image source={search} style={styles.ImageStyles} />
            <TextInput
              style={styles.input}
              placeholder={'Refer'}
              placeholderTextColor={'#0D47A1'}
              onChangeText={onChangeTextSearch}
              onSubmitEditing={onSubmitEditing}
              value={
                apiType === 'Doctor'
                  ? searchDoctorText
                  : apiType === 'Specialities'
                  ? searchSpecialityText
                  : searchHospitalText
              }
            />
          </View>
          <FlatList
            data={doctor}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.5}
            nestedScrollEnabled
            ListFooterComponent={
              <ActivityIndicator size={'large'} animating={loading} />
            }
            ListEmptyComponent={
              <EmptyList
                description={loading ? 'Loading.....' : 'No data found'}
              />
            }
            renderItem={({item}: any) => (
              <TouchableOpacity
                style={styles.SearchBar}
                onPress={() => openModel({item: item})}>
                <Image
                  source={{
                    uri: item?.doctorImage
                      ? item?.doctorImage
                      : item?.specialityLogo
                      ? item?.specialityLogo
                      : item?.logo ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                  }}
                  style={styles.DocProfile}
                />
                <View>
                  <Text size={16} SFmedium color={'#00276D'}>
                    {item?.name ? item?.name : item.specialityTitle}
                  </Text>
                  <Text
                    size={12}
                    style={{width: RF(200)}}
                    SFregular
                    color={'#00276D'}>
                    {item?.speciality
                      ? item?.speciality
                      : item?.doctorsCount
                      ? `${item?.doctorsCount} Doctor Available`
                      : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </CustomModalize>
      </View>

      <Referral
        Visible={Visible}
        data={data}
        type={apiType}
        item={item}
        selectedDoctor={selectedDoctor}
        setVisible={setVisible}
        setLoading={setLoading}
        loading={loading}
        modalizeRef={modalizeRef}
      />
      {loading && <CustomLoader />}
      {/* <WebView source={{uri: 'https://meditour.global/Meeting/Room'}} /> */}
    </Wrapper>
  );
};

export default AppointmentPrescription;
