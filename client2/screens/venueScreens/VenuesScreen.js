import React, { useEffect, useState, useCallback } from 'react';
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
import VenueCard from '../../components/VenueCard';
import { useFocusEffect } from '@react-navigation/native';

const VenuesScreen = ({ navigation, route }) => {
  const { venues, isLoading } = useSelector((state) => state.venue);
  const [ cities, setCities ] = useState([]);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ modalSortVisible, setModalSortVisible ] = useState(false);
  const [ city, setCity ] = useState(null);
  const [ byRating, setByRating ] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('rating')
  console.log(venues);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(loadVenues());
    }, [])
  );

  // get cities for filtering options
  useEffect(() => {
    api
      .get('/venues/cities')
      .then(({ data }) => {
        setCities(data);
      })
      .catch((err) => {
        alert('terjadi kesalahan' + err.response.data.msg);
      });
  }, []);

  const onFilter = () => {
    dispatch(loadVenues({ city, sortBy: selectedFilter }));
    setModalVisible(false);
  };
  
  const onSort = () => {
    dispatch(loadVenues({ city, sortBy: selectedFilter }));
    setModalSortVisible(false);
  };
  const Filter = () => (
    <View>
      <Text>filter by city: </Text>
      <Picker
        selectedValue={city}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
      >
        {cities.map((elem) => {
          return <Picker.Item key={elem} label={elem.toUpperCase()} value={elem} />;
        })}
        <Picker.Item label="All" value={null} />
      </Picker>
      <Button title="ok" onPress={onFilter} />
    </View>
  );

  const Sort = () => (
    <View>
      <Text>sort by </Text>
      <Picker
        selectedValue={selectedFilter}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedFilter(itemValue)}
      >
        <Picker.Item label="rating" value={'rating'} />
        <Picker.Item label="price" value={'price'} />
      </Picker>
      <Button title="ok" onPress={onSort} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 24, color: COLORS.text }}>Venue in all cities, all countries</Text>
      <Input
        onEndEditing={() => {
          console.log('end edit called');
        }}
        rightIcon={{ type: 'font-awesome', name: 'search', color: COLORS.body }}
      />
      <View style={{ flexDirection: 'row' }}>
        <BreadCrumbs
          title="filter"
          onPress={() => {
            setModalVisible(true);
          }}
          icon="tune"
        />
        <BreadCrumbs
          title="sort by"
          icon="sort"
          onPress={() => {
            setModalSortVisible(true);
          }}
        />
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
          return <VenueCard item={item} navigation={navigation} />;
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
            <Filter />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSortVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                setModalSortVisible(!modalSortVisible);
              }}
            >
              <Icon name="close" size={30} />
            </TouchableOpacity>
            <Sort />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VenuesScreen;

const styles = StyleSheet.create({
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
