import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {RF} from '@theme';
import CustomCard from './CustomCard';
import TimeInput from './TimeInput';
import CheckBox from '@react-native-community/checkbox';
import CustomCheckbox from './CheckBox';
import AppButton from '../AppButton';

const Aggrement = () => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={{marginHorizontal: RF(18)}}>
      <CustomCard>
        <Text>
          This is contract confirmation form which is filled by seller.
        </Text>
        <TimeInput
          title={'Title'}
          width={'100%'}
          placeholder={'Mobile UI Design'}
        />
        <TimeInput
          title="Brief"
          width={'100%'}
          placeholder="Buyer says 2 screens of mobile app 
onboarding screens...logo will be provided cheme also... I will give thce figma file...Thank you"
        />
        <View style={styles.rowStyle}>
          <TimeInput title={'Delivery Time'} placeholder={'38$'} />
          <TimeInput title={'No Of Revisions'} placeholder={'5'} />
        </View>
        <TimeInput
          title={'No of Days to Deliver'}
          width={'100%'}
          placeholder={'6'}
        />
        <TimeInput
          title={'Extra Charges for Extra Revision'}
          width={'100%'}
          placeholder={'32$'}
        />
        <View style={{marginTop: RF(8)}}>
          <CustomCheckbox value={isSelected} onValueChange={setSelection} />
        </View>
        <AppButton title="send offer" m_Top={RF(16)} />
      </CustomCard>
    </View>
  );
};

export default Aggrement;

const styles = StyleSheet.create({
  rowStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    backgroundColor: 'red',
  },
});
