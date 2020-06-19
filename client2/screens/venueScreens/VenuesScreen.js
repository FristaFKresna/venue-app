import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { Rating } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { loadVenues, dummyVenues } from '../../store/actions/venueActions';
import venueReducer from '../../store/reducers/venueReducer';
import { COLORS } from '../../utils/colors';
import BreadCrumbs from '../../components/BreadCrumbs';

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
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 24, color: COLORS.text }}>Venue in all cities, all countries</Text>
      <View style={{ flexDirection: 'row' }}>
        <BreadCrumbs title="filter" icon="tune" />
        <BreadCrumbs title="sort by" icon="sort" />
      </View>

      <FlatList
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
              style={{ backgroundColor: 'white', elevation: 3, padding: 20, marginVertical: 10, marginHorizontal: 5 }}
            >
              <Image source={{ uri: item.imageUrl }} style={{ height: 150 }} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.address}>{item.city.toUpperCase()}, ID</Text>
              <Rating
                imageSize={10}
                readonly
                ratingColor={COLORS.main}
                type="custom"
                ratingTextColor={COLORS.main}
                startingValue={+item.rating}
                style={styles.rating}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default VenuesScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: COLORS.text,
    fontSize: 18,
    marginTop: 10
  },
  address: {
    color: COLORS.text,
    marginBottom: 5
  },
  rating: {
    alignSelf: 'flex-start',
    marginVertical: 5
  },
  container: {
    paddingHorizontal: 10,
    flex: 1,
  }
});
