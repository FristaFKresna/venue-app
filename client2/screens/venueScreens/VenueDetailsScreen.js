import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  Button,
  Modal
} from 'react-native';
import { api } from '../../utils/axios';
import { FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../utils/colors';
import NumberFormat from 'react-number-format';
import { ScrollView } from 'react-native-gesture-handler';

const VenueDetailsScreen = ({ route, navigation }) => {
  // TODO rapihin style
  // TODO show error
  // TODO if booked button disabled
  const [ venue, setVenue ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ datePickerShown, setDatePickerShown ] = useState(false);
  const [ date, setDate ] = useState(new Date());
  const [ venueAvailableAtDate, setVenueAvailableAtDate ] = useState([]);

  const onMakeRsv = (pkg) => {
    navigation.navigate('VenuePayment', { package: pkg, date: date.toISOString() });
  };

  const fetchVenue = () => {
    api
      .get('/venues/' + route.params.id)
      .then(({ data }) => {
        setVenue(data);
        setLoading(false);
        return api.get('/venues/' + route.params.id + '/available', {
          params: { date }
        });
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
    setLoading(true);
    setDatePickerShown(false);
    setDate(date || new Date());
  };

  const [ modalVisible, setModalVisible ] = useState(true);

  return (
    <View style={{ padding: 20 }}>
      {!loading ? (
        <View>
          <Image source={{ uri: venue.imageUrl }} style={{ height: 150 }} />
          <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{venue.name}</Text>
          <Text style={{ color: COLORS.text, fontSize: 18 }}>{venue.address}</Text>
          <View style={{ flexDirection: 'row', marginVertical: 30 }}>
            <AntDesign name="calendar" color={COLORS.body} size={60} />
            <View>
              <Text style={{ color: COLORS.text, fontWeight: 'bold', fontSize: 18 }}>
                Package available at selected date:{' '}
              </Text>
              <Text style={{ fontSize: 24, color: COLORS.tertiary }}>{date.toDateString()}</Text>
              <Text style={{ textDecorationLine: 'underline' }} onPress={() => setDatePickerShown(true)}>
                Change date!
              </Text>
            </View>
          </View>
          <FlatList
            horizontal
            data={venue.packages}
            keyExtractor={(item) => (item.id ? item.id.toString() : null)}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchVenue} />}
            renderItem={({ item }) => {
              return (
                <View style={{ backgroundColor: 'white', padding: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginVertical: 5 }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 16, marginVertical: 5 }}>Date: {date.toDateString()}</Text>
                  <Text style={{ fontSize: 16, marginVertical: 5 }}>
                    Price per/pax:{' '}
                    <NumberFormat
                      value={item.pricePerPax}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp'}
                      renderText={(text) => <Text>{text}</Text>}
                    />
                  </Text>
                  {/* <Text>end: {item.slotTimeEnds}</Text> */}
                  <Text style={{ fontSize: 16, marginVertical: 5, marginBottom: 20 }}>
                    Status:{' '}
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: !venueAvailableAtDate.includes(item.id) ? 'red' : COLORS.tertiary
                      }}
                    >
                      {venueAvailableAtDate.includes(item.id) ? 'available' : 'booked'}
                    </Text>
                  </Text>
                  <Button onPress={() => onMakeRsv(item)} title="make rsv" color={COLORS.main} />
                </View>
              );
            }}
          />
        </View>
      ) : (
        <ActivityIndicator />
      )}

      {/* showing available packages */}
      {datePickerShown && (
        <DateTimePicker mode={'date'} is24Hour={true} display="default" value={date} onChange={onChangeDate} />
      )}
      <ScrollView>
        {venue.reviews &&
          venue.reviews.map((review) => {
            return (
              <View key={review.id}>
                <Text>{review.user.username}</Text>
                <Text>{review.comment}</Text>
              </View>
            );
          })}
      </ScrollView>
      <Button
        color={COLORS.main}
        title="review"
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VenueDetailsScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});
