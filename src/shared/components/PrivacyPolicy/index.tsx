import React from 'react';
import {RF} from '@theme';
import {Text} from '@components';
import {ScrollView, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const PrivacyPolicy = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;

  return (
    <ScrollView style={{marginHorizontal: RF(20), marginBottom: RF(20)}}>
      <Section
        label={'PRIVACY POLICY'}
        title={`MEDITOUR is always committed to safeguard our Customers privacy by taking care our member’s information. This policy will guide you in understanding the way how we protect your data. This Privacy Policy does not apply to information collected from other platforms either online or offline. This Privacy Policy also does not apply to any third party web contents to which the Sites may link with each other. MEDITOUR does not regulate the privacy contents of third party websites`}
      />

      <Section
        label={'PRIVACY OF PERSONAL INFORMATION'}
        title={`Personal Information” means any information that may be used to recognize an individual. Personal information contains your personal name, address, email address, telephone number or Mobile Number and other relevant information.`}
      />

      <Section
        label={'INTRODUCTION'}
        title={`MEDITOUR is always committed to safeguard our Customers privacy by taking care our member’s information. This policy will guide you in understanding the way how we protect your data. This Privacy Policy does not apply to information collected from other platforms either online or offline. This Privacy Policy also does not apply to any third party web contents to which the Sites may link with each other. MEDITOUR does not regulate the privacy contents of third party websites`}
      />

      <Section
        label={'COLLECTION OF PERSONAL INFORMATION'}
        title={`To access updated features of the Mobile Application/ Sites, you must first Fill out a brief registration Application/ form. During registration you are required to provide certain personal information (such as User’s name, address, phone number, fax number, e-mail address, CNIC/ Passport Number, age, insurance data, Medical Data etc). By registering with MEDITOUR, you confirmed to receive communications from MEDITOUR in shape of email, Promotions etc. After getting registred, you may be got an option as to whether or not you wish to receive these types of communication from MEDITOUR. You may visit portions of the Mobile App and Sites without sharing your personal information where necessary information will be needed System will ask you to provide the same.`}
      />

      <Section
        label={'USE OF PERSONAL INFORMATION'}
        title={`Personal information collected through our Mobile Application/ Sites is used process and manage registrations, operate and improve our Sites, track the Sites’ usage policies and statistics, make the Mobile App/ Sites or services easier to manage by modify the need for you to repeatedly enter the same information, and for some other purposes as per your consent. We also use your personal information to communicate with you in other ways. For instance, when you register on this site, we may use your personal information to send you an email confirming your registration. We also use personal information to communicate important changes to our Privacy Policy, update you about multiple resources or Healthcare Personnel’s, communicate about MEDITOUR products and Services and using statistical data that we collect in multiple sources permitted by law.`}
      />

      <Section
        label={'DISCLOSURE OF PERSONAL INFORMATION'}
        title={`We may provide personal information to other vendors engaged in Contracts who provide services on our behalf, such as Registering your account, data processing and delivery of communications, hosting the websites, and content writing and services provided by the Mobile App/ Sites. We may access, use or disclose your personal information for other reasons, including if we believe such action is necessary to comply with the law or legal Regulations process, protect and defend our legal rights or property, protect the personal safety of members and users of our website or members of the general public, agreements, investigate or take action with respect to illegal or suspected illegal activities, enforce our Terms of Use, in connection with a corporate transaction or otherwise pursuant to your consent`}
      />

      <Section
        label={'PUBLIC INFORMATION'}
        title={`Any information that you may disclose in a feedback, reviews or online discussion, blogs or multiple forums is open to the public and is not in any way private. We recommend that you should carefully examine before disclose of such Information in any public forum`}
      />

      <Section
        label={'ACCESS TO PERSONAL INFORMATION'}
        title={`To update or change the personal information you have provided MEDITOUR, or to unsubscribe from MEDITOUR, email ContactUs@MEDITOUR.pk.`}
      />

      <Section
        label={'STORAGE AND SECURITY OF INFORMATION'}
        title={`Our first priority is to secure your Personal Information which is much important to us. We attempt to follow proper rules and regulations defined under the law to protect the Personal Information provided to us. This policy will proper guide you how we protect your information and data. This Privacy Policy does not apply to any information which is gathered from any other platforms even linked websites.`}
      />

      <Section
        label={'UPDATES AND CHANGES TO PRIVACY POLICY'}
        title={`We will notify you about any changes to this Privacy Policy by sending a message through the email/ SMS/ Circular or by placing a notification on the Mobile App / Sites. We always encourage you to time to time review this page for the updates on our privacy policy.`}
      />

      <Section
        label={'COPYRIGHT'}
        title={`All the material in shape of images, videos, articles, graphics, blogs, content, articles available on MEDITOUR Mobile App/ Sites are the solely owned by MEDITOUR GLOBAL PVT LIMITED. Therefore the unlawful/ illegal usage, copy, modification of such content is prohibited under copyright laws prevailing in Pakistan.`}
      />

      <Section
        colors={colors}
        label={'CONTACTS'}
        email={`Contact@meditour.pk`}
        title={`If you have any comments, Feedback, concerns or queries about our Privacy Policy, please do contact us at `}
      />
    </ScrollView>
  );
};

const Section = ({
  label,
  title,
  email,
  colors,
}: {
  label?: any;
  title?: any;
  email?: any;
  colors?: any;
}) => {
  return (
    <View style={{marginTop: RF(20)}}>
      <Text size={16} SFsemiBold>
        {label}
      </Text>
      <Text size={14} SFmedium>
        {title}
        <Text size={14} SFmedium color={colors?.bluE}>
          {email}
        </Text>
      </Text>
    </View>
  );
};
export default PrivacyPolicy;
