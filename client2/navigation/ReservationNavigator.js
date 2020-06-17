import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ReservationsScreen from '../screens/reservationScreens/ReservationsScreen';
import ReservationDetails from '../screens/reservationScreens/ReservationDetailsScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createStackNavigator();
const ReservationNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginHorizontal: 8 }}>
            <Ionicons name="md-menu" size={32} />
          </TouchableOpacity>
        )
      }}
    >
      <Stack.Screen name="Reservation" component={ReservationsScreen} />
      <Stack.Screen name="ReservationDetails" component={ReservationDetails} />
    </Stack.Navigator>
  );
};

export default ReservationNavigator;

const styles = StyleSheet.create({});
