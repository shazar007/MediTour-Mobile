import {ImageBackground, View} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF, SCREEN_WIDTH} from '@theme';
import {Grpah, UserBell} from '@assets';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {ScrollView} from 'react-native-gesture-handler';
import useStyles from './styles';
import {navigate} from '@services';

const FilterFileds = () => {
  const [sliderValue, setSliderValue] = useState([2, 10]);
  const theme: any = useTheme();
  const colors = theme.colors;
  // const [selectedFilters, setSelectedFilters] = useState([]);
  // const [data, setData] = useState([
  //   {id: 1, title: 'Parking', isSelected: false},
  //   {id: 2, title: 'Gym', isSelected: false},
  //   {id: 3, title: 'Breakfast', isSelected: false},
  //   {id: 4, title: 'Garden', isSelected: false},
  // ]);
  const styles = useStyles();
  const handleSliderChange = (values: number[]) => {
    setSliderValue(values);
  };

  // const handleSelect = id => {
  //   setData(prevData => {
  //     const newData = prevData.map(item => {
  //       if (item.id === id) {
  //         return {...item, isSelected: !item.isSelected};
  //       }
  //       return item;
  //     });

  //     const selectedItems = newData
  //       .filter(item => item.isSelected)
  //       .map(item => item.title);
  //     setSelectedFilters(selectedItems);
  //     return newData;
  //   });
  // };

  const applyFilters = () => {
    navigate('ItemDetail', {
      lowerPriceLimit: sliderValue[0],
      upperPriceLimit: sliderValue[1],
    });
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#FAF9F6'}}>
        <HeaderCard
          numberOfIcons={'3'}
          twoInRow
          icon3={UserBell}
          title={'Wed, Jan 17 - Thu, Jan 18 '}>
          <UserHeaderContent ScreenTitle={'Set your Filter'} />
        </HeaderCard>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              marginHorizontal: RF(24),
              marginTop: RF(16),
              paddingBottom: RF(80),
            }}>
            <Text size={20} color={'#00276D'} SFsemiBold>
              Your budget (for 1 night)
            </Text>
            <Text
              size={18}
              color={'#00276D'}
              SFregular
              style={{marginTop: RF(8)}}>
              PKR {sliderValue[0]} - PKR {sliderValue[1]} +
            </Text>
            <View style={styles.ViewContainer}>
              <ImageBackground source={Grpah} style={styles.container}>
                <MultiSlider
                  containerStyle={{marginTop: RF(107)}}
                  selectedStyle={{
                    backgroundColor: colors.primary,
                  }}
                  markerStyle={{
                    backgroundColor: colors.primary,
                  }}
                  unselectedStyle={{backgroundColor: colors.blueText}}
                  values={sliderValue}
                  sliderLength={SCREEN_WIDTH - 55}
                  min={1000}
                  max={30000}
                  step={500}
                  onValuesChange={handleSliderChange}
                />
              </ImageBackground>
            </View>
            {/* <View style={{marginTop: RF(12)}}>
              <Text
                size={20}
                SFsemiBold
                color={colors.blueText}
                style={{marginVertical: RF(8)}}>
                Popular Filters
              </Text>
              <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={({item}) => (
                  <ListItem
                    containerStyle={{
                      marginTop: RF(8),
                      backgroundColor: '#FAF9F6',
                      borderBottomWidth: 0.5,
                      borderColor: 'rgba(26, 61, 124, 1)',
                      padding: 0,
                    }}>
                    <ListItem.Content
                      style={{
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <CheckBox
                        checked={item.isSelected}
                        onPress={() => handleSelect(item.id)}
                      />

                      <ListItem.Title style={{color: '#00276D'}}>
                        {item.title}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                )}
                keyExtractor={item => item.id.toString()}
              />
              <AppButton
                title="Show results"
                m_Top={RF(24)}
                onPress={applyFilters}
              />
            </View> */}
            <AppButton
              title="Show results"
              m_Top={RF(24)}
              onPress={applyFilters}
            />
          </View>
        </ScrollView>
      </View>
    </Wrapper>
  );
};

export default FilterFileds;
