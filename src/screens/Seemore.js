import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Spinner} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../component/cardSm';

import {connect} from 'react-redux';
import {getDataByCategories} from '../redux/actions/products';

class Seemore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  getData = () => {
    const {token} = this.props.auth;
    const id = this.props.route.params.id;
    this.props.getDataByCategories(id, token).then(() => {
      this.setState({
        isLoading: false,
      });
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <>
        {this.state.isLoading !== true ? (
          <View style={styles.wrapper}>
            <View style={styles.wrapperNav}>
              <View style={styles.buttonBack}>
                <TouchableOpacity>
                  <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.titleScreen}>Favorite Products</Text>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.wrapperCard}>
                {/* <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card /> */}
                {this.props.products.data.map(d => (
                  <Card
                    func={() =>
                      this.props.navigation.navigate('ProductDetail', {
                        id: d.id,
                      })
                    }
                    key={d.id}
                    name={d.name}
                    price={d.price}
                    image={d.image}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.wrapperSpinner}>
            <Spinner color="#000" />
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products,
});

const mapDispatchToProps = {getDataByCategories};

export default connect(mapStateToProps, mapDispatchToProps)(Seemore);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#BCBABA',
    alignItems: 'center',
  },
  wrapperSpinner: {
    flex: 1,
    backgroundColor: '#BCBABA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperNav: {
    alignItems: 'center',
    marginTop: 48,
    width: 320,
    height: 'auto',
    flexDirection: 'row',
  },
  buttonBack: {
    marginRight: 50,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  wrapperCard: {
    marginTop: 50,
    width: 340,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
