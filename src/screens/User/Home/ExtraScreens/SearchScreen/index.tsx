import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  CardComponent,
  EmptyList,
  HeaderCard,
  Search,
  Wrapper,
} from '@components';
import {backIcon} from '@assets';
import {margin} from '@services';
import {RF} from '@theme';
import {useDispatch, useSelector} from 'react-redux';
import {setHotelValue} from '@redux';

const SearchScreen = ({navigation, route}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {data} = route.params;
  const [value, setValue] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const dispatch = useDispatch();
  const handlePress = (item: any) => {
    dispatch(setHotelValue(item));
    navigation.goBack();
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#FAF9F6'}}>
        <HeaderCard navigation={navigation} icon1={backIcon}>
          <View style={margin.top_24}>
            <Search
              placeHolder={'Search here...'}
              radius={24}
              onChangeText={(V: any) => setValue(V)}
            />
          </View>
        </HeaderCard>
        <View style={[margin.Horizontal_24, {marginTop: RF(20)}]}>
          <FlatList
            scrollEnabled={false}
            data={!value ? data : null}
            refreshControl={
              <RefreshControl
                enabled={true}
                colors={[changeColor, changeColor]}
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            ListEmptyComponent={<EmptyList description={'No data found'} />}
            renderItem={({item, index}) => (
              <CardComponent
                onPress={() => handlePress(item.header)}
                showValues
                noRating
                name={item.header}
                logo={item.source}
                title2={item.Dis}
                title3={item.Values}
                color={colors.blueText}
                item={item}
                Size={9}
                style={{marginTop: RF(8), width: '70%'}}
              />
            )}
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
