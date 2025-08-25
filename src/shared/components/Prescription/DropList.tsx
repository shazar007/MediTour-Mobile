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
  formik: any;
  stateField: any;
  top?: any;
  custom?: any;
  onPress?: any;
}
const DropList = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {FormName, FormData, formik, stateField, Name, top, onPress, custom} =
    props;
  const [clicked, setClicked] = useState(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const handleSelect = (text: any) => {
    stateField(text);
    setClicked(!clicked);
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text size={14} SFmedium color={'#0D47A1'}>
          {Name}
        </Text>
        {custom && (
          <TouchableOpacity onPress={onPress}>
            <Text size={10} SFlight color={'red'}>
              Custom
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.AgeDropDownStyle}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text size={12} SFregular color={colors.blueText}>
          {formik === '' ? FormName : formik}
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
            position: 'absolute',
            zIndex: 10,
            top: top,
            width: '100%',
            backgroundColor: 'white',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.TouchableStyle,
                {
                  backgroundColor: formik === item.text ? '#00276D' : '#fff',
                },
              ]}
              onPress={() => handleSelect(item.text)}>
              <Text
                SFmedium
                size={14}
                color={formik === item.text ? '#fff' : colors.blueText}
                style={{marginHorizontal: 10}}>
                {item.text}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  AgeDropDownStyle: {
    flexDirection: 'row',
    marginVertical: RF(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingBottom: RF(10),
    borderColor: '#00276D',
    width: '100%',
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
export default DropList;
