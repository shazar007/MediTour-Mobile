import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Text} from '@components';
import {useSelector} from 'react-redux';
import {dropIcon} from '@assets';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';

const ratingData = [
  {id: 1, text: '1'},
  {id: 2, text: '2'},
  {id: 3, text: '3'},
  {id: 4, text: '4'},
  {id: 5, text: '5'},
];
const StarRating = ({
  selectedData,
  setSelectedData,
  name,
  top,
}: {
  selectedData?: any;
  setSelectedData?: any;
  name?: any;
  top?: any;
}) => {
  const [clicked, setClicked] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;

  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 0.5,
          position: 'relative',
          padding: RF(10),
          borderColor: colors.blueText,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text size={12} SFregular color={colors.blueText}>
          {selectedData === '' ? name : selectedData}
        </Text>
        <Image
          source={dropIcon}
          tintColor={colors.blueText}
          style={{
            width: RF(24),
            height: RF(24),
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            top: top,
            backgroundColor: '#FFF',
          }}>
          <FlatList
            scrollEnabled={false}
            data={ratingData}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  padding: RF(10),
                  backgroundColor:
                    selectedData === item.text ? changeColor : '#fff',
                }}
                onPress={() => {
                  setSelectedData(item.text);
                  setClicked(!clicked);
                }}>
                <Text
                  SFmedium
                  size={14}
                  color={selectedData === item.text ? '#fff' : colors.blueText}
                  style={{marginHorizontal: 10}}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </>
  );
};

export default StarRating;
