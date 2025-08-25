import useStyles from './styles';
import {backIcon, LabMenu} from '@assets';
import {FlatList, RefreshControl, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RouteProp, useTheme} from '@react-navigation/native';
import {CardList, CustomHeader, CustomLoader, DotCard, Text} from '@components';
import {Wrapper} from '@components';
import {pshychologistPatientDetails, navigate} from '@services';
import moment from 'moment';
import {getColorCode, RF} from '@theme';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      data?: any;
    };
  }>;
}

const DOC_HistoryDetails = (props: Props, navigation: any) => {
  const {data} = props.route?.params;
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);
  const {colorCode, historyDetail} = getColorCode();
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState<any>(false);
  const {B2B} = useSelector((state: any) => state.root.b2b);
  function calculateAge(dateOfBirthString: string) {
    if (!dateOfBirthString) return 'Date of birth not provided';
    const [day, month, year] = dateOfBirthString.split('/').map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }
  const age = calculateAge(data?.dateOfBirth);

  useEffect(() => {
    fetchAllPatients();
  }, [data?._id]);
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchAllPatients();
      setRefreshing(false);
    }, 100);
  };
  const fetchAllPatients = () => {
    setLoading(true);

    let patientId: any = data?._id;
    pshychologistPatientDetails(historyDetail, patientId)
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
          title={'Patient History'}
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }>
          <View style={{paddingBottom: RF(80)}}>
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

            <Text size={16} SFmedium style={styles.txt} color={colors?.bluE}>
              Appointment History Details
            </Text>
            <FlatList
              data={list}
              scrollEnabled={false}
              renderItem={({item}: any) => {
                return (
                  <CardList
                    presc
                    showValue
                    item={item}
                    onOpen={() => onOpen(item)}
                    title={item?.doctorId?.name}
                    title3={item?.appointmentType}
                    label={item?.doctorId?.speciality.join(' ')}
                    title2={`${moment(item?.appointmentDateAndTime).format(
                      'DD/MM/YY',
                    )} ${moment(item?.appointmentDateAndTime).format(
                      'hh:mm A',
                    )}`}
                  />
                );
              }}
            />
          </View>
        </ScrollView>
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default DOC_HistoryDetails;
