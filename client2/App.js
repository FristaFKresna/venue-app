import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import AuthNavigator from './navigation/AuthNavigator';
import { useSelector } from 'react-redux';
import withStore from './hocs/withStore';
import DrawerNavigation from './navigation/DrawerNavigation';
import VerificationScreen from './screens/VerificationScreen';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
};

function App(props) {
  const auth = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      {/* <StatusBar /> */}
      <NavigationContainer theme={MyTheme}>
        {!auth.username ? <AuthNavigator /> : auth.isVerified ? <DrawerNavigation /> : <VerificationScreen />}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default withStore(App);
