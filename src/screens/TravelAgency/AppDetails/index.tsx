import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  CustomHeader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import moment from 'moment';
import {RF} from '@theme';
import {Dropdown} from '@assets';
import {get_requestFetch, navigate} from '@services';

interface Flight {
  from: string;
  to: string;
  departure: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  companyLogo: string;
  companyName: string;
  amenities: string[];
}

interface Bid {
  flightDetails: Flight[];
  flightPolicies: {[key: string]: string};
  ticketPrice: number;
}

interface Data {
  _id: string;
  createdAt: string;
  userId: {name: string};
  requestType: string;
  flights: Flight[];
  flightClass: string;
  adult: number;
  children: number;
  infant: number;
  returnFlight?: string;
  status: string;
}

interface AppDetailsProps {
  route: {
    params: {
      data: Data;
    };
  };
}

const AppDetails: React.FC<AppDetailsProps> = ({route}) => {
  const {data} = route.params;
  const theme = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);
  const [details, setDetails] = useState<any>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const formattedDate = moment(data.createdAt).format('DD-MM-YYYY');
  const formattedTime = moment(data.createdAt).format('hh:mm A');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const params = {
      requestId: data?._id,
    };
    try {
      const res = await get_requestFetch(params);
      //
      setDetails(res?.data?.request?.bidIds);
    } catch (err) {}
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Bid Details'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView>
          <View style={{padding: 20, paddingBottom: RF(80)}}>
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
              {data?.flights?.map((user, index) => (
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
                    {moment(data?.returnFlight).format('DD-MM-YYYY')}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.card1}>
              <TouchableOpacity
                onPress={() => toggleSection('flightDetails')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text>Flight Details</Text>
                <Image source={Dropdown} style={styles.drop} />
              </TouchableOpacity>
              {expandedSection === 'flightDetails' && (
                <>
                  <FlatList
                    data={details}
                    scrollEnabled={false}
                    renderItem={({item}: any) => (
                      <>
                        {item?.flightDetails?.length > 0 ? (
                          item?.flightDetails?.map((user: any, index: any) => {
                            return (
                              <View
                                key={index}
                                style={{gap: RF(4), marginTop: RF(8)}}>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Company Logo
                                  </Text>
                                  <Image
                                    source={{uri: user?.companyLogo}}
                                    style={{
                                      width: RF(38),
                                      height: RF(38),
                                      resizeMode: 'contain',
                                      borderRadius: RF(32),
                                    }}
                                  />
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Company Name
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {user?.companyName}
                                  </Text>
                                </View>
                                <Text size={14} SFregular color={'#0E54A3'}>
                                  Direct
                                </Text>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    From
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {user?.from}
                                  </Text>
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    To
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {user?.to}
                                  </Text>
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Departure Date
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {moment(user?.departureDate).format(
                                      'MM-DD-YYYY',
                                    )}
                                  </Text>
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Departure Time
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {moment(user?.departureTime).format(
                                      'hh:mm A',
                                    )}
                                  </Text>
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Arrival Date
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                  {moment(user?.arrivalDate).format(
                                      'MM-DD-YYYY',
                                    )}
                                  </Text>
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Arrival Time
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {moment(user?.arrivalTime).format(
                                      'hh:mm A',
                                    )}
                                  </Text>
                                </View>
                                <Text size={16} SFmedium color={'#0E54A3'}>
                                  Flight Amenities
                                </Text>
                                {user?.amenities?.map(
                                  (amenity: any, index: any) => (
                                    <View key={index} style={styles.section}>
                                      <Text
                                        size={12}
                                        SFregular
                                        color={'#0E54A3'}>
                                        {amenity}
                                      </Text>
                                    </View>
                                  ),
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <Text>No flight details found</Text>
                        )}
                        <Text size={16} SFmedium>
                          Return Flight
                        </Text>
                        {item?.returnFlights?.length > 0 ? (
                          item?.returnFlights?.map((user: any, index: any) => {
                            return (
                              <View
                                key={index}
                                style={{gap: RF(4), marginTop: RF(8)}}>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Company Logo
                                  </Text>
                                  <Image
                                    source={{uri: user?.companyLogo}}
                                    style={{
                                      width: RF(38),
                                      height: RF(38),
                                      resizeMode: 'contain',
                                      borderRadius: RF(32),
                                    }}
                                  />
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Company Name
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {user?.companyName}
                                  </Text>
                                </View>
                                <Text size={14} SFregular color={'#0E54A3'}>
                                  Direct
                                </Text>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    From
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {user?.from}
                                  </Text>
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    To
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {user?.to}
                                  </Text>
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Departure Date
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {moment(user?.departureDate).format(
                                      'DD-MM-YYYY',
                                    )}
                                  </Text>
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Departure Time
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {moment(user?.departureTime).format(
                                      'hh:mm A',
                                    )}
                                  </Text>
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Arrival Date
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {moment(user?.arrivalDate).format(
                                      'MM-DD-YYYY',
                                    )}
                                  </Text>
                                </View>
                                <View style={styles.section}>
                                  <Text size={12} SFlight color={'#7D7D7D'}>
                                    Arrival Time
                                  </Text>
                                  <Text size={14} SFregular color={'#0E54A3'}>
                                    {moment(user?.arrivalTime).format(
                                      'hh:mm A',
                                    )}
                                  </Text>
                                </View>
                                <Text size={16} SFmedium color={'#0E54A3'}>
                                  Flight Amenities
                                </Text>
                                {user?.amenities?.map(
                                  (amenity: any, index: any) => (
                                    <View key={index} style={styles.section}>
                                      <Text
                                        size={12}
                                        SFregular
                                        color={'#0E54A3'}>
                                        {amenity}
                                      </Text>
                                    </View>
                                  ),
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <Text>No flight details found</Text>
                        )}
                        <Text size={16} SFmedium color={'#0E54A3'}>
                          Flight Policies
                        </Text>
                        {Object.entries(item.flightPolicies).map(
                          ([key, value]: any, index) => (
                            <View key={index} style={{gap: RF(4)}}>
                              <Text size={12} SFlight color={'#7D7D7D'}>
                                {key}
                              </Text>
                              <Text size={12} SFregular color={'#0E54A3'}>
                                {value}
                              </Text>
                            </View>
                          ),
                        )}
                        <Text style={styles.totalPrice}>
                          Total Price for Traveler
                        </Text>
                        <Text style={styles.ticketPrice}>
                          Ticket Price: {item.ticketPrice} PKR
                        </Text>
                      </>
                    )}
                  />
                </>
              )}
            </View>
            {data?.status === 'approved' && (
              <AppButton
                title="Add Ticket"
                m_Top={RF(32)}
                onPress={() => navigate('TravelerForm', {details: data})}
              />
            )}
          </View>
        </ScrollView>
      </View>
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
    <>
      <View>
        <View style={[styles.row, {marginBottom: RF(16), gap: RF(8)}]}>
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
            <View style={{width: '30%'}}>
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
    </>
  );
};

export default AppDetails;
