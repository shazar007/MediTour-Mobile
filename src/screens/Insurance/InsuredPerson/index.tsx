import {RF} from '@theme';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import {navigate, insuranceGetInsuredPersons} from '@services';
import {Text, Wrapper, CustomLoader, CustomHeader} from '@components';
import moment from 'moment';

const InsuredPerson = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    setLoading(true);
    insuranceGetInsuredPersons(1)
      .then((res: any) => {
        setData(res.data.insurances);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const Detail = (item: any) => {
    navigate('InsuredDetail', {item: item});
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchDetails();

      setRefreshing(false);
    }, 100);
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Insured List'}
        leftIcon
        titleColor={'#fff'}
        notify
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }>
        <View style={{paddingHorizontal: RF(16), marginVertical: RF(16)}}>
          {data?.map((item: any, index: any) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.DesignCard}
                // onPress={() => Detail(item)}
              >
                <Section
                  colors={colors}
                  value={item?.userId?.name}
                  title={'Insured Person:'}
                />
                <Section
                  colors={colors}
                  value={item?.insuranceId?.packageName}
                  title={'Packages:'}
                />
                <Section
                  colors={colors}
                  value={item?.insuranceId?.perYear}
                  title={'Duration:'}
                />
                <Section
                  colors={colors}
                  value={item?.paidByUserAmount}
                  title={'Insurance Amount:'}
                />

                <Section
                  colors={colors}
                  title={'Date:'}
                  value={moment(item?.createdAt).format('DD/MM/YYYY')}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

const Section = ({
  colors,
  title,
  value,
}: {
  colors?: any;
  title?: any;
  value?: any;
}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text size={14} SFmedium color={colors.primary}>
        {title}
      </Text>
      <Text
        size={14}
        SFregular
        color={colors.primary}
        style={{marginLeft: RF(5)}}>
        {value}
      </Text>
    </View>
  );
};
export default InsuredPerson;
