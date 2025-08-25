import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  CustomHeader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {navigate} from '@services';
import {RF} from '@theme';
const RegistrationSuccessScreen = () => {
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Another Property'}
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView style={styles.container}>
          <View style={{paddingBottom: RF(60)}}>
            <View style={styles.card}>
              <Icon
                name="check-circle"
                type="font-awesome"
                color="#4CAF50"
                size={50}
              />
              <Text style={styles.title}>
                Congratulations, it's time to relax and put your feet up as
                you've completed your registration.
              </Text>
            </View>
            <Text style={styles.header}>You have done</Text>
            <Text style={styles.subheader}>
              You've just finished registering your property with Meditour.com,
              so take it easy and let us do the rest of the work. From here, the
              next steps are:
            </Text>
            <View style={styles.step}>
              <Icon
                name="check-circle"
                type="font-awesome"
                color="#4CAF50"
                size={30}
              />
              <Text style={styles.stepText}>
                Your registration at meditour.co.
              </Text>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add another property</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.mainButton]}
              onPress={() => navigate('AllHotelProperty')}>
              <Text style={[styles.buttonText, styles.mainButtonText]}>
                Main Page
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 10,
  },
  header: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  stepSubText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  mainButton: {
    backgroundColor: '#006838',
    borderColor: '#006838',
  },
  mainButtonText: {
    color: '#fff',
  },
});

export default RegistrationSuccessScreen;
