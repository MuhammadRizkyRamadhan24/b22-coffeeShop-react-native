import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {Radio} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {REACT_APP_BASE_URL} from '@env';
import {showMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';
import {createTransaction} from '../redux/actions/transactions';
import {deleteAllItems} from '../redux/actions/carts';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_method: '',
      delivery_method: '',
      item_id: [],
      item_amount: [],
      item_variant: [],
      item_additional_price: [],
      subTotal: '',
      tax: '',
      shipping: '',
      total: '',
    };
  }

  setData = () => {
    this.setState({
      delivery_method: this.props.route.params.orders.delivery_method,
      item_id: this.props.route.params.orders.item_id,
      item_amount: this.props.route.params.orders.item_amount,
      item_variant: this.props.route.params.orders.item_variant,
      item_additional_price:
        this.props.route.params.orders.item_additional_price,
      subTotal: this.props.route.params.orders.subTotal,
      tax: this.props.route.params.orders.tax,
      shipping: this.props.route.params.orders.shipping,
      total: this.props.route.params.orders.total,
    });
  };

  componentDidMount() {
    this.setData();
  }

  payment = () => {
    const {
      item_id,
      item_amount,
      item_variant,
      item_additional_price,
      payment_method,
      delivery_method,
    } = this.state;
    const {token} = this.props.auth;
    this.props
      .createTransaction(
        item_id,
        item_amount,
        item_variant,
        item_additional_price,
        delivery_method,
        payment_method,
        token,
      )
      .then(() => {
        // ToastAndroid.showWithGravity(
        //   'Payment success',
        //   ToastAndroid.LONG,
        //   ToastAndroid.TOP,
        // );
        showMessage({
          message: 'Payment success!',
          type: 'success',
          backgroundColor: '#6A4029',
          color: '#fff',
        });
        this.props.navigation.navigate('Home');
        return this.props.deleteAllItems();
      })
      .catch(err => {
        console.log(err);
        showMessage({
          message: 'Something wrong!',
          type: 'danger',
          backgroundColor: '#d63031',
          color: '#fff',
        });
      });
  };

  alert = () => {
    Alert.alert('Payment', 'Do you want to pay for it?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.payment()},
    ]);
  };

  alertButton = () => {
    showMessage({
      message: 'Please select payment method!',
      type: 'danger',
      backgroundColor: '#d63031',
      color: '#fff',
    });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperNav}>
          <View style={styles.buttonBack}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.titleScreen}>Payment</Text>
          </View>
        </View>
        <View style={styles.wrapperSubtitle}>
          <Text style={styles.subtitle}>Products</Text>
        </View>
        <View style={styles.wrapperCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.props.carts.items.map(d => (
              <View key={d.id + d.end_price} style={styles.card}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${REACT_APP_BASE_URL}/static/images/${d.image}`,
                  }}
                />
                <View style={styles.wrapperMiddleCard}>
                  <Text style={styles.middleText}>{d.name}</Text>
                  <Text style={styles.middleText}>{d.amount}</Text>
                  <Text style={styles.middleText}>{d.variant}</Text>
                </View>
                <View style={styles.wrapperRightCard}>
                  <Text style={styles.rightText}>
                    IDR {Number(d.end_price).toLocaleString('en')}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.wrapperSubtitle}>
          <Text style={styles.subtitle}>Payment method</Text>
        </View>
        <View style={styles.wrapperRadio}>
          <Radio.Group
            name="radio-button"
            value={this.state.payment_method}
            onChange={nextValue => {
              this.setState({payment_method: nextValue});
            }}>
            <Radio accessibilityLabel="test" colorScheme="gray" value="Card">
              <MaterialIcons
                style={styles.logoRadio}
                name="credit-card"
                color="#F47B0A"
                size={30}
              />
              <Text style={styles.radio}>Card</Text>
            </Radio>
            <Radio accessibilityLabel="test" colorScheme="gray" value="Bank">
              <MaterialIcons
                style={styles.logoRadio}
                name="account-balance"
                color="#895537"
                size={30}
              />
              <Text style={styles.radio}>Bank account</Text>
            </Radio>
            <Radio accessibilityLabel="test" colorScheme="gray" value="COD">
              <MaterialIcons
                style={styles.logoRadio}
                name="delivery-dining"
                color="#FFBA33"
                size={30}
              />
              <Text style={styles.radio}>Cash on delivery</Text>
            </Radio>
          </Radio.Group>
        </View>
        {this.state.payment_method !== '' ? (
          <TouchableOpacity onPress={this.alert} style={styles.button}>
            <Text style={styles.buttonText}>Proceed payment</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.alertButton} style={styles.button}>
            <Text style={styles.buttonText}>Proceed payment</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  carts: state.carts,
});

const mapDispatchToProps = {
  createTransaction,
  deleteAllItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ECECEC',
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
    marginRight: 90,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  wrapperSubtitle: {
    marginTop: 40,
    width: 320,
    height: 'auto',
  },
  subtitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  wrapperCard: {
    marginTop: 20,
    height: 228,
    backgroundColor: '#fff',
    width: 320,
    padding: 20,
    borderRadius: 20,
  },
  card: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  image: {
    width: 64,
    height: 74,
    borderRadius: 20,
  },
  wrapperMiddleCard: {
    width: 90,
    marginLeft: 20,
    justifyContent: 'center',
  },
  middleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  wrapperRightCard: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  rightText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  wrapperRadio: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    width: 320,
    padding: 20,
    borderRadius: 20,
  },
  radio: {
    marginLeft: 10,
    marginVertical: 15,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  logoRadio: {
    marginLeft: 10,
    marginBottom: 4,
  },
  button: {
    marginVertical: 30,
    width: 320,
    height: 70,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
  },
});
