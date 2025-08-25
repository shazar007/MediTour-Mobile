import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../text';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
interface Props {
  FormName?: any;
  FormData?: any;
  from?: any;
  to?: any;
  onPressData?: any;
  selectData?: any;
}
const SelectLocation = (props: Props) => {
  const {FormName, FormData, from, to, onPressData, selectData} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  // const [selectData, setSelectData] = useState('');

  const [clicked, setClicked] = useState(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const onPressSelection = (fromValue: any, toValue: any) => {
    if (from) {
      onPressData(fromValue);
    } else if (to) {
      onPressData(toValue);
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.AgeDropDownStyle}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text size={12} SFregular color={colors.blueText}>
          {selectData || FormName}
        </Text>
      </TouchableOpacity>
      {clicked ? (
        <FlatList
          scrollEnabled={false}
          data={FormData}
          renderItem={({item}: any) => {
            return (
              <TouchableOpacity
                style={[
                  styles.TouchableStyle,
                  {
                    backgroundColor:
                      (from && selectData === item.from) ||
                      (to && selectData === item.to)
                        ? changeColor
                        : '#fff',
                  },
                ]}
                onPress={() => {
                  onPressSelection(item.from, item.to);
                  setClicked(!clicked);
                }}>
                {from && (
                  <Text
                    SFmedium
                    size={14}
                    color={selectData === item.from ? '#fff' : changeColor}
                    style={{marginHorizontal: 10}}>
                    {item.from}
                  </Text>
                )}
                {to && (
                  <Text
                    SFmedium
                    size={14}
                    color={selectData === item.to ? '#fff' : changeColor}
                    style={{marginHorizontal: 10}}>
                    {item.to}
                  </Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      ) : null}
    </View>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  AgeDropDownStyle: {
    flexDirection: 'row',
    marginVertical: RF(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    position: 'relative',
    padding: RF(10),
    borderColor: '#396DB2',
  },
  TouchableStyle: {
    width: '100%',
    padding: RF(10),
  },
});
