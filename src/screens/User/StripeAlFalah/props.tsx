import {Text} from '@components';
import {View} from 'react-native';

export const DoctorCard = ({
  item,
  type,
  styles,
  selected,
  rate,
}: {
  item?: any;
  type?: any;
  styles?: any;
  selected?: any;
  rate?: any;
}) => {
  const STRIPE = selected === 'International' ? true : false;
  const CURRENCY = selected === 'International' ? '$ ' : 'PKR ';
  const appoitmentAmount = STRIPE ? item?.amount * rate : item?.amount;
  return (
    <View style={styles?.card}>
      {/* Doctor Name Section */}
      <View style={styles?.row}>
        <Text>Doctor Name</Text>
        <Text SFsemiBold color={'#FF842F'}>
          {item?.doctorName}
        </Text>
      </View>
      <View style={styles?.row}>
        <Text>Appointment Type</Text>
        <Text SFsemiBold>{item?.appointmentType}</Text>
      </View>
      <View style={styles?.row}>
        <Text>Amount</Text>
        {/* <Text SFsemiBold>{CURRENCY + appoitmentAmount.toFixed(2)}</Text> */}
      </View>
      <View style={styles?.divider} />
    </View>
  );
};
