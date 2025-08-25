import React, {useEffect, useState} from 'react';
import {RF} from '@theme';
import useStyles from './styles';
import {ScrollView, View} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import {insuranceGetInsuredPersons_Detail} from '@services';
import {CustomHeader, Text, Wrapper} from '@components';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
    };
  }>;
}

const InsuredDetail = (props: Props) => {
  const {item} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    setLoading(true);
    insuranceGetInsuredPersons_Detail(item?._id)
      .then((res: any) => {
        setData(res?.data?.insured);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Insured Detail'}
        leftIcon
        titleColor={'#fff'}
        notify
      />

      <ScrollView style={{backgroundColor: 'red', marginBottom: RF(50)}}>
        <View style={styles.view1}>
          <Text size={18} SFsemiBold color={colors?.bluE}>
            User
          </Text>
          <Text size={14} SFregular style={{marginTop: RF(10)}}>
            {item?.userName}
          </Text>
          <Section title={'MR No:'} colors={colors} value={item?.mrNo} />
          <Section title={'Phone No:'} colors={colors} value={item?.phone} />
          <Section
            colors={colors}
            title={'Loacation:'}
            value={item?.location?.address}
          />
          <Section
            title={'ID Card Number:'}
            colors={colors}
            value={item?.cnic}
          />

          {/* <Section title={'ID Card File:'} colors={colors} /> */}
        </View>

        <View style={styles.view2}>
          <Text size={18} SFsemiBold color={colors?.bluE}>
            Package Details
          </Text>
          <Section1 colors={colors} title={'Package Name:'} value={''} />
          <Section1 colors={colors} title={'Package Description:'} />

          <Section1 colors={colors} title={'Medical Benefits:'} />

          <Section1 colors={colors} title={'Policy Documents:'} />

          <Section1 colors={colors} title={'More Features:'} />

          <Section1 colors={colors} title={'About:'} />
          <Section1 colors={colors} title={'Address:'} />

          <Section1 colors={colors} title={'Per Year:'} />
        </View>
      </ScrollView>
    </Wrapper>
  );
};

const Section1 = ({
  title,
  value,
  colors,
}: {
  title?: any;
  value?: any;
  colors?: any;
}) => {
  return (
    <View style={{marginTop: RF(5)}}>
      <Text size={14} SFmedium color={colors.bluE}>
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

const Section = ({
  title,
  value,
  colors,
}: {
  title?: any;
  value?: any;
  colors?: any;
}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text size={14} SFmedium color={colors.bluE}>
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

export default InsuredDetail;
