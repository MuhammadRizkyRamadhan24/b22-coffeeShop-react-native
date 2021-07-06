import 'react-native-gesture-handler';
import React from 'react';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginSignup from './src/screens/LoginSignup';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const drawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="Home" component={Home} /> */}
    </Drawer.Navigator>
  );
};

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginSignup"
          component={LoginSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Drawer"
          component={drawer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
