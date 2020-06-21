import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  RefreshControl,
  Modal,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Rating, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { loadVenues, dummyVenues } from '../../store/actions/venueActions';
import venueReducer from '../../store/reducers/venueReducer';
import { COLORS } from '../../utils/colors';
import BreadCrumbs from '../../components/BreadCrumbs';
import Icon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-community/picker';
import { api } from '../../utils/axios';

const VenuesScreen = ({ navigation, route }) => {
  const { venues, isLoading } = useSelector((state) => state.venue);
  const [cities, setCities] = useState([])
  console.log(venues);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(loadVenues());
    }, 3);
  }, []);

  useEffect(() => {
    api.get('/venues/cities')
    .then(({data}) => {
      setCities(data)
    }).catch(err => {
      alert('terjadi kesalahan' + err.response.data.msg)
    })
  }, [])

  const [ modalVisible, setModalVisible ] = useState(false);
  const [ city, setCity ] = useState(null);

  const onFilter = () => {
    dispatch(loadVenues({city: city}))
    setModalVisible(false)
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 24, color: COLORS.text }}>Venue in all cities, all countries</Text>
      <Input onEndEditing={() => {console.log('end edit called')}} rightIcon={{type: 'font-awesome', name: 'search', color: COLORS.body}} />
      <View style={{ flexDirection: 'row' }}>
        <BreadCrumbs
          title="filter"
          onPress={() => {
            setModalVisible(true);
          }}
          icon="tune"
        />
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
        keyExtractor={(item) => (item.id ? item.id.toString() : null)}
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
                ratingBackgroundColor={COLORS.body}
                ratingTextColor={COLORS.main}
                startingValue={+item.rating}
                style={styles.rating}
              />
            </TouchableOpacity>
          );
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
              style={{ padding: 10 }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Icon name="close" size={30} />
            </TouchableOpacity>
              <Text>filter by city: </Text>
            <Picker
              selectedValue={city}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
            >
              {cities.map(elem => {
                return <Picker.Item key={elem} label={elem.toUpperCase()} value={elem} />
              })}
              <Picker.Item label="All" value={null} />
            </Picker>
            <Button title='ok' onPress={onFilter} />
          </View>
        </View>
      </Modal>
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
    flex: 1
  },
  centeredView: {
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.tertiary,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    }
  }
});
