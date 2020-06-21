import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profileScreens/ProfileScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createStackNavigator();
const ReservationNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginHorizontal: 8 }}>
            <Ionicons name="md-menu" size={32} />
          </TouchableOpacity>
        )
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      {/* <Stack.Screen name="TransactionDetails" component={TransactionDetails} /> */}
    </Stack.Navigator>
  );
};

export default ReservationNavigator;

const styles = StyleSheet.create({});
