import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LaboratoryOrder, OrderDetail_Lab_B2B} from '@screens';

const Stack = createStackNavigator();
const LaboratoryOrderStack = () => {
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
      <Stack.Screen name="OrderScreen" component={LaboratoryOrder} />
      <Stack.Screen
        name="OrderDetail_Lab_B2B"
        component={OrderDetail_Lab_B2B}
      />
    </Stack.Navigator>
  );
};
export default LaboratoryOrderStack;
