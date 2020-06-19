import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { api, setToken } from '../../utils/axios';
import { login } from '../../store/actions/authAction';
import { COLORS } from '../../utils/colors';
import { CLEAR_AUTH_ERROR } from '../../store/actions/actionTypes';
import StyledButton from '../../components/StyledButton';

const Login = ({ navigation }) => {
  // TODO refactor this, see react hook form
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const dispatch = useDispatch();
  const onLoginPress = () => {
    dispatch(login({ email, password }));
    setTimeout(() => {
      dispatch({ type: CLEAR_AUTH_ERROR });
    }, 3000);
  };
  const user = useSelector((state) => state.auth.username);
  const errors = useSelector((state) => state.auth.errors);
  return (
    <View>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Hi, welcome back!</Text>
      </View>
      <View style={styles.error}>
        {errors &&
          errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error.msg}
            </Text>
          ))}
      </View>
      <View style={styles.form}>
        <Input
          label='email'
          placeholder="maman@mail.co"
          onChangeText={(text) => setEmail(text)}
          leftIcon={<Icon name="user" size={18} color={COLORS.body} />}
        />
        <Input
          secureTextEntry
          label='password'
          leftIcon={<Icon name="eye" size={18} color={COLORS.body} />}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      <StyledButton title="Log in" onPress={onLoginPress} style={styles.button} />
      <Text
        onPress={() => navigation.navigate('Register')}
        style={{
          alignSelf: 'center',
          marginVertical: 20,
          fontSize: 18,
          color: COLORS.main,
          textDecorationLine: 'underline'
        }}
      >
        Register instead..
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  link: { color: 'palevioletred' },
  errorText: { color: 'red' },
  error: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  },
  greeting: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  form: {
    marginHorizontal: 10
  },
  greetingText: { fontSize: 18, color: COLORS.title, fontWeight: '400' },
  button: { marginHorizontal: 10, marginTop: 50 }
});
