import useStyles from './styles';
import {FlatList, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RouteProp, useTheme} from '@react-navigation/native';
import {CardList, CustomHeader, CustomLoader, DotCard, Text} from '@components';
import {Wrapper} from '@components';
import {calculateAge, hospitalgetPatientDetails, navigate} from '@services';
import {RF} from '@theme';
import moment from 'moment';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      data?: any;
    };
  }>;
}

const Hospital_Patient_History_Detail = (props: Props) => {
  const {data} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState<any>(false);
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const age = calculateAge(data?.dateOfBirth);

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = () => {
    setLoading(true);

    let patientId: any = data?._id;
    hospitalgetPatientDetails(patientId)
      .then((res: any) => {
        setList(res?.data?.Appointments);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const onOpen = (item: any) => {
    navigate('Hosp_Prescription_Detail', {data: item, detail: data});
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{backgroundColor: '#F5F5F5', flex: 1}}>
        <CustomHeader
          title={'Hi ' + B2B?.hospital?.name}
          leftIcon
          titleColor={colors.white}
          notify
        />

        {/* <HeaderCard
          icon1={backIcon}
          numberOfIcons={'2'}
          onPress={openDrawer}
          clr={colors?.bluE}
          icon1Clr={colors?.bluE}
          tintColor={colors.primary}
          cardColor={colors.Hospital}
          title={'Hi ' + B2B?.hospital?.name}
          notify
          navigation={navigation}
          NotColor={colors.bluE}>
          <UserHeaderContent
            tintColor={colors.primary}
            ColorScreenTitle={colors.bluE}
            ScreenTitle={'Patient History Details'}
          />
        </HeaderCard> */}
        <ScrollView>
          <View style={{paddingBottom: RF(129)}}>
            <DotCard
              title1={data?.name}
              title2={data?.email}
              src={data?.userImage}
              title3={data?.mrNo}
              title4={data?.gender}
              title5={age}
              title6={data?.phone}
              _title3={'MR No.'}
              _title4={'Gender'}
              _title5={'Age'}
              _title6={'Cell No.'}
            />

            <View style={{paddingBottom: 110}}>
              <Text size={16} SFmedium style={styles.txt} color={colors?.bluE}>
                Appointment History Details
              </Text>
              <View style={styles.list}>
                <FlatList
                  data={list}
                  keyExtractor={(item: any) => item._id}
                  renderItem={({item, index}: any) => (
                    <CardList
                      presc
                      onOpen={() => onOpen(item)}
                      title={item?.doctorId?.name}
                      title3={item?.appointmentType}
                      label={item?.doctorId?.speciality}
                      title2={moment(item?.doctorId?.updatedAt).format(
                        'DD/MM/YY',
                      )}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default Hospital_Patient_History_Detail;
