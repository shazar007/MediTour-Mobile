import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CustomHeader, CustomLoader, Text, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {CheckBox} from 'react-native-elements';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {bidPharmacy, globalStyles, navigate, showToast} from '@services';
import {Alert} from '@utils';

const BidRequest = ({route}: any) => {
  const {item} = route.params;
  const theme: any = useTheme();
  const [loading, setLoading] = useState(false);
  const colors: any = theme.colors;

  const validationSchema = Yup.object().shape({
    bidMedicine: Yup.array().min(1, 'Select at least one'),
  });

  const formik: any = useFormik({
    initialValues: {
      bidMedicine: [],
    },
    validationSchema,
    onSubmit: values => {
      addBidPharmacy(values.bidMedicine);
    },
  });

  const addBidPharmacy = (selectedMedicines: string[]) => {
    setLoading(true);
    const allSelected = selectedMedicines.length === item.medicineIds.length;
    let data = {
      requestId: item?._id,
      availableMedIds: selectedMedicines,
      partialOrFull: allSelected ? 'full' : 'partial',
    };
    bidPharmacy(data)
      .then((res: any) => {
        Alert.showSuccess(res?.data);
        navigate('PharmacyRequest');
      })
      .catch(err => {
        Alert.showError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Request Details'}
          leftIcon
          titleColor={colors.white}
          notify
        />
        <View style={{marginVertical: RF(20), marginHorizontal: RF(20)}}>
          <Text size={14} SFmedium color={'#0D47A1'}>
            Request ID:{' '}
            <Text size={12} SFregular color={'#0D47A1'}>
              {item?.requestId}
            </Text>
          </Text>
          <FlatList
            data={item?.medicineIds}
            scrollEnabled={false}
            renderItem={({item}) => {
              return (
                <View key={item?.id}>
                  <CheckBox
                    title={item?.id?.productName}
                    checked={formik.values.bidMedicine.includes(item?.id?._id)}
                    onPress={() => {
                      if (formik.values.bidMedicine.includes(item?.id?._id)) {
                        formik.setFieldValue(
                          'bidMedicine',
                          formik.values.bidMedicine.filter(
                            (id: any) => id !== item?.id?._id,
                          ),
                        );
                      } else {
                        formik.setFieldValue('bidMedicine', [
                          ...formik.values.bidMedicine,
                          item?.id?._id,
                        ]);
                      }
                    }}
                    containerStyle={styles.checkbox}
                    textStyle={styles.checkboxText}
                  />
                  <Text color={'#0D47A1'} size={14} SFmedium>
                    Quantity:{item?.quantity}
                  </Text>
                </View>
              );
            }}
          />
          {formik?.touched?.bidMedicine && formik?.errors?.bidMedicine && (
            <Text style={globalStyles.errors}>
              {formik?.errors?.bidMedicine}
            </Text>
          )}
          {item?.requestSent === false && (
            <TouchableOpacity
              style={styles.touch}
              onPress={formik.handleSubmit}>
              <Text size={12} SFmedium color={'#fff'}>
                Bid
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default BidRequest;

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  touch: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#6ED0F5',
    width: RF(160),
    height: RF(40),
    borderRadius: RF(8),
    marginTop: RF(30),
  },
  checkboxText: {
    fontSize: 14,
  },
});
