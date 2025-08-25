import React from 'react';
import {GetNearbyAll} from '@components';
import {StyleSheet, Text, View} from 'react-native';

const UserRentCarHome = () => {
  return (
    <>
      <GetNearbyAll type={'RentCar'} />
    </>
  );
};

export default UserRentCarHome;

const styles = StyleSheet.create({});
