import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

const TableRow = ({title, value}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        value={value}
      />
    </View>
  );
};

const YourComponent = () => {
  return (
    <View style={styles.container}>
      <TableRow title="Field 1" value="Initial Value" />
      <TableRow title="Field 2" value="Initial Value" />
      <TableRow title="Field 3" value="Initial Value" />
      <TableRow title="Field 4" value="Initial Value" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 10,
    padding: 8,
  },
});

export default YourComponent;
