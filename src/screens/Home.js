import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../component/cardLg';
import Subtitle from '../component/subtitle';
import Seemore from '../component/seemore';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
  }

  render() {
    return (
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <TouchableOpacity style={[styles.profile, styles.marginIcon]} />
            <TouchableOpacity style={styles.marginIcon}>
              <MaterialIcons name="shopping-cart" color="#8a8a8a" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.marginIcon}>
              <MaterialIcons
                name="chat-bubble-outline"
                color="#8a8a8a"
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
              style={styles.marginIconMenu}>
              <MaterialIcons name="menu-open" color="#8a8a8a" size={40} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>A good coffee is a good day</Text>
          <View style={styles.wrapperCard}>
            <View style={styles.wrapperSubtitle}>
              <View style={styles.subtitle}>
                <Subtitle title="Favorite Products" />
              </View>
              <Seemore />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Card
                func={() => this.props.navigation.navigate('ProductDetail')}
              />
              <Card />
              <Card />
              <Card />
              <Card />
            </ScrollView>
          </View>

          <View style={styles.wrapperCard}>
            <View style={styles.wrapperSubtitle}>
              <View style={styles.subtitle}>
                <Subtitle title="Coffee" />
              </View>
              <Seemore />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </ScrollView>
          </View>

          <View style={styles.wrapperCard}>
            <View style={styles.wrapperSubtitle}>
              <View style={styles.subtitle}>
                <Subtitle title="Non Coffee" />
              </View>
              <Seemore />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#BCBABA',
    alignItems: 'center',
  },
  header: {
    marginTop: 48,
    width: 320,
    height: 'auto',
    flexDirection: 'row-reverse',
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#8a8a8a',
  },
  marginIcon: {
    marginHorizontal: 8,
  },
  marginIconMenu: {
    marginRight: 143,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#000',
    width: 285,
    fontSize: 34,
    marginLeft: -17.5,
    marginTop: 40,
  },
  subtitle: {
    width: 260,
  },
  wrapperCard: {
    marginTop: 24,
    width: 347,
    marginLeft: 46,
  },
  wrapperSubtitle: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
  },
});
