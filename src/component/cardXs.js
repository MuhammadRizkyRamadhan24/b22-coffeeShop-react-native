import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const cardXs = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={styles.backgroundCardLeft}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwY3VwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
            }}
          />
          <Text style={styles.textPrice}>IDR 20.000</Text>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.textItem}>Cold Brew</Text>
        <View style={styles.wrapperCounter}>
          <TouchableOpacity style={styles.buttonCounter}>
            <Text style={styles.buttonTextCounter}>-</Text>
          </TouchableOpacity>
          <Text style={styles.textCounter}>30</Text>
          <TouchableOpacity style={styles.buttonCounter}>
            <Text style={styles.buttonTextCounter}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
    height: 160,
  },
  cardLeft: {
    width: '40%',
  },
  backgroundCardLeft: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 135,
    marginTop: 25,
    borderRadius: 30,
  },
  image: {
    marginTop: -25,
    height: 110,
    width: 110,
    borderRadius: 999,
  },
  textPrice: {
    marginTop: 12,
    color: '#895537',
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
  cardRight: {
    height: '100%',
    justifyContent: 'center',
    marginLeft: 20,
  },
  textItem: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  wrapperCounter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonCounter: {
    marginTop: 10,
    backgroundColor: 'rgba(231, 170, 54, 0.52)',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonTextCounter: {
    marginTop: 2,
    fontSize: 17,
    color: '#6A4029',
    fontFamily: 'Poppins-Bold',
  },
  textCounter: {
    marginTop: 2,
    marginHorizontal: 20,
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
});

export default cardXs;
