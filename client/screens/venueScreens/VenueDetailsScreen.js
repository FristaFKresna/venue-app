import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { api } from '../../utils/axios';
import { FlatList } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const VenueDetailsScreen = ({ route }) => {
  // TODO add refresh control
  // TODO rapihin style
  // TODO show error
  // TODO if booked button disabled
  // TODOalso styling
  // TODO refresh pull
  const [ venue, setVenue ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ datePickerShown, setDatePickerShown ] = useState(false);
  const [ date, setDate ] = useState(new Date());
  const [ venueAvailableAtDate, setVenueAvailableAtDate ] = useState([]);

  const onMakeRsv = (packageId) => {
    api
      .post('/users/1/reservations', { date, packageId })
      .then(({ data }) => {
        console.log(data);
        return fetchAvailablePackages()
      }).then(({data}) => {
          setVenueAvailableAtDate(data.map(elem => elem.id))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAvailablePackages = () => {
    return api.get('/venues/' + route.params.id + '/available', {
      params: { date }
    });
  };

  const fetchVenue = () => {
    api
      .get('/venues/' + route.params.id)
      .then(({ data }) => {
        setVenue(data);
        setLoading(false);
        return api.get('/venues/' + route.params.id + '/available', {
            params: { date }
          })
      })
      .then(({ data }) => {
        setVenueAvailableAtDate(data.map((elem) => elem.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(fetchVenue, [ date ]);

  const onChangeDate = (event, date) => {
    setDatePickerShown(false);
    setDate(date || new Date());
  };

  return (
    <View>
      {!loading ? (
        <View>
          <Image source={{ uri: venue.imageUrl }} style={{ height: 150 }} />
          <Text>venue name: {venue.name}</Text>
          <Text>venue adress: {venue.address}</Text>
          <FlatList
            data={venue.packages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ backgroundColor: 'white', padding: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>package name: {item.name}</Text>
                  <Text>start: {item.slotTimeStarts}</Text>
                  {/* <Text>end: {item.slotTimeEnds}</Text> */}
                  <Text>status: {venueAvailableAtDate.includes(item.id) ? 'available' : 'booked'}</Text>
                  <Text
                    onPress={() => onMakeRsv(item.id)}
                    style={{
                      color: 'palevioletred',
                      fontSize: 18,
                      fontWeight: 'bold',
                      textDecorationLine: 'underline'
                    }}
                  >
                    make rsv
                  </Text>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <ActivityIndicator />
      )}
      <View>
        <Text>select date</Text>
        <AntDesign name="calendar" size={60} onPress={() => setDatePickerShown(true)} />
      </View>

      <Text>selected date: {date.toDateString()}</Text>
      {datePickerShown && (
        <DateTimePicker mode={'date'} is24Hour={true} display="default" value={date} onChange={onChangeDate} />
      )}

      {/* showing available packages */}
    </View>
  );
};

export default VenueDetailsScreen;

const styles = StyleSheet.create({});
