import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { api } from '../../utils/axios';

const Login = ({ navigation }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const onLoginPress = () => {
		api
			.post('/auth/login', {
				email,
				password
			})
			.then(({data}) => console.log(data.token))
			.catch(console.log);
	};
	return (
		<View>
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
				<Text onPress={() => navigation.navigate('Register')}>Register instead</Text>
			</View>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	link: { color: 'palevioletred' }
});
