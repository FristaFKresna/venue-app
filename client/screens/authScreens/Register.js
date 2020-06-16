import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { register } from '../../store/actions/authAction';

const Register = ({ navigation }) => {
  // TODO refactor this, see react hook form
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ re_password, setRe_password ] = useState('');
  const [ email, setEmail ] = useState('');
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.auth.errors);
  const onRegisterPress = () => {
    dispatch(register({ username, password, re_password, email, role }));
  };
  return (
    <View>
      <View>
        <TextInput placeholder="username" onChangeText={(text) => setUsername(text)} />
        <TextInput placeholder="email" onChangeText={(text) => setEmail(text)} />
        <TextInput placeholder="password" onChangeText={(text) => setPassword(text)} />
        <TextInput placeholder="confirm password" onChangeText={(text) => setRe_password(text)} />
        <Picker
          selectedValue={role}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
        >
          <Picker.Item label="Rentee" value="rentee" />
          <Picker.Item label="Renter" value="renter" />
        </Picker>
        <Button title="register" onPress={onRegisterPress} />
        <Text onPress={() => navigation.navigate('Login')}>Login instead</Text>
      </View>
      {errors &&
        errors.map((error, index) => (
          <Text key={index} style={styles.error}>
            {error.msg}
          </Text>
        ))}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  link: { color: 'palevioletred' },
  error: { color: 'red' }
});
