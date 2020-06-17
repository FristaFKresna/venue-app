import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import AuthNavigator from './navigation/AuthNavigator';
import { createStore, applyMiddleware } from 'redux';
import { useSelector } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import withStore from './hocs/withStore';
import DrawerNavigation from './navigation/DrawerNavigation';

function App(props) {
  const auth = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      <StatusBar />
      <NavigationContainer>{auth.username ? <AuthNavigator /> : <DrawerNavigation />}</NavigationContainer>
    </View>
  );
}

export default withStore(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
