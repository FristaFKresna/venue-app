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
import { Rating, Input, AirbnbRating } from 'react-native-elements';
import { api } from '../../utils/axios';
import { FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../utils/colors';
import NumberFormat from 'react-number-format';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';

const VenueDetailsScreen = ({ route, navigation }) => {
  // TODO rapihin style
  // TODO show error
  // TODO if booked button disabled
  const [ venue, setVenue ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ datePickerShown, setDatePickerShown ] = useState(false);
  const [ date, setDate ] = useState(new Date());
  const [ venueAvailableAtDate, setVenueAvailableAtDate ] = useState([]);
  const userId = useSelector((state) => state.auth.id);
  console.log(userId);

  const fetchVenue = () => {
    setLoading(true);
    api
      .get('/venues/' + route.params.id)
      .then(({ data }) => {
        setVenue(data);
        return api.get('/venues/' + route.params.id + '/available', {
          params: { date }
        });
      })
      .then(({ data }) => {
        setVenueAvailableAtDate(data.map((elem) => elem.id));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(fetchVenue, [ date ]);

  const onMakeRsv = (pkg) => {
    navigation.navigate('VenuePayment', { package: pkg, date: date.toISOString() });
  };

  const onChangeDate = (event, date) => {
    setLoading(true);
    setDatePickerShown(false);
    setDate(date || new Date());
  };

  const onAddToWishlist = () => {
    api.post(`/users/${userId}/wishlist/venues`, {venueId: route.params.id})
    .then(() => {
      alert('succesfully added to wishlist')
    }).catch(err => {
      alert('there\'s an error, or already added to wishlist')
    })
  }
  const onSend = () => {
    api
      .post(`/users/${userId}/reviews`, {
        venueId: route.params.id,
        comment,
        rating
      })
      .then(() => {
        fetchVenue();
      })
      .catch((err) => {
        alert(err.message);
      });
    setModalVisible(false);
  };
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ comment, setComment ] = useState('');
  const [ rating, setRating ] = useState(3.5);
  return (
    <View style={{ padding: 20 }}>
      {!loading ? (
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchVenue} />}>
          <Image source={{ uri: venue.imageUrl }} style={{ height: 150 }} />
          <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{venue.name}</Text>
          <Text style={{ color: COLORS.text, fontSize: 18 }}>{venue.address}</Text>
          <TouchableOpacity
            onPress={onAddToWishlist}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: COLORS.tertiary,
              alignSelf: 'flex-end',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 18, marginHorizontal: 10, color: 'white' }}>add to wishlist</Text>
            <Icon name="heart" size={24} color="white" />
          </TouchableOpacity>
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
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                    elevation: 3,
                    marginHorizontal: 10,
                    marginVertical: 5
                  }}
                >
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
                  <Button
                    disabled={!venueAvailableAtDate.includes(item.id)}
                    onPress={() => onMakeRsv(item)}
                    title="make rsv"
                    color={COLORS.main}
                  />
                </View>
              );
            }}
          />

          {/* review */}
          <View style={{ marginVertical: 20 }}>
            {venue.reviews &&
              venue.reviews.map((review) => {
                return (
                  <View key={review.id} style={{ marginVertical: 10 }}>
                    <View style={{ alignItems: 'flex-start' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.text }}>
                        {review.user.username.toUpperCase()}
                      </Text>
                      <Rating
                        style={{ marginVertical: 5 }}
                        imageSize={10}
                        readonly
                        ratingColor={COLORS.main}
                        type="custom"
                        ratingBackgroundColor={COLORS.body}
                        ratingTextColor={COLORS.main}
                        startingValue={+review.rating}
                      />
                    </View>
                    <Text style={{ fontSize: 16, fontStyle: 'italic', color: COLORS.text }}>{review.comment}</Text>
                  </View>
                );
              })}
            <Button
              color={COLORS.main}
              title="review"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}

      {/* showing available packages */}
      {datePickerShown && (
        <DateTimePicker
          style={{ backgroundColor: COLORS.tertiary }}
          mode={'date'}
          is24Hour={true}
          display="default"
          value={date}
          onChange={onChangeDate}
        />
      )}

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
              style={{ padding: 10 }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Icon name="close" size={30} />
            </TouchableOpacity>
            <AirbnbRating
              ratingCount={5}
              defaultRating={rating}
              imageSize={40}
              onFinishRating={(rating) => {
                console.log(rating);
                setRating(rating);
              }}
            />
            <Input
              onChangeText={(text) => {
                setComment(text);
              }}
              label="comment"
            />
            <Button title="send" onPress={onSend} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VenueDetailsScreen;

const styles = StyleSheet.create({
  centeredView: {
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
