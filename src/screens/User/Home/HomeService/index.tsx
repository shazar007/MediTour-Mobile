import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Card, CustomHeader, CustomIcon, Text, Wrapper} from '@components';
import {RF} from '@theme';
import {setChangeColor} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {GAP, HomeService_data, navigate, PADDING, rs, rv} from '@services';

const UserHomeService = ({navigation}: any) => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const theme: any = useTheme();
  const colors = theme.colors;
  const {user} = useSelector((state: any) => state.root.user);
  const toggleSearch = () => {
    setToggle(true);
  };
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setChangeColor('#E5A200'));
    }, []),
  );

  const handleHomeServices = (
    screenName: string,
    type?: string,
    title?: string,
    color?: string,
  ) => {
    dispatch(setChangeColor(color));
    navigate(screenName, {
      type: type,
      specialityTitle: title,
    });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={'Home Services'}
          leftIcon
          titleColor={colors.white}
          notify
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.Container}>
            {/* <HomeSections /> */}
            <FlatList
              data={HomeService_data}
              scrollEnabled={false}
              contentContainerStyle={{padding: PADDING._16, gap: GAP._16}}
              renderItem={({item}: any) => (
                <Card
                  height={RF(120)}
                  color={item.color}
                  screen={() => {
                    if (item?.title === 'Ambulance') {
                      handleHomeServices(
                        'EmergencyScreen',
                        '',
                        item.title,
                        item.color,
                      );
                    } else if (item?.title === 'Nurses') {
                      navigate('ParamedicRequest');
                    } else {
                      handleHomeServices(
                        'UserDoctor',
                        'homeServices',
                        item.title,
                        item.color,
                      );
                    }
                  }}>
                  <CustomIcon source={item.icon} tintColor={'#00276D'} />
                  <View style={styles.innerRow}>
                    <Text
                      size={16}
                      style={{fontWeight: '700', marginBottom: rv(10)}}
                      color={'#fff'}>
                      {item.title}
                    </Text>
                    <Text size={rs(10)} SFregular color={'#fff'}>
                      {item.title2}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.image1,
                      {
                        bottom: item?.title === 'Paramedic' ? rv(-11) : 0,
                      },
                    ]}>
                    <Image
                      style={styles.cardImage}
                      source={item.img}
                      resizeMode={'contain'}
                    />
                  </View>
                </Card>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </Wrapper>
  );
};

export default UserHomeService;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: '#FAF9F6'},

  Container: {
    paddingBottom: RF(80),
    width: '100%',
  },

  cardImage: {
    height: '100%',
    width: '100%',
  },
  innerRow: {
    marginLeft: 8,
  },
  image1: {
    flexGrow: 1,
    // marginLeft: RF(16),
  },
  marginTop: {marginTop: RF(4), marginLeft: -2},
});
