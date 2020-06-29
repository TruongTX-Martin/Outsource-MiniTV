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
import Modal from 'react-native-modal';
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
import { setWidthScreen, setHeightScreen } from '../../utils';

const STATUS = {
  RESERVED: 'RESERVED',
  DOING: 'DOING', // => onair, in another case -> is comming soon
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
      currentTab: TAB.TAB_ONAIR,
      scrollPositionX: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      isLogin: false,
      isShowModalLogin: false,
    };
    this.timeoutBackPress = null;
    this.onLayout = this.onLayout.bind(this);
    this.timerInterval = null;
  }

  onLayout(e) {
    const { width, height } = Dimensions.get('window');
    setWidthScreen(width);
    setHeightScreen(height);
    this.setState({
      width,
      height,
    });
  }

  componentDidMount() {
    this.props.generateAccessToken();
    const timeoutLoading = setTimeout(() => {
      this.setState({ loadingFirst: false });
      clearTimeout(timeoutLoading);
    }, 2000);
    this.checkScreenAndLoadData();
    Orientation.lockToLandscape();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
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
      //   this.props.navigation.navigate('SignIn');
      // } else {
      this.setState({
        isLogin: false,
      });
      this.checkPermission();
      this.props.generateAccessToken();
      this.getData();
    } else {
      this.setState({
        isLogin: true,
      });
    }
  }

  getData() {
    this.props.getMainList();
    this.props.getListChannel();
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
        // this.props.navigation.navigate('SignIn');
        Orientation.lockToLandscape();
        this.getData();
      },
    );
    this.listenerSignInSuccess = EventRegister.addEventListener(
      Config.Constant.EVENT_SIGNIN_SUCCESS,
      (data) => {
        Orientation.lockToLandscape();
        this.checkPermission();
        this.props.getMainList();
        this.props.getListChannel();
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
      Orientation.lockToLandscape();
      return false;
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

  handlePokeChannel(liveId, wish_available) {
    const params = {
      available: wish_available,
    };
    this.props.pokeChannel(liveId, params);
  }

  getTimeString(time) {
    var minutes = '0' + Math.floor(time / 60);
    var seconds = '0' + (time - minutes * 60);
    return minutes.substr(-2) + ':' + seconds.substr(-2);
  }

  clearTimeInterval() {
    if (this.timerInterval != null) {
      this.clearTimeInterval(this.timerInterval);
    }
  }

  getStringTime(time) {
    if (parseInt(time) > 10) {
      return time;
    }
    return '0' + time;
  }

  getTimeNextLive(onAir) {
    if (onAir) {
      const timeCheck = onAir.start_datetime;
      const currentTime = new Date().getTime();
      const startDate = moment(timeCheck).toDate().getTime();
      let timeSecondRemain = (startDate - currentTime) / 1000;
      if (timeSecondRemain > 0) {
        const hour = parseInt(timeSecondRemain / (60 * 60));
        const minues = parseInt((timeSecondRemain - hour * 60 * 60) / 60);
        const seconds = parseInt(
          timeSecondRemain - hour * 60 * 60 - minues * 60,
        );
        const timeLeftString =
          this.getStringTime(hour) +
          ':' +
          this.getStringTime(minues) +
          ':' +
          this.getStringTime(seconds);
        return timeLeftString;
      }
    }
  }

  render() {
    const {
      loadingFirst,
      currentTab,
      width,
      height,
      isLogin,
      isShowModalLogin,
    } = this.state;
    let {
      loading,
      onAir,
      hotLists,
      resultPlay,
      todayList,
      listChannel,
    } = this.props;
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
            style={{ backgroundColor: '#FDF9ED' }}
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
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    if (isLogin) {
                      this.props.navigation.navigate('MyPageV2');
                    } else {
                      this.setState({ isShowModalLogin: true });
                    }
                  }}>
                  <Image
                    style={{ width: 60, height: 60 }}
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
                    {onAir?.status == STATUS.DOING ? (
                      <Image
                        style={{
                          width: currentTab == TAB.TAB_ONAIR ? 53 : 42,
                          height: currentTab == TAB.TAB_ONAIR ? 42 : 40,
                        }}
                        source={
                          currentTab == TAB.TAB_ONAIR
                            ? Images2.imgIcOnAir
                            : Images2.imgIcOnAirOff
                        }
                      />
                    ) : (
                        <Image
                          style={{
                            width: currentTab == TAB.TAB_ONAIR ? 53 : 44,
                            height: 44,
                          }}
                          source={
                            currentTab == TAB.TAB_ONAIR
                              ? Images2.imgIcCommingSoonOn
                              : Images2.imgIcCommingSoon
                          }
                        />
                      )}
                    <Text
                      style={{
                        fontFamily:
                          currentTab == TAB.TAB_ONAIR
                            ? 'Mono-ExtraBold'
                            : 'Mono-Regular',
                        fontWeight:
                          currentTab == TAB.TAB_ONAIR ? 'bold' : 'normal',
                        paddingLeft: currentTab == TAB.TAB_ONAIR ? 13 : 5,
                        color:
                          currentTab == TAB.TAB_ONAIR ? '#222222' : '#757677',
                        marginTop: 3,
                        fontSize: 13,
                      }}>
                      {onAir?.status == STATUS.DOING ? '온에어' : '커밍순'}
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
                      source={
                        currentTab == TAB.TAB_CHANNEL
                          ? Images2.imgIcChannelOn
                          : Images2.imgIcChannel
                      }
                    />
                    <Text
                      style={{
                        fontFamily:
                          currentTab == TAB.TAB_CHANNEL
                            ? 'Mono-ExtraBold'
                            : 'Mono-Regular',
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
                      style={{ width: 42, height: 38 }}
                      source={Images2.imgIcPlayAlone}
                    />
                    <Text
                      style={{
                        fontFamily:
                          currentTab == TAB.TAB_PLAY_ALONE
                            ? 'Mono-ExtraBold'
                            : 'Mono-Regular',
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
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    if (isLogin) {
                      this.props.navigation.navigate('MyAlertList');
                    } else {
                      this.setState({ isShowModalLogin: true });
                    }
                  }}>
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={Images2.imgIconAlamp}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Mono-ExtraBold',
                    color: '#111111',
                    fontWeight: 'bold',
                    fontSize: 17,
                    marginLeft: 10,
                    marginTop: 5,
                    height: 20,
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
                        {onAir?.status == STATUS.DOING ? (
                          <Image
                            style={{
                              width: width * 0.3 - 40,
                              height: ((width * 0.3 - 40) * 171) / 150,
                            }}
                            source={Images2.imgHome1}
                          />
                        ) : (
                            <Image
                              style={{
                                width: width * 0.3 - 40,
                                height: ((width * 0.3 - 40) * 157) / 150,
                              }}
                              source={Images2.imgHome1CMSoon}
                            />
                          )}
                      </View>
                      <View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent:
                              onAir?.status == STATUS.DOING
                                ? 'flex-start'
                                : 'space-between',
                            alignItems: 'center',
                          }}>
                          {onAir?.status == STATUS.DOING && (
                            <Image source={Images2.imgIcBtnLive} />
                          )}
                          <Text
                            style={{
                              color: '#111111',
                              marginLeft: 5,
                              fontFamily: 'Mono-ExtraBold',
                            }}>
                            {onAir?.status == STATUS.DOING
                              ? onAir?.title
                              : '다음 방송은 무엇일까요?'}
                          </Text>
                          {onAir?.status != STATUS.DOING && (
                            <Text
                              style={{
                                color: '#F7543F',
                                paddingRight: 10,
                                fontWeight: 'bold',
                                fontFamily: 'Mono-ExtraBold',
                              }}>
                              {this.getTimeNextLive(onAir)}
                            </Text>
                          )}
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

                            {onAir?.status != STATUS.DOING && (
                              <View
                                style={{
                                  backgroundColor: onAir?.rgb_value,
                                  position: 'absolute',
                                  top: -7,
                                  left: -10,
                                  borderTopLeftRadius: 5,
                                }}>
                                <Text
                                  style={{
                                    color: '#59317C',
                                    fontWeight: 'bold',
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    fontSize: 15,
                                    fontFamily: 'Mono-ExtraBold',
                                  }}>
                                  {onAir?.startDate}
                                </Text>
                              </View>
                            )}

                            {onAir?.status != STATUS.DOING && (
                              <View
                                style={{
                                  backgroundColor: onAir?.rgb_value,
                                  position: 'absolute',
                                  right: -5,
                                  bottom: -5,
                                  borderTopLeftRadius: 5,
                                }}>
                                <Text
                                  style={{
                                    color: '#59317C',
                                    fontWeight: 'bold',
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    fontSize: 15,
                                    fontFamily: 'Mono-ExtraBold',
                                  }}>
                                  {onAir?.startTime}
                                </Text>
                              </View>
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
                            fontFamily: 'Mono-Regular',
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
                        {onAir?.status == STATUS.DOING ? (
                          <Image
                            style={{
                              width: width * 0.3 - 60,
                              height: ((width * 0.3 - 60) * 158) / 150,
                            }}
                            source={Images2.imgHome2}
                          />
                        ) : (
                            <Image
                              style={{
                                width: width * 0.3 - 60,
                                height: ((width * 0.3 - 60) * 146) / 130,
                              }}
                              source={Images2.imgHome2CMSoon}
                            />
                          )}
                      </View>
                      {todayList.map((e) => {
                        return (
                          <TouchableOpacity
                            style={{ paddingLeft: 3 }}
                            onPress={() =>
                              this.props.navigation.navigate('ProgramDetail', {
                                live_uid: e.live_uid,
                              })
                            }>
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
                                      fontFamily: 'Mono-ExtraBold',
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
                                  fontFamily: 'Mono-Regular',
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {e.title}
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  if (isLogin) {
                                    this.handlePokeChannel(
                                      e.live_uid,
                                      !e.wish_available,
                                    );
                                  } else {
                                    this.setState({ isShowModalLogin: true });
                                  }
                                }}>
                                <Image
                                  style={{ width: 40, height: 40 }}
                                  source={
                                    e.wish_available
                                      ? Images2.imgIconAlamp
                                      : Images2.imgIconAlampOff
                                  }
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
                                  fontFamily: 'Mono-ExtraBold',
                                }}>
                                {moment(e.start_datetime).format('MM월 DD일')}
                              </Text>
                            </View>
                          </TouchableOpacity>
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
                              <TouchableOpacity
                                style={{ paddingLeft: 3 }}
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    'ProgramDetail',
                                    {
                                      live_uid: e.live_uid,
                                    },
                                  )
                                }>
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
                                          fontFamily: 'Mono-ExtraBold',
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
                                    fontFamily: 'Mono-Regular',
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
                                      fontFamily: 'Mono-ExtraBold',
                                    }}>
                                    {e.start_datetime}
                                  </Text>
                                </View>
                              </TouchableOpacity>
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
                        paddingLeft: 30,
                      }}>
                      {listChannel != null &&
                        listChannel.map((e) => {
                          return (
                            <TouchableOpacity
                              style={{ marginRight: 30 }}
                              onPress={() =>
                                this.props.navigation.navigate(
                                  'ChannelDetail2',
                                  { id: e.channel_uid },
                                )
                              }>
                              <Image
                                source={{ uri: e.thumbnail }}
                                style={{
                                  width: width / 3 - 40,
                                  height: ((width / 3 - 40) * 4) / 5,
                                  borderRadius: 50,
                                }}
                              />
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: '#141414',
                                  fontSize: 13,
                                  marginTop: 10,
                                  fontFamily: 'Mono-Regular',
                                }}>
                                {e.title}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
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
        <Modal
          isVisible={isShowModalLogin}
          onBackButtonPress={() => {
            this.setState({ isShowModalLogin: false });
            return true;
          }}>
          <View
            style={{
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              width,
            }}>
            <View
              style={{
                width: 300,
                height: 200,
                backgroundColor: 'white',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#222222',
                  fontSize: 18,
                  paddingHorizontal: 50,
                  paddingTop: 50,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontFamily: 'Mono-Blod',
                }}>
                로그인이 필요한 페이지입니다. 로그인 하시겠습니까?
              </Text>
              <View
                style={{
                  width: 300,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#9A9A9A',
                    width: 120,
                    height: 45,
                    display: 'flex',
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginLeft: 20,
                  }}
                  onPress={() => {
                    this.setState({ isShowModalLogin: false });
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 17,
                      fontFamily: 'Mono-Blod',
                    }}>
                    취소
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#50CCC3',
                    width: 120,
                    height: 45,
                    display: 'flex',
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginRight: 20,
                  }}
                  onPress={() => {
                    this.setState({ isShowModalLogin: false }, () => {
                      this.props.navigation.navigate('SignIn');
                    });
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 17,
                      fontFamily: 'Mono-Blod',
                    }}>
                    확인
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    listChannel: state.channelGetListReducer.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateAccessToken: () => dispatch(authActions.generateAccessToken()),
    getMainList: () => dispatch(liveActions.liveMainGet()),
    getMe: () => dispatch(myPageActions.getMe()),
    pokeChannel: (liveId, available) =>
      dispatch(liveActions.pokeChannel(liveId, available)),
    getListChannel: () => dispatch(liveActions.channelListGet()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
