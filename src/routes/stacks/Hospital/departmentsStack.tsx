import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HospitalDepartments} from '@screens';

const Stack = createStackNavigator();
const HospitalDepartmentStack = () => {
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
      <Stack.Screen
        name="HospitalDepartments"
        component={HospitalDepartments}
      />
    </Stack.Navigator>
  );
};
export default HospitalDepartmentStack;
