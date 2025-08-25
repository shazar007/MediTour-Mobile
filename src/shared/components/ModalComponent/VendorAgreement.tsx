import {crossIcon, mediLogo} from '@assets';
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Text from '../text';
import {rv} from '@services';
import AppButton from '../AppButton';

const agreementData = [
  {
    heading: 'Engagement',
    desc: 'TMG retains you as a health service provider. Service Provider hereby agrees to be retained by TMG under the terms of this Agreement.',
  },
  {
    heading: 'Performance Obligations',
    desc: 'Service Provider shall apply their utmost knowledge and skill in caring for patients referred through TMG.',
  },
  {
    heading: 'Service Scheduling',
    desc: 'Both parties shall agree on a schedule for professional services provided through TMG. Service Provider shall not provide direct patient contact services independently forwarded by TMG.',
  },
  {
    heading: 'Licensing Requirements',
    desc: 'The Service Provider must be duly licensed to practice in the Islamic Republic of Pakistan and maintain all necessary documents, licenses, and controlled substances permits.',
  },
  {
    heading: 'Service Standards',
    desc: 'During the term of this Agreement, the Service Provider shall render services without discrimination based on race, sex, religion, handicap, national origin, age, or ability to pay.',
  },
  {
    heading: 'Compensation and Billing',
    desc: 'All fees for medical services provided by The TMG after deducting a 20% service fee payable to The TMG.',
  },
  {
    heading: 'Reporting and Documentation',
    desc: 'The Service Provider shall prepare and submit timely reports of all examinations, procedures, and other services performed.',
  },
  {
    heading: 'Confidentiality',
    desc: 'Both parties agree to hold confidential information in strict confidence.',
  },
  {
    heading: 'Indemnification',
    desc: 'The Service Provider shall indemnify and hold The TMG harmless against all claims, losses, liabilities, costs, and expenses.',
  },
  {
    heading: 'Termination',
    desc: 'Either party may terminate this Agreement if the other party fails to fulfill its obligations.',
  },
  {
    heading: 'Legal Compliance',
    desc: 'All services must comply with applicable laws, regulations, and ordinances.',
  },
  {
    heading: 'Validity and Enforceability',
    desc: 'If any provision of this Agreement is found to be unenforceable, the remaining provisions shall remain in full force and effect.',
  },
  {
    heading: 'Entire Agreement',
    desc: 'This Agreement constitutes the entire understanding between the parties regarding its subject matter.',
  },
  {
    heading: 'Term and Renewal',
    desc: 'The Agreement is effective from the date of acceptance and will remain in effect for an initial period of one year.',
  },
];

