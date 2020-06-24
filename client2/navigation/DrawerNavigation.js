import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VenuesNavigator from './VenuesNavigator';
import ProfileNavigator from './ProfileNavigator';
import ReservationNavigator from './ReservationNavigator';
import OrderNavigator from './OrderNavigator';
import WishListsScreen from '../screens/WishListsScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../utils/colors';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{tabBarIcon: ({focused}) => <Icon name='building' size={24} color={focused ? COLORS.main : COLORS.disabled} /> }} name="Venues" component={VenuesNavigator} />
      <Tab.Screen options={{tabBarIcon: ({focused}) => <Icon name='ticket-alt' size={24} color={focused ? COLORS.main : COLORS.disabled} /> }} name="Reservations" component={ReservationNavigator} />
      <Tab.Screen options={{tabBarIcon: ({focused}) => <Icon name='heart' size={24} color={focused ? COLORS.main : COLORS.disabled} /> }} name="Wishlists" component={WishListsScreen} />
    </Tab.Navigator>
  );
};
export default () => (
  <Drawer.Navigator initialRouteName="Home" drawerPosition="right">
    <Drawer.Screen name="Home" component={TabNavigator} />
    <Drawer.Screen name="Orders" component={OrderNavigator} />
    <Drawer.Screen name="Profile" component={ProfileNavigator} />
  </Drawer.Navigator>
);
