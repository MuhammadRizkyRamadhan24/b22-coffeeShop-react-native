import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../component/CardXs';

import {connect} from 'react-redux';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_id: [],
      item_amount: [],
      item_variant: [],
      item_additional_price: [],
      subTotal: 0,
      tax: '10%',
      shipping: 10000,
      total: 0,
    };
  }

  setData = () => {
    const item_id = [];
    const item_amount = [];
    const item_variant = [];
    const item_additional_price = [];
    this.props.carts.items.map(element => item_id.push(element.id));
    this.props.carts.items.map(element => item_amount.push(element.amount));
    this.props.carts.items.map(element => item_variant.push(element.variant));
    this.props.carts.items.map(element =>
      item_additional_price.push(element.additional_price),
    );
    this.setState(
      {
        item_id: this.state.item_id.concat(item_id),
        item_amount: this.state.item_amount.concat(item_amount),
        item_variant: this.state.item_variant.concat(item_variant),
        item_additional_price: this.state.item_additional_price.concat(
          item_additional_price,
        ),
      },
      () => {
        const subTotal = this.props.carts.items
          .map(
            (element, idx) => element.end_price * this.state.item_amount[idx],
          )
          .reduce((acc, curr) => acc + curr);
        this.setState({
          subTotal: subTotal,
          total: subTotal + this.state.shipping + subTotal * (10 / 100),
        });
      },
    );
  };

  componentDidMount() {
    if (this.props.carts.items.length > 0) {
      this.setData();
    }
  }

  setDataUpdate = () => {
    if (this.props.carts.items.length === 0) {
      this.setState({
        item_id: [],
        item_amount: [],
        item_variant: [],
        item_additional_price: [],
        subTotal: 0,
        tax: '10%',
        shipping: 10000,
        total: 0,
      });
    }
    if (this.props.carts.items.length > 0) {
      const item_id = [];
      const item_amount = [];
      const item_variant = [];
      const item_additional_price = [];
      this.props.carts.items.map(element => item_id.push(element.id));
      this.props.carts.items.map(element => item_amount.push(element.amount));
      this.props.carts.items.map(element => item_variant.push(element.variant));
      this.props.carts.items.map(element =>
        item_additional_price.push(element.additional_price),
      );
      this.setState({
        item_id: item_id,
        item_amount: item_amount,
        item_variant: item_variant,
        item_additional_price: item_additional_price,
      });
      // console.log(this.props.carts.items, 'hehe');
      const subTotal = this.props.carts.items
        .map((element, idx) => element.end_price * element.amount)
        .reduce((acc, curr) => acc + curr);
      this.setState({
        subTotal: subTotal,
        total: subTotal + this.state.shipping + subTotal * (10 / 100),
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.carts !== this.props.carts) {
      this.setDataUpdate();
    }
  }

  render() {
    // console.log(this.props.carts.items);
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperNav}>
          <View style={styles.buttonBack}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.titleScreen}>My Cart</Text>
          </View>
        </View>
        <View style={styles.wrapperCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.props.carts.items.map(d => (
              <Card key={d.id} data={d} />
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Coupon')}
          style={styles.button}>
          <Text style={styles.buttonTextCoupon}>Apply Delivery Coupons</Text>
        </TouchableOpacity>
        <View style={styles.wrapperContent}>
          <Text style={styles.contentTextLeft}>Item Total</Text>
          <View style={styles.contentRight}>
            <Text style={styles.contentTextRight}>
              IDR {this.state.subTotal}
            </Text>
          </View>
        </View>
        <View style={styles.wrapperContent}>
          <Text style={styles.contentTextLeft}>Delivery Charge</Text>
          <View style={styles.contentRight}>
            <Text style={styles.contentTextRight}>
              IDR {this.state.shipping}
            </Text>
          </View>
        </View>
        <View style={styles.wrapperContent}>
          <Text style={styles.contentTextLeft}>Tax</Text>
          <View style={styles.contentRight}>
            <Text style={styles.contentTextRight}>{this.state.tax}</Text>
          </View>
        </View>
        <View style={styles.wrapperTotal}>
          <Text style={styles.totalTextLeft}>Total</Text>
          <View style={styles.totalRight}>
            <Text style={styles.totalTextRight}>IDR {this.state.total}</Text>
          </View>
        </View>
        {this.props.carts.items.length === 0 ? (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTextCheckout}>CHECKOUT</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Delivery', {orders: this.state})
            }
            style={styles.button}>
            <Text style={styles.buttonTextCheckout}>CHECKOUT</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products,
  carts: state.carts,
});

export default connect(mapStateToProps)(Cart);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#BCBABA',
    alignItems: 'center',
  },
  wrapperNav: {
    alignItems: 'center',
    marginTop: 48,
    width: 320,
    height: 'auto',
    flexDirection: 'row',
  },
  buttonBack: {
    marginRight: 92,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  wrapperCard: {
    height: 360,
    marginTop: 20,
    width: 320,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    width: 320,
    height: 70,
    backgroundColor: '#FFBA33',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextCoupon: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  buttonTextCheckout: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
  },
  wrapperContent: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentTextLeft: {
    marginVertical: 5,
    width: '50%',
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#8a8a8a',
  },
  contentRight: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  contentTextRight: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  wrapperTotal: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  totalTextLeft: {
    marginVertical: 5,
    width: '50%',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  totalRight: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  totalTextRight: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
});
