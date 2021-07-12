import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Subtitle = props => {
  return <Text style={styles.text}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#6A4029',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
});

export default Subtitle;
