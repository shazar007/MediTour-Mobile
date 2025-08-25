import {Text} from '@components';
import useStyles from './styles';
import {dropIcon} from '@assets';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {FlatList, Image, TouchableOpacity} from 'react-native';

interface Props {
  FormName?: any;
  FormData?: any;
  onSelect?: any;
}
const Form = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {FormName, FormData, onSelect} = props;
  const [clicked, setClicked] = useState(false);
  const [selectedData, setSelectedData] = useState('');
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const handleAgeSelection = (selectedAge?: any, item?: any) => {
    onSelect(selectedAge, item);
  };
  //

  return (
    <>
      <TouchableOpacity
        style={styles.AgeDropDownStyle}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text size={12} SFregular color={colors.blueText}>
          {selectedData === '' ? FormName : selectedData}
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
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.TouchableStyle,
                {
                  backgroundColor:
                    selectedData === item.text ||
                    selectedData === `${item?.startLimit}k - ${item?.endLimit}k`
                      ? changeColor
                      : '#fff',
                },
              ]}
              onPress={() => {
                setSelectedData(
                  item.text || `${item?.startLimit}k - ${item?.endLimit}k`,
                );
                setClicked(!clicked);
                handleAgeSelection(
                  item.text || `${item?.startLimit}k - ${item?.endLimit}k`,
                );
              }}>
              <Text
                SFmedium
                size={14}
                color={
                  selectedData === item.text ||
                  selectedData === `${item?.startLimit}k - ${item?.endLimit}k`
                    ? '#fff'
                    : colors.blueText
                }
                style={{marginHorizontal: 10}}>
                {item.text || `${item?.startLimit}k - ${item?.endLimit}k`}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : null}
    </>
  );
};

export default Form;
