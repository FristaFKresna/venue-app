import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../utils/colors';

const StyledButton = ({ title, ...props }) => {
  return (
    <TouchableOpacity {...props} style={[ styles.button, props.style ]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10
  },
  text: { color: 'white', fontWeight: '400', fontSize: 24 }
});
