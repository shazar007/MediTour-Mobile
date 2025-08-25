import {Text} from '@components';
import {dropIcon} from '@assets';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RF} from '@theme';

interface Props {
  FormName?: any;
  Name?: any;
  FormData?: any;
  selected: any;
  stateField: any;
  top?: any;
  custom?: any;
  onPress?: any;
}
const CustomDropList = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {FormName, FormData, selected, stateField} = props;
  const [clicked, setClicked] = useState(false);

  const handleSelect = (text: any) => {
    stateField(text);
    setClicked(!clicked);
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: RF(8),
        marginTop: RF(8),
        elevation: 5,
        overflow: 'hidden',
      }}>
      <TouchableOpacity
        style={styles.AgeDropDownStyle}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text size={12} SFregular color={colors.blueText}>
          {selected === '' ? FormName : selected}
        </Text>
        <Image
          source={dropIcon}
          tintColor={colors.blueText}
          style={styles.dropDownImage}
        />
      </TouchableOpacity>

      {clicked ? (
        <FlatList
          data={FormData}
          scrollEnabled={false}
          style={{
            width: '100%',
            backgroundColor: 'white',
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.TouchableStyle,
                {
                  backgroundColor: selected === item.title ? '#00276D' : '#fff',
                },
              ]}
              onPress={() => handleSelect(item.title)}>
              <Text
                SFmedium
                size={14}
                color={selected === item.title ? '#fff' : colors.blueText}
                style={{marginHorizontal: 10}}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  AgeDropDownStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: RF(8),
    alignItems: 'center',
    paddingBottom: RF(10),
    borderColor: '#00276D',
    borderBottomWidth: 0.5,
  },
  TouchableStyle: {
    width: '100%',
    padding: RF(4),
    zIndex: 10,
  },
  dropDownImage: {
    width: RF(20),
    height: RF(20),
    resizeMode: 'contain',
  },
});
export default CustomDropList;
