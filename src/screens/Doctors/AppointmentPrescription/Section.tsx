import {del} from '@assets';
import {AppButton, AppTextInput, Text} from '@components';
import {addHistoryDoctor, rs, rv} from '@services';
import {getColorCode, globalStyle, RF} from '@theme';
import {Alert} from '@utils';
import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import * as Yup from 'yup';

const Section = ({
  colors,
  saveHistory,
  singleAppointment,
  setLoading,
}: {
  colors?: any;
  singleAppointment?: any;
  onSubmit?: any;
  saveHistory?: any;
  setLoading?: any;
}) => {
  const {history_Doctor} = getColorCode();

  const formik: any = useFormik({
    initialValues: {
      symptoms: '',
      description: '',
      diastolicPressure: '',
      systolicPressure: '',
      weight: '',
      diseases: [],
      temperature: '',
      heartRate: '',
      sugar: '',
    },

    validationSchema: Yup.object({
      symptoms: Yup.string().required('Symptoms is Required'),
      description: Yup.string().required('Description is Required'),
      diastolicPressure: Yup.number().required(
        'Diastolic Pressure is Required',
      ),
      systolicPressure: Yup.number().required('Systolic Pressure is Required'),
      weight: Yup.number().required('Weight is Required'),
      diseases: Yup.array()
        .of(Yup.string().required('Disease is Required'))
        .min(1, 'At least one disease is required')
        .required('Diseases are Required'),
    }),
    onSubmit: (values, {resetForm}) => {
      handleSubmit();
      resetForm();
    },
  });

  const handleDiseaseChange = (index: any, value: any) => {
    const updatedDiseases = [...formik.values.diseases];
    updatedDiseases[index] = value;
    formik.setFieldValue('diseases', updatedDiseases);
  };

  useEffect(() => {
    addDisease();
  }, []);

  const addDisease = () => {
    const emptyIndex = formik.values.diseases.findIndex(
      (disease: any) => disease.trim() === '',
    );

    if (emptyIndex !== -1) {
      formik.setFieldTouched(`diseases[${emptyIndex}]`, true);
      formik.setFieldError(
        `diseases[${emptyIndex}]`,
        'Please fill out this field before adding a new one',
      );
    } else {
      const updatedDiseases = [...formik.values.diseases, ''];
      formik.setFieldValue('diseases', updatedDiseases);
    }
  };

  const removeDisease = (index: any) => {
    const updatedDiseases = formik.values.diseases.filter(
      (_: any, i: any) => i !== index,
    );
    if (updatedDiseases.length === 0) {
      updatedDiseases.push(''); // Keep at least one empty field
    }
    formik.setFieldValue('diseases', updatedDiseases);
  };

  const handleSubmit = () => {
    let currentData = formik?.values;
    setLoading(true);
    let params = {
      // doctorId: saveHistory?.doctorId?._id,
      symptoms: currentData.symptoms,
      description: currentData.description,
      diseases: currentData?.diseases,
      temperature: currentData?.temperature,
      heartRate: currentData?.heartRate,
      sugar: currentData?.sugar,
      bloodPressure: {
        diastolicPressure: currentData?.diastolicPressure,
        systolicPressure: currentData?.systolicPressure,
      },
      weight: currentData?.weight,
    };
    let data1 = {
      patientId: saveHistory?.patientId?._id,
      appointmentId: saveHistory?._id,
    };

    addHistoryDoctor(params, data1, history_Doctor)
      .then((res: any) => {
        singleAppointment();
        Alert.showSuccess(res?.data?.message);
      })
      .catch((err: any) => {
        Alert.showError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <View style={{gap: RF(4)}}>
        <AppTextInput
          value={formik?.values?.systolicPressure}
          placeholder={'Enter Blood Pressure'}
          keyboardType="numeric"
          placeholderTextColor={colors?.bluE}
          top={'Systolic BP (mnhg) Range(60-250)'}
          onChangeText={formik?.handleChange('systolicPressure')}
          onBlur={formik?.handleBlur('systolicPressure')}
        />
        {formik?.touched?.systolicPressure &&
        formik?.errors?.systolicPressure ? (
          <Text style={{color: 'red'}}>{formik?.errors?.systolicPressure}</Text>
        ) : null}
        <AppTextInput
          value={formik?.values?.diastolicPressure}
          placeholder={'Enter Blood Pressure'}
          keyboardType="numeric"
          top={'Diastolic BP (mnhg) Range(50-150)'}
          placeholderTextColor={colors?.bluE}
          onChangeText={formik?.handleChange('diastolicPressure')}
          onBlur={formik?.handleBlur('diastolicPressure')}
        />
        {formik?.touched?.diastolicPressure &&
        formik?.errors?.diastolicPressure ? (
          <Text style={{color: 'red'}}>
            {formik?.errors?.diastolicPressure}
          </Text>
        ) : null}
        <AppTextInput
          value={formik?.values?.weight}
          placeholder={'Enter Weight'}
          top={'Weight (KG) Range(02-180)'}
          keyboardType="numeric"
          placeholderTextColor={colors?.bluE}
          onChangeText={formik?.handleChange('weight')}
          onBlur={formik?.handleBlur('weight')}
        />
        {formik?.touched?.weight && formik?.errors?.weight ? (
          <Text style={{color: 'red'}}>{formik?.errors?.weight}</Text>
        ) : null}

        <View>
          {formik?.values?.diseases?.map((disease: any, index: any) => (
            <View key={index} style={{marginBottom: rv(16)}}>
              <AppTextInput
                value={disease}
                onPress={() => removeDisease(index)}
                top={index == 0 ? `Disease` : null}
                endIcon={index == 0 ? null : del}
                placeholder={`Disease ${index + 1}`}
                placeholderTextColor={colors.bluE}
                onChangeText={value => handleDiseaseChange(index, value)}
                onBlur={formik.handleBlur(`diseases[${index}]`)}
              />
              {formik?.touched?.diseases?.[index] &&
              formik?.errors?.diseases?.[index] ? (
                <Text style={{color: 'red', marginTop: 8}}>
                  {formik?.errors?.diseases[index]}
                </Text>
              ) : null}
            </View>
          ))}

          <Pressable
            onPress={addDisease}
            style={{
              backgroundColor: colors?.primary,
              paddingVertical: rv(6),
              justifyContent: 'center',
              alignSelf: 'flex-end',
              alignItems: 'center',
              width: 80,
              borderRadius: 8,
              marginBottom: rv(8),
            }}>
            <Text color={'#fff'}>Add +</Text>
          </Pressable>
        </View>

        <AppTextInput
          value={formik?.values?.temperature}
          placeholder={'Enter Temperature'}
          keyboardType="numeric"
          top={'Temperature (°C) Range (10-40)'}
          placeholderTextColor={colors?.bluE}
          onChangeText={formik?.handleChange('temperature')}
          onBlur={formik?.handleBlur('temperature')}
        />

        <AppTextInput
          value={formik?.values?.sugar}
          placeholder={'Enter Sugar'}
          keyboardType="numeric"
          top={'Sugar Level (mg/dL) Range (70-180)'}
          placeholderTextColor={colors?.bluE}
          onChangeText={formik?.handleChange('sugar')}
          onBlur={formik?.handleBlur('sugar')}
        />
        <AppTextInput
          value={formik?.values?.heartRate}
          placeholder={'Enter Heart Rate'}
          keyboardType="numeric"
          top={'Heart Rate (bpm) Range (40-180)'}
          placeholderTextColor={colors?.bluE}
          onChangeText={formik?.handleChange('heartRate')}
          onBlur={formik?.handleBlur('heartRate')}
        />
      </View>

      <View style={styles.container}>
        <Text size={14} SFmedium color={'#0D47A1'}>
          Symptoms
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={formik?.values?.symptoms}
            style={styles.textInput}
            onChangeText={formik?.handleChange('symptoms')}
            onBlur={formik?.handleBlur('symptoms')}
            placeholder="Write Symptoms"
            placeholderTextColor="#6c757d"
            multiline={true}
            scrollEnabled={true}
            textAlignVertical="top"
          />
        </View>
        {formik?.touched?.symptoms && formik?.errors?.symptoms ? (
          <Text style={{color: 'red'}}>{formik?.errors?.symptoms}</Text>
        ) : null}
      </View>
      <View style={styles.container}>
        <Text size={14} SFmedium color={'#0D47A1'}>
          Description about patient
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Description about patient"
            placeholderTextColor="#6c757d"
            value={formik?.values?.description}
            onChangeText={formik?.handleChange('description')}
            onBlur={formik?.handleBlur('description')}
            multiline={true}
            scrollEnabled={true}
            textAlignVertical="top"
          />
        </View>
        {formik?.touched?.description && formik?.errors?.description ? (
          <Text style={{color: 'red'}}>{formik?.errors?.description}</Text>
        ) : null}
      </View>
      <View style={{marginVertical: RF(24)}}>
        <AppButton
          title="Save"
          width={RF(70)}
          bgClr={'green'}
          height={RF(20)}
          textcolor={'white'}
          onPress={formik?.handleSubmit}
        />
      </View>

      {saveHistory?.history?.symptoms?.map((symptom: string, index: number) => (
        <>
          <Text key={index} SFsemiBold size={14}>
            Symptoms
          </Text>
          <Text>{symptom}</Text>
          <Text SFsemiBold size={14}>
            Description
          </Text>
          <Text>{saveHistory?.history?.description}</Text>

          <Text SFsemiBold size={14}>
            Diastolic Pressure
          </Text>
          <Text>{saveHistory?.history?.bloodPressure?.diastolicPressure}</Text>

          <Text SFsemiBold size={14}>
            Systolic Pressure
          </Text>
          <Text>{saveHistory?.history?.bloodPressure?.systolicPressure}</Text>
          <Text SFsemiBold size={14}>
            Weight
          </Text>
          <Text>{saveHistory?.history?.weight}</Text>
        </>
      ))}
    </>
  );
};

// const FieldMap=({formik,placeHolder,top,colors,keyboardType,value}:any)=>{
//   return(
//     <AppTextInput
//     value={value}
//     placeholder={placeHolder}
//     keyboardType={keyboardType}
//     placeholderTextColor={colors?.bluE}
//     top={top}
//     onChangeText={formik?.handleChange('systolicPressure')}
//     onBlur={formik?.handleBlur('systolicPressure')}
//   />
//   )
// }

const styles = StyleSheet.create({
  container: {
    marginTop: RF(20),
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a4b8a',
    marginBottom: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#1a4b8a',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: RF(8),
  },
  textInput: {
    height: 100,
    fontSize: 16,
    color: '#000',
    paddingTop: 0,
  },
});
export default Section;
