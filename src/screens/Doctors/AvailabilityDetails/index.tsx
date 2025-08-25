import React, {useState} from 'react';
import {FlatList, View, ScrollView} from 'react-native';
import {Wrapper, Accordion, CustomHeader} from '@components';
import {DeleteAvailability} from '@services';
import {RF} from '@theme';

const AvailabilityDetails = ({route}: any) => {
  const initialData = route.params.data;
  const [availabilities, setAvailabilities] = useState(initialData);

  const deleteAvail = (availabilityId: any) => {
    DeleteAvailability(availabilityId)
      .then(res => {
        const updatedAvailabilities = availabilities.filter(
          (item: any) => item.id !== availabilityId,
        );
        setAvailabilities(updatedAvailabilities);
      })
      .catch(err => {});
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Clinic Availability'}
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView>
          <FlatList
            data={availabilities}
            renderItem={({item}) => (
              <Accordion item={item} onDelete={() => deleteAvail(item.id)} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
      </View>
    </Wrapper>
  );
};

export default AvailabilityDetails;
