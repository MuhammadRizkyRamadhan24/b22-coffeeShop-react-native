import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';

const CardLg = props => {
  return (
    <TouchableOpacity onPress={props.func}>
      <View style={styles.card}>
        <View style={styles.cardWrapper}>
          <Image
            style={styles.cardImage}
            source={{
              uri: `${REACT_APP_BASE_URL}/static/images/${props.image}`,
            }}
          />
          <Text style={styles.itemName}>{props.name}</Text>
          <Text style={styles.itemPrice}>IDR {props.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 300,
    width: 220,
    marginRight: 38,
  },
  cardWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: 270,
    marginTop: 30,
    borderRadius: 30,
  },
  cardImage: {
    width: 168,
    height: 189,
    borderRadius: 20,
    marginTop: -30,
  },
  itemName: {
    width: 170,
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
  },
  itemPrice: {
    textAlign: 'center',
    color: '#6A4029',
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
});

export default CardLg;
