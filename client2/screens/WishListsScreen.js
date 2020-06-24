import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../utils/axios';
import { useSelector } from 'react-redux';
import WishlistCard from '../components/WishListCard';

const WishListsScreen = ({ navigation }) => {
  const userId = useSelector((state) => state.auth.id);
  const [ wish, setWish ] = useState({});
  const [ err, setErr ] = useState(null);
  const fetchWishList = () => {
    api
    .get(`/users/${userId}/wishlist`)
    .then(({ data }) => {
      setWish(data);
      setErr(null);
    })
    .catch((err) => {
      setErr(err.message);
    });
  }
  useFocusEffect(
    useCallback(() => {
      api
        .get(`/users/${userId}/wishlist`)
        .then(({ data }) => {
          setWish(data);
          setErr(null);
        })
        .catch((err) => {
          setErr(err.message);
        });
    }, [])
  );
  console.log(wish);
  console.log('error adalah', err);

  const onDelete = (venueId) => {
    api.delete(`/users/${userId}/wishlist/venues/${venueId}`)
    .then(({ data }) => {
        fetchWishList()
        setErr(null);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }
  return (
    <View style={styles.container}>
        <Text style={{fontSize: 24}}>My Venue wishlist</Text>
      {err && (
        <View>
          <Text>{err}</Text>
        </View>
      )}
      {wish.venues && wish.venues.length > 0 ? (
        <View>
          {wish.venues.map((venue) => {
            return <WishlistCard onIconPress={() => {onDelete(venue.id)}} key={venue.id} item={venue} navigation={navigation} />;
          })}
        </View>
      ) : (
        <View>
          <Text>no wish yet</Text>
        </View>
      )}
    </View>
  );
};

export default WishListsScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10
    }
});
