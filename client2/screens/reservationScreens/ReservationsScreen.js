import React from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'

const ReservationsScreen = ({navigation}) => {
    return (
        <View>
            <Text>rsvs</Text>
            <Button title='goto detail' onPress={() =>{navigation.navigate('ReservationDetails')}} />
        </View>
    )
}

export default ReservationsScreen

const styles = StyleSheet.create({})
