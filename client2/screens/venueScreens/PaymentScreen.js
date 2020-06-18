import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { api } from '../../utils/axios';
const PaymentScreen = ({ route }) => {
  const [ numPeople, setNumPeople ] = useState('0');
  const { package : {name, pricePerPax, id}, date } = route.params;
  
  // TODO add alert on success
  const onProceedToPay = () => {
    api
      // calculate pricing is serverside for security reason
      .post('/users/1/reservations', { date, packageId: id, numPeople })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <Text>you're about to buy: {name}</Text>
      <Text>with price / pax: Rp.{pricePerPax}, -</Text>
      <Input
        style={styles.numInput}
        placeholder="Number of people"
        rightIcon={{ type: 'material-icons', name: 'people-outline' }}
        onChangeText={(text) => setNumPeople(text)}
        keyboardType="number-pad"
      />
      <Text>total Rp.{+numPeople * +pricePerPax},-</Text>
      <Button title='pay' onPress={onProceedToPay} />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({ numInput: { backgroundColor: 'white' } });
