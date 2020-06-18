import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button } from 'react-native';
import VenuesScreen from '../screens/venueScreens/VenuesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import VenueDetailsScreen from '../screens/venueScreens/VenueDetailsScreen';
import PaymentScreen from '../screens/venueScreens/PaymentScreen';

const VenuesStack = createStackNavigator();
// TODO Refactor screen options
export default ({ navigation }) => {
  return (
    <VenuesStack.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginHorizontal: 8 }}>
            <Ionicons name="md-menu" size={32} />
          </TouchableOpacity>
        )
      }}
    >
      <VenuesStack.Screen name="Venues" component={VenuesScreen} />
      <VenuesStack.Screen name="VenueDetails" component={VenueDetailsScreen} />
      <VenuesStack.Screen name="VenuePayment" component={PaymentScreen} />
    </VenuesStack.Navigator>
  );
};
