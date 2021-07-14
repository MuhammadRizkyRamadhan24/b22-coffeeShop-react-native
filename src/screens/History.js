import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Spinner} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SwipeListView} from 'react-native-swipe-list-view';

import {connect} from 'react-redux';
import {getHistory, deleteTransaction} from '../redux/actions/transactions';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isUpdate: false,
    };
  }

  getHistory = () => {
    const {token} = this.props.auth;
    this.props.getHistory(token).then(() => {
      this.setState({
        isLoading: false,
      });
    });
  };

  deleteTransaction = id => {
    const {token} = this.props.auth;
    this.props.deleteTransaction(token, id).then(() => {
      this.setState({
        isUpdate: !this.state.isUpdate,
      });
      ToastAndroid.showWithGravity(
        'Success delete history',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    });
  };

  componentDidMount() {
    this.getHistory();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdate !== this.state.isUpdate) {
      this.getHistory();
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
            <Text style={styles.titleScreen}>History</Text>
          </View>
        </View>
        <View style={styles.wrapperHint}>
          <MaterialCommunityIcons
            name="gesture-swipe-left"
            color="#000"
            size={25}
          />
          <Text style={styles.textHint}>swipe on an item to delete</Text>
        </View>
        {this.state.isLoading === false ? (
          <>
            {this.props.transactions.data.length > 0 ? (
              <SwipeListView
                style={styles.wrapperCard}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                marginTop={20}
                data={this.props.transactions.data}
                renderItem={(data, rowMap) => (
                  <View style={styles.card}>
                    <Text style={styles.textCard}>{data.item.code}</Text>
                    <Text style={styles.textCard}>IDR {data.item.total}</Text>
                    <Text style={styles.textCard}>
                      {data.item.delivery_method}
                    </Text>
                  </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                  <View style={styles.behindCard}>
                    <TouchableOpacity
                      onPress={() => this.deleteTransaction(data.item.id)}
                      style={styles.buttonBehindCard}>
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        color="#fff"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                rightOpenValue={-75}
              />
            ) : (
              <View style={styles.wrapperNoCard}>
                <MaterialIcons name="shopping-cart" color="#000" size={60} />
                <Text style={styles.textNoCart}>Lets Buy Some Coffee!</Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.wrapperSpinner}>
            <Spinner color="#000" />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  transactions: state.transactions,
});

const mapDispatchToProps = {getHistory, deleteTransaction};

export default connect(mapStateToProps, mapDispatchToProps)(History);

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
    marginRight: 97,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  wrapperHint: {
    flexDirection: 'row',
    marginTop: 40,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHint: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  card: {
    marginVertical: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: 315,
    height: 110,
    borderRadius: 20,
    justifyContent: 'center',
  },
  textCard: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
  behindCard: {
    marginVertical: 5,
    marginLeft: 245,
    width: 60,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBehindCard: {
    width: 40,
    height: 40,
    backgroundColor: '#6A4029',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  wrapperCard: {
    marginVertical: 50,
    width: 315,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrapperSpinner: {
    marginVertical: 50,
    width: 315,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperNoCard: {
    marginTop: 250,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  textNoCart: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
});
