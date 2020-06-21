import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import VenuesNavigator from './VenuesNavigator';
import ProfileNavigator from './ProfileNavigator';
import ReservationNavigator from './ReservationNavigator';
import OrderNavigator from './OrderNavigator';

const Drawer = createDrawerNavigator();

export default () => (
  <Drawer.Navigator initialRouteName="Venues" drawerPosition="right">
    <Drawer.Screen
      name="Venues"
      component={VenuesNavigator}

    />
    <Drawer.Screen name="Profile" component={ProfileNavigator} />
    <Drawer.Screen name="Reservations" component={ReservationNavigator} />
    <Drawer.Screen name='Orders' component={OrderNavigator} />
  </Drawer.Navigator>
);
