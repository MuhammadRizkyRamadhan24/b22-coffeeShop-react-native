import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Input, Radio} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

import {connect} from 'react-redux';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isDatePickerVisible: false,
      date: '2001-01-01',
      pictureUri: '',
      picture: null,
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
      date: final,
    });
    this.hideDatePicker();
  };

  selectPicture = e => {
    if (!e.didCancel) {
      this.setState(
        {
          pictureUri: e.assets[0].uri,
          picture: e.assets[0],
        },
        () => {
          console.log(this.state.picture.type);
        },
      );
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.wrapperNav}>
            <View style={styles.buttonBack}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.titleScreen}>Edit Profile</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => launchImageLibrary({}, this.selectPicture)}>
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
          </TouchableOpacity>
          <View style={styles.wrapperInput}>
            <Text style={styles.label}>Name :</Text>
            <Input
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
                value={this.state.delivery_method}
                onChange={nextValue => {
                  this.setState({value: nextValue});
                }}>
                <Radio
                  marginRight={5}
                  accessibilityLabel="test"
                  colorScheme="gray"
                  value="Male">
                  <Text style={styles.radio}>Male</Text>
                </Radio>
                <Radio
                  accessibilityLabel="test"
                  colorScheme="gray"
                  value="Female">
                  <Text style={styles.radio}>Female</Text>
                </Radio>
              </Radio.Group>
            </View>
            <Text style={styles.label}>Email Address :</Text>
            <Input
              type="email"
              variant="underlined"
              color="#000"
              borderColor="#000"
              fontFamily="Poppins-Regular"
              placeholder="Enter your email"
            />
            <Text style={styles.label}>Phone Number :</Text>
            <Input
              type="text"
              variant="underlined"
              color="#000"
              borderColor="#000"
              fontFamily="Poppins-Regular"
              placeholder="Enter your phone number"
            />
            <Text style={styles.label}>Date :</Text>
            <View style={styles.wrapperDate}>
              <Text style={styles.date}>{this.state.date}</Text>
              <TouchableOpacity
                title="Show Date Picker"
                onPress={this.showDatePicker}>
                <MaterialIcons name="calendar-today" color="#000" size={30} />
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
              type="text"
              variant="underlined"
              color="#000"
              borderColor="#000"
              marginBottom={30}
              fontFamily="Poppins-Regular"
              placeholder="Enter your address"
            />
            <TouchableOpacity style={styles.buttonBrown}>
              <Text style={styles.buttonTextBrown}>Save and Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps)(EditProfile);

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
    marginTop: 25,
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
