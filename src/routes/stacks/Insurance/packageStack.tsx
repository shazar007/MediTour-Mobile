import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  InsurancePackage,
  InsurancePlan,
  MyselfPackage,
  Category,
  Category_Basic,
  Haelth_Category_Hos_Lab,
  Category_Benefits,
  Category_Price,
  Package_Detail,
  Insurance_Travel_Package,
  Medical_Benefits,
  Travel_Benefits,
} from '@screens';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

const InsurancePackageStack = ({route}: any) => {
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
      <Stack.Screen name="InsurancePlan" component={InsurancePlan} />
      <Stack.Screen name="InsurancePackage" component={InsurancePackage} />
      <Stack.Screen name="MyselfPackage" component={MyselfPackage} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Package_Detail" component={Package_Detail} />
      <Stack.Screen name="Medical_Benefits" component={Medical_Benefits} />
      <Stack.Screen name="Travel_Benefits" component={Travel_Benefits} />
      <Stack.Screen
        name="Insurance_Travel_Package"
        component={Insurance_Travel_Package}
      />
      <Stack.Screen name="Category_Price" component={Category_Price} />
      <Stack.Screen name="Category_Benefits" component={Category_Benefits} />
      <Stack.Screen
        name="Haelth_Category_Hos_Lab"
        component={Haelth_Category_Hos_Lab}
      />
      <Stack.Screen name="Category_Basic" component={Category_Basic} />
    </Stack.Navigator>
  );
};
export default InsurancePackageStack;
