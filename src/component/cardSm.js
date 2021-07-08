import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const cardSm = props => {
  return (
    <View style={styles.card}>
      <View style={styles.wrapperTextCard}>
        <Image
          style={styles.cardImage}
          source={{
            uri: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwY3VwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
          }}
        />
        <Text style={styles.cardItemText}>Cold Brew</Text>
        <Text style={styles.cardPriceText}>IDR 20.000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 242,
    width: 156,
    margin: 7,
  },
  wrapperTextCard: {
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
    height: 212,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  cardImage: {
    height: 126,
    width: 126,
    marginTop: -30,
    borderRadius: 999,
  },
  cardItemText: {
    textAlign: 'center',
    width: 120,
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    marginTop: 15,
  },
  cardPriceText: {
    color: '#6A4029',
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    marginVertical: 10,
  },
});

export default cardSm;
