import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {
  Wrapper,
  CardComponent,
  CustomLoader,
  EmptyList,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {getDepartment_Doctors, navigate} from '@services';

const HospitalDoctor = ({route}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {data, type, title, id} = route.params;
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [hospitalDoc, setHospitalDoc] = useState<any>();

  useEffect(() => {
    getDepartmentDoc();
  }, []);

  const getDepartmentDoc = () => {
    setLoading(true);
    let params = {
      departmentId: id,
    };
    getDepartment_Doctors(params)
      .then((res: any) => {
        setHospitalDoc(res?.data?.doctors);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        // setRefreshing(false);
      });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={title ? title : data[0]?.name}
          leftIcon
          titleColor={colors.white}
          notify
        />
        <ScrollView>
          <View style={{paddingBottom: RF(80)}}>
            <FlatList
              // scrollEnabled={false}
              contentContainerStyle={styles.containerStyle}
              data={(data && data) || hospitalDoc}
              renderItem={({item}) => {
                return (
                  <>
                    <View style={{flex: 1}}>
                      <CardComponent
                        Size={9}
                        showValues
                        RatingTrue
                        item={item}
                        isVerify
                        name={item?.name}
                        style={styles.card}
                        color={colors.blueText}
                        title2={item?.speciality}
                        title3={
                          item?.qualifications ? item?.qualifications : ''
                        }
                        logo={{
                          uri:
                            item?.doctorImage ||
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                        }}
                        onPress={() =>
                          navigate('UserDoctorDetails', {
                            item: item,
                            type: 'hospital',
                          })
                        }
                      />
                    </View>
                  </>
                );
              }}
              ListEmptyComponent={
                loading ? null : (
                  <View style={{height: 500}}>
                    <EmptyList />
                  </View>
                )
              }
            />
          </View>
        </ScrollView>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default HospitalDoctor;
