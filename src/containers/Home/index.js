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
import Images2 from '../../assets/images2';
import * as authActions from '../../redux/actions/authActions';
import * as liveActions from '../../redux/actions/liveActions';
import * as myPageActions from '../../redux/actions/myPageActions';
import ItemChannel from './Component/ItemChannel';
import { EventRegister } from 'react-native-event-listeners';
import moment from 'moment';
import DataLocal from '../../services/DataLocal';
import DataRemote from '../../services/DataRemote';
import firebase from 'react-native-firebase';
import { showToast } from '../../utils';
import { getCurrentRouter } from '../../helpers/routerHelper';
import Orientation from 'react-native-orientation';

const STATUS = {
  RESERVED: 'RESERVED',
  DOING: 'DOING',
  FINISHED: 'FINISHED',
};

const TAB = {
  TAB_ONAIR: 'TAB_ONAIR',
  TAB_CHANNEL: 'TAB_CHANNEL',
  TAB_PLAY_ALONE: 'TAB_PLAY_ALONE',
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFirst: true,
      countPressBack: 0,
      isOpenSlideMenu: false,
      currentTab: TAB.TAB_CHANNEL,
      scrollPositionX: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
    this.timeoutBackPress = null;
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout(e) {
    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    });
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
        Orientation.lockToLandscape();
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

  getTitleWhenScroll() {
    const { scrollPositionX, width } = this.state;
    const { todayList } = this.props;

    if (
      scrollPositionX >=
      width - 50 + todayList.length * width * 0.4 + width * 0.3
    ) {
      return 'MY 편성표';
    } else if (scrollPositionX >= width - 50) {
      return '미니TV 편성표';
    }
    return '';
  }

  render() {
    const { loadingFirst, currentTab, width, height } = this.state;
    const { loading, onAir, hotLists, resultPlay, todayList } = this.props;
    console.log('todayList:', todayList);
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
            <View onLayout={this.onLayout}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: width,
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 20,
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
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={Images2.imgIcMyPage}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: width * 0.3,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: 53,
                    }}
                    onPress={() => {
                      if (currentTab != TAB.TAB_ONAIR) {
                        this.setState({ currentTab: TAB.TAB_ONAIR });
                      }
                    }}>
                    <Image
                      style={{ width: 53, height: 40 }}
                      source={Images2.imgIcOnAir}
                    />
                    <Text
                      style={{
                        fontWeight:
                          currentTab == TAB.TAB_ONAIR ? 'bold' : 'normal',
                        textAlign: 'right',
                        paddingRight: 2,
                        color:
                          currentTab == TAB.TAB_ONAIR ? '#222222' : '#757677',
                        marginTop: 3,
                        fontSize: 13,
                      }}>
                      온에어
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (currentTab != TAB.TAB_CHANNEL) {
                        this.setState({ currentTab: TAB.TAB_CHANNEL });
                      }
                    }}>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={Images2.imgIcChannel}
                    />
                    <Text
                      style={{
                        fontWeight:
                          currentTab == TAB.TAB_CHANNEL ? 'bold' : 'normal',
                        textAlign: 'center',
                        color:
                          currentTab == TAB.TAB_ONAIR ? '#222222' : '#757677',
                        marginTop: 3,
                        fontSize: 13,
                      }}>
                      채널
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (currentTab != TAB.TAB_PLAY_ALONE) {
                        this.setState({ currentTab: TAB.TAB_PLAY_ALONE });
                      }
                    }}>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={Images2.imgIcPlayAlone}
                    />
                    <Text
                      style={{
                        fontWeight:
                          currentTab == TAB.TAB_PLAY_ALONE ? 'bold' : 'normal',
                        textAlign: 'center',
                        color:
                          currentTab == TAB.TAB_ONAIR ? '#222222' : '#757677',
                        marginTop: 3,
                        fontSize: 13,
                      }}>
                      혼자 놀기
                    </Text>
                  </TouchableOpacity>
                </View>
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
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={Images2.imgIconAlamp}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    color: '#111111',
                    fontWeight: 'bold',
                    fontSize: 17,
                    marginLeft: 10,
                    marginTop: 5,
                  }}>
                  {this.getTitleWhenScroll()}
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={100}
                  onScroll={(event) => {
                    this.setState({
                      scrollPositionX: event.nativeEvent.contentOffset.x,
                    });
                  }}>
                  {currentTab == TAB.TAB_ONAIR && (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: width * 0.3,
                        }}>
                        <Image
                          style={{
                            width: width * 0.3 - 40,
                            height: ((width * 0.3 - 40) * 171) / 150,
                          }}
                          source={Images2.imgHome1}
                        />
                      </View>
                      <View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          {onAir?.status == STATUS.DOING && (
                            <Image source={Images2.imgIcBtnLive} />
                          )}
                          <Text style={{ color: '#111111', marginLeft: 5 }}>
                            {onAir?.title}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderWidth: 5,
                            borderColor: '#50CCC3',
                            borderRadius: 5,
                            marginTop: 10,
                          }}>
                          <ImageBackground
                            style={{
                              width: width * 0.4,
                              height: (width * 0.4 * 14) / 25,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            source={{ uri: onAir?.thumbnail }}>
                            <View
                              style={{
                                width: width * 0.4,
                                height: (width * 0.4 * 14) / 25,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#000000',
                                opacity: 0.5,
                              }}
                            />
                            {onAir?.status == STATUS.DOING && (
                              <TouchableOpacity
                                style={{
                                  position: 'absolute',
                                  top: (width * 0.4 * 14) / 50 - 25,
                                }}>
                                <Image
                                  style={{ width: 50, height: 50 }}
                                  source={Images2.imgIcBtnPlay}
                                />
                              </TouchableOpacity>
                            )}
                          </ImageBackground>
                        </View>
                        <Text
                          style={{
                            color: '#141414',
                            fontSize: 13,
                            width: 250,
                            marginTop: 5,
                            paddingLeft: 5,
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {onAir?.subscript}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: width * 0.3 - 30,
                        }}>
                        <Image
                          style={{
                            width: width * 0.3 - 60,
                            height: ((width * 0.3 - 60) * 158) / 150,
                          }}
                          source={Images2.imgHome2}
                        />
                      </View>
                      {todayList.map((e) => {
                        return (
                          <View style={{ paddingLeft: 3 }}>
                            <View
                              style={{
                                borderWidth: 5,
                                borderColor: e.rgb_value,
                                borderRadius: 5,
                                marginTop: 10,
                                marginRight: 20,
                              }}>
                              <ImageBackground
                                style={{
                                  width: width * 0.4,
                                  height: (width * 0.4 * 14) / 25,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                source={{ uri: e.thumbnail }}>
                                <View
                                  style={{
                                    backgroundColor: e.rgb_value,
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                    borderTopLeftRadius: 5,
                                  }}>
                                  <Text
                                    style={{
                                      color: '#59317C',
                                      fontWeight: 'bold',
                                      paddingHorizontal: 10,
                                      paddingVertical: 5,
                                      fontSize: 15,
                                    }}>
                                    {moment(e.start_datetime).format(
                                      ' 낮 hh시mm분',
                                    )}
                                  </Text>
                                </View>
                              </ImageBackground>
                            </View>
                            <View
                              style={{
                                width: width * 0.4 + 10,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginTop: 3,
                              }}>
                              <Text
                                style={{
                                  color: '#141414',
                                  fontSize: 13,
                                  width: width * 0.4 - 50,
                                  marginTop: 5,
                                  paddingLeft: 5,
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {e.title}
                              </Text>
                              <TouchableOpacity>
                                <Image
                                  style={{ width: 30, height: 30 }}
                                  source={Images2.imgIconAlamp}
                                />
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                backgroundColor: e.rgb_value,
                                position: 'absolute',
                                left: 0,
                                top: 3,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  color: '#59317C',
                                  fontWeight: 'bold',
                                  paddingHorizontal: 10,
                                  paddingVertical: 5,
                                  fontSize: 15,
                                }}>
                                {moment(e.start_datetime).format('MM월 DD일')}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{
                            width: width * 0.3 - 60,
                            height: ((width * 0.3 - 60) * 133) / 161,
                            marginHorizontal: 30,
                          }}
                          source={Images2.imgHome3}
                        />
                        {hotLists.length > 0 &&
                          hotLists.map((e) => {
                            return (
                              <View style={{ paddingLeft: 3 }}>
                                <View
                                  style={{
                                    borderWidth: 5,
                                    borderColor: e.rgb_value,
                                    borderRadius: 5,
                                    marginTop: 10,
                                    marginRight: 20,
                                  }}>
                                  <ImageBackground
                                    style={{
                                      width: width * 0.4,
                                      height: (width * 0.4 * 14) / 25,
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                    source={Images2.imgItemHomeTest}>
                                    <View
                                      style={{
                                        backgroundColor: e.rgb_value,
                                        position: 'absolute',
                                        right: 0,
                                        bottom: 0,
                                        borderTopLeftRadius: 5,
                                      }}>
                                      <Text
                                        style={{
                                          color: '#59317C',
                                          fontWeight: 'bold',
                                          paddingHorizontal: 10,
                                          paddingVertical: 5,
                                          fontSize: 15,
                                        }}>
                                        {e.end_datetime}
                                      </Text>
                                    </View>
                                  </ImageBackground>
                                </View>
                                <Text
                                  style={{
                                    color: '#141414',
                                    fontSize: 13,
                                    width: 250,
                                    marginTop: 5,
                                    paddingLeft: 5,
                                  }}
                                  numberOfLines={1}
                                  ellipsizeMode="tail">
                                  {e.title}
                                </Text>
                                <View
                                  style={{
                                    backgroundColor: e.rgb_value,
                                    position: 'absolute',
                                    left: 0,
                                    top: 3,
                                    borderRadius: 5,
                                  }}>
                                  <Text
                                    style={{
                                      color: '#59317C',
                                      fontWeight: 'bold',
                                      paddingHorizontal: 10,
                                      paddingVertical: 5,
                                      fontSize: 15,
                                    }}>
                                    {e.start_datetime}
                                  </Text>
                                </View>
                              </View>
                            );
                          })}
                        {hotLists.length == 0 && (
                          <Image
                            source={Images2.imgMyImageEmpty}
                            style={{ marginRight: 50 }}
                          />
                        )}
                      </View>
                    </View>
                  )}
                  {currentTab == TAB.TAB_CHANNEL && (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('ChannelDetail2')
                        }>
                        <Image source={Images2.imgItemHomeTest} />
                      </TouchableOpacity>
                    </View>
                  )}
                  {currentTab == TAB.TAB_PLAY_ALONE && (
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingTop: 50,
                        width,
                      }}>
                      <Image source={Images2.imgPlayAloneEmpty} />
                    </View>
                  )}
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
    todayList: state.liveMainGetReducer.todayList,
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
