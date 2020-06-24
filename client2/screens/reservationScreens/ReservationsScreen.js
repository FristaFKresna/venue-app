import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
res = [
  {
    id: 1,
    userId: 3,
    dateTimes: [
      {
        id: 1,
        date: '2020-06-21',
        packageId: 1,
        reservedDateTime: {
          id: 1,
          reservationId: 1,
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
          venueId: 1
        }
      }
    ]
  },
  {
    id: 6,
    userId: 3,
    dateTimes: [
      {
        id: 3,
        date: '2020-06-21',
        packageId: 2,
        reservedDateTime: {
          id: 3,
          reservationId: 6,
          dateTimeId: 3
        },
        package: {
          id: 2,
          name: 'Stunning Sunset Package',
          description:
            '### overview\nMinimum Spending Applied\nTime Slot: 2 pm - 12 midnight\n\n### Package Include:\n* Blessing ceremony at Kamajaya Chapel (Upper Chapel) or Kamaratih Chapel (Lower Chapel with water stage).\n* 10 hours exclusive usage of the entire Kamaya’s property (2pm – 12midnight).\n* 10 hours usage of 2 preparation suites for bride and groom (2pm – 12midnight).\n  ',
          pricePerPax: '300000',
          slotTimeStarts: '14:00:00',
          slotTimeEnds: '24:00:00',
          venueId: 1
        }
      }
    ]
  }
];
const ReservationsScreen = ({ navigation }) => {
  return (
    <View>
      <Text>rsvs</Text>
      <Button
        title="goto detail"
        onPress={() => {
          navigation.navigate('ReservationDetails');
        }}
      />
    </View>
  );
};

export default ReservationsScreen;

const styles = StyleSheet.create({});
