import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Dashboard from '../modules/Dashboard';
import Love from '../modules/Love';
import Profile from '../modules/Profile';
import Cart from '../modules/Cart';
import {GreenTabBar} from './components';

const HomeTabs = () => {
  const {Navigator, Screen} = createBottomTabNavigator();
  return (
    <Navigator
      tabBar={props => <GreenTabBar {...props} />}
      screenOptions={{unmountOnBlur: false}}>
      <Screen name="home" component={Dashboard} />
      <Screen name="love" component={Love} />
      <Screen name="cart" component={Cart} />
      <Screen name="profile" component={Profile} />
    </Navigator>
  );
};

const Root = () => {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <NavigationContainer>
      <Navigator initialRouteName="dashboard">
        <Screen
          name="dashboard"
          component={HomeTabs}
          options={{headerShown: false}}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Root;
