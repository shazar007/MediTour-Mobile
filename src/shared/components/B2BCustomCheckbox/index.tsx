import {CheckTrue, checkboxicon} from '@assets';
import {RF} from '@theme';
import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
const B2BCustomCheckbox = ({label, checked, onChange}: any) => {
  const [isChecked, setIsChecked] = useState(checked);
  const handleToggle = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked, label);
  };
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={handleToggle}>
      <View style={styles.checkboxContent}>
        {/* Your icon component here */}
        <Image source={checkboxicon} style={styles.icon} />

        {/* Checkbox text */}
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.checkedIndicator} />
      {/* Checked state indicator */}
      {isChecked && <Image source={CheckTrue} style={styles.checkedIcon} />}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: RF(8),
    paddingHorizontal: RF(8),
    borderBottomWidth: 1,
    borderBottomColor: '#00276D',
  },
  checkboxContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: RF(32),
    height: RF(32),
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    color: '#00276D',
    fontWeight: '400',
  },
  checkedIndicator: {
    marginLeft: 'auto',
    width: RF(20),
    height: RF(20),
    borderRadius: RF(12),
    borderWidth: 1,
    borderColor: 'red',
  },
  checkedIcon: {
    width: 20,
    height: 20,
  },
});
export default B2BCustomCheckbox;
