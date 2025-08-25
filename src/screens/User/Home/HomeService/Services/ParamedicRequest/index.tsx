import {
  AppButton,
  CheckBox,
  CustomHeader,
  CustomLoader,
  HeaderCard,
  LoginReminder,
  New_Input,
  Text,
  TimeSelection,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {
  addParamedic,
  globalStyles,
  margin,
  paramedicFormValidation,
  rs,
  rv,
  showToast,
} from '@services';
import {RF} from '@theme';
import {useFormik} from 'formik';
import {useState} from 'react';
import React, {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';

const CheckBoxData = [
  {id: 1, title: 'Day'},
  {id: 3, title: 'Night'},
  {id: 4, title: 'Other'},
];
const ParamedicRequest = () => {
  const {user} = useSelector((state: any) => state?.root?.user);
  const [open1, setOpen1] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [items, setItems] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ]);
  const handelSelect = (item: any) => {
    setSelected(item.title);
    formik.setFieldValue('schedule', item?.title?.toLowerCase());
  };
  const formik: any = useFormik({
    initialValues: {
      name: '',
      email: '',
      contact: '',
      gender: '',
      preferredDate: '',
      preferredTime: '',
      userArea: {
        area: '',
        address: '',
        city: '',
      },
      schedule: '',
      customSchedule: '',
      remarks: '',
    },

    validationSchema: paramedicFormValidation,
    onSubmit: (values: any) => {
      setLoading(true);
      addParamedic(values)
        .then((res: any) => {
          formik?.resetForm();
          setSelected('');
          showToast('success', 'Successful', true);
        })
        .catch((err: any) => {
          showToast('error', err?.response?.data?.message, false);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Request Form'}
          leftIcon
          titleColor={colors.white}
          notify
        />
        <ScrollView>
          <View style={styles.view}>
            <Text size={18} SFmedium color={colors.blueText}>
              Add Patient Details
            </Text>

            <New_Input
              placeholder="Enter your name"
              extraStyle={margin.top_8}
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <Text style={globalStyles.errors}>{formik.errors.name}</Text>
            )}
            <New_Input
              placeholder="Enter your email"
              extraStyle={margin.top_8}
              value={formik?.values?.email}
              onChangeText={formik?.handleChange('email')}
            />
            {formik?.touched?.email && formik?.errors?.email && (
              <Text style={globalStyles.errors}>{formik?.errors?.email}</Text>
            )}
            <New_Input
              placeholder="Enter Contact Number"
              keyboardType="number-pad"
              extraStyle={margin.top_8}
              value={formik?.values?.contact}
              onChangeText={formik?.handleChange('contact')}
            />
            {formik?.touched?.contact && formik?.errors?.contact && (
              <Text style={globalStyles.errors}>{formik?.errors?.contact}</Text>
            )}

            <New_Input
              placeholder="Enter Address"
              extraStyle={margin.top_8}
              value={formik?.values?.userArea?.address} // Access address within userArea
              onChangeText={formik?.handleChange('userArea.address')} // Use dot notation
            />
            {formik?.touched?.userArea?.address &&
              formik?.errors?.userArea?.address && (
                <Text style={globalStyles.errors}>
                  {formik?.errors?.userArea?.address}
                </Text>
              )}

            <Text
              size={18}
              SFmedium
              color={colors.blueText}
              style={margin.top_16}>
              Paramedic Requirements
            </Text>

            <DropDownPicker
              open={open1}
              value={formik.values.gender}
              items={items}
              setOpen={setOpen1}
              setValue={(callback: any) => {
                const selectedValue = callback(formik.values.gender);
                formik.setFieldValue('gender', selectedValue);
              }}
              setItems={setItems}
              placeholder={'Select Gender'}
              style={styles.wideSelect}
              placeholderStyle={{color: '#aaa'}}
              dropDownContainerStyle={styles.dropdownContainer}
            />
            {formik?.touched?.gender && formik?.errors?.gender && (
              <Text style={globalStyles.errors}>{formik?.errors?.gender}</Text>
            )}

            <TimeSelection
              modeTrue={'date'}
              title={'Select Preferred Date '}
              // editable={CertificatEdit}
              editable={false}
              show
              type={'para'}
              selectedTime={formik.values.preferredDate}
              setTime={(date: any) =>
                formik?.setFieldValue('preferredDate', date)
              }
            />

            {formik?.touched?.preferredDate &&
              formik?.errors?.preferredDate && (
                <Text style={globalStyles.errors}>
                  {formik?.errors?.preferredDate}
                </Text>
              )}

            <TimeSelection
              modeTrue={'time'}
              title={'Select preferred Time'}
              // editable={CertificatEdit}
              editable={false}
              show
              type={'para'}
              selectedTime={formik?.values?.preferredTime}
              setTime={(date: any) =>
                formik?.setFieldValue('preferredTime', date)
              }
            />
            {formik?.touched?.preferredTime &&
              formik?.errors?.preferredTime && (
                <Text style={globalStyles.errors}>
                  {formik?.errors?.preferredTime}
                </Text>
              )}

            <New_Input
              placeholder="Enter city"
              extraStyle={margin.top_8}
              value={formik?.values?.userArea.city} // Access city within userArea
              onChangeText={formik?.handleChange('userArea.city')} // Use dot notation
            />
            {formik?.touched?.userArea?.city &&
              formik?.errors?.userArea?.city && (
                <Text style={globalStyles.errors}>
                  {formik?.errors?.userArea?.city}
                </Text>
              )}
            <New_Input
              placeholder="Enter Area"
              extraStyle={margin.top_8}
              value={formik?.values?.userArea?.area} // Access area within userArea
              onChangeText={formik?.handleChange('userArea.area')} // Use dot notation
            />
            {formik?.touched?.userArea?.area &&
              formik?.errors?.userArea?.area && (
                <Text style={globalStyles.errors}>
                  {formik?.errors?.userArea?.area}
                </Text>
              )}

            <View style={{paddingVertical: RF(24)}}>
              <Text size={18} SFmedium color={colors.blueText}>
                Schedule
              </Text>
              <FlatList
                data={CheckBoxData}
                horizontal
                scrollEnabled={false}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  width: '100%',
                }}
                renderItem={({item}: any) => (
                  <CheckBox
                    active
                    pV={10}
                    width={rs(95)}
                    title={item?.title}
                    selected={selected}
                    onPress={handelSelect}
                    selectColor={colors.primary}
                    colorMid={colors.primary}
                    c_b={colors.primary}
                    // bgClr={selected === item?.title ? colors.primary : '#fff'}
                    // textColor={'#fff'}
                    // textColor1={colors.primary}
                  />
                )}
              />
              {formik?.touched?.schedule && formik?.errors?.schedule && (
                <Text style={globalStyles.errors}>
                  {formik?.errors?.schedule}
                </Text>
              )}
            </View>

            {formik?.values?.schedule === 'other' && (
              <New_Input
                placeholder="Specify Schedule"
                extraStyle={margin.top_8}
                value={formik.values.customSchedule}
                onChangeText={formik.handleChange('customSchedule')}
              />
            )}
            {formik?.touched?.customSchedule &&
              formik?.errors?.customSchedule && (
                <Text style={globalStyles.errors}>
                  {formik?.errors?.customSchedule}
                </Text>
              )}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Write your remarks here..."
                placeholderTextColor="#6c757d"
                value={formik?.values?.remarks}
                onChangeText={formik?.handleChange('remarks')}
                multiline={true}
                scrollEnabled={true}
                textAlignVertical="top"
              />
            </View>
            {formik?.touched?.remarks && formik?.errors?.remarks && (
              <Text style={globalStyles.errors}>{formik?.errors?.remarks}</Text>
            )}
            <View style={{marginBottom: rv(80), marginTop: rv(16)}}>
              <AppButton
                title="Submit"
                onPress={
                  user === null
                    ? () => setModalVisible(true)
                    : formik?.handleSubmit
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <Modal transparent animationType="slide" visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{flexGrow: 1}}>
            <LoginReminder />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default ParamedicRequest;
const styles = StyleSheet.create({
  view: {
    padding: rs(16),
    backgroundColor: '#ffff',
  },

  inputGroupBasic: {
    position: 'relative',
  },
  wideSelect: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    color: '#000',
    backgroundColor: '#EDF1F3',
    borderColor: '#ccc',
    paddingHorizontal: rs(14),
    paddingVertical: rs(12.5),
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: rs(14),
    borderRadius: 10,
    marginTop: RF(8),
  },

  dropdownContainer: {
    borderColor: '#ccc',
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
    height: RF(80),
    fontSize: 16,
    color: '#000',
    paddingTop: 0,
  },
});
