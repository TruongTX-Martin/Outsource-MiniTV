/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import './config/Reactotron';
import axios from 'axios';
import MyApp from './containers/Navigation';
import {store} from './redux/store';
import SplashScreen from 'react-native-splash-screen';
import {EventRegister} from 'react-native-event-listeners';
import {setCurrentRouter} from './helpers/routerHelper';
import {Provider} from 'react-redux';
import Constants from './config/Constant';
import DataLocal from './services/DataLocal';
import DataRemote from './services/DataRemote';
import firebase from 'react-native-firebase';

//setup default axios
axios.defaults.baseURL = Constants.BASE_URL;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.routerHome = 'Home';
  }
  componentDidMount() {
    SplashScreen.hide();
    this.checkPermission();
  }

  async checkPermission() {
    console.log('Check permission');
    const enabled = await firebase.messaging().hasPermission();
    console.log('enabled:', enabled);
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await DataLocal.getTokenFirebase();
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        DataRemote.setTokenFirebase(fcmToken);
        DataLocal.saveTokenFirebase(fcmToken);
        //firebase analytics
        EventRegister.emit(Constants.EVENT_RECALL_API, '');
      }
    } else {
      DataRemote.setTokenFirebase(fcmToken);
      EventRegister.emit(Constants.EVENT_RECALL_API, '');
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
    }
  }

  getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
      return this.getActiveRouteName(route);
    }
    return route.routeName;
  }
  onNavigationStateChange(prevState, currentState) {
    const currentRoute = this.getActiveRouteName(currentState);
    setCurrentRouter(currentRoute);
  }

  render() {
    return (
      <Provider store={store}>
        <MyApp
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
      </Provider>
    );
  }
}
