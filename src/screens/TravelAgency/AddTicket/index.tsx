import {
  Image,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  CustomFloatingLabelInput,
  CustomHeader,
  CustomLoader,
  FlightForm,
  HeaderCard,
  SaveModal,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {Illustration} from '@assets';
import {RF} from '@theme';
import {useFormik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import useStyles from './styles';
import {
  addBidFlight,
  initialValues,
  navigate,
  showToast,
  validationSchema,
} from '@services';

interface RouteParams {
  route: {
    params: {
      flightType: string;
      data: {_id: string};
    };
  };
}

interface FormValues {
  departureTime: string;
  arrivalTime: string;
}

const AddTicket = ({route}: RouteParams) => {
  const {flightType, data} = route.params;
  const theme = useTheme();
  const [formVisible, setFormVisible] = useState(false);
  const [returnForm, setReturnForm] = useState(false);
  const [flights, setFlights] = useState<FormValues[]>([]);
  const [flightsReturn, setFlightsReturn] = useState<FormValues[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [returnIndex, setReturnIndex] = useState<number | null>(null);
  const [flightTypeSelected, setFlightTypeSelected] = useState<string>('');
  const [isReturn, SetIsReturn] = useState<string>('');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [returnEditMode, setReturnEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useStyles();
  const colors: any = theme.colors;

  const formatTime = (time: string): string => {
    return new Date(time).toISOString();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: FormValues, {resetForm}: FormikHelpers<FormValues>) => {
      const formattedValues = {
        ...values,
        departureTime: formatTime(values.departureTime),
        arrivalTime: formatTime(values.arrivalTime),
      };

      if (editMode) {
        const updatedFlights: any = flights.map((flight: any, index: any) =>
          index === currentIndex ? formattedValues : flight,
        );
        setFlights(updatedFlights);
        setEditMode(false);
      } else {
        setFlights([...flights, formattedValues]);
      }
      setFormVisible(false);
      resetForm();
    },
  });

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: FormValues, {resetForm}: FormikHelpers<FormValues>) => {
      const formattedValues = {
        ...values,
        departureTime: formatTime(values.departureTime),
        arrivalTime: formatTime(values.arrivalTime),
      };

      if (returnEditMode) {
        const updatedFlights = flightsReturn.map((flight: any, index: any) =>
          index === returnIndex ? formattedValues : flight,
        );
        setFlightsReturn(updatedFlights);
        setReturnEditMode(false);
      } else {
        setFlightsReturn([...flightsReturn, formattedValues]);
      }
      setReturnForm(false);
      resetForm();
    },
  });

  const handleFlightTypeSelection = (type: string) => {
    setFlightTypeSelected(type);
    setFormVisible(true);
  };

  const handleFlightType = (type: string) => {
    SetIsReturn(type);
    setReturnForm(true);
  };

  const handleEditFlight = (index: number) => {
    const flightToEdit = flights[index];
    formik.setValues(flightToEdit);
    //
    setCurrentIndex(index);
    setEditMode(true);
    setFormVisible(true);
  };

  const handleEditReturn = (index: number) => {
    const flightToEdit = flightsReturn[index];
    form.setValues(flightToEdit);
    setReturnIndex(index);
    setReturnEditMode(true);
    setReturnForm(true);
  };
  const handleSave = () => {
    formik.validateForm().then(errors => {
      if (Object.keys(errors).length > 0) {
        const firstError = Object.values(errors)[0];
        showToast('Error', firstError, false);
      } else {
        formik.handleSubmit();
      }
    });
  };
  const handleSaveReturn = () => {
    form.validateForm().then(errors => {
      if (Object.keys(errors).length > 0) {
        const firstError = Object.values(errors)[0];
        showToast('Error', firstError, false);
      } else {
        form.handleSubmit();
      }
    });
  };

  const addForm = () => {
    formik.resetForm();
    setFormVisible(true);
  };

  const addFormReturn = () => {
    form.resetForm();
    setReturnForm(true);
  };

  const handleDeleteFlight = () => {
    const updatedFlights = flights.filter(
      (_: any, i: any) => i !== currentIndex,
    );
    setFlights(updatedFlights);
    //
    setModalVisible(false);
    if (updatedFlights.length === 0) {
      setFlightTypeSelected('');
      formik.resetForm();
    }
  };

  const handleDeleteReturn = () => {
    const updatedFlights = flightsReturn.filter(
      (_: any, i: any) => i !== returnIndex,
    );
    setFlightsReturn(updatedFlights);
    setModalVisible(false);
    if (updatedFlights.length === 0) {
      SetIsReturn('');
    }
  };

  const polForm = useFormik({
    initialValues: {
      cancelationDuration: '',
      cancelationDeduction: '',
      TicketPrice: '',
    },
    validationSchema: Yup.object({
      cancelationDuration: Yup.string().required(
        'Cancelation Duration is required',
      ),
      cancelationDeduction: Yup.string().required(
        'Cancelation Deduction is required',
      ),
      TicketPrice: Yup.string().required('Ticket Price is required'),
    }),
    onSubmit: values => {
      addBid(values);
    },
  });

  const addBid = (values: any) => {
    setLoading(true);
    let params: any = {
      requestId: data?._id,
      // flightType: flightTypeSelected.toLowerCase(),
      flightDetails: [...flights],
      flightPolicies: {
        cancelationDuration: values?.cancelationDuration,
        cancelationDeduction: values?.cancelationDeduction,
      },
      ticketPrice: parseInt(values?.TicketPrice, 10),
    };
    if (flightType === 'round') {
      params = {
        ...params,
        returnFlights: [...flightsReturn],
      };
    } else {
      params = {
        ...params,
      };
    }
    addBidFlight(params)
      .then(() => {
        showToast('Success', 'Flight Bid successfully', true);
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          navigate('TravelAgencyRequests');
        }, 500);
      })
      .catch(err => {
        showToast(err, 'error', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const onPress = () => {
  //   if (!polForm.isValid && polForm.submitCount > 0) {
  //     const firstError = Object.values(polForm.errors)[0];
  //     showToast('Error', firstError, false);
  //   } else if (flightType === 'round' && flightsReturn.length === 0) {
  //     showToast(
  //       'Error',
  //       'Please add a return flight before sharing the bid',
  //       false,
  //     );
  //   } else {
  //     polForm.handleSubmit();
  //   }
  // };
  const onPress = () => {
    polForm.validateForm().then(errors => {
      if (Object.keys(errors).length > 0) {
        const firstError = Object.values(errors)[0];
        showToast('Error', firstError, false);
      } else if (flightType === 'round' && flightsReturn.length === 0) {
        showToast(
          'Error',
          'Please add a return flight before sharing the bid',
          false,
        );
      } else {
        polForm.handleSubmit();
      }
    });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Add Ticket'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: RF(80)}}>
            <View style={styles.mainContainer}>
              {!flightTypeSelected && (
                <View>
                  <Image
                    source={Illustration}
                    style={styles.IllustrationStyle}
                  />
                  <TouchableOpacity
                    style={styles.TouchBid}
                    onPress={() => setFormVisible(true)}>
                    <Text color={colors.white}>Add Flight</Text>
                  </TouchableOpacity>
                  {formVisible && (
                    <View style={styles.rowType}>
                      <TouchableOpacity
                        style={styles.stayFlight}
                        onPress={() => handleFlightTypeSelection('Direct')}>
                        <Text color={colors.white}>Direct</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.stayFlight}
                        onPress={() => handleFlightTypeSelection('Stay')}>
                        <Text color={colors.white}>Stay</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
              {flightTypeSelected && (
                <FlightForm
                  flightType={flightTypeSelected}
                  formik={formik}
                  handleSubmit={handleSave}
                  flights={flights}
                  handleEditFlight={handleEditFlight}
                  formVisible={formVisible}
                  flightsReturn={flightsReturn}
                  addForm={addForm}
                  handleDeleteFlight={handleDeleteFlight}
                  setCurrentIndex={setCurrentIndex}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  setLoading={setLoading}
                />
              )}
              {flights.length > 0 &&
                flightType === 'round' &&
                !isReturn &&
                !formVisible &&
                !editMode && (
                  <View>
                    <View>
                      <Text size={14} SFmedium color={'#0D47A1'}>
                        Return Flight
                      </Text>
                    </View>
                    <Image
                      source={Illustration}
                      style={styles.IllustrationStyle2}
                    />
                    <TouchableOpacity
                      style={styles.TouchBid2}
                      onPress={() => setReturnForm(true)}>
                      <Text color={colors.white}>Add Return Flight</Text>
                    </TouchableOpacity>
                    {returnForm && (
                      <View style={styles.rowType}>
                        <TouchableOpacity
                          style={styles.stayFlight}
                          onPress={() => handleFlightType('Direct')}>
                          <Text color={colors.white}>Direct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.stayFlight}
                          onPress={() => handleFlightType('Stay')}>
                          <Text color={colors.white}>Stay</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              {isReturn && (
                <FlightForm
                  flightType={isReturn}
                  formik={form}
                  handleSubmit={handleSaveReturn}
                  flights={flightsReturn}
                  handleEditFlight={handleEditReturn}
                  formVisible={returnForm}
                  addForm={addFormReturn}
                  handleDeleteFlight={handleDeleteReturn}
                  showText
                  modalVisible={modalVisible}
                  setCurrentIndex={setReturnIndex}
                  setModalVisible={setModalVisible}
                  setLoading={setLoading}
                  returnEditMode={returnEditMode}
                />
              )}
              {flights.length > 0 &&
                !editMode &&
                !formVisible &&
                !returnForm && (
                  <View style={{marginTop: RF(32), gap: RF(8)}}>
                    <Text size={16} SFmedium color={'#0E54A3'}>
                      Flight Policies
                    </Text>
                    <CustomFloatingLabelInput
                      label={'Cancelation Duration'}
                      bdClr={'#0D47A1'}
                      value={polForm.values.cancelationDuration}
                      onChangeText={(value: any) =>
                        polForm.setFieldValue('cancelationDuration', value)
                      }
                    />
                    <CustomFloatingLabelInput
                      label={'Cancelation Deduction'}
                      bdClr={'#0D47A1'}
                      value={polForm.values.cancelationDeduction}
                      onChangeText={(value: any) =>
                        polForm.setFieldValue('cancelationDeduction', value)
                      }
                    />
                    <View style={{marginTop: RF(16)}}>
                      <Text size={16} SFmedium color={'#0D47A1'}>
                        Total Price for Traveler
                      </Text>
                      <CustomFloatingLabelInput
                        label={'Ticket Price'}
                        bdClr={'#0D47A1'}
                        keyboardType={"numeric"}
                        value={polForm.values.TicketPrice}
                        onChangeText={(value: any) =>
                          polForm.setFieldValue('TicketPrice', value)
                        }
                      />
                      {/* <View style={{marginTop: RF(24)}}>
                        <Text size={14} SFlight color={'#7D7D7D'}>
                          Note:
                        </Text>
                        <Text size={12} SFregular color={'#0E54A3'}>
                          Please clarify your bid after press share button your
                          information will be share with user
                        </Text>
                      </View> */}
                      <AppButton
                        title="Share Bid"
                        m_Top={RF(36)}
                        bgClr={'#006838'}
                        onPress={onPress}
                      />
                    </View>
                  </View>
                )}
            </View>
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
        <SaveModal
          Visible={Visible}
          title={'Your bid details have been successfully shared with '}
        />
      </View>
    </Wrapper>
  );
};

export default AddTicket;
