import {Text} from '@components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Multicity} from '@screens';
import {rs} from '@services';
import {RF} from '@theme';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: changeColor,
          borderRadius: 8,
          position: 'relative',
          height: '100%',
        },
        tabBarIconStyle: {
          width: '100%',
          marginHorizontal: 0,
        },
        tabBarStyle: {
          marginTop: rs(16),
          backgroundColor: '#fff',
          width: '90%',
          overflow: 'hidden',
          alignSelf: 'center',
          borderRadius: 8,
        },
      }}>
      <Tab.Screen
        name="oneWay"
        component={Multicity}
        initialParams={{type: 'oneWay'}}
        options={{
          tabBarIcon: ({focused, colors}: any) => (
            <Text size={16} color={focused ? '#fff' : 'rgba(153, 153, 153, 1)'}>
              one
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="round"
        component={Multicity}
        initialParams={{type: 'round'}}
        options={{
          tabBarIcon: ({focused, colors}: any) => (
            <Text size={16} color={focused ? '#fff' : 'rgba(153, 153, 153, 1)'}>
              Round
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Multicity"
        component={Multicity}
        initialParams={{type: 'multiCity'}}
        options={{
          tabBarIcon: ({focused, colors}: any) => (
            <Text size={16} color={focused ? '#fff' : 'rgba(153, 153, 153, 1)'}>
              Multicity
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
