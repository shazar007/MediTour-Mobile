import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppTextInput from '../AppTextInput';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import AppButton from '../AppButton';
import {getColorCode, RF} from '@theme';
import Text from '../text';
import {
  closeList,
  Doctor_Add_Prescription,
  navigate,
  showToast,
} from '@services';
import SearchComponent from '../SearchComponent';
import DropList from './DropList';
import {del} from '@assets';
import CustomModal from '../CustomModal';
import {Modal} from 'react-native';
import SearchTest from '../SearchTest';

const dosageData = [
  {id: 1, text: 'As Directed'},
  {id: 2, text: '1/2 Tablet'},
  {id: 3, text: '1/4 Tablet'},
  {id: 4, text: '1 Tablet'},
  {id: 5, text: '2 Tablets'},
  {id: 6, text: '3 Tablets'},
  {id: 7, text: '4 Tablets'},
  {id: 8, text: '1 Capsules'},
  {id: 9, text: '2 Capsules'},
  {id: 10, text: '1 tea spoon'},
  {id: 11, text: '1 table spoon'},
  {id: 12, text: '1 spoon 3ml'},
  {id: 13, text: '1 spoon 5ml'},
];

const forRoute = [
  {id: 1, text: 'As Directed'},
  {id: 2, text: 'IV'},
  {id: 3, text: 'IM'},
  {id: 4, text: 'SC'},
  {id: 5, text: 'PR'},
  {id: 6, text: 'PV'},
  {id: 7, text: 'Inhale'},
  {id: 8, text: 'Sublingual'},
  {id: 9, text: 'Topical'},
];

