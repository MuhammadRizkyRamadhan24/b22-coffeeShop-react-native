import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const Seemore = props => {
  return (
    <TouchableOpacity onPress={props.func}>
      <Text style={styles.text}>See more</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#6A4029',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});

export default Seemore;
