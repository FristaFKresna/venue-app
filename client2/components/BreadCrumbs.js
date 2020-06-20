import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS } from '../utils/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const BreadCrumbs = ({title,icon, ...props}) => {
    return (
        <TouchableOpacity {...props} style={[ styles.button, props.style ]}>
        <Icon name={icon} size={16} color={COLORS.main} style={{marginHorizontal: 5}} />
        <Text style={styles.text}>{title.toUpperCase()}</Text>
      </TouchableOpacity>
    )
}

export default BreadCrumbs

const styles = StyleSheet.create({
    button: {
      borderColor: COLORS.main,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      paddingVertical: 4,
      paddingHorizontal: 16,
      marginLeft: 10,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    text: { color: COLORS.main, fontWeight: '400', fontSize: 18 }
  });
