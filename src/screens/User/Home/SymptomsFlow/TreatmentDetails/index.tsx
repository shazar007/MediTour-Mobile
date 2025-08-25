import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  CardComponent,
  CustomHeader,
  CustomLoader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {
  add_Appointment_Doctors,
  globalStyles,
  navigate,
  showToast,
} from '@services';

const TreatmentDetails = ({route}: any) => {
  const {specialityTitle, item} = route.params;
  //
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const [loading, setLoading] = useState(false);
  // const trueValuesKeys = Object?.entries(item?.treatment)
  //   .filter(([key, value]) => value === true)
  //   .map(([key]) => key);
  const addTreatment = () => {
    setLoading(true);

    let params = {
      appointmentType: 'clinic',
      amount: item?.totalAmount,
      isTreatment: true,
      treatmentId: item?.treatmentId,
    };
    let id: any = item?.doctorId?._id;
    add_Appointment_Doctors(params, id)
      .then((res: any) => {
        //
        showToast('Success', 'Successfully Shared', true);
        navigate('UserHome');
      })
      .catch((err: any) => {
        showToast('Error', 'Error', false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={specialityTitle}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <View style={{margin: RF(16)}}>
          <CardComponent
            Size={9}
            showValues
            RatingTrue
            item={item}
            rate={item?.doctorId?.averageRating}
            isVerify
            name={item?.doctorId?.name}
            style={styles.card}
            color={colors.blueText}
            title2={item?.doctorId?.speciality?.join(' ')}
            title3={item?.doctorId?.qualifications}
            logo={{
              uri:
                item?.doctorId?.doctorImage ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
            }}
          />
          <View style={styles.mainView}>
            <View style={{marginVertical: RF(4), gap: RF(4)}}>
              <Text size={14} SFmedium color={colors.primary}>
                Package Includes:
              </Text>
              {/* {trueValuesKeys.map(key => (
                <Text key={key} size={10} SFregular color={colors.primary}>
                  {key}
                </Text>
              ))} */}
              {item?.treatment?.other ? (
                <Text size={10} SFregular color={colors.primary}>
                  {item?.treatment?.other}
                </Text>
              ) : null}
            </View>
            <Text size={14} SFmedium color={colors.primary}>
              Total Cost:
            </Text>
            <Text size={10} SFregular color={colors.primary}>
              {item?.totalAmount}/-
            </Text>
          </View>
        </View>
      </View>
      <View style={globalStyles.absoluteBtn}>
        <AppButton
          size={14}
          height={40}
          width={'80%'}
          onPress={() => addTreatment()}
          title={'Request Appointment'}
        />
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default TreatmentDetails;

const styles = StyleSheet.create({
  card: {justifyContent: 'center'},
  touchView: {
    padding: RF(8),
    backgroundColor: '#0D47A1',
    position: 'absolute',
    borderRadius: RF(8),
    bottom: RF(16),
    right: RF(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    width: '100%',
  },
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
    width: '90%',
    padding: RF(12),
    borderRadius: RF(8),
  },
  categoryStyle: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderBottomLeftRadius: RF(8),
    borderBottomRightRadius: RF(8),
    overflow: 'hidden',
    top: -8,
  },
  positionStyle: {
    position: 'absolute',
    zIndex: 10,
    top: RF(40),
    width: '100%',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderBottomLeftRadius: RF(8),
    borderBottomRightRadius: RF(8),
    overflow: 'hidden',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 12,
    color: '#0D47A1',
    fontWeight: '400',
  },
  TouchableStyle: {
    width: '100%',
    padding: RF(4),
    zIndex: 10,
  },
  ContainerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#fff',
    padding: RF(4),
    marginHorizontal: RF(10),
    borderRadius: RF(8),
    marginTop: RF(4),
    marginBottom: RF(8),
  },
  img: {
    height: RF(16),
    width: RF(16),
    marginRight: RF(20),
    resizeMode: 'contain',
  },
  AgeDropDownStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    // paddingBottom: RF(10),
    padding: RF(8),
    borderColor: '#00276D',
    width: '100%',
    marginBottom: RF(8),
  },
  dropDownImage: {
    width: RF(20),
    height: RF(20),
    resizeMode: 'contain',
  },
  ImageStyles: {width: RF(16), height: RF(16), resizeMode: 'contain'},
  input: {
    backgroundColor: '#FFF',
    width: '80%',
    paddingVertical: 1,
    marginLeft: 8,
    color: '#080C2F',
  },
  imgView: {width: RF(16), height: RF(16), resizeMode: 'contain'},
  gapView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(16),
  },
  treatmentStyle: {
    marginHorizontal: RF(20),
    marginTop: RF(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainView: {
    marginHorizontal: RF(20),
    marginVertical: RF(8),
    backgroundColor: '#fff',
    elevation: 5,
    padding: RF(8),
    borderRadius: RF(16),
    borderLeftWidth: RF(1),
  },
});
