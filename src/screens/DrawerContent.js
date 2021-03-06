import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Head from '../component/HeadDrawer';
import Signout from '../component/Signout';

export function DrawerContent(props) {
  return (
    <View style={styles.wrapper}>
      <Head />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapperItem}>
          <DrawerItem
            style={styles.item}
            label={() => (
              <View style={styles.wrapperLabel}>
                <MaterialIcons name="face" color="#6A4029" size={30} />
                <Text style={styles.label}>Edit Profile</Text>
              </View>
            )}
            drawerSt
            onPress={() => {
              props.navigation.navigate('EditProfile');
            }}
          />
          <DrawerItem
            style={styles.item}
            label={() => (
              <View style={styles.wrapperLabel}>
                <MaterialIcons name="home" color="#6A4029" size={30} />
                <Text style={styles.label}>Home</Text>
              </View>
            )}
            drawerSt
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            style={styles.item}
            label={() => (
              <View style={styles.wrapperLabel}>
                <MaterialIcons name="search" color="#6A4029" size={30} />
                <Text style={styles.label}>Search</Text>
              </View>
            )}
            onPress={() => {
              props.navigation.navigate('Search');
            }}
          />
          <DrawerItem
            style={styles.item}
            label={() => (
              <View style={styles.wrapperLabel}>
                <MaterialIcons name="attach-money" color="#6A4029" size={30} />
                <Text style={styles.label}>Promo</Text>
              </View>
            )}
            onPress={() => {
              props.navigation.navigate('Promo');
            }}
          />
          <DrawerItem
            style={styles.item}
            label={() => (
              <View style={styles.wrapperLabel}>
                <MaterialIcons name="notes" color="#6A4029" size={30} />
                <Text style={styles.label}>Privacy Policy</Text>
              </View>
            )}
          />
          <DrawerItem
            style={styles.item}
            label={() => (
              <View style={styles.wrapperLabel}>
                <MaterialIcons name="security" color="#6A4029" size={30} />
                <Text style={styles.label}>Security</Text>
              </View>
            )}
          />
        </View>
        <Signout />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  wrapperProfile: {
    width: 324,
    height: 288,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  name: {
    width: 240,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  email: {
    width: 240,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
  wrapperItem: {
    marginTop: 10,
  },
  item: {
    justifyContent: 'center',
    width: 240,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#6A4029',
  },
  wrapperLabel: {
    marginLeft: -5,
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
    height: 50,
  },
  label: {
    marginTop: 6,
    marginLeft: 10,
    color: '#6A4029',
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
  },
});
