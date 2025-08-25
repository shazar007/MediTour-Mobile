import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Text} from '@components';
// import {useSelector} from 'react-redux';
import {dropIcon} from '@assets';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';

const DropHotel = ({
  selectedData,
  setSelectedData,
  data,
  name,
}: {
  selectedData?: any;
  setSelectedData?: any;
  data?: any;
  name?: any;
}) => {
  const [clicked, setClicked] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;

  // const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          padding:4,
          position: 'relative',
          borderColor: colors.blueText,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text SFlight color={'#rgba(13, 71, 161, 1)'}>
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
            alignSelf: 'center',
            width: '100%',
            backgroundColor: '#FFF',
          }}>
          <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  padding: RF(10),
                  elevation: 5,
                  backgroundColor:
                    selectedData === item.text
                      ? '#0D47A1'
                      : '#fff',
                }}
                onPress={() => {
                  setSelectedData(item.text);
                  setClicked(!clicked);
                }}>
                <Text
                  SFmedium
                  size={14}
                  color={
                    selectedData === item.text
                      ? '#fff'
                      : '#rgba(13, 71, 161, 1)'
                  }
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

export default DropHotel;
