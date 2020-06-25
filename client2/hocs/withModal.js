import React, { useState } from 'react';
import { TouchableOpacity, Modal, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../utils/colors';

export default (Component) => {
  return ({modalVisible, onPress}) => {
    
    return (
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
              onPress={onPress}
            >
              <Icon name="close" size={30} />
            </TouchableOpacity>
            <Component />
          </View>
        </View>
      </Modal>
    );
  };
};

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
