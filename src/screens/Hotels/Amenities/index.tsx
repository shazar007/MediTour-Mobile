import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  CustomLoader,
  DropHotel,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {RF} from '@theme';
import {CheckBox} from 'react-native-elements';
import {navigate, showToast} from '@services';
import {useSelector, useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {setHotelInfo} from '@redux';

import {
  amenitiesHome,
  amenitiesOptions,
  apartmentOption,
  bedData,
  providedData,
} from './data';

const Amenities = ({route}: any) => {
  const {item, selectedItem} = route.params;
  const dispatch = useDispatch();
  const {hotelInfo} = useSelector((state: any) => state.root.b2b);
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    extraBedAvailability: Yup.lazy(value =>
      hotelInfo?.object?.category === 'hotel'
        ? Yup.string().required('extraBedAvailability Required')
        : Yup.mixed().notRequired(),
    ),
    noOfExtraBeds: Yup.lazy(value =>
      hotelInfo?.object?.category === 'hotel'
        ? Yup.string().required('noOfExtraBeds Required')
        : Yup.mixed().notRequired(),
    ),

    amenities: Yup.array().min(1, 'Select at least one amenities'),
  });

  const handleNext = async (values: any, selected: any) => {
    setLoading(true);
    try {
      const merging = {
        ...hotelInfo,
        ...{Ame: values},
      };
      dispatch(setHotelInfo(merging));
      setTimeout(() => {
        setLoading(false);
        navigate('PropertyPhotos', {item: item, selectedItem: selected});
        showToast('Success', 'Amenities info saved successfully', true);
      }, 3000);
    } catch (error) {
      setLoading(false);
      showToast(
        'error',
        'An error occurred while saving the information.',
        false,
      );
    }
  };

  const formik: any = useFormik({
    initialValues: {
      extraBedAvailability: '',
      noOfExtraBeds: '',
      amenities: [],
    },
    validationSchema,
    onSubmit: values => {
      handleNext(values, selectedItem);
    },
  });

  const onPress = () => {
    formik
      .validateForm()
      .then((errors: any) => {
        if (Object.keys(errors).length) {
          const firstError: any = Object.values(errors)[0];
          showToast('Error', firstError, false);
        } else {
          formik.handleSubmit();
        }
      })
      .catch((error: any) => {
        console.error('Validation error:', error);
        showToast('error', 'An error occurred during validation.', false);
      });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <HeaderCard numberOfIcons={'2'} notify cardColor={'#0D47A1'}>
          <UserHeaderContent ScreenTitle={'Amenities'} />
        </HeaderCard>
        <ScrollView>
          <View
            style={{
              marginHorizontal: RF(24),
              marginVertical: RF(24),
            }}>
            {hotelInfo?.object?.category === 'hotel' && (
              <View style={{gap: RF(8)}}>
                <DropHotel
                  name={'Can you provide extra bed?'}
                  data={bedData}
                  setSelectedData={(val: any) =>
                    formik.setFieldValue('extraBedAvailability', val)
                  }
                  selectedData={formik.values.extraBedAvailability}
                />
                <DropHotel
                  name={'Select the number of extra bed'}
                  data={providedData}
                  setSelectedData={(val: any) =>
                    formik.setFieldValue('noOfExtraBeds', val)
                  }
                  selectedData={formik.values.noOfExtraBeds}
                />
              </View>
            )}

            <Text
              size={16}
              SFmedium
              color={'rgba(13, 71, 161, 1)'}
              style={{
                marginTop:
                  selectedItem === 'Hotels, B&Bs & More' ? RF(16) : null,
              }}>
              Tell us about your amenities
            </Text>
            <FlatList
              data={
                hotelInfo?.apartments
                  ? apartmentOption
                  : selectedItem === 'Homes'
                  ? amenitiesHome
                  : amenitiesOptions
              }
              numColumns={2}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View key={item.id} style={styles.checkboxContainer}>
                  <CheckBox
                    title={item.label}
                    checked={formik.values.amenities.includes(item.label)}
                    onPress={() => {
                      if (formik.values.amenities.includes(item.label)) {
                        formik.setFieldValue(
                          'amenities',
                          formik.values.amenities.filter(
                            (facility: any) => facility !== item?.label,
                          ),
                        );
                      } else {
                        formik.setFieldValue('amenities', [
                          ...formik.values.amenities,
                          item.label,
                        ]);
                      }
                    }}
                    containerStyle={styles.checkbox}
                    textStyle={styles.checkboxText}
                  />
                </View>
              )}
            />

            <AppButton
              title="Next"
              width={RF(200)}
              height={RF(40)}
              m_Top={RF(32)}
              onPress={onPress}
            />
          </View>
          {loading && <CustomLoader />}
        </ScrollView>
      </View>
    </Wrapper>
  );
};

export default Amenities;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    color: '#0D47A1',
    fontWeight: 'bold',
    marginTop: RF(8),
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 10,
    color: '#0D47A1',
    fontWeight: 'bold',
  },
  row: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  checkboxContainer: {
    width: '50%',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 14,
  },
});