const VendorAgreement = ({onPress}: {onPress?: any}) => {
  return (
    <ScrollView contentContainerStyle={styles.termsContainer}>
      <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={onPress}>
        <Image
          source={crossIcon}
          style={{width: rv(30), height: rv(30), resizeMode: 'contain'}}
        />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={mediLogo}
          style={styles.logo}
          alt="The TMG Private Limited Logo"
        />
      </View>

      <Text size={24} SFbold color={'#0e54a3'} style={{paddingBottom: rv(8)}}>
        Terms and Conditions
      </Text>
      <Text color={'#0e54a3'} SFbold size={22} style={{marginBottom: rv(20)}}>
        THE TMG PRIVATE LIMITED
      </Text>

      <Text
        color={'#666666'}
        style={{marginBottom: rv(15), lineHeight: rv(22)}}>
        This E-Agreement ("Agreement") is a binding contract between you and The
        TMG Private Limited ("TMG"), a service company that facilitates the
        coordination of medical, travel, and other ancillary services for
        patients like Medical online OPD, Laboratory services, Pharmacy
        Services, Booking Hotel/Guest Houses, Arrange travelling and Excursions,
        Home services like Physiotherapists, Psychologists, Paramedic Staff and
        Doctor on Call services, Ambulance services and offering travel and
        health insurance through third party.
      </Text>

      <Text
        size={20}
        color={'#0e54a3'}
        SFbold
        style={{marginTop: rv(10), marginBottom: rv(10)}}>
        1. Scope of Services
      </Text>
      <Text
        color={'#666666'}
        style={{marginBottom: rv(15), lineHeight: rv(22)}}>
        MediTour provides the following services to facilitate your medical
        journey:
      </Text>
      <Text color={'#666666'} style={{marginLeft: rv(8), lineHeight: rv(22)}}>
        <Text SFbold>• </Text> TMG aims to create a professional, non-political
        platform for promoting and facilitating unique and exclusive medical,
        dental, diagnostic, tourism, fertility treatments (IVF), aesthetic,
        cosmetic & plastic surgery, hair transplant, cardiac and metabolic
        wellness, rehabilitation services and all other medical treatments.
      </Text>
      <Text
        color={'#666666'}
        style={{marginLeft: rv(8), marginBottom: rv(8), lineHeight: rv(22)}}>
        <Text SFbold>• </Text> Arrangements for all services related to Medical
        Tourism.
      </Text>
      <Text
        color={'#666666'}
        style={{marginLeft: rv(8), marginBottom: rv(8), lineHeight: rv(22)}}>
        <Text SFbold>• </Text> Assistance with travel arrangements, including
        flights, accommodations, and local transportation in connection with
        medical services.
      </Text>
      <Text
        color={'#666666'}
        style={{marginLeft: rv(8), marginBottom: rv(8), lineHeight: rv(22)}}>
        <Text SFbold>• </Text> Support in procuring prescribed medications from
        third-party suppliers.
      </Text>
      <Text
        color={'#666666'}
        style={{marginLeft: rv(8), marginBottom: rv(8), lineHeight: rv(22)}}>
        <Text SFbold>• </Text> Coordination of other ancillary services related
        to the above.
      </Text>

      <Text
        size={20}
        color={'#0e54a3'}
        SFbold
        style={{marginTop: rv(10), marginBottom: rv(10)}}>
        2. Acknowledgement and Disclaimer
      </Text>
      <Text
        color={'#666666'}
        style={{marginBottom: rv(15), lineHeight: rv(22)}}>
        By creating an account and using TMG platform, you agree to the
        following terms and conditions: You engaged in providing the multiple
        services or any of the services mentioned in the{' '}
        <Text color={'#ff8c00'}>scope of services</Text> provided by TMG to the
        community, with the aim to improve the quality of patient care and
        promote the well-being of patients.
      </Text>
      <Text color={'#666666'} style={{marginBottom: rv(8), lineHeight: rv(22)}}>
        Both parties desire to establish a formal agreement outlining their
        respective roles, rights, and obligations.
      </Text>
      <Text size={14} color={'#0e54a3'} SFbold>
        NOW, THEREFORE, IT IS AGREED AS FOLLOWS:
      </Text>

      <FlatList
        data={agreementData}
        renderItem={({item}: any) => (
          <>
            <Text
              color={'#666666'}
              style={{
                marginLeft: rv(8),
                marginTop: rv(8),
                marginBottom: rv(8),
                lineHeight: rv(22),
              }}>
              <Text SFbold>{item?.heading}:</Text> {item?.desc}
            </Text>
          </>
        )}
      />

      <Text
        size={20}
        color={'#0e54a3'}
        SFbold
        style={{marginTop: rv(10), marginBottom: rv(10)}}>
        ACCEPTANCE
      </Text>
      <Text
        color={'#666666'}
        style={{marginLeft: rv(8), marginBottom: rv(8), lineHeight: rv(22)}}>
        By clicking "I Agree," both parties confirm they have read, understood,
        and agree to the terms and conditions set forth in this Agreement.
      </Text>

      <Text
        size={18}
        color={'#0e54a3'}
        SFbold
        style={{marginTop: rv(16), marginBottom: rv(10)}}>
        THE MEDITOUR GLOBAL PRIVATE LIMITED
      </Text>
      <Text
        color={'#666666'}
        style={{marginBottom: rv(16), lineHeight: rv(22)}}>
        If you have any questions or concerns about this Agreement, please
        contact us at info@meditour.global.
      </Text>
      <AppButton
        width={rv(80)}
        height={rv(30)}
        title="Close"
        bgClr={'#ff8c00'}
        onPress={onPress}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  termsContainer: {
    padding: rv(16),
    backgroundColor: '#ffffff',
    borderRadius: rv(8),
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 4},
    // shadowRadius: 20,
    margin: rv(10),
    elevation: 5,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    height: rv(96),
    width: rv(100),
    resizeMode: 'contain',
  },
  heading: {
    color: '#0e54a3',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  companyName: {
    color: '#0e54a3',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  paragraph: {
    color: '#666666',
    lineHeight: 22,
    marginBottom: 15,
  },
  subheading: {
    color: '#0e54a3',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    color: '#ff8c00',
    marginLeft: 15,
    marginBottom: 10,
  },
  footer: {
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#0e54a3',
  },
  contactInfo: {
    color: '#666666',
    marginTop: 10,
  },
});

export default VendorAgreement;
