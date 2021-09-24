import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';

const CardSm = props => {
  // console.log(REACT_APP_BASE_URL);
  return (
    <TouchableOpacity onPress={props.func}>
      <View style={styles.card}>
        <View style={styles.wrapperTextCard}>
          <Image
            style={styles.cardImage}
            source={{
              uri: `${REACT_APP_BASE_URL}/static/images/${props.image}`,
            }}
          />
          <Text style={styles.cardItemText}>{props.name}</Text>
          <Text style={styles.cardPriceText}>
            IDR {Number(props.price).toLocaleString('en')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
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
    fontSize: 15,
    marginTop: 15,
  },
  cardPriceText: {
    color: '#6A4029',
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    marginVertical: 10,
  },
});

export default CardSm;
