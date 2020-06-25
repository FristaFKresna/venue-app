import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Rating } from 'react-native-elements';
import { COLORS } from '../utils/colors';
import Icon from 'react-native-vector-icons/AntDesign';

const VenueCard = ({ item, navigation, onIconPress }) => {
  return (
    <View style={{ backgroundColor: 'white', elevation: 3, padding: 20, marginVertical: 10, marginHorizontal: 5 }}>
      <Image source={{ uri: item.imageUrl }} style={{ height: 150 }} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.address}>{item.city.toUpperCase()}, ID</Text>
      {/* <Rating
        imageSize={10}
        readonly
        ratingColor={COLORS.main}
        type="custom"
        ratingBackgroundColor={COLORS.body}
        ratingTextColor={COLORS.main}
        startingValue={+item.rating}
        style={styles.rating}
      /> */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

      <TouchableOpacity onPress={onIconPress}>
        <Icon name="delete" size={30} color={COLORS.danger} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('VenueDetails', { id: item.id });
        }}
      >
        <Icon name="infocirlce" size={30} color={COLORS.tertiary} />
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default VenueCard;

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
  }
});
