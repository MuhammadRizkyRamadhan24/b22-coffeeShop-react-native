import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Radio} from 'native-base';
import {showMessage} from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {connect} from 'react-redux';

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery_method: '',
      orders: [],
    };
  }

  setData = () => {
    this.setState({
      orders: this.props.route.params.orders,
    });
  };

  setOrders = () => {
    const delivery_method = this.state.delivery_method;
    const data = {
      ...this.state.orders,
      delivery_method,
    };
    this.setState({
      orders: data,
    });
  };

  alertButton = () => {
    if (this.props.user.data.address === null) {
      showMessage({
        message: 'Address cannot be empty!',
        type: 'danger',
        backgroundColor: '#d63031',
        color: '#fff',
      });
    }
    if (this.state.delivery_method === '') {
      showMessage({
        message: 'Please select delivery method!',
        type: 'danger',
        backgroundColor: '#d63031',
        color: '#fff',
      });
    }
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.delivery_method !== this.state.delivery_method) {
      this.setOrders();
    }
  }
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
            <Text style={styles.titleScreen}>Checkout</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperTitle}>
            <Text style={styles.title}>Delivery</Text>
          </View>
          <View style={styles.wrapperSubtitle}>
            <Text style={styles.subtitle}>Address details</Text>
          </View>
          <View style={styles.wrapperAddress}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.textAddressBold}>Iskandar Street</Text>

              <Text style={styles.textAddress}>
                {this.props.user.data.address}
              </Text>
              <Text style={styles.textAddress}>
                {this.props.user.data.phone_number}
              </Text>
            </ScrollView>
          </View>
          <View style={styles.wrapperSubtitle}>
            <Text style={styles.subtitle}>Delivery methods</Text>
          </View>
          <View style={styles.wrapperRadio}>
            <Radio.Group
              name="radio-button"
              value={this.state.delivery_method}
              onChange={nextValue => {
                this.setState({delivery_method: nextValue});
              }}>
              <Radio
                accessibilityLabel="test"
                colorScheme="gray"
                value="Door delivery">
                <Text style={styles.radio}>Door delivery</Text>
              </Radio>
              <Radio
                accessibilityLabel="test"
                colorScheme="gray"
                value="Pick up at store">
                <Text style={styles.radio}>Pick up at store</Text>
              </Radio>
              <Radio
                accessibilityLabel="test"
                colorScheme="gray"
                value="Dine in">
                <Text style={styles.radio}>Dine in</Text>
              </Radio>
            </Radio.Group>
          </View>

          {this.state.delivery_method !== '' &&
          this.props.user.data.address !== null ? (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Payment', {
                  orders: this.state.orders,
                })
              }
              style={styles.button}>
              <Text style={styles.buttonTextPayment}>Proceed to payment</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.alertButton} style={styles.button}>
              <Text style={styles.buttonTextPayment}>Proceed to payment</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps)(Delivery);

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
    marginRight: 86,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  wrapperTitle: {
    marginTop: 36,
    width: 320,
    height: 'auto',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
  },
  wrapperSubtitle: {
    marginTop: 35,
    width: 320,
    height: 'auto',
  },
  subtitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  wrapperAddress: {
    marginTop: 17,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: 320,
    height: 180,
  },
  wrapperRadio: {
    marginTop: 17,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: 320,
  },
  textAddress: {
    marginVertical: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
  },
  textAddressBold: {
    marginVertical: 5,
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  radio: {
    marginLeft: 15,
    marginTop: 1,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    marginVertical: 50,
    width: 320,
    height: 70,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextPayment: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
  },
});
