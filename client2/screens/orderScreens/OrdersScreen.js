import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { api } from '../../utils/axios';
import { COLORS } from '../../utils/colors';
import moment from 'moment';

const OrdersScreen = () => {
  const [ reservations, setReservations ] = useState([]);
  useEffect(() => {
    api.get('/users/1/orders').then(({ data }) => {
      setReservations(data);
    });
  }, []);
  return (
    <View>
      {reservations &&
        reservations.map((rsv) => {
          return (
            <View style={styles.card}>
              {rsv.dateTimes.map((date) => {
                return (
                  <View>
                    <Text style={{ fontWeight: 'bold', color: COLORS.text, fontSize: 24 }}>{date.package.name}</Text>
                    <Text style={{ fontSize: 18, color: COLORS.tertiary }}>
                      {moment(date.date).toDate().toDateString()}
                    </Text>
                  </View>
                );
              })}
              <Text>INVOICE: {rsv.order.id}</Text>
              <Text>amount: {rsv.order.total}</Text>
              <Text>
                status:{' '}
                <Text
                  style={{
                    fontSize: 18,
                    backgroundColor: COLORS.secondary,
                    borderRadius: 24,
                    color: rsv.order.status === 'pending' ? COLORS.tertiary : 'cancelled' ? 'red' : COLORS.main
                  }}
                >
                  {rsv.order.status}
                </Text>
              </Text>
              {rsv.order.status === 'pending' ? <Text>please continue payment to {rsv.order.va_number}</Text> : null}
            </View>
          );
        })}
      <Text>hello world</Text>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  card: { margin: 10, padding: 16, elevation: 3, backgroundColor: 'white' }
});
