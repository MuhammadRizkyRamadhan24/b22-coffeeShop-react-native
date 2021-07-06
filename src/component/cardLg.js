import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const cardLg = props => {
  return (
    <TouchableOpacity onPress={props.func}>
      <View style={styles.card}>
        <View style={styles.cardWrapper}>
          <Image
            style={styles.cardImage}
            source={{
              uri: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwY3VwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
            }}
          />
          <Text style={styles.itemName}>Hazelnut Latte</Text>
          <Text style={styles.itemPrice}>IDR 25.000</Text>
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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

export default cardLg;
