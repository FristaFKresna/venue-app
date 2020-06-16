import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { api, setToken } from '../../utils/axios';
import { login } from '../../store/actions/authAction';

const Login = ({ navigation }) => {
  // TODO refactor this, see react hook form
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const dispatch = useDispatch();
  const onLoginPress = () => {
    dispatch(login({ email, password }));
  };
  const user = useSelector((state) => state.auth.username);
  const errors = useSelector((state) => state.auth.errors);
  return (
    <View>
      <Text>{user}</Text>
      <View>
        <TextInput
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="password"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <Button title="login" onPress={onLoginPress} />
        <Text onPress={() => navigation.navigate('Register')}>Register instead..</Text>
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

export default Login;

const styles = StyleSheet.create({
  link: { color: 'palevioletred' },
  error: { color: 'red' }
});
