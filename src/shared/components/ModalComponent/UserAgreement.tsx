import {crossIcon, mediLogo} from '@assets';
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Text from '../text';
import {rv} from '@services';
import AppButton from '../AppButton';

const UserAgreement = ({onPress}: {onPress?: any}) => {
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
        E-AGREEMENT
      </Text>
      <Text color={'#0e54a3'} SFbold size={22} style={{marginBottom: rv(20)}}>
        THE MEDITOUR GLOBAL PRIVATE LIMITED
      </Text>

      <Text
        color={'#666666'}
        style={{marginBottom: rv(15), lineHeight: rv(22)}}>
        This E-Agreement ("Agreement") is a binding contract between you
        ("Patient" or "User") and The MediTour Global Private Limited
        ("MediTour"), a service company that facilitates the coordination of
        medical, travel, and other ancillary services for patients. By creating
        an account and using MediTour’s platform, you agree to the following
        terms and conditions:
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
      <Text style={{marginLeft: rv(8)}}>
        - Coordination of medical treatments, consultations, surgeries, and
        related services through third-party hospitals, clinics, laboratories,
        pharmacies, hotels, and tourism companies.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - Arrangements for all services related to Medical Tourism.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - Assistance with travel arrangements, including flights,
        accommodations, and local transportation in connection with medical
        services.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - Support in procuring prescribed medications from third-party
        suppliers.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - Coordination of other ancillary services related to the above.
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
        By creating an account, you acknowledge and agree that:
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - The MediTour Global is a service facilitator only and does not provide
        any medical treatment, advice, or care.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - All medical services, treatments, consultations, and medications are
        provided by independent third-party Healthcare Providers, and The
        MediTour Global is not responsible for the quality, outcome, or success
        of any treatment or medical service.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - The MediTour Global does not endorse or guarantee the accuracy,
        expertise, or outcomes of the services provided by any Healthcare
        Provider or any third-party service provider.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - You understand and assume all risks associated with any medical
        treatment or healthcare service coordinated through The MediTour Global.
      </Text>

      <Text
        size={20}
        color={'#0e54a3'}
        SFbold
        style={{marginTop: rv(10), marginBottom: rv(10)}}>
        3. Patient Responsibilities
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - You agree to provide accurate and complete personal, medical, and
        financial information necessary for arranging the services.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - You agree to comply with all instructions, terms, and conditions
        provided by the Healthcare Providers, laboratories, travel agencies, and
        other third-party service providers.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - You understand and accept that medical treatments carry inherent
        risks, and you consent to receive medical care at your own risk.
      </Text>

      <Text
        size={20}
        color={'#0e54a3'}
        SFbold
        style={{marginTop: rv(10), marginBottom: rv(10)}}>
        4. Limitation of Liability
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - The MediTour Global is not liable for any injury, illness,
        complication, or death resulting from any medical treatment, procedure,
        laboratory test, or service provided by third-party Healthcare
        Providers.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - The MediTour Global shall not be responsible for any delays,
        cancellations, or errors in travel arrangements or other ancillary
        services, nor for any costs, expenses, or damages resulting therefrom.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - By using The MediTour Global's services, you agree to release,
        indemnify, and hold harmless The MediTour Global, its directors,
        officers, employees, and agents from any and all claims, liabilities,
        losses, damages, or expenses arising out of or in connection with any
        medical services or other services facilitated by The MediTour Global.
      </Text>

      <Text
        size={20}
        color={'#0e54a3'}
        SFbold
        style={{marginTop: rv(10), marginBottom: rv(10)}}>
        5. Privacy and Data Protection
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - The MediTour Global will collect, use, and store your personal and
        medical information in accordance with its Privacy Policy, which you
        agree to upon creating an account.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - You consent to the sharing of your personal and medical information
        with third-party Healthcare Providers and service providers for the
        purpose of coordinating the services requested.
      </Text>

      <Text
        size={20}
        color={'#0e54a3'}
        SFbold
        style={{marginTop: rv(10), marginBottom: rv(10)}}>
        6. Governing Law and Dispute Resolution
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - This Agreement shall be governed by and construed in accordance with
        the laws of the Islamic Republic of Pakistan.
      </Text>
      <Text style={{marginLeft: rv(8)}}>
        - Any disputes arising out of or relating to this Agreement shall be
        resolved through amicable negotiation. If such negotiation fails, the
        dispute shall be resolved through binding arbitration in Pakistan.
      </Text>

      <Text
        size={20}
        color={'#0e54a3'}
        SFbold
        style={{marginTop: rv(10), marginBottom: rv(10)}}>
        7. Modification of Terms
      </Text>
      <Text
        color={'#666666'}
        style={{marginBottom: rv(15), lineHeight: rv(22)}}>
        The MediTour Global reserves the right to update or modify this
        Agreement at any time. Any changes will be effective immediately upon
        posting on the MediTour Global platform. Your continued use of the
        platform following any changes constitutes your acceptance of the
        modified Agreement.
      </Text>

      <Text
        size={20}
        color={'#0e54a3'}
        SFbold
        style={{marginTop: rv(10), marginBottom: rv(10)}}>
        8. Acceptance of Agreement
      </Text>
      <Text
        color={'#666666'}
        style={{marginBottom: rv(15), lineHeight: rv(22)}}>
        By clicking "I Agree" during the account creation process or by
        continuing to use the MediTour Global platform, you confirm that you
        have read, understood, and agreed to be bound by the terms and
        conditions of this Agreement.
      </Text>

      <Text
        size={18}
        color={'#0e54a3'}
        SFbold
        style={{marginTop: rv(30), marginBottom: rv(10)}}>
        THE MEDITOUR GLOBAL PRIVATE LIMITED
      </Text>
      <Text color={'#666666'} style={{marginBottom: rv(16)}}>
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

export default UserAgreement;
