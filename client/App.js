import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import {StatusBar, StyleSheet, View } from 'react-native';

import AuthNavigator from './navigation/AuthNavigator';

export default function App(props) {
	return (
		<View style={styles.container}>
      <StatusBar />
			<NavigationContainer>
        <AuthNavigator />
			</NavigationContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});
