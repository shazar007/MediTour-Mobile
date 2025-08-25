import {StyleSheet, View} from 'react-native';
import React from 'react';
import { globalStyles} from '@services';
import {CheckBox} from '@components';
import {useTheme} from '@react-navigation/native';
import {FlatList} from 'react-native';
import {RF} from '@theme';
import {Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setSpecialist} from '@redux';

interface Props {
  renderList?: any;
}
const Specialist = (props: Props) => {
    const theme: any = useTheme();
    const colors = theme.colors;
    const dispatch = useDispatch();
    const {renderList} = props;
    const {selectSpecialist} = useSelector((state: any) => state.root.user);
    const onPress = (title: any) => {
     dispatch(setSpecialist(title));;
    };
  return (
    <>
      <View
        style={styles.view}>
        <FlatList
          nestedScrollEnabled={true}
          scrollEnabled={false}
          data={renderList}
          style={{backgroundColor: '#fff'}}
          renderItem={({item}) => (
            <Pressable
              style={[
                globalStyles.rowSimple,
                {
                  height: RF(37),
                  // borderBottomWidth: 1,
                  paddingBottom: RF(8),
                  paddingHorizontal: RF(24),
                  backgroundColor: selectSpecialist == item.value ? '#fff' : '#fff',
                },
              ]}>
              <CheckBox
                onPress={onPress}
                selected={selectSpecialist}
                checkboxSize={16}
                title={item.value}
                colors={colors}
                textStyle={styles.checkboxText}
              />
            </Pressable>
          )}
        />
      </View>
    </>
  );
};

export default Specialist;

const styles = StyleSheet.create({
  checkboxText: {
    color: 'rgba(2, 14, 53, 1)',
    marginLeft: RF(16),
  },
  view: {
    elevation: 10,
    backgroundColor: '#fff',
  },
});
