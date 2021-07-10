import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Spinner, Input} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {connect} from 'react-redux';
// import {getDataByCategories} from '../redux/actions/products';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    return (
      <>
        <View style={styles.wrapper}>
          <View style={styles.wrapperNav}>
            <View style={styles.buttonBack}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.titleScreen}>Search</Text>
            </View>
          </View>
          <View style={styles.wrapperInput}>
            <Input
              InputLeftElement={
                <MaterialIcons
                  style={styles.iconInput}
                  name="search"
                  color="#000"
                  size={30}
                />
              }
              style={styles.input}
              variant="rounded"
              placeholder="Search"
              borderColor="#000"
              color="#000"
            />
          </View>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperCard}>
              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={styles.wrapperTextCard}>
                    <Image
                      style={styles.cardImage}
                      source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
                      }}
                    />
                    <Text style={styles.cardItemText}>Coffee</Text>
                    <Text style={styles.cardPriceText}>IDR 20.000</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={styles.wrapperTextCard}>
                    <Image
                      style={styles.cardImage}
                      source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
                      }}
                    />
                    <Text style={styles.cardItemText}>Coffee</Text>
                    <Text style={styles.cardPriceText}>IDR 20.000</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={styles.wrapperTextCard}>
                    <Image
                      style={styles.cardImage}
                      source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
                      }}
                    />
                    <Text style={styles.cardItemText}>Coffee</Text>
                    <Text style={styles.cardPriceText}>IDR 20.000</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={styles.wrapperTextCard}>
                    <Image
                      style={styles.cardImage}
                      source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
                      }}
                    />
                    <Text style={styles.cardItemText}>Coffee</Text>
                    <Text style={styles.cardPriceText}>IDR 20.000</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={styles.wrapperTextCard}>
                    <Image
                      style={styles.cardImage}
                      source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
                      }}
                    />
                    <Text style={styles.cardItemText}>Coffee</Text>
                    <Text style={styles.cardPriceText}>IDR 20.000</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={styles.wrapperTextCard}>
                    <Image
                      style={styles.cardImage}
                      source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
                      }}
                    />
                    <Text style={styles.cardItemText}>Coffee</Text>
                    <Text style={styles.cardPriceText}>IDR 20.000</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={styles.wrapperTextCard}>
                    <Image
                      style={styles.cardImage}
                      source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
                      }}
                    />
                    <Text style={styles.cardItemText}>Coffee</Text>
                    <Text style={styles.cardPriceText}>IDR 20.000</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

// const mapStateToProps = state => ({
//   auth: state.auth,
//   products: state.products,
// });

// const mapDispatchToProps = {getDataByCategories};

// export default connect(mapStateToProps, mapDispatchToProps)(Search);

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
  wrapperInput: {
    top: 30,
    width: 320,
  },
  input: {
    fontFamily: 'Poppins-SemiBold',
  },
  iconInput: {
    marginLeft: 10,
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
  scrollView: {
    marginTop: 50,
  },
  wrapperCard: {
    width: 340,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
