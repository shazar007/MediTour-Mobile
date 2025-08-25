import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {HeaderCard, Line, Text, UserHeaderContent, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import {globalStyle, RF} from '@theme';
import {globalStyles} from '@services';

const MedOrderDetails = () => {
  const theme: any = useTheme();
  const colors = theme?.colors;
  const styles = useStyles(colors);

  const medNameData = [
    {id: 1, title: 'Name'},
    {id: 2, title: 'Strength'},
    {id: 3, title: 'Generic'},
    {id: 4, title: 'Days'},
    {id: 5, title: 'Qunatity'},
    {id: 6, title: 'Price'},
  ];

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard numberOfIcons={'3'} userName={false}>
        <UserHeaderContent ScreenTitle={'Order Details'} />
      </HeaderCard>

      <View style={styles?.card}>
        <FlatList
          data={[1, 2, 3]}
          renderItem={({data}: any) => (
            <>
              <FlatList
                scrollEnabled={false}
                data={medNameData}
                renderItem={({item}: any) => (
                  <View style={[globalStyles?.row, styles?.gap]}>
                    <Text color={colors?.primary} SFmedium>
                      {item?.title}:
                    </Text>
                    <Text color={colors?.primary} size={12}>
                      Acetaminophen
                    </Text>
                  </View>
                )}
              />
              <Line mt={12} />
            </>
          )}
        />
      </View>
    </Wrapper>
  );
};

export default MedOrderDetails;

const useStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      padding: RF(8),
      backgroundColor: colors?.lightPrimary,
      margin: RF(24),
      borderRadius: 8,
    },
    gap: {
      width: '80%',
    },
  });
