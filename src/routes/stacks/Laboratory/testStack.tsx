import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {B2BDetailScreen, LaboratoryTest} from '@screens';

const Stack = createStackNavigator();

const LaboratoryTestStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}>
      <Stack.Screen name="TestScreen" component={LaboratoryTest} />
      <Stack.Screen name="B2BDetailScreen" component={B2BDetailScreen} />
    </Stack.Navigator>
  );
};
export default LaboratoryTestStack;
