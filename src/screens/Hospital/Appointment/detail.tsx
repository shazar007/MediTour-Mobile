import {RF} from '@theme';
import useStyles from './styles';
import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useTheme} from '@react-navigation/native';
import {
  hospital_Add_History,
  hospital_Add_Prescription,
  hospitalgetPatient_History,
  hospitalgetPrescriptions,
} from '@services';
import {
  AppButton,
  AppTextInput,
  ClickableField,
  CustomFloatingLabelInput,
  CustomHeader,
  CustomLoader,
  CustomRating,
  EmptyList,
  Text,
  Wrapper,
} from '@components';
import {ScrollView, StyleSheet, View} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';

interface Props {
  navigation?: any;
  route?: RouteProp<{
    params?: {
      detail?: any;
    };
  }>;
}

const HospitalAppointments_Patient_Details = (
  props: Props,
  navigation: any,
) => {
  const {detail}: any = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [medicines, setMedicines] = useState<any>([]);
  const [tests, setTests] = useState<any>([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState<any>(false);
  const [degree, setDegree] = useState<any>('');
  const [open1, setOpen1] = useState<any>(false);
  const [open2, setOpen2] = useState<any>(false);
  const [saveHistory, setSaveHistory] = useState<any>(false);
  const [med, setMed] = useState<any>('');
  const [brand, setBrand] = useState<any>('');
  const [strength, setStrength] = useState<any>('');
  const [dosage, setDosage] = useState<any>('');
  const [result, setResult] = useState<any>('');
  const [input2, setInput2] = useState<any>('');
  const [test, setTest] = useState<any>('');
  const [input1, setInput1] = useState<any>('');
  const [type, setType] = useState<any>('');
  useEffect(() => {
    if (Array.isArray(detail?.doctorId?.qualifications)) {
      setDegree(detail.doctorId.qualifications.join(', '));
    } else {
      setDegree('');
    }
    fetch_Patient_History();
    get_Prescriptions();
  }, [detail]);

  const toggleSearch = () => {
    setToggle(true);
  };

  const handleChangeText = (text: any, type: any) => {
    if (type == '1') {
      setInput1(text);
    } else if (type == '2') {
      setInput2(text);
    }
  };

  const onSubmit = (type: any) => {
    setType(type);
    addHistory();
  };

  const onPrescription = (type: any) => {
    setType(type);
  };

  const addHistory = () => {
    setLoading(true);
    let params = {
      doctorId: detail?.doctorId?._id,
      symptoms: input1,
      description: input2,
    };
    let data = {
      patientId: detail?.patientId?._id,
      appointmentId: detail?._id,
    };
    hospital_Add_History(params, data)
      .then((res: any) => {
        setSaveHistory(true);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const addPrescriptionsMedicine = async () => {
    setLoading(true);
    let arr: any = [];
    let arrTest: any = [];

    let obj = {
      dosage: dosage,
      medicineName: med,
      medicineBrand: brand,
      medicineStrength: strength,
    };
    await arr.push(...medicines, obj);
    setMedicines(arr);

    let params = {
      test: arrTest,
      medicines: arr,
    };
    let id = {
      appointmentId: detail?._id,
      patientId: detail?.patientId?._id,
    };

    hospital_Add_Prescription(id, params)
      .then((res: any) => {
        setMedicines(res?.data?.prescription?.medicines);
        setTests(res?.data?.prescription?.test);
        get_Prescriptions();
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const addPrescriptionsTest = async () => {
    setLoading(true);
    let arr: any = [];
    let arrTest: any = [];

    if (type == 'test') {
      let objTest = {
        testName: test,
        results: result,
      };
      await arrTest.push(...tests, objTest);
      setTests(arrTest);
    }

    let params = {
      test: arrTest,
      medicines: arr,
    };
    let id = {
      appointmentId: detail?._id,
      patientId: detail?.patientId?._id,
    };

    hospital_Add_Prescription(id, params)
      .then((res: any) => {
        setMedicines(res?.data?.prescription?.medicines);
        setTests(res?.data?.prescription?.test);
        get_Prescriptions();
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const get_Prescriptions = () => {
    setLoading(true);
    let id = detail?._id;
    hospitalgetPrescriptions(id)
      .then((res: any) => {
        setMedicines(res?.data?.prescription?.medicines);
        setTests(res?.data?.prescription?.test);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const fetch_Patient_History = () => {
    setLoading(true);
    let id = detail?.patientId?._id;
    hospitalgetPatient_History(id)
      .then((res: any) => {})
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const onChangeText = (text: any, type: any) => {
    if (type == 'med') {
      setMed(text);
    } else if (type == 'test') {
      setTest(text);
    } else if (type == 'brand') {
      setBrand(text);
    } else if (type == 'strength') {
      setStrength(text);
    } else if (type == 'dosage') {
      setDosage(text);
    } else if (type == 'result') {
      setResult(text);
    }
  };

  const onSave = () => {
    if (type == 'med') {
      addPrescriptionsMedicine();
    } else if (type == 'test') {
      addPrescriptionsTest();
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Patient Detail'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      {/* <HeaderCard
        icon1={LabMenu}
        numberOfIcons={'2'}
        onPress={openDrawer}
        cardColor={colors.Hospital}
        tintColor={colors.pharmacy}
        title={'Hi ' + B2B?.hospital?.name}>
        <UserHeaderContent
          searhIconTr
          searhIconTrue
          toggle={toggle}
          onPress={toggleSearch}
          tintColor={colors.primary}
          ScreenTitle={'Patient Detail'}
          ColorScreenTitle={colors.bluE}
        />
      </HeaderCard> */}

      <ScrollView>
        <View style={styles.main}>
          <Text color={colors.bluE} size={14} SFregular>
            {detail?.doctorModelType} {detail?.doctorId?.name}
          </Text>
          <Text color={colors.bluE} size={14} SFregular>
            {detail?.doctorId?.speciality}
          </Text>

          <Text color={colors.bluE} size={14} SFregular>
            {degree}
          </Text>

          <Text color={colors.bluE} size={14} SFregular>
            {detail?.patientId?.name}
          </Text>
          <Text color={colors.bluE} size={14} SFregular>
            {detail?.patientId?.phone}
          </Text>
          <Text color={colors.bluE} size={14} SFregular>
            {detail?.patientId?.gender}
          </Text>
          <Text color={colors.bluE} size={14} SFregular>
            {moment(detail?.patientId?.updatedAt).format('DD/MM/YY')}
          </Text>
          <Text color={colors.bluE} size={14} SFregular>
            {detail?.appointmentType}
          </Text>
          <View style={{alignSelf: 'flex-end'}}>
            <CustomRating rating={detail?.averageRating} />
          </View>
        </View>

        <ClickableField
          open={open1}
          bgclr={'white'}
          title={'History'}
          clr={colors?.bluE}
          setOpen={setOpen1}
          openClr={'white'}
          clrTxt={colors?.bluE}>
          <Section
            input1={input1}
            colors={colors}
            input2={input2}
            saveHistory={saveHistory}
            handleChangeText={handleChangeText}
            onSubmit={() => onSubmit('symptoms')}
          />
        </ClickableField>

        <ClickableField
          open={open2}
          clr={colors?.bluE}
          bgclr={'white'}
          setOpen={setOpen2}
          openClr={'white'}
          clrTxt={colors?.bluE}
          title={'Prescription'}>
          {type == 'med' ? (
            <>
              <AppTextInput
                value={med}
                placeholder={'Write Medicine Name Here'}
                onChangeText={text => onChangeText(text, 'med')}
              />
              <AppTextInput
                value={brand}
                placeholder={'Write Medicine Brand Here'}
                onChangeText={text => onChangeText(text, 'brand')}
              />
              <AppTextInput
                value={strength}
                placeholder={'Write Medicine Strength Here'}
                onChangeText={text => onChangeText(text, 'strength')}
              />
              <AppTextInput
                value={dosage}
                placeholder={'Write Dosage Here'}
                onChangeText={text => onChangeText(text, 'dosage')}
              />
            </>
          ) : (
            type == 'test' && (
              <>
                <AppTextInput
                  value={test}
                  placeholder={'Write Test Name Here'}
                  onChangeText={text => onChangeText(text, 'test')}
                />
                <AppTextInput
                  value={result}
                  placeholder={'Write Test result'}
                  onChangeText={text => onChangeText(text, 'result')}
                />
              </>
            )
          )}

          {type == 'med' || type == 'test' ? (
            <View style={styles.save}>
              <AppButton
                title="Save"
                width={RF(70)}
                bgClr={'green'}
                height={RF(20)}
                onPress={onSave}
                textcolor={'white'}
              />
            </View>
          ) : null}

          <View style={styles.btnV}>
            <AppButton
              width={RF(120)}
              bgClr={type == 'med' ? 'green' : colors?.bluE}
              height={RF(30)}
              textcolor={'white'}
              title="Add Medicine"
              onPress={() => onPrescription('med')}
            />
            <AppButton
              width={RF(120)}
              bgClr={type == 'test' ? 'green' : colors?.bluE}
              height={RF(30)}
              title="Add Test"
              textcolor={'white'}
              onPress={() => onPrescription('test')}
            />
          </View>

          {medicines?.length > 0 && (
            <View style={styles.outer}>
              <Text size={14} SFmedium>
                Medicine
              </Text>
              <FlatList
                data={medicines}
                renderItem={(i: any) => {
                  let item = i?.item;
                  return (
                    <View style={styles.mt10}>
                      <Text>Name: {item?.medicineName}</Text>
                      <Text>Brand: {item?.medicineBrand}</Text>
                      <Text>Strength: {item?.medicineStrength}</Text>
                      <Text>Dosage: {item?.dosage}</Text>
                    </View>
                  );
                }}
                ListEmptyComponent={() => {
                  return <EmptyList />;
                }}
              />
            </View>
          )}
          {tests?.length > 0 && (
            <View style={styles.outer}>
              <Text size={14} SFmedium>
                Test
              </Text>
              <FlatList
                data={tests}
                renderItem={(i: any) => {
                  let item = i?.item;
                  return (
                    <View style={styles.mt10}>
                      <Text size={12} SFregular>
                        Name: {item?.testName}
                      </Text>
                      <Text size={12} SFregular>
                        Results: {item?.results}
                      </Text>
                      <View style={styles.line} />
                    </View>
                  );
                }}
                ListEmptyComponent={() => {
                  return <EmptyList />;
                }}
              />
            </View>
          )}
        </ClickableField>

        <View style={{marginBottom: 100}} />
      </ScrollView>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};

const Section = ({
  input1,
  colors,
  input2,
  handleChangeText,
  onSubmit,
  saveHistory,
}: {
  input2?: any;
  input1?: any;
  colors?: any;
  handleChangeText?: any;
  onSubmit?: any;
  saveHistory?: any;
}) => {
  return (
    <>
      <CustomFloatingLabelInput
        value={input1}
        m_Top={RF(32)}
        label={'Symptoms'}
        eyeIconClr={'white'}
        labelClr={colors?.bluE}
        tintColorStart={'white'}
        inputClr={colors?.bluE}
        onChangeText={(text: any) =>
          handleChangeText && handleChangeText(text, '1')
        }
      />
      <CustomFloatingLabelInput
        value={input2}
        m_Top={RF(32)}
        eyeIconClr={'white'}
        labelClr={colors?.bluE}
        tintColorStart={'white'}
        label={'Description about patient'}
        inputClr={colors?.bluE}
        onChangeText={(text: any) =>
          handleChangeText && handleChangeText(text, '2')
        }
      />
      <View style={{marginTop: RF(10)}}>
        <AppButton
          title="Save"
          width={RF(70)}
          bgClr={'green'}
          height={RF(20)}
          textcolor={'white'}
          onPress={onSubmit}
        />
      </View>

      {saveHistory && (
        <>
          <Text SFsemiBold size={14}>
            Symptoms
          </Text>
          <Text>{input1}</Text>
          <Text SFsemiBold size={14}>
            Description
          </Text>
          <Text>{input2}</Text>
        </>
      )}
    </>
  );
};

export default HospitalAppointments_Patient_Details;

const styles = StyleSheet.create({});
