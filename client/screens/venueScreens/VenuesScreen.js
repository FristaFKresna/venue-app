import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { loadVenues, dummyVenues } from '../../store/actions/venueActions';
import venueReducer from '../../store/reducers/venueReducer';

const VenuesScreen = ({ navigation, route }) => {
  const { venues, isLoading } = useSelector((state) => state.venue);
  console.log(venues);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(loadVenues());
    }, 3);
  }, []);

  return (
    <View>
      <FlatList
        // onRefresh={() => {console.log('refresh')}}
        // refreshing={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              dispatch(loadVenues());
            }}
          />
        }
        style={{ backgroundColor: 'white' }}
        data={venues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('VenueDetails', { id: item.id });
              }}
              style={{ backgroundColor: 'white', elevation: 3, padding: 20, marginVertical: 10, marginHorizontal: 10 }}
            >
              <Image source={{ uri: item.imageUrl }} style={{ height: 150 }} />
              <Text>title: {item.name}</Text>
              <Text>address: {item.address}</Text>
              <Text>rating: {item.rating}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

{
  /* <Button title='got to detail' onPress={() => {navigation.navigate('VenueDetails')}} /> */
}
export default VenuesScreen;

const styles = StyleSheet.create({});
