import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  InsuranceHome,
  InsuredDetail,
  InsuredPerson,
  LaboratoryHome,
} from '@screens';
import {useDispatch} from 'react-redux';
const Stack = createStackNavigator();
const InsuranceInsuredPersonStack = ({route}: any) => {
  const dispatch = useDispatch();
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
      <Stack.Screen name="InsuredPerson" component={InsuredPerson} />
      <Stack.Screen name="InsuredDetail" component={InsuredDetail} />
    </Stack.Navigator>
  );
};
export default InsuranceInsuredPersonStack;
