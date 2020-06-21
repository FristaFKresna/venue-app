import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/actions/authAction';
import { CommonActions } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const handleSignOut = () => {
    dispatch(signOut());
    navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Venues',
            },
          ],
        })
      );
  };
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <View>
      <Image source={{ uri: user.avatar }} style={{ width: 128, height: 128 }} />
      <Text>{user.firstName}</Text>
      <Text>{user.lastName}</Text>
      <Button title="sign out" onPress={handleSignOut} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
