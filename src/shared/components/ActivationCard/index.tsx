import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivationRates, navigate, rv} from '@services';
import AppButton from '../AppButton';
import {useDispatch, useSelector} from 'react-redux';
import {setAmount} from '@redux';

const ActivationCard = () => {
  const {user, exchangeRate} = useSelector((state: any) => state.root.user);
  const {changeStack} = useSelector((state: any) => state.root.shiftStack);
  const [activationCharges, setActivationCharges] = useState([]);
  console.log('🚀 ~ activationCharges........... :', changeStack);
  const dispatch = useDispatch();

  useEffect(() => {
    ActivationRates().then((res: any) => {
      res?.data?.countryWiseCharges?.map((country: any) =>
        user?.isNational === true
          ? setActivationCharges(country?.nationalRates)
          : setActivationCharges(country?.internationalRates),
      );
      return;
    });
  }, []);

  const checkStack =
    changeStack === 'Doctors' ||
    changeStack === 'Physiotherapist' ||
    changeStack === 'Nutritionist' ||
    changeStack === 'Psychologist'
      ? 'Doctor'
      : changeStack === 'Hotels'
      ? 'Hotel'
      : changeStack;

  const getRateForVendorType = () => {
    const filteredItem: any = activationCharges.filter(
      (item: any) => item.vendorType === checkStack,
    );
    return filteredItem.length > 0 ? filteredItem[0].rate : null;
  };

  const rate = getRateForVendorType();

  const activation: any = user?.activationRequest;

  // const activateAmount = {
  //   doctors: 50,
  //   others: 100,
  // };

  // const renderAmount =
  //   changeStack === 'Doctors' ||
  //   changeStack === 'Physiotherapist' ||
  //   changeStack === 'Nutritionist' ||
  //   changeStack === 'Psychologist' ||
  //   changeStack === 'Paramedic staff'
  //     ? activateAmount?.doctors
  //     : activateAmount?.others;

  const USDtoPKR = rate / exchangeRate;
  const PKRtoUSD = USDtoPKR * exchangeRate;

  const handlePress = () => {
    dispatch(setAmount(USDtoPKR));
    navigate('StripeAlFalah', {
      type: 'activation',
      actualAmount: USDtoPKR,
    });
  };

  const backgroundColor = activation == 'pending' ? 'red' : 'green';

  return (
    <View
      style={[styles.activationContent, {backgroundColor: backgroundColor}]}>
      {activation == 'pending' ? (
        <>
          <Text style={styles.heading}>Activate Your Account!</Text>
          <Text style={styles.paragraph}>
            Your services are currently not visible to users. Please activate
            your account first.
          </Text>
          <View style={styles.flexContainer}>
            <Text style={styles.smallText}>Account activation fee is </Text>
            <Text style={styles.amountText}>
              $ {PKRtoUSD?.toFixed()}
              {''}
            </Text>
            <AppButton
              width={'30%'}
              height={25}
              onPress={handlePress}
              title="Pay Now"
            />
          </View>
        </>
      ) : (
        <AcceptedActivation />
      )}
    </View>
  );
};

const AcceptedActivation = () => {
  return (
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>
        <View style={styles.customCircle}>
          <Text style={styles.checkIcon}>✔</Text>
        </View>
      </View>
      <Text style={[styles.paragraph, {width: '80%'}]}>
        Thank you for your payment! Your account will be activated within the
        next hour.
      </Text>
    </View>
  );
};

export default ActivationCard;

const styles = StyleSheet.create({
  activationContent: {
    padding: rv(16),
    paddingBottom: rv(6),
    width: '100%',
    paddingTop: rv(30),
    position: 'absolute',
    backgroundColor: '#FF8488',
    borderRadius: 10,
    elevation: 3, // for shadow (Android)
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  paragraph: {
    fontSize: 12,
    color: '#fff',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 13,
    color: '#fff',
  },
  amountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
  },
  payButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  card: {
    width: '100%',
    position: 'absolute',
    borderRadius: 8, // Equivalent to borderRadius: 2 in Material-UI
    backgroundColor: 'green', // White background for the card
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: {width: 0, height: 4}, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 8, // Shadow radius for iOS
    elevation: 4, // Android shadow
    marginBottom: 16, // Margin between cards (optional)
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, // Padding inside the card
  },
  iconContainer: {
    marginRight: 10, // Space between icon and text
  },
  text: {
    fontSize: 16, // Equivalent to variant="h6"
    color: '#000', // Text color (default text.primary)
  },

  customCircle: {
    width: 40, // Diameter of the circle
    height: 40, // Diameter of the circle
    borderRadius: 20, // To make it circular
    backgroundColor: '#34C759', // Green background color
    justifyContent: 'center',
    alignItems: 'center', // Center the check mark inside the circle
  },
  checkIcon: {
    fontSize: 24, // Size of the check mark
    color: '#fff', // White color for the check mark
  },
});
