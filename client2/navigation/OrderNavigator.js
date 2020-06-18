import OrderDetails from '../screens/orderScreens/OrderDetails'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import OrdersScreen from '../screens/orderScreens/OrdersScreen'

const Stack = createStackNavigator()

const OrderNavigator = () => {
    return <Stack.Navigator>
        <Stack.Screen name='Order' component={OrdersScreen} />
        <Stack.Screen name='OrderDetails' component={OrderDetails} />
    </Stack.Navigator>
}

export default OrderNavigator
