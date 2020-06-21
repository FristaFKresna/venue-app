import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { api } from '../../utils/axios';
import Markdown from 'react-native-markdown-display';
import { COLORS } from '../../utils/colors';
import NumberFormat from 'react-number-format';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { useSelector } from 'react-redux';
import LoadingScreen from '../LoadingScreen';

const PaymentScreen = ({ route, navigation }) => {
  const [ numPeople, setNumPeople ] = useState('0');
  const [ bank, setBank ] = useState('bca');
  const { package: { name, pricePerPax, id, description }, date } = route.params;
  const userId = useSelector((state) => state.auth.id);
  const [ loading, setLoading ] = useState(false);

  // TODO add alert on success
  const onProceedToPay = () => {
    setLoading(true);
    api
      // calculate pricing is serverside for security reason
      .post(`/users/${userId}/reservations`, { date, packageId: id, numPeople, bank })
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        alert('success');
        navigation.navigate('Order')
      })
      .catch((err) => {
        console.log(err)
        alert('there\'s an error');
        setLoading(false);
      });
  };

  return !loading ? (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 16, color: COLORS.text }}>you're about to buy</Text>
      <Text style={{ fontSize: 24, color: COLORS.text }}>{name}</Text>
      <Text>
        price/pax:{' '}
        <NumberFormat
          value={pricePerPax}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rp'}
          renderText={(text) => <Text>{text}</Text>}
        />
      </Text>
      <Markdown>{description.toString()}</Markdown>
      <View style={{ marginTop: 30 }}>
        <Input
          style={styles.numInput}
          label="Number of people"
          placeholder="e.g 30"
          rightIcon={{ type: 'material-icons', name: 'people-outline' }}
          onChangeText={(text) => setNumPeople(text)}
          keyboardType="number-pad"
        />
      </View>

      <Text
        style={{ color: COLORS.tertiary, fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginVertical: 10 }}
      >
        Total{' '}
        <NumberFormat
          value={+pricePerPax * +numPeople}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rp'}
          suffix=",-"
          renderText={(text) => <Text>{text}</Text>}
        />
      </Text>
      <Text>payment method: </Text>
      <Picker
        selectedValue={bank}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setBank(itemValue)}
      >
        <Picker.Item label="BNI virtual account" value="bni" />
        <Picker.Item label="BCA virtual account" value={'bca'} />
        <Picker.Item label="more(on develompent)" value={null} />
      </Picker>
      <Button title="pay" onPress={onProceedToPay} color={COLORS.main} />
    </ScrollView>
  ) : (
    <LoadingScreen text={'conducting transaction..'}/>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({ numInput: { backgroundColor: 'white' } });
