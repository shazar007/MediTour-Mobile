import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  CustomHeader,
  HeaderCard,
  HeadingComponent,
  Text,
  UserHeaderContent,
} from '@components';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';

const PrivacyPolicies = () => {
  const [selected, setSelected] = useState();
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  const hotelClick = (item: any) => {
    setSelected(item);
  };
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={'Privacy & Policies'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      {/* <HeaderCard iconFlase numberOfIcons={'2'} title={'Continue Booking'}>
        <UserHeaderContent ScreenTitle={'Privacy & Policies'} />
      </HeaderCard> */}
      <ScrollView>
        <View style={styles.TopView}>
          <Text size={12} SFregular color={colors.blueText}>
            Thank you for visiting [Your Company Name]'s MediTour website. This
            Privacy Policy outlines how we collect, use, and protect the
            information you provide us through our website.
          </Text>
          <HeadingComponent
            NameType={'Heading'}
            Description={
              'Welcome to [Your Company Name] (the "Company," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website [yourwebsite.com] (the "Site") and our services related to medical tourism (the "Services"). Welcome to [Your Company Name] (the "Company," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website [yourwebsite.com] (the "Site") and our services related to medical tourism (the "Services").'
            }
          />
          <HeadingComponent
            NameType={'Heading'}
            Description={
              'Welcome to [Your Company Name] (the "Company," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website [yourwebsite.com] (the "Site") and our services related to medical tourism (the "Services"). Welcome to [Your Company Name] (the "Company," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website [yourwebsite.com] (the "Site") and our services related to medical tourism (the "Services").'
            }
          />
          <HeadingComponent
            NameType={'Heading'}
            Description={
              'Welcome to [Your Company Name] (the "Company," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website [yourwebsite.com] (the "Site") and our services related to medical tourism (the "Services"). Welcome to [Your Company Name] (the "Company," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website [yourwebsite.com] (the "Site") and our services related to medical tourism (the "Services").'
            }
          />
          {/* <View
            style={styles.buttonStyle}>
            <AppButton
              title="Accept"
              width={'47%'}
              Selected={selected}
              onPress={hotelClick}
            />
            <AppButton title="Decline" width={'47%'} />
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicies;
