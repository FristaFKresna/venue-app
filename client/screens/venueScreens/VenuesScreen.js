import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const VenuesScreen = ({navigation, route}) => {
    return (
        <View>
            <Text>venue screen</Text>
            <Button title='got to detail' onPress={() => {navigation.navigate('VenueDetails')}} />
        </View>
    )
}

export default VenuesScreen

const styles = StyleSheet.create({})
