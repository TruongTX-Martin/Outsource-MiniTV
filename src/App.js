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

import {Provider} from 'react-redux';

//setup default axios
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    // const {dispatch} = this.props;
    return (
      <Provider store={store}>
        <MyApp />
      </Provider>
    );
  }
}
