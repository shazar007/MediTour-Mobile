import {Text, Wrapper, AppButton, CustomHeader} from '@components';
import {RF} from '@theme';
import React from 'react';
import moment from 'moment';
import useStyles from './styles';
import {ImageBackground, ScrollView, View} from 'react-native';
import {navigate, navigationRef} from '@services';
import {RouteProp, useTheme} from '@react-navigation/native';
import {BidDetails} from '@assets';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      data?: any;
    };
  }>;
}

const TravelAgencyRequestDetail: React.FC<Props> = (props: Props) => {
  const {data} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const formattedDate = moment(data.createdAt).format('MM-DD-YYYY');
  const formattedTime = moment(data.createdAt).format('hh:mm A');
  const handleBack = () => {
    navigationRef.current?.goBack();
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={BidDetails}>
        <View style={{flex: 1}}>
          <CustomHeader
            title={'Requests Details'}
            leftIcon
            titleColor={colors.white}
            notify
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{padding: RF(24), top: RF(105), marginBottom: RF(180)}}>
              <View style={styles.card}>
                <Text size={9} color={'#0E54A3'} style={{marginBottom: RF(4)}}>
                  {formattedDate}
                  <Text size={9} color={'#0E54A3'}>
                    {'    '}
                    {formattedTime}
                  </Text>
                </Text>
                <Section
                  colors={colors}
                  styles={styles}
                  title1={'Name'}
                  title2={'Flight Type'}
                  value1={data?.userId?.name}
                  value2={data?.requestType}
                />
                {data?.flights.map((user: any, index: any) => (
                  <Section
                    key={index}
                    colors={colors}
                    styles={styles}
                    title1={'From'}
                    title2={'To'}
                    value1={user?.from}
                    value2={user?.to}
                    show
                    title3={'Departure'}
                    value3={moment(user?.departure).format('DD/MM/YYYY')}
                  />
                ))}

                <Section
                  colors={colors}
                  styles={styles}
                  title2={'Class'}
                  value2={data?.flightClass}
                  title1={'Traveler'}
                  value1={`adult ${data.adult}, children ${data.children}, infant ${data.infant}`}
                  data={data}
                />
                {data?.requestType === 'round' && (
                  <View>
                    <Text size={14} SFregular color={colors.bluE}>
                      Return
                    </Text>
                    <Text size={14} SFregular color={colors.grey}>
                      {moment(data?.returnFlight).format('DD/MM/YYYY')}
                    </Text>
                  </View>
                )}
              </View>
              <AppButton
                title="Add Bid"
                bgClr={'#0D47A1'}
                m_Top={RF(16)}
                tintColor={colors.background}
                width={RF(220)}
                onPress={() =>
                  navigate('AddTicket', {
                    data: data,
                    flightType: data?.requestType,
                  })
                }
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </Wrapper>
  );
};

const Section: React.FC<{
  styles?: any;
  colors?: any;
  value1?: string;
  value2?: string;
  value3?: string;
  title1?: string;
  title2?: string;
  title3?: string;
  show?: boolean;
  data?: any;
}> = ({
  styles,
  colors,
  value1,
  value2,
  title1,
  title2,
  title3,
  value3,
  show,
}) => {
  return (
    <View>
      <View style={[styles.row, {marginBottom: RF(16)}]}>
        <View style={{width: '33%'}}>
          <Text size={14} SFregular color={colors.bluE}>
            {title1}
          </Text>
          <Text size={14} SFregular color={colors.grey}>
            {value1}
          </Text>
        </View>
        <View style={{width: '33%'}}>
          <Text size={14} SFregular color={colors.bluE}>
            {title2}
          </Text>
          <Text size={14} SFregular color={colors.grey}>
            {value2}
          </Text>
        </View>
        {show && (
          <View style={{width: '33%'}}>
            <Text size={14} SFregular color={colors.bluE}>
              {title3}
            </Text>
            <Text size={14} SFregular color={colors.grey}>
              {value3}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TravelAgencyRequestDetail;
