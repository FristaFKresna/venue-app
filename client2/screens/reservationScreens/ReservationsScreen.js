import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { COLORS } from '../../utils/colors';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../utils/axios';
import { useSelector } from 'react-redux';
import authReducer from '../../store/reducers/authReducer';

const ReservationsScreen = ({ navigation }) => {
  const [ rsvs, setRsvs ] = useState([]);

  const userId= useSelector(state => state.auth.id)

  useFocusEffect(useCallback(() => {
    api.get(`/users/${userId}/reservations`).then(({data}) => {
      setRsvs(data)
    }).catch(err => {
      console.log(err)
    })
  }, []))
  
  return rsvs.length > 0 ? (
    <View style={{ elevation: 3, margin: 10, padding: 10, backgroundColor: 'white' }}>
      {rsvs.map((rsv) => {
        return (
          <View style={styles.card} key={rsv.order.id}>
            {rsv.dateTimes.map((date, index) => {
              return (
                <View key={index}>
                  <Image source={{ uri: date.package.venue.imageUrl }} style={{ width: 128, height: 64 }} />
                  <Text style={{ fontWeight: 'bold', color: COLORS.text, fontSize: 24 }}>{date.package.name}</Text>
                  <Text style={{ fontSize: 18, color: COLORS.tertiary }}>
                    {moment(date.date).toDate().toDateString()}
                  </Text>
                </View>
              );
            })}
            <Text>INVOICE: {rsv.order.id}</Text>
            <Text>order date: {new Date(rsv.order.createdAt).toLocaleTimeString()} WIB</Text>
            <NumberFormat
              value={rsv.order.total}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp'}
              renderText={(text) => <Text>{text}</Text>}
            />
          </View>
        );
      })}
    </View>
  ) : (
    <Text>no rsvs yet</Text>
  );
};

export default ReservationsScreen;

const styles = StyleSheet.create({});
