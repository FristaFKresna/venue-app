import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';
import { register } from '../../store/actions/authAction';
import StyledButton from '../../components/StyledButton';
import { COLORS } from '../../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';

const Register = ({ navigation }) => {
  // TODO refactor this, see react hook form
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ re_password, setRe_password ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ role, setRole ] = useState(null);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.auth.errors);
  const onRegisterPress = () => {
    dispatch(register({ username, password, re_password, email, role }));
  };
  return (
    <KeyboardAvoidingView>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Hi, tell me who you are</Text>
      </View>
      <View style={styles.error}>
        {errors &&
          errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error.msg}
            </Text>
          ))}
      </View>
      <View>
        <Input
          leftIcon={{ type: 'font-awesome', name: 'user', color: COLORS.body }}
          label="username"
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: COLORS.body }}
          label="email"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          leftIcon={{ type: 'font-awesome', name: 'eye', color: COLORS.body }}
          label="password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input label="confirm password" secureTextEntry onChangeText={(text) => setRe_password(text)} />
        <Picker
          selectedValue={role}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
        >
          <Picker.Item label="Rentee" value="rentee" />
          <Picker.Item label="Renter(coming soon)" value={null} />
        </Picker>
        <StyledButton title="register" onPress={onRegisterPress} style={styles.button} />
        <Text onPress={() => navigation.navigate('Login')}>Login instead</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  link: { color: 'palevioletred' },
  error: { color: 'red' },
  greeting: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  button: { marginHorizontal: 10, marginTop: 10 },
  errorText: { color: 'red' },
  error: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  },
});
