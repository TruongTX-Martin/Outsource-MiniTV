import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
  Linking,
} from 'react-native';
import { Container, Body, Header, Content } from 'native-base';
import Config from '../../config';
import { connect } from 'react-redux';
import Images from '../../assets/images';
import * as authActions from '../../redux/actions/authActions';
import * as liveActions from '../../redux/actions/liveActions';
import * as myPageActions from '../../redux/actions/myPageActions';
import ItemChannel from './Component/ItemChannel';
import { EventRegister } from 'react-native-event-listeners';
import DataLocal from '../../services/DataLocal';
import DataRemote from '../../services/DataRemote';
import firebase from 'react-native-firebase';
import { showToast } from '../../utils';
import { getCurrentRouter } from '../../helpers/routerHelper';
const { width, height } = Dimensions.get('window');
import Orientation from 'react-native-orientation';

const widthView = width - 30;

const STATUS = {
  RESERVED: 'RESERVED',
  DOING: 'DOING',
  FINISHED: 'FINISHED',
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFirst: true,
      countPressBack: 0,
      isOpenSlideMenu: false,
    };
    this.timeoutBackPress = null;
  }

  componentDidMount() {
    const timeoutLoading = setTimeout(() => {
      this.setState({ loadingFirst: false });
      clearTimeout(timeoutLoading);
    }, 2000);
    this.checkScreenAndLoadData();
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
        this.props.generateAccessToken();
      }
    } else {
      DataRemote.setTokenFirebase(fcmToken);
      this.props.generateAccessToken();
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

  async checkScreenAndLoadData() {
    //check login or show intro
    const hasShowIntro = await DataLocal.getHasShowIntro();
    const userToken = await DataLocal.getUserToken();
    if (hasShowIntro == null) {
      this.props.navigation.navigate('Intro0');
    } else if (userToken == null || userToken == 'null') {
      this.props.navigation.navigate('SignIn');
    } else {
      Orientation.lockToLandscape();
      this.checkPermission();
      this.props.generateAccessToken();
      this.props.getMainList();
    }
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#CACACA',
        }}>
        <Text style={{ fontSize: 15, fontWeight: '600', marginLeft: 10 }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }

  async componentWillMount() {
    this.listenerGoToSignIn = EventRegister.addEventListener(
      Config.Constant.EVENT_GOTO_SIGNIN,
      (data) => {
        this.props.navigation.navigate('SignIn');
      },
    );
    this.listenerSignInSuccess = EventRegister.addEventListener(
      Config.Constant.EVENT_SIGNIN_SUCCESS,
      (data) => {
        this.checkPermission();
        this.props.getMainList();
        this.props.getMe();
      },
    );
    this.listenerSignOut = EventRegister.addEventListener(
      Config.Constant.EVENT_SIGN_OUT,
      (data) => {
        if (getCurrentRouter() != 'Intro0') {
          DataLocal.setUserToken('null');
          this.props.navigation.navigate('SignIn');
        }
      },
    );
    this.listenerGoToStore = EventRegister.addEventListener(
      Config.Constant.EVENT_GOTO_STORE,
      (data) => {
        if (data.status) {
          Linking.openURL(data.store_link);
        }
      },
    );
    this.listenerGetAccessToken = EventRegister.addEventListener(
      Config.Constant.EVENT_RECALL_API,
      (data) => {
        this.props.generateAccessToken();
      },
    );
    BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
  }
  componentWillUnmount() {
    EventRegister.removeEventListener(this.listenerGoToSignIn);
    EventRegister.removeEventListener(this.listenerSignInSuccess);
    EventRegister.removeEventListener(this.listenerSignOut);
    EventRegister.removeEventListener(this.listenerGoToStore);
    EventRegister.removeEventListener(this.listenerGetAccessToken);
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onAndroidBackPress,
    );
  }

  onAndroidBackPress = () => {
    if (getCurrentRouter() == 'SignIn') {
      BackHandler.exitApp();
      return true;
    }
    if (getCurrentRouter() == 'Home') {
      const { countPressBack, isOpenSlideMenu } = this.state;
      if (isOpenSlideMenu) {
        this.setState({ isOpenSlideMenu: false });
        return;
      }
      this.setState(
        {
          countPressBack: countPressBack + 1,
        },
        () => {
          if (this.state.countPressBack == 1) {
            //show toast
            showToast('한 번 더 누르면 종료됩니다.');
          } else if (this.state.countPressBack >= 2) {
            BackHandler.exitApp();
            return true;
          }
        },
      );
      if (this.timeoutBackPress != null) {
        clearTimeout(this.timeoutBackPress);
      }
      this.timeoutBackPress = setTimeout(() => {
        this.setState({ countPressBack: 0 });
        clearTimeout(this.timeoutBackPress);
      }, 3000);
      return true;
    }
    return false;
  };

  getTitle(status) {
    if (status == STATUS.DOING) {
      return '방송 중';
    }
    return 'Coming soon';
  }

  render() {
    const { loadingFirst } = this.state;
    const { loading, onAir, hotLists, resultPlay } = this.props;
    if (loadingFirst) {
      return (
        <View
          style={{
            width,
            height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#499DA7" />
        </View>
      );
    }
    return (
      <Container>
        <Body>
          <Content
            style={{ backgroundColor: '#fefefe' }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => this.props.getMainList()}
              />
            }>
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width,
                  paddingHorizontal: 10,
                  paddingTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FFEDED',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ textAlign: 'center' }}>My Page</Text>
                </TouchableOpacity>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <View style={{ display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: '#f7cbca',
                      }}
                    />
                    <Text>On Air</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginHorizontal: 20,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: '#FFDD91',
                      }}
                    />
                    <Text>Channel</Text>
                  </View>
                  <View style={{ display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: '#B7C8FF',
                      }}
                    />
                    <Text>Play Alone</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>
              <View>
                <ScrollView
                  horizontal={true}
                  style={{ paddingLeft: 20, marginTop: 20 }}
                  showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 10,
                        }}>
                        <Text style={{ fontSize: 13 }}>Thursday PM 7:00</Text>
                        <Text style={{ fontSize: 11, color: '#D63C3C' }}>
                          09:20:60 left
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 200,
                          height: 100,
                          borderWidth: 2,
                          borderColor: 'red',
                        }}
                      />
                      <Text>Title</Text>
                    </View>

                    <View
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 40,
                        backgroundColor: '#E2FFEF',
                        marginHorizontal: 30,
                      }}
                    />
                    <View>
                      <Text style={{ marginBottom: 10 }}>
                        Next Webcasts are….
                      </Text>
                      <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ marginRight: 20 }}>
                          <View
                            style={{
                              width: 120,
                              height: 120,
                              borderRadius: 60,
                              backgroundColor: '#F7F7F7',
                              borderWidth: 1,
                              borderColor: 'black',
                            }}
                          />
                          <Text>Title</Text>
                        </View>
                        <View style={{ marginRight: 20 }}>
                          <View
                            style={{
                              width: 120,
                              height: 120,
                              borderRadius: 60,
                              backgroundColor: '#F7F7F7',
                              borderWidth: 1,
                              borderColor: 'black',
                            }}
                          />
                          <Text>Title</Text>
                        </View>
                        <View style={{ marginRight: 20 }}>
                          <View
                            style={{
                              width: 120,
                              height: 120,
                              borderRadius: 60,
                              backgroundColor: '#F7F7F7',
                              borderWidth: 1,
                              borderColor: 'black',
                            }}
                          />
                          <Text>Title</Text>
                        </View>
                        <View style={{ marginRight: 20 }}>
                          <View
                            style={{
                              width: 120,
                              height: 120,
                              borderRadius: 60,
                              backgroundColor: '#F7F7F7',
                              borderWidth: 1,
                              borderColor: 'black',
                            }}
                          />
                          <Text>Title</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    onAir: state.liveMainGetReducer.onAir,
    hotLists: state.liveMainGetReducer.hotLists,
    loading: state.liveMainGetReducer.loading,
    resultPlay: state.liveMainGetReducer.resultPlay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateAccessToken: () => dispatch(authActions.generateAccessToken()),
    getMainList: () => dispatch(liveActions.liveMainGet()),
    getMe: () => dispatch(myPageActions.getMe()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
