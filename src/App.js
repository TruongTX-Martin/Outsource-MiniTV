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
import {setCurrentRouter} from './helpers/routerHelper';
import {Provider} from 'react-redux';

//setup default axios
axios.defaults.baseURL = 'http://dev-api.minitv.io/v1';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.routerHome = 'Home';
  }
  componentDidMount() {
    SplashScreen.hide();
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
