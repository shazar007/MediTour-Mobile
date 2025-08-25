import {ScrollView, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {CustomHeader, Text, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {Modalize} from 'react-native-modalize';
import {RF} from '@theme';
import {DonorDetailData} from '@services';

const DonorDetails = ({navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = (item: any) => {
    modalizeRef.current?.open();
    setSelectedItem(item);
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Donor Detail'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      {/* <HeaderCard
        cardColor={colors.Donation}
        numberOfIcons={'3'}
        onPress={openDrawer}
        icon1={backIcon}
        tintColor={colors.primary}>
        <UserHeaderContent
          ScreenTitle={'Donor Detail'}
          ColorScreenTitle={colors.primary}
          searhIconTrue
          tintColor={colors.primary}
          searhIconTr
          onlySearchIcon
        />
      </HeaderCard> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: RF(24), paddingVertical: RF(24)}}>
          {DonorDetailData.map((item, index) => (
            <View key={index}>
              <Text size={16} SFsemiBold color={colors.primary}>
                {`Donor Name: ${item.FirstHeading}`}
              </Text>
              <Text size={16} SFsemiBold color={colors.primary}>
                {`Donor For:    ${item.secondHeading}`}
              </Text>
              <Text size={16} SFsemiBold color={colors.primary}>
                {`Donor For:      ${item.price}`}
              </Text>
              <View style={{marginTop: RF(16)}} />
              <Text size={16} color={colors.primary} SFsemiBold>
                Description:
              </Text>
              <Text size={14} SFregular color={colors.primary}>
                {`${item.Description}`}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};
export default DonorDetails;
