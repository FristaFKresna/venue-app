import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { COLORS } from '../../utils/colors';
import moment from 'moment';

const ReservationsScreen = ({ navigation }) => {
  const [ rsvs, setRsvs ] = useState([
    {
      id: 2,
      userId: 3,
      dateTimes: [
        {
          id: 1,
          date: '2020-06-24',
          packageId: 1,
          reservedDateTime: {
            id: 1,
            reservationId: 2,
            dateTimeId: 1
          },
          package: {
            id: 1,
            name: 'Morning Bliss',
            description:
              '### Overview\nFor min 30 guests - Time Slot: 07 am - 12pm\nat Kamayajaya (Upper Chapel) or Kamaratih (Lower Chapel)\n\n### Package Include: \n* Blessing ceremony at Kamajaya Chapel (Upper Chapel) or Kamaratih Chapel (Lower Chapel with water stage).\n* 5 hours exclusive usage of the entire Kamaya’s Property (7am – 12noon).\n  ',
            pricePerPax: '200000',
            slotTimeStarts: '07:00:00',
            slotTimeEnds: '12:00:00',
            venueId: 1,
            venue: {
              id: 1,
              name: 'Kamaya Bali',
              address: 'Jl. Pantai Suluban - Uluwatu, Bali - Indonesia 80361',
              location: {
                type: 'Point',
                coordinates: [ -8.816237, 115.088825 ]
              },
              imageUrl:
                'https://london.bridestory.com/images/c_fill,dpr_2.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/kamaya-4-ry0xpiuj8/kamaya-bali_kamaya-bali-weddings1590373599_1.jpg',
              city: 'bali',
              userId: 1
            }
          }
        }
      ],
      order: {
        id: 'fab304e4-729d-45b6-98ad-cfe20b0d834a',
        total: '6000000',
        status: 'success',
        va_number: 55676797995,
        transaction_id: '8b453ecc-b1e6-472d-af6d-a0d4a47521c6',
        createdAt: '2020-06-24T15:28:52.000Z',
        updatedAt: '2020-06-24T15:29:58.000Z',
        reservationId: 2
      }
    }
  ]);
  return rsvs.length > 0 ? (
    <View>
      {rsvs.map((rsv) => {
        return (
          <View style={styles.card} key={rsv.order.id}>
            <Image />
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