const dayNumber = [
  {id: 1, text: '1'},
  {id: 2, text: '2'},
  {id: 3, text: '3'},
  {id: 4, text: '4'},
  {id: 5, text: '5'},
  {id: 6, text: '6'},
  {id: 7, text: '7'},
  {id: 8, text: '10'},
  {id: 9, text: '14'},
];
const frequencyData = [
  {id: 1, text: 'Morning', count: 1},
  {id: 2, text: 'Noon', count: 1},

  {id: 3, text: 'Evening', count: 1},
  {id: 4, text: 'Night', count: 1},

  {id: 5, text: 'Morning + Noon', count: 2},
  {id: 6, text: 'Morning + Evening', count: 2},
  {id: 7, text: 'Morning + Night', count: 2},
  {id: 8, text: 'Noon + Evening', count: 2},

  {id: 9, text: 'Evening + Night', count: 2},
  {id: 10, text: 'Morning + Noon + Evening', count: 3},
  {id: 11, text: 'Morning + Evening + Night', count: 3},
  {id: 12, text: 'Morning + Noon + Night', count: 3},
];
const instructionData = [
  {id: 1, text: 'Before Breakfast'},
  {id: 2, text: 'After Breakfast'},
  {id: 3, text: 'Before Lunch'},
  {id: 4, text: 'After Lunch'},
  {id: 5, text: 'Before Dinner'},
  {id: 6, text: 'After Dinner'},
  {id: 7, text: 'Before Bedtime'},
];
const Prescription = ({
  appointment,
  setData,
  setLoading,
  item,
}: {
  appointment?: any;
  setData?: any;
  setLoading?: any;
  item?: any;
}) => {
  const [testData, setTestData] = useState<any>([]);
  const [type, setType] = useState<any>('');
  const [error, setError] = React.useState('');
  const [visible, setVisible] = useState(false);
  const [show, setshow] = useState(false);
  const [medicineData, setMedicineData] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchTest, setsearchTest] = useState<any[]>([]);
  const {colorCode, addDoctor_Desc, close_AllAppointment} = getColorCode();
  useEffect(() => {
    if (appointment?.ePrescription) {
      setMedicineData(appointment?.ePrescription?.medicines);
      setTestData(appointment?.ePrescription?.test);
    }
  }, [appointment]);

  const addPrescription = () => {
    let apt_clone = JSON.parse(JSON.stringify(appointment));

    setLoading(true);
    if ((medicineData?.length ?? 0) === 0 && (testData?.length ?? 0) === 0) {
      setError('Required Test or Medicine');
      setLoading(false);
      return;
    }
    let params: any = {};
    if (medicineData?.length > 0) {
      params.medicines = medicineData;
    }
    if (testData?.length > 0) {
      params.test = testData;
    }
    let id = {
      appointmentId: appointment?._id,
      patientId: appointment?.patientId?._id,
    };
    if (id) {
      Doctor_Add_Prescription(id, params, addDoctor_Desc)
        .then((res: any) => {
          setError('');
          setMedicineData([]);
          setTestData([]);
          apt_clone.ePrescription = res?.data?.prescription;
          setData(apt_clone);
          showToast('Success', res?.data?.message, true);
        })
        .catch(err => {
          showToast('Error', err?.message, err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const closePrescription = () => {
    setLoading(true);
    let params = {
      appointmentId: item._id,
    };
    closeList(params, close_AllAppointment)
      .then((res: any) => {
        showToast('Success', res?.data?.message, true);
        navigate('DoctorsAppointment');
      })
      .catch((error: any) => {
        setError(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const formikMedicine = useFormik({
    initialValues: {
      route: '',
      medicineId: '',
      frequency: '',
      days: '',
      dosage: '',
      instruction: '',
      quantity: '',
      medicineName: '',
    },
    validationSchema: Yup.object({
      route: Yup.string().required('Route is Required'),
      medicineId: Yup.string().required('MedicineName is Required'),
      frequency: Yup.string().required('Frequency is Required'),
      days: Yup.number().required('Required'),
      dosage: Yup.string().required('Dosage is Required'),
      instruction: Yup.string().required('Instruction is Required'),
      quantity: Yup.string().required('Quantity is Required'),
    }),
    onSubmit: () => {
      handleMedicine();
      formikMedicine.resetForm();
    },
  });
  const handleFrequencyChange = (text: any) => {
    formikMedicine.setFieldValue('frequency', text.trim());
  };

  const handleDaysChange = (text: any) => {
    formikMedicine.setFieldValue('days', Number(text));
  };

  useEffect(() => {
    if (formikMedicine.values.frequency && formikMedicine.values.days) {
      recalculateQuantity();
    }
  }, [formikMedicine.values.frequency, formikMedicine.values.days]);

  const recalculateQuantity = () => {
    const selectedFrequency = frequencyData.find(
      item => item.text.trim() === formikMedicine.values.frequency.trim(),
    );
    const days = Number(formikMedicine.values.days);

    const selectedProduct = searchResults.find(
      item => item._id === formikMedicine.values.medicineId,
    );
    if (selectedProduct) {
      if (
        selectedProduct.productType === 'Syrup' ||
        selectedProduct.productType === 'Injection'
      ) {
        const quantity = selectedFrequency ? 1 : 0;
        formikMedicine.setFieldValue('quantity', quantity.toString());
        // const quantity = selectedFrequency ? selectedFrequency.count * days : 0;
        // formikMedicine.setFieldValue('quantity', quantity.toString());
      } else {
        const quantity = selectedFrequency ? selectedFrequency.count * days : 0;
        formikMedicine.setFieldValue('quantity', quantity.toString());
        // const quantity = selectedFrequency ? selectedFrequency.count : 0;
        // formikMedicine.setFieldValue('quantity', quantity.toString());
      }
    } else {
      formikMedicine.setFieldValue('quantity', '0');
    }
  };

  const handleMedicine = () => {
    const {
      medicineId,
      medicineName,
      frequency,
      days,
      dosage,
      route,
      instruction,
      quantity,
    } = formikMedicine?.values;
    const newMedicine = {
      route,
      medicineId,
      medicineName,
      frequency,
      days: Number(days),
      dosage,
      instruction,
      quantity: Number(quantity),
    };
    let medicine_clone = JSON.parse(JSON.stringify(medicineData));
    medicine_clone = [...medicine_clone, newMedicine];
    setMedicineData(medicine_clone);
  };

  const formikAddTest = useFormik({
    initialValues: {
      testName: '',
      testId: '',
    },
    validationSchema: Yup.object({
      testName: Yup?.string().required('Test Name is Required'),
    }),
    onSubmit: (values, {resetForm}) => {
      handleTest();
      resetForm();
    },
  });
  const handleDeleteTest = (index: number) => {
    let test_clone = JSON.parse(JSON.stringify(testData));
    test_clone.splice(index, 1);
    setTestData(test_clone);
  };
  const handleTest = () => {
    const {testName, testId} = formikAddTest?.values;
    const newTest = {
      testName,
      testId,
    };
    let test_clone = JSON.parse(JSON.stringify(testData));
    test_clone = [...test_clone, newTest];
    setTestData(test_clone);
  };

  const onSave = () => {
    if (type === 'med') {
      formikMedicine?.handleSubmit();
    } else if (type === 'test') {
      formikAddTest?.handleSubmit();
    }
  };

  const onPrescription = (type: any) => {
    setType(type);
  };
  const handleDeleteMedicine = (index: number) => {
    let medicine_clone = JSON.parse(JSON.stringify(medicineData));
    medicine_clone.splice(index, 1);
    setMedicineData(medicine_clone);
  };
  return (
    <>
      {type == 'med' ? (
        <>
          <Text size={12} SFmedium color={'#0D47A1'}>
            Medicines/Vaccines/Surgical Tools Injections
          </Text>
          <SearchComponent
            formik={formikMedicine}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
          <View style={styles?.selection}>
            <View style={{width: '45%'}}>
              <DropList
                FormName={'Select Dosage'}
                Name={'Dosage'}
                custom
                onPress={() => setVisible(true)}
                FormData={dosageData}
                top={RF(60)}
                formik={formikMedicine?.values?.dosage}
                stateField={(text: any) =>
                  formikMedicine?.setFieldValue('dosage', text)
                }
              />
              {formikMedicine?.touched?.dosage &&
              formikMedicine?.errors?.dosage ? (
                <Text style={{color: 'red'}}>
                  {formikMedicine?.errors?.dosage}
                </Text>
              ) : null}
            </View>
            <View style={{width: '45%'}}>
              <DropList
                Name={'Route'}
                FormName={'Select Route'}
                FormData={forRoute}
                top={RF(60)}
                formik={formikMedicine?.values?.route}
                stateField={(text: any) =>
                  formikMedicine?.setFieldValue('route', text)
                }
              />
              {formikMedicine?.touched?.route &&
              formikMedicine?.errors?.route ? (
                <Text style={{color: 'red'}}>
                  {formikMedicine?.errors?.route}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles?.selection}>
            <View style={{width: '70%', position: 'relative'}}>
              <DropList
                FormName={'Select Frequency'}
                Name={'Frequency'}
                FormData={frequencyData}
                top={RF(60)}
                formik={formikMedicine?.values?.frequency}
                stateField={handleFrequencyChange}
              />
              {formikMedicine?.touched?.frequency &&
              formikMedicine?.errors?.frequency ? (
                <Text style={{color: 'red'}}>
                  {formikMedicine?.errors?.frequency}
                </Text>
              ) : null}
            </View>
            <View style={{width: '20%'}}>
              <DropList
                Name={'Days'}
                FormName={'Days'}
                FormData={dayNumber}
                top={RF(60)}
                formik={formikMedicine?.values?.days}
                stateField={handleDaysChange}
              />
              {formikMedicine?.touched?.days && formikMedicine?.errors?.days ? (
                <Text style={{color: 'red'}}>
                  {formikMedicine?.errors?.days}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles?.selection}>
            <View style={{width: '50%'}}>
              <DropList
                Name={'Instruction'}
                FormName={'Select Instruction'}
                FormData={instructionData}
                custom
                onPress={() => setshow(true)}
                top={RF(60)}
                formik={formikMedicine?.values?.instruction}
                stateField={(text: any) =>
                  formikMedicine?.setFieldValue('instruction', text)
                }
              />
              {formikMedicine?.touched?.instruction &&
              formikMedicine?.errors?.instruction ? (
                <Text style={{color: 'red'}}>
                  {formikMedicine?.errors?.instruction}
                </Text>
              ) : null}
            </View>
            <View style={{width: '45%'}}>
              <Text size={14} SFmedium color={'#0D47A1'}>
                Quantity
              </Text>
              <AppTextInput
                value={formikMedicine?.values?.quantity}
                placeholder={'Add Quantity'}
                editable={false}
                p_Horizontal={1}
                onChangeText={formikMedicine?.handleChange('quantity')}
              />
              {formikMedicine?.touched?.quantity &&
              formikMedicine?.errors?.quantity ? (
                <Text style={{color: 'red'}}>
                  {formikMedicine?.errors?.quantity}
                </Text>
              ) : null}
            </View>
          </View>
        </>
      ) : (
        type == 'test' && (
          <>
            <SearchTest
              formik={formikAddTest}
              searchResults={searchTest}
              setSearchResults={setsearchTest}
            />
            {/* <AppTextInput
              value={formikAddTest?.values?.testName}
              placeholder={'Write Test Name Here'}
              onChangeText={formikAddTest?.handleChange('testName')}
            /> */}
            {/* {formikAddTest?.touched?.name &&
            formikAddTest?.errors?.name ? (
              <Text style={{color: 'red'}}>
                {formikAddTest?.errors?.name}
              </Text>
            ) : null} */}
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
          bgClr={type == 'med' ? 'green' : colorCode}
          height={RF(30)}
          textcolor={'white'}
          title="Add Medicine"
          onPress={() => onPrescription('med')}
        />
        <AppButton
          width={RF(120)}
          bgClr={type == 'test' ? 'green' : colorCode}
          height={RF(30)}
          title="Add Test"
          textcolor={'white'}
          onPress={() => onPrescription('test')}
        />
      </View>
      {type == 'med' && (
        <View style={styles.outer}>
          <Text size={16} SFsemiBold color={'#0D47A1'}>
            Medicine
          </Text>
          <FlatList
            data={medicineData}
            scrollEnabled={false}
            renderItem={(i: any) => {
              let item = i?.item;
              return (
                <View style={styles.mt10}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      size={14}
                      style={{width: RF(200)}}
                      SFmedium
                      color={'#0D47A1'}>
                      Medicine:
                      <Text size={12} SFlight color={'#0D47A1'}>
                        {' '}
                        {item?.medicineName}
                      </Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleDeleteMedicine(i.index)}>
                      <Image
                        source={del}
                        style={{
                          width: RF(16),
                          height: RF(16),
                          resizeMode: 'contain',
                          tintColor: 'red',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text size={14} SFmedium color={'#0D47A1'}>
                    Dosage:{' '}
                    <Text size={12} SFlight color={'#0D47A1'}>
                      {item?.dosage}
                    </Text>{' '}
                  </Text>
                  <Text size={14} SFmedium color={'#0D47A1'}>
                    Route:{' '}
                    <Text size={12} SFlight color={'#0D47A1'}>
                      {item?.route}
                    </Text>{' '}
                  </Text>
                  <Text size={14} SFmedium color={'#0D47A1'}>
                    Frequency:
                    <Text size={12} SFlight color={'#0D47A1'}>
                      {' '}
                      {item?.frequency}
                    </Text>
                  </Text>
                  <Text size={14} SFmedium color={'#0D47A1'}>
                    Instruction:{' '}
                    <Text size={12} SFlight color={'#0D47A1'}>
                      {item?.instruction}
                    </Text>{' '}
                  </Text>
                  <Text size={14} SFmedium color={'#0D47A1'}>
                    Quantity:{' '}
                    <Text size={12} SFlight color={'#0D47A1'}>
                      {item?.quantity}
                    </Text>{' '}
                  </Text>
                  <Text size={14} SFmedium color={'#0D47A1'}>
                    Days:{' '}
                    <Text size={12} SFlight color={'#0D47A1'}>
                      {item?.days}
                    </Text>
                  </Text>
                </View>
              );
            }}
          />
        </View>
      )}
      {type == 'test' && (
        <View style={styles.outer}>
          <Text size={16} SFsemiBold>
            Test
          </Text>
          <FlatList
            data={testData}
            scrollEnabled={false}
            renderItem={(i: any) => {
              let item = i?.item;
              return (
                <View style={styles.mt11}>
                  <Text size={12} SFregular style={{width: RF(200)}}>
                    Name: {item?.testName}
                  </Text>
                  <TouchableOpacity onPress={() => handleDeleteTest(i.index)}>
                    <Image
                      source={del}
                      style={{
                        width: RF(16),
                        height: RF(16),
                        resizeMode: 'contain',
                        tintColor: 'red',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )}
      {error && (
        <Text
          size={12}
          SFregular
          color={'red'}
          style={{textDecorationLine: 'underline', marginTop: RF(8)}}>
          *{error}
        </Text>
      )}
      <View style={styles.save1}>
        <AppButton
          width={RF(120)}
          title="Close Appointment"
          height={RF(25)}
          bgClr={'#0B7328'}
          b_R={RF(12)}
          onPress={() => closePrescription()}
        />
        <AppButton
          title="Add Prescription"
          width={RF(110)}
          bgClr={'#0B7328'}
          height={RF(25)}
          b_R={RF(12)}
          onPress={() => addPrescription()}
          textcolor={'white'}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.bgView}>
          <View style={styles.Container2}>
            <Text>Add Custom</Text>
            <AppTextInput
              placeholder={'Add dosage'}
              formik={formikMedicine?.values?.dosage}
              onChangeText={(text: any) =>
                formikMedicine?.setFieldValue('dosage', text)
              }
            />
            <View style={{alignSelf: 'flex-end'}}>
              <AppButton
                title="Save"
                onPress={() => setVisible(false)}
                width={RF(80)}
                height={RF(25)}
                m_Top={RF(24)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={show}>
        <View style={styles.bgView}>
          <View style={styles.Container2}>
            <Text>Add Custom</Text>
            <AppTextInput
              placeholder={'Add Instruction'}
              formik={formikMedicine?.values?.instruction}
              onChangeText={(text: any) =>
                formikMedicine?.setFieldValue('instruction', text)
              }
            />
            <View style={{alignSelf: 'flex-end'}}>
              <AppButton
                title="Save"
                onPress={() => setshow(false)}
                width={RF(80)}
                height={RF(25)}
                m_Top={RF(24)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Prescription;

const styles = StyleSheet.create({
  bgView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container2: {
    elevation: 5,
    // marginHorizontal: RF(24),
    backgroundColor: '#fff',
    width: '80%',
    padding: RF(8),
    borderRadius: RF(8),
  },
  outer: {marginTop: RF(20)},
  mt10: {
    marginTop: RF(10),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  mt11: {
    marginTop: RF(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    backgroundColor: 'black',
  },
  selection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RF(16),
    position: 'relative',
  },
  btnV: {
    marginTop: RF(10),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  save: {
    marginTop: RF(16),
    marginBottom: RF(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  save1: {
    marginTop: RF(16),
    paddingBottom: RF(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 14,
  },
});
