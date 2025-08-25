import {Image, StyleSheet, View, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import {departmentsData, navigate, PADDING, rs} from '@services';
import React, {useState} from 'react';
import {RF} from '@theme';
import Text from '../text';
import {mediLogo} from '@assets';

interface Props {
  data?: any;
  selected?: any;
}

const Department = (props: Props) => {
  const {data, selected} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  // const sliceData = data?.slice(0, 3);
  const onPressDep = (item: any) => {
    navigate('HospitalDoctor', {
      id: item?._id,
      title: item?.categoryId?.categoryName,
      type: 'departmentDoc',
    });
  };
  const capitalizeFirstLetter = (string: any) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  return (
    <View>
      <FlatList
        // scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        columnWrapperStyle={styles.FlatListStyle}
        contentContainerStyle={styles.containerStyle}
        data={data}
        ListEmptyComponent={() => <Text>No Department Found</Text>}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                style={styles.container}
                onPress={() => onPressDep(item)}>
                <View style={styles.container2}>
                  <Image source={mediLogo} style={styles.imageStyle} />
                </View>
              </TouchableOpacity>
              <View style={styles.view}>
                <Text size={12} SFmedium color={colors.blueText} center>
                  {item?.departmentName ||
                    capitalizeFirstLetter(item?.categoryId?.categoryName)}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Department;

const styles = StyleSheet.create({
  container: {
    width: RF(90),
    height: RF(90),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F1F1',
    elevation: 1,
    borderRadius: RF(8),
  },
  container2: {
    width: RF(51),
    height: RF(51),
    // backgroundColor: '#13A89E',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: RF(32),
  },
  imageStyle: {width: RF(40), height: RF(40), resizeMode: 'contain'},
  view: {width: RF(90), alignItems: 'center', marginTop: RF(4)},
  DepartmentStyle2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RF(8),
    alignItems: 'center',
  },
  FlatListStyle: {
    // justifyContent: 'space-between',
    gap: rs(17),
    width: '100%',
    marginBottom: RF(8),
  },
  containerStyle: {
    width: '100%',
    padding: PADDING._16,
  },
});
