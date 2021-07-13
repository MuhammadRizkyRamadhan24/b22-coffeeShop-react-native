import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Input, Radio, Spinner} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {REACT_APP_BASE_URL} from '@env';

import {connect} from 'react-redux';
import {getUserById, changeUser} from '../redux/actions/user';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isUpdate: false,
      isDatePickerVisible: false,
      date: '2001-01-01',
      pictureUri: '',
      picture: null,
      display_name: '',
      gender: '',
      email: '',
      phone_number: '',
      date_birth: '',
      address: '',
    };
  }
  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = dates => {
    const parse = Date.parse(dates);
    const newDate = new Date(parse);
    const date = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const final = `${year}-${month + 1}-${date}`;
    this.setState({
      date_birth: final,
    });
    this.hideDatePicker();
  };

  selectPicture = e => {
    if (!e.didCancel) {
      this.setState({
        pictureUri: e.assets[0].uri,
        picture: e.assets[0],
      });
    }
  };

  getDataUser = () => {
    const {token} = this.props.auth;
    this.props.getUserById(token).then(() => {
      const parse = Date.parse(this.props.user.data[0].date_birth);
      const newDate = new Date(parse);
      const date = newDate.getDate();
      const month = newDate.getMonth();
      const year = newDate.getFullYear();
      const final = `${year}-${month + 1}-${date}`;
      this.setState({
        isLoading: false,
        display_name: this.props.user.data[0].display_name,
        gender: this.props.user.data[0].gender,
        email: this.props.user.data[0].email,
        phone_number: this.props.user.data[0].phone_number,
        date_birth: final,
        address: this.props.user.data[0].address,
      });
    });
  };

  getDataUserUpdate = () => {
    const {token} = this.props.auth;
    this.props.getUserById(token).then(() => {
      const parse = Date.parse(this.props.user.data[0].date_birth);
      const newDate = new Date(parse);
      const date = newDate.getDate();
      const month = newDate.getMonth();
      const year = newDate.getFullYear();
      const final = `${year}-${month + 1}-${date}`;
      this.setState({
        isLoading: false,
        display_name: this.props.user.data[0].display_name,
        gender: this.props.user.data[0].gender,
        email: this.props.user.data[0].email,
        phone_number: this.props.user.data[0].phone_number,
        date_birth: final,
        address: this.props.user.data[0].address,
        pictureUri: '',
        picture: null,
      });
    });
  };

  test = () => {
    const {token} = this.props.auth;
    const {
      picture,
      display_name,
      gender,
      email,
      phone_number,
      date_birth,
      address,
    } = this.state;
    if (
      this.state.picture === null ||
      this.state.picture === undefined ||
      this.state.picture === ''
    ) {
      const data = {
        display_name,
        gender,
        email,
        phone_number,
        date_birth,
        address,
      };
      Alert.alert('Update', 'Do you want to update it?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.updateData(token, data)},
      ]);
    } else {
      const data = {
        picture,
        display_name,
        gender,
        email,
        phone_number,
        date_birth,
        address,
      };
      Alert.alert('Update', 'Do you want to update it?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.updateData(token, data)},
      ]);
    }
  };

  updateData = (token, data) => {
    this.props.changeUser(token, data).then(() => {
      this.setState({
        isUpdate: !this.state.isUpdate,
      });
      ToastAndroid.showWithGravity(
        'Success update data',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    });
  };

  componentDidMount() {
    this.getDataUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdate !== this.state.isUpdate) {
      this.getDataUserUpdate();
    }
  }

  render() {
    return (
      <>
        {this.state.isLoading === false ? (
          <View style={styles.wrapper}>
            <View style={styles.wrapperNav}>
              <View style={styles.buttonBack}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.titleScreen}>Edit Profile</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => launchImageLibrary({}, this.selectPicture)}>
              {this.props.user.data[0].image !== null && (
                <Image
                  style={styles.image}
                  source={
                    this.state.pictureUri === ''
                      ? {
                          uri: `${REACT_APP_BASE_URL}/static/images/${this.props.user.data[0].image}`,
                        }
                      : {
                          uri: this.state.pictureUri,
                        }
                  }
                />
              )}
              {this.props.user.data[0].image === null && (
                <Image
                  style={styles.image}
                  source={
                    this.state.pictureUri === ''
                      ? {
                          uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                        }
                      : {
                          uri: this.state.pictureUri,
                        }
                  }
                />
              )}
            </TouchableOpacity>
            <ScrollView marginTop={25} showsVerticalScrollIndicator={false}>
              <View style={styles.wrapperInput}>
                <Text style={styles.label}>Name :</Text>
                <Input
                  value={this.state.display_name}
                  onChangeText={val => this.setState({display_name: val})}
                  type="text"
                  variant="underlined"
                  color="#000"
                  borderColor="#000"
                  fontFamily="Poppins-Regular"
                  placeholder="Enter your name"
                />
                <View>
                  <Radio.Group
                    marginTop={5}
                    name="radio-button"
                    flexDirection="row"
                    value={this.state.gender}
                    onChange={nextValue => {
                      this.setState({gender: nextValue});
                    }}>
                    <Radio
                      marginRight={5}
                      accessibilityLabel="test"
                      colorScheme="gray"
                      value="male">
                      <Text style={styles.radio}>Male</Text>
                    </Radio>
                    <Radio
                      accessibilityLabel="test"
                      colorScheme="gray"
                      value="female">
                      <Text style={styles.radio}>Female</Text>
                    </Radio>
                  </Radio.Group>
                </View>
                <Text style={styles.label}>Email Address :</Text>
                <Input
                  value={this.state.email}
                  onChangeText={val => this.setState({email: val})}
                  type="email"
                  variant="underlined"
                  color="#000"
                  borderColor="#000"
                  fontFamily="Poppins-Regular"
                  placeholder="Enter your email"
                />
                <Text style={styles.label}>Phone Number :</Text>
                <Input
                  value={this.state.phone_number}
                  onChangeText={val => this.setState({phone_number: val})}
                  type="text"
                  variant="underlined"
                  color="#000"
                  borderColor="#000"
                  fontFamily="Poppins-Regular"
                  placeholder="Enter your phone number"
                />
                <Text style={styles.label}>Date :</Text>
                <View style={styles.wrapperDate}>
                  <Text style={styles.date}>{this.state.date_birth}</Text>
                  <TouchableOpacity
                    title="Show Date Picker"
                    onPress={this.showDatePicker}>
                    <MaterialIcons
                      name="calendar-today"
                      color="#000"
                      size={30}
                    />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                  />
                </View>
                <Text style={styles.label}>Delivery Address :</Text>
                <Input
                  value={this.state.address}
                  onChangeText={val => this.setState({address: val})}
                  type="text"
                  variant="underlined"
                  color="#000"
                  borderColor="#000"
                  marginBottom={30}
                  fontFamily="Poppins-Regular"
                  placeholder="Enter your address"
                />
                <TouchableOpacity
                  onPress={this.test}
                  style={styles.buttonBrown}>
                  <Text style={styles.buttonTextBrown}>Save and Update</Text>
                </TouchableOpacity>
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
  user: state.user,
});

const mapDispatchToProps = {getUserById, changeUser};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

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
    marginRight: 80,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    width: 320,
    height: 'auto',
  },
  subtitle: {
    width: '50%',
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  wrapperSubtitleRight: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  subtitleRight: {
    color: '#6A4029',
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  wrapperContent: {
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: 320,
    padding: 20,
    borderRadius: 20,
  },
  image: {
    marginTop: 40,
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
  },
  wrapperInput: {
    marginTop: 0,
    width: 320,
  },
  label: {
    marginTop: 21,
    color: '#000',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
  radio: {
    marginLeft: 15,
    marginTop: 4,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  wrapperDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    height: 60,
  },
  date: {
    fontFamily: 'Poppins-Regular',
    width: '80%',
  },
  buttonBrown: {
    marginVertical: 30,
    paddingHorizontal: 24,
    width: 320,
    height: 70,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextBrown: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
});
