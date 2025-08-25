import useStyles from './styles';
import React, {useState, useRef, useEffect} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  EmptyList,
  SaveModal,
  Text,
} from '@components';
import {
  View,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {Wrapper, HeaderCard, UserHeaderContent} from '@components';
import {LabMenu, addUser, drImg, dropIcon, userAvatar} from '@assets';
import {useSelector} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import {
  addConfirmCode,
  getAllDepartments,
  getInsuranceDepartment,
  hospitalDoctorSearch,
  hospitalSendRequesttoDOCTOR,
  navigate,
  navigationRef,
  registerDostor,
  showToast,
} from '@services';
import {RF} from '@theme';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Alert} from '@utils';
const Hospital_Doctors = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const modalizeRef = useRef<Modalize>(null);
  const [allDr, setAllDr] = useState([]);
  const [register, setRegister] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<any>(false);
  const [sendingCode, setSendingCode] = useState<any>(false);
  const [emailSend, setEmailSend] = useState<any>(false);
  const [invite, setInvite] = useState<any>(false);
  const [item, setItem] = useState<any>();
  const [onInvite_Click, setOnInvite_Click] = useState<any>(false);
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [department, setDepartment] = useState<any[]>([]);
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [showVerify, setshowVerify] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetchAllDoctor_By_Search();
    getDepartment();
    fetchRegisterDoctor(currentPage);
  }, []);
  useEffect(() => {
    setLoading(true);
    getDepartment();
  }, [page]);
  const fetchRegisterDoctor = (page = 1) => {
    const data = {
      page: page,
    };

    registerDostor(data)
      .then((res: any) => {
        setRegister((prevState: any) => [...prevState, ...res?.data?.doctors]);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchAllDoctor_By_Search = () => {
    hospitalDoctorSearch(search)
      .then((res: any) => {
        setAllDr(res?.data?.suggestions);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const onInvite = () => {
    setInvite(true);
  };
  const onChangeText = (text: any) => {
    setSearch(text);
  };
  const onSubmitSearch = () => {
    fetchAllDoctor_By_Search();
  };
  const sendCode = () => {
    setSendingCode(true);
    let data = {
      id: formik.values.departmentId,
    };
    let params = {
      code: enteredCode,
      email: item?.email,
    };
    addConfirmCode(data, params)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        setshowVerify(false);
        navigate('HospitalHome');
      })
      .catch((err: any) => {
        showToast('Error', err, false);
        Alert.showError(err);
      })
      .finally(() => {
        setSendingCode(false);
      });
  };
  const onClickItem = (i: any) => {
    if (!formik?.values.departmentName) {
      Alert.showError('Please Select a Department Type');

      return;
    }
    setItem(i);
    setOnInvite_Click(true);
    setInvite(false);
  };
  const onSendEmail = () => {
    setEmailSend(true);
    hospitalSendRequesttoDOCTOR(item?._id)
      .then((res: any) => {
        Alert.showSuccess('Email Send');
        setshowVerify(true);
      })
      .catch((err: any) => {
        Alert.showError(err);
      })
      .finally(() => setEmailSend(false));
  };
  const getDepartment = (currentPage = page) => {
    setLoading(true);
    let data = {
      page: currentPage,
    };
    getAllDepartments(data)
      .then((res: any) => {
        if (currentPage === 1) {
          setDepartment(res?.data?.departments);
        } else {
          setDepartment((prevData: any) => [
            ...prevData,
            ...res?.data?.departments,
          ]);
        }
        setNextPage(res?.data?.nextPage);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const loadMoreDepartments = () => {
    if (nextPage && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };
  const onCancel = () => {
    setOnInvite_Click(false);
  };
  const formik: any = useFormik({
    initialValues: {
      departmentName: '',
      departmentId: '',
    },

    validationSchema: Yup.object({
      departmentName: Yup.string().required('departmentName is Required'),
    }),
    onSubmit: (values: any) => {},
  });
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{backgroundColor: '#F5F5F5', flex: 1}}>
        <CustomHeader
          title={'Doctors'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        {/* <HeaderCard
          icon1={LabMenu}
          numberOfIcons={'2'}
          onPress={openDrawer}
          tintColor={colors.primary}
          cardColor={colors.Hospital}
          home>
          <UserHeaderContent
            toggle={invite ? true : false}
            ScreenTitle={'Doctors'}
            tintColor={colors.primary}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitSearch}
            ColorScreenTitle={colors.primary}
          />
        </HeaderCard> */}

        {invite ? (
          <>
            {allDr.length < 0 ? (
              <View style={{flex: 1}}>
                <View style={styles.txt}>
                  <Image source={addUser} style={styles.image} />
                  <Text size={16} SFmedium color={colors?.bluE}>
                    Invite New Doctor
                  </Text>
                </View>
              </View>
            ) : null}
            <View style={{flex: 1}}>
              <View style={{marginHorizontal: RF(20), marginTop: RF(8)}}>
                <DropList
                  FormName={'Select Department'}
                  FormData={department}
                  styles={styles}
                  formik={formik}
                  ListEmptyComponent={() => <EmptyList />}
                  onEndReached={loadMoreDepartments}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={() =>
                    loading && !loading ? <CustomLoader /> : null
                  }
                  stateField={(text: any) =>
                    formik?.setFieldValue('departmentName', text)
                  }
                />
              </View>
              <FlatList
                contentContainerStyle={{paddingBottom: 90}}
                data={allDr}
                renderItem={(i: any) => {
                  return (
                    <>
                      <Pressable
                        style={[
                          styles.view,
                          !formik.values.departmentName && {opacity: 0.5},
                        ]}
                        onPress={() => onClickItem(i?.item)}>
                        <Image
                          source={
                            i?.item?.pmdcImage
                              ? {uri: i?.item?.pmdcImage}
                              : userAvatar
                          }
                          style={styles.pImg}
                        />
                        <View>
                          <Text size={12} SFsemiBold>
                            {i?.item?.name}
                          </Text>
                          <Text size={12} SFregular>
                            {i?.item?.speciality}
                          </Text>
                        </View>
                      </Pressable>
                      <View style={styles.line} />
                    </>
                  );
                }}
              />
            </View>
          </>
        ) : onInvite_Click ? (
          <SaveModal save>
            <Text size={12} SFsemiBold align>
              Do You Want to Send Request to doctor?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: RF(20),
              }}>
              <AppButton
                width={RF(80)}
                height={RF(24)}
                onPress={onCancel}
                title="Cancel"
                bgClr={'red'}
              />
              <AppButton
                width={RF(69)}
                height={RF(24)}
                onPress={onSendEmail}
                title="Sent"
                bgClr={'green'}
              />
            </View>
            {emailSend && <CustomLoader />}
          </SaveModal>
        ) : invite == false && onInvite_Click == false ? (
          <>
            <ScrollView>
              <View style={{marginTop: RF(16), paddingBottom: RF(40)}}>
                <FlatList
                  scrollEnabled={false}
                  data={register}
                  onEndReached={() => {
                    if (!loading) {
                      setCurrentPage(prevPage => {
                        const nextPage = prevPage + 1;
                        fetchRegisterDoctor(nextPage);
                        return nextPage;
                      });
                    }
                  }}
                  onEndReachedThreshold={0.5}
                  ListEmptyComponent={
                    <EmptyList
                      description={loading ? 'Loading.....' : 'No data found'}
                    />
                  }
                  renderItem={({item}: any) => (
                    <View
                      style={{
                        padding: RF(8),
                        backgroundColor: '#fff',
                        elevation: 5,
                        marginHorizontal: RF(20),
                        borderRadius: RF(4),
                        marginVertical: RF(4),
                      }}>
                      <Text size={12} SFmedium color={'#00276D'}>
                        Doctor ID:{' '}
                        <Text size={12} SFregular center color={'#00276D'}>
                          {item?.vendorId}
                        </Text>
                      </Text>
                      <Text size={12} SFmedium color={'#00276D'}>
                        Doctor Name:{' '}
                        <Text size={12} SFregular center color={'#00276D'}>
                          {item?.name}
                        </Text>
                      </Text>
                      <Text size={12} SFmedium color={'#00276D'}>
                        Speciality:{' '}
                        <Text size={12} SFregular center color={'#00276D'}>
                          {item?.speciality?.join(' ')}
                        </Text>
                      </Text>
                      <Text size={12} SFmedium color={'#00276D'}>
                        Qualification:{' '}
                        <Text size={12} SFregular center color={'#00276D'}>
                          {item?.qualifications}
                        </Text>
                      </Text>
                      <Text size={12} SFmedium color={'#00276D'}>
                        Experience:{' '}
                        <Text size={12} SFregular center color={'#00276D'}>
                          {item?.clinicExperience}
                        </Text>
                      </Text>
                    </View>
                  )}
                />
              </View>
            </ScrollView>
            <View style={{position: 'absolute', bottom: 100, right: RF(16)}}>
              <AppButton
                title="Invite Doctor’s"
                width={RF(110)}
                height={RF(30)}
                b_R={RF(8)}
                onPress={onInvite}
              />
            </View>
          </>
        ) : null}
      </View>
      {showVerify && (
        <SaveModal
          save
          Visible={showVerify}
          cross
          onPress={() => setshowVerify(false)}>
          <Text size={14} SFsemiBold align color={colors?.bluE}>
            A verification code has been sent to doctor’s email, please contact
            doctor to get code.
          </Text>
          <View>
            <TextInput
              placeholder="Enter Code"
              style={{borderBottomWidth: 1}}
              keyboardType="numeric"
              value={enteredCode}
              onChangeText={text => setEnteredCode(text)}
            />
          </View>
          <AppButton
            width={RF(69)}
            height={RF(24)}
            m_Top={RF(32)}
            onPress={sendCode}
            title="Submit"
            bgClr={'green'}
          />
          {sendingCode && <CustomLoader />}
        </SaveModal>
      )}
      {loading && <CustomLoader />}
    </Wrapper>
  );
};
interface Props {
  FormName?: any;
  Name?: any;
  FormData?: any;
  formik: any;
  stateField: any;
  top?: any;
  custom?: any;
  onPress?: any;
  styles?: any;
  ListEmptyComponent?: any;
  onEndReached?: any;
  onEndReachedThreshold?: any;
  ListFooterComponent?: any;
}
const DropList = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {
    FormName,
    FormData,
    styles,
    formik,
    stateField,
    top,
    ListEmptyComponent,
    onEndReached,
    onEndReachedThreshold,
    ListFooterComponent,
  } = props;
  const [clicked, setClicked] = useState(false);

  const handleSelect = (item: any) => {
    formik.setFieldValue('departmentName', item.departmentName);
    formik.setFieldValue('departmentId', item._id);
    setClicked(!clicked);
  };

  return (
    <>
      <Text size={14} SFmedium>
        Please Select
      </Text>
      <TouchableOpacity
        style={styles.AgeDropDownStyle}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text size={12} SFregular color={'rgba(125, 125, 125, 1)'}>
          {formik.values.departmentName === ''
            ? FormName
            : formik.values.departmentName}
        </Text>
        <Image
          source={dropIcon}
          tintColor={colors.blueText}
          style={styles.dropDownImage}
        />
      </TouchableOpacity>

      {clicked ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            top: RF(56),
            width: '100%',
            backgroundColor: 'white',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            maxHeight: RF(200),
          }}>
          <FlatList
            data={FormData}
            scrollEnabled={true}
            ListEmptyComponent={ListEmptyComponent}
            onEndReached={onEndReached}
            ListFooterComponent={ListFooterComponent}
            onEndReachedThreshold={onEndReachedThreshold}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.TouchableStyle,
                  {
                    backgroundColor:
                      formik.values.departmentName === item.departmentName
                        ? '#00276D'
                        : '#fff',
                  },
                ]}
                onPress={() => handleSelect(item)}>
                <Text
                  SFmedium
                  size={14}
                  color={
                    formik.values.departmentName === item.departmentName
                      ? '#fff'
                      : colors.blueText
                  }
                  style={{marginHorizontal: 10}}>
                  {item.departmentName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </>
  );
};
export default Hospital_Doctors;
