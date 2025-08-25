import {StyleSheet, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {HeaderCard, Search, Text, Wrapper} from '@components';
import {backIcon} from '@assets';
import {airportLocationsearchdata, margin} from '@services';
import {RF} from '@theme';
import {useDispatch, useSelector} from 'react-redux';
import {setHotelValue} from '@redux';
const SearchScreenTravelAgency = ({navigation, route}: any) => {
  const [toggle, setToggle] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const {data} = route.params;
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const handlePress = (item: any) => {
    dispatch(setHotelValue(item));
    navigation.goBack();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#Fff'}}>
        <HeaderCard navigation={navigation} icon1={backIcon}>
          <View style={margin.top_24}>
            <Search
              placeHolder={'Search here...'}
              radius={24}
              onChangeText={(V: any) => setValue(V)}
            />
          </View>
        </HeaderCard>
        {airportLocationsearchdata.map((item, index) => (
          <Pressable
            onPress={() => handlePress(item.city)}
            key={index}
            style={styles.container}>
            <Text size={16} SFmedium color={colors.primary}>
              {item.airport_name}
            </Text>
            <Text size={12} SFregular color={'#080C2FA6'}>
              {item.city}
            </Text>
          </Pressable>
        ))}
      </View>
    </Wrapper>
  );
};

export default SearchScreenTravelAgency;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    elevation: 2,
    padding: RF(16),
    borderRadius: RF(16),
    marginTop: RF(16),
    marginHorizontal: RF(16),
  },
});
