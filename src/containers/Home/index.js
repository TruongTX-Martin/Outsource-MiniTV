import React, {Component} from 'react';
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
import {Container, Body, Header, Content} from 'native-base';
import Config from '../../config';
import {connect} from 'react-redux';
import Images from '../../assets/images';
import * as authActions from '../../redux/actions/authActions';
import * as liveActions from '../../redux/actions/liveActions';
import * as myPageActions from '../../redux/actions/myPageActions';
import ItemChannel from './Component/ItemChannel';
import {EventRegister} from 'react-native-event-listeners';
import DataLocal from '../../services/DataLocal';
import {showToast} from '../../utils';
import {getCurrentRouter} from '../../helpers/routerHelper';
const {width, height} = Dimensions.get('window');

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
      this.setState({loadingFirst: false});
      clearTimeout(timeoutLoading);
    }, 2000);
    this.checkScreenAndLoadData();
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
      this.props.generateAccessToken();
      this.props.getMainList();
    }
  }

  renderItem({item, index}) {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#CACACA',
        }}>
        <Text style={{fontSize: 15, fontWeight: '600', marginLeft: 10}}>
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
        this.props.getMainList();
        this.props.getMe();
        showToast('Login Success');
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
    BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
  }
  componentWillUnmount() {
    EventRegister.removeEventListener(this.listenerGoToSignIn);
    EventRegister.removeEventListener(this.listenerSignInSuccess);
    EventRegister.removeEventListener(this.listenerSignOut);
    EventRegister.removeEventListener(this.listenerGoToStore);
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
      const {countPressBack, isOpenSlideMenu} = this.state;
      if (isOpenSlideMenu) {
        this.setState({isOpenSlideMenu: false});
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
        this.setState({countPressBack: 0});
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
    const {loadingFirst} = this.state;
    const {loading, onAir, hotLists, resultPlay} = this.props;
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
        <Header
          style={[
            Config.Styles.header,
            {
              borderBottomWidth: 1,
              borderBottomColor: 'white',
            },
          ]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width,
              alignItems: 'center',
            }}>
            <Image
              style={{width: (30 * 189) / 50, height: 30, marginLeft: 15}}
              source={Images.imgLogo}
            />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.openDrawer();
                this.setState({isOpenSlideMenu: true});
              }}>
              <Image
                style={{width: 25, height: 19, marginRight: 10}}
                source={Images.imgIcMenuBar}
              />
            </TouchableOpacity>
          </View>
        </Header>
        <Body>
          <Content
            style={{backgroundColor: '#fefefe'}}
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
                  width,
                  paddingHorizontal: 15,
                  marginTop: 20,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 25}}>
                  {this.getTitle(onAir?.status)}
                </Text>
                <View
                  style={{
                    width: widthView,
                    height: 1,
                    backgroundColor: '#f7f7f7',
                    marginVertical: 10,
                  }}
                />
                <Text
                  style={{color: '#333333', fontWeight: 'bold', fontSize: 20}}>
                  {onAir && onAir.title}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <TouchableOpacity>
                    <Text style={{color: '#4E9DA6', marginRight: 10}}>
                      {onAir && onAir.tags}
                    </Text>
                  </TouchableOpacity>
                </View>
                <ImageBackground
                  source={{
                    uri: onAir && onAir.thumbnail ? onAir.thumbnail : '',
                  }}
                  imageStyle={{borderRadius: 5, resizeMode: 'contain'}}
                  style={{
                    width: widthView,
                    height: (widthView * 490) / 800,
                    borderRadius: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}>
                  {onAir && onAir.status == STATUS.DOING && (
                    <View
                      style={{
                        backgroundColor: 'red',
                        width: 60,
                        position: 'absolute',
                        left: 10,
                        top: 10,
                        paddingVertical: 5,
                        textAlign: 'center',
                        borderRadius: 15,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}>
                        On Air
                      </Text>
                    </View>
                  )}
                  {onAir && onAir.status == STATUS.DOING && (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('PlayVideo', {
                          playUrl: resultPlay.play_url,
                        })
                      }>
                      <Image
                        style={{width: 50, height: 50}}
                        source={Images.imgIcPlay}
                      />
                    </TouchableOpacity>
                  )}
                </ImageBackground>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  marginTop: 30,
                  backgroundColor: '#fefefe',
                }}>
                <Text
                  style={{
                    color: '#00000',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  Hot Channel
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 20,
                    marginTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 5,
                  }}>
                  {hotLists &&
                    hotLists.map((e) => {
                      return (
                        <ItemChannel
                          item={e}
                          widthView={widthView - 30}
                          navigation={this.props.navigation}
                        />
                      );
                    })}
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
