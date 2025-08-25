import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FormatPDF} from '@components';

const FormatDesign = ({route}: any) => {
  const {item, prescription, testData, data} = route.params;
  return (
    <View>
      <FormatPDF
        item={item}
        prescription={prescription}
        testData={testData}
        data={data}
      />
    </View>
  );
};

export default FormatDesign;

const styles = StyleSheet.create({});
