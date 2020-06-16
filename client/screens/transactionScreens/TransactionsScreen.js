import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const TransactionsScreen = ({navigation}) => {
    return (
        <View>
            <Text>transs</Text>
            <Button title='go to detail' onPress={() => navigation.navigate('TransactionDetails')} />
        </View>
    )
}

export default TransactionsScreen

const styles = StyleSheet.create({})
