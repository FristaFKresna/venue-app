import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionsScreen from '../screens/transactionScreens/TransactionsScreen';
import TransactionDetails from '../screens/transactionScreens/TransactionDetails';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();
const ReservationNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Transactions"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginHorizontal: 8 }}>
            <Ionicons name="md-menu" size={32} />
          </TouchableOpacity>
        )
      }}
    >
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
    </Stack.Navigator>
  );
};

export default ReservationNavigator;

const styles = StyleSheet.create({});
