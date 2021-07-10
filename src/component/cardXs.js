import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';

import {connect} from 'react-redux';
import {setOrders} from '../redux/actions/carts';

const cardXs = props => {
  const data = props.data;

  const plusOrder = orderData => {
    let orders = props.carts.items;
    let getIndex;
    orders.map((order, index) => {
      if (
        order.additional_price === orderData.additional_price &&
        order.amount === orderData.amount &&
        order.end_price === orderData.end_price &&
        order.id === orderData.id &&
        order.image === orderData.image &&
        order.name === orderData.name &&
        order.variant === orderData.variant
      ) {
        getIndex = index;
      }
    });
    orders[getIndex].amount += 1;
    props.setOrders(orders);
  };

  const minusOrder = orderData => {
    let orders = props.carts.items;
    let getIndex;
    orders.map((order, index) => {
      if (
        order.additional_price === orderData.additional_price &&
        order.amount === orderData.amount &&
        order.end_price === orderData.end_price &&
        order.id === orderData.id &&
        order.image === orderData.image &&
        order.name === orderData.name &&
        order.variant === orderData.variant
      ) {
        getIndex = index;
      }
    });
    if (orders[getIndex].amount === 0) {
      ToastAndroid.showWithGravity(
        'cannot be less than 0',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } else {
      orders[getIndex].amount -= 1;
    }

    props.setOrders(orders);
  };
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={styles.backgroundCardLeft}>
          <Image
            style={styles.image}
            source={{
              uri: `${REACT_APP_BASE_URL}/static/images/${data.image}`,
            }}
          />
          <Text style={styles.textPrice}>IDR {data.end_price}</Text>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.textItem}>{data.name}</Text>
        <View style={styles.wrapperCounter}>
          <TouchableOpacity
            onPress={() => minusOrder(data)}
            style={styles.buttonCounter}>
            <Text style={styles.buttonTextCounter}>-</Text>
          </TouchableOpacity>
          <Text style={styles.textCounter}>{data.amount}</Text>
          <TouchableOpacity
            onPress={() => plusOrder(data)}
            style={styles.buttonCounter}>
            <Text style={styles.buttonTextCounter}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  carts: state.carts,
});

const mapDispatchToProps = {
  setOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(cardXs);

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
