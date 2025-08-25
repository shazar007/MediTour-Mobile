import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RF, SCREEN_WIDTH} from '@theme';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {CompanyData, getInsuranceCompany, navigate, rs, rv} from '@services';
import {CustomHeader, CustomLoader, Text, Wrapper} from '@components';

const UserInsurance = ({navigation}: any) => {
  const styles = useStyles();
  const {width} = Dimensions.get('window');
  const theme: any = useTheme();
  const colors = theme.colors;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const handlePress = (downText: any) => {
    navigate('InsurancePlain', {downText});
  };
  useEffect(() => {
    getInsurance();
  }, []);
  const getInsurance = () => {
    setLoading(true);
    getInsuranceCompany()
      .then((res: any) => {
        setData(res?.data?.insuranceCompanies);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={'Insurance'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <View style={styles.subContainer}>
          <Text
            size={16}
            color={colors.blueText}
            style={{marginTop: rs(4), fontWeight: '600'}}>
            Packages & Plans
          </Text>

          <Text
            size={10}
            color={colors.blueText}
            style={{fontWeight: '400', marginBottom: rv(4)}}>
            Get your desired insurance plan for you and your family today!
          </Text>

          <View style={styles.ButtonContainer}>
            {CompanyData.map(item => (
              <View key={item?.id} style={styles.coulmnView}>
                <TouchableOpacity
                  style={[styles.cardView, {borderColor: changeColor}]}
                  onPress={() => handlePress(item?.downText)}>
                  <View style={styles.ImageView}>
                    <Image
                      source={item?.img}
                      style={{
                        width: RF(30),
                        height: RF(30),
                        tintColor: changeColor,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <Text size={12} SFregular color={colors.blueText}>
                  {item?.downText}
                </Text>
              </View>
            ))}
          </View>

          <Text
            size={16}
            SFmedium
            color={colors.blueText}
            style={{marginTop: rs(32), fontWeight: '600'}}>
            Insurance Companies
          </Text>
          <Text
            size={10}
            color={colors.blueText}
            style={{fontWeight: '400', marginBottom: rv(4)}}>
            Our partners to provide you best services at you door!
          </Text>

          <View style={{flex: 1, marginTop: rv(8)}}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 5,
                gap: 8,
                paddingBottom: 100,
              }}
              renderItem={({item}: any) => (
                // <View style={styles.container}>
                <View style={styles.card}>
                  <View style={styles.imageView}>
                    <Image source={{uri: item?.logo}} style={styles.img} />
                  </View>
                  <View style={{width: '100%'}}>
                    <Text size={14} color={colors.text} style={styles.text}>
                      {item.name}
                    </Text>
                    <Text
                      size={10}
                      color={colors.text}
                      style={{
                        fontWeight: '400',
                        width: '70%',
                      }}>
                      {item?.location?.address}, {item?.location?.city}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default UserInsurance;
