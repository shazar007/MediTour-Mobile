import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {getSub, navigate, rs} from '@services';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';

const SubCategoryTreatment = ({route}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {item} = route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  //
  useEffect(() => {
    getsubAll();
  }, []);
  const getsubAll = () => {
    setLoading(true);
    let params = {
      categoryId: item?._id,
    };
    getSub(params)
      .then((res: any) => {
        //
        setData(res?.data);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={item?.categoryName}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView>
          <View style={{paddingBottom: RF(80)}}>
            <FlatList
              data={data}
              scrollEnabled={true}
              contentContainerStyle={{padding: rs(16), gap: rs(16)}}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigate('SymptomsAll', {
                      specialityTitle: item?.subCategory,
                      item: item,
                      type: 'All',
                    })
                  }
                  style={{
                    padding: RF(16),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    elevation: 5,
                    borderRadius: RF(8),
                    shadowOffset: {width: 0, height: rs(2)},
                    shadowOpacity: 0.2,
                    shadowRadius: rs(4),
                  }}>
                  <Text>{item?.subCategory}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default SubCategoryTreatment;

const styles = StyleSheet.create({});
