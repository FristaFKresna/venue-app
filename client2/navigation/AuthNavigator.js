import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import Register from '../screens/authScreens/Register'
import Login from '../screens/authScreens/Login'

const Stack = createStackNavigator()

const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    )
}

export default AuthNavigator

const styles = StyleSheet.create({})
