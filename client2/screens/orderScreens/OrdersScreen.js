import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, RefreshControl, ActivityIndicator } from 'react-native';
import { api } from '../../utils/axios';
import { COLORS } from '../../utils/colors';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingScreen from '../LoadingScreen';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const OrdersScreen = () => {
  const [ reservations, setReservations ] = useState([]);
  const [ refreshing, setRefresh ] = useState(false);
  const [loading, setLoading] = useState(true)
  const userId = useSelector((state) => state.auth.id);

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      api
        .get(`/users/${userId}/orders`)
        .then(({ data }) => {
          setReservations(data);
          setLoading(false)
        })
        .catch((err) => {
          alert('terjadi kesalahan');
        });
    }, [])
  );
  
  const handleRefresh = async () => {
    api
      .get(`/users/${userId}/orders`, { date: new Date().getTime() })
      .then(({ data }) => {
        setRefresh(false);
        setLoading(false)
        console.log('inside');
        console.log(data);
        setReservations(data);
      })
      .catch((err) => {
        setRefresh(false);
        setLoading(false)
        alert('terjadi kesalahan');
      });
  };
  return ( !loading ?
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      {reservations && reservations.length > 0 ? (
        reservations.map((rsv) => {
          return (
            <View style={styles.card} key={rsv.order.id}>
              {rsv.dateTimes.map((date, index) => {
                return (
                  <View key={index}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.text, fontSize: 24 }}>{date.package.name}</Text>
                    <Text style={{ fontSize: 18, color: COLORS.tertiary }}>
                      {moment(date.date).toDate().toDateString()}
                    </Text>
                  </View>
                );
              })}
              <Text>INVOICE: {rsv.order.id}</Text>
              <Text>order date: {new Date(rsv.order.createdAt).toLocaleTimeString()} WIB</Text>
              <Text>amount: {rsv.order.total}</Text>
              <Text>
                status:{' '}
                <Text
                  style={{
                    fontSize: 18,
                    backgroundColor: COLORS.secondary,
                    borderRadius: 24,
                    color: rsv.order.status === 'success' ? 'green' : 'red'
                  }}
                >
                  {rsv.order.status}
                </Text>
              </Text>
              {rsv.order.status === 'pending' ? <Text>please continue payment to {rsv.order.va_number}</Text> : null}
            </View>
          );
        })
      ) : (
        <LoadingScreen text="No orders yet" />
      )}
    </ScrollView>
  : <ActivityIndicator />);
};

export default OrdersScreen;

const styles = StyleSheet.create({
  card: { margin: 10, padding: 16, elevation: 3, backgroundColor: 'white' }
});
