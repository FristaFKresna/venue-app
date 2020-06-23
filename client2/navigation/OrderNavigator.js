import OrderDetails from '../screens/orderScreens/OrderDetails';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OrdersScreen from '../screens/orderScreens/OrdersScreen';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
const Stack = createStackNavigator();

const OrderNavigator = ({navigation}) => {
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
      <Stack.Screen name="Order" component={OrdersScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
