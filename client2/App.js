import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import AuthNavigator from './navigation/AuthNavigator';
import { useSelector, useDispatch } from 'react-redux';
import withStore from './hocs/withStore';
import DrawerNavigation from './navigation/DrawerNavigation';
import VerificationScreen from './screens/VerificationScreen';
import { setToken, api } from './utils/axios';
import { SET_USER } from './store/actions/actionTypes';
import LoadingScreen from './screens/LoadingScreen';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
};

function App(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    setLoading(true)
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          setToken(token);
          return api.post('/auth/deserialize');
        }
      })
      .then(({ data }) => {
        dispatch({ type: SET_USER, payload: { ...data } });
        setLoading(false)
      });
  }, []);
  const auth = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      {/* <StatusBar /> */}
      {!loading ? <NavigationContainer theme={MyTheme}>
        {!auth.id ? <AuthNavigator /> : auth.isVerified ? <DrawerNavigation /> : <VerificationScreen />}
      </NavigationContainer> : <LoadingScreen text='venue-app loading..' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default withStore(App);
