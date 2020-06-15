import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

const Register = ({ navigation }) => {
	return (
		<View>
			<View>
				<TextInput placeholder="username" />
				<TextInput placeholder="email" />
				<TextInput placeholder="password" />
				<TextInput placeholder="confirm password" />
				<Button title="register" />
				<Text onPress={() => navigation.navigate('Login')}>Login instead</Text>
			</View>
		</View>
	);
};

export default Register;

const styles = StyleSheet.create({
	link: { color: 'palevioletred' }
});
