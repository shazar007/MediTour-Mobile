import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  mydataItem?: any;
  handlePress: (text: any, name: any) => void;
  name?: any;
}

const DummyFlatlist = (props: Props) => {
  const {mydataItem, handlePress, name} = props;
  return (
    <View>
      <FlatList
        data={mydataItem}
        renderItem={({item}: any) => {
          return (
            <>
              <Pressable
                onPress={() => handlePress(item.title, name)}
                style={{height: 30, marginTop: 5}}>
                <Text>{item.title}</Text>
              </Pressable>
            </>
          );
        }}
      />
    </View>
  );
};

export default DummyFlatlist;

const styles = StyleSheet.create({});
