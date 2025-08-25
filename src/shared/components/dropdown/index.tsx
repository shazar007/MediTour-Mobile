import {LabCountry, country, stateDropdown} from '@assets';
import {colors} from '@services';
import {RF} from '@theme';
import React, {useState} from 'react';
import Text from '../text';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';

interface Props {
  dropDowndata?: any;
}

const Dropdown = (props: Props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {dropDowndata} = props;

  const data = [
    'Punjab',
    'Sindh',
    'Balochistan',
    'KhyberPakhtoonkhuwa',
    'GilgitBaltistan',
  ];

  const handleDropdownPress = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleItemPress = (item: any) => {
    setSelectedItem(item);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={handleDropdownPress}>
        <Image
          source={stateDropdown}
          style={{width: RF(16), height: RF(16), tintColor: colors.primary}}
        />
        <Text
          size={14}
          color={colors.primary}
          SFmedium
          style={styles.selectedText}>
          {selectedItem || 'State'}
        </Text>
        <Image
          source={LabCountry}
          style={{width: RF(20), height: RF(20), marginRight: RF(8)}}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdownList}>
          {data.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => handleItemPress(item)}>
              <Text size={14} SFlight color={colors.primary}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  dropdownButton: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.primary,
    paddingBottom: RF(6),
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  selectedText: {
    flex: 1,
    marginLeft: RF(16),
    // textAlign: 'center',
  },
  dropdownList: {
    width: 350,
    borderWidth: 0.2,
    borderBottomColor: 'lightgray',
  },
  dropdownItem: {
    padding: 10,

    paddingHorizontal: RF(24),
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default Dropdown;
