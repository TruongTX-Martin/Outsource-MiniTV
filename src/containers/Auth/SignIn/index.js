import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { Container, Body, Content } from 'native-base';
import Images from '../../../assets/images';
import Images2 from '../../../assets/images2';
import { connect } from 'react-redux';
import * as authActions from '../../../redux/actions/authActions';
import TextInput from '../../../components/TextField';
import Orientation from 'react-native-orientation';
import { EventRegister } from 'react-native-event-listeners';
import Constants from '../../../config/Constant';
import validateInput from '../../../helpers/Validate';
import ButtonBase from '../../../components/ButtonBase';
import Spinner from 'react-native-loading-spinner-overlay';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { NaverLogin, getProfile } from '@react-native-seoul/naver-login';
import Localization from '../../../localization';
import { setWidthScreen, setHeightScreen } from '../../../utils';

//naver
const androidkeys = {
  kConsumerKey: 'TTq8dR1UvTfqGzynoOyd',
  kConsumerSecret: 'hO7NGv2v7M',
  kServiceAppName: 'Mini TV',
};

const ioskeys = {
  kConsumerKey: 'TTq8dR1UvTfqGzynoOyd',
  kConsumerSecret: 'hO7NGv2v7M',
  kServiceAppName: 'Mini TV',
  kServiceAppUrlScheme: 'minitivischeme', // only for iOS
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      paramSignUp: null,
      paramsSNS: null,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
    this.validation = {
      email: {
        presence: {
          message: Localization.email_cannot_empty,
        },
        email: {
          message: Localization.email_invalid,
        },
      },
      password: {
        presence: {
          message: Localization.password_cannot_empty,
        },
        length: {
          minimum: 6,
          message: Localization.password_length_invaid,
        },
      },
    };
    this.onLayout = this.onLayout.bind(this);
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

  gotoSignUp() {
    this.props.navigation.navigate('TermAndCondition');
  }

  componentDidMount() {
    this.props.generateAccessToken();

    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '367155018407-imisa2jp5q1ppv041u5slgmeetlt0t6a.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      loginHint: '',
      forceConsentPrompt: true,
      accountName: '',
      androidClientId:
        '367155018407-rr2nnifcsr9fqlam41uocrf636jqvpfu.apps.googleusercontent.com',
      iosClientId:
        '367155018407-eeag1be667s265fk8cjbshgas6imvb8c.apps.googleusercontent.com',
    });
    Orientation.lockToPortrait();
  }

  handleSignIn() {
    const { email, password } = this.state;
    const emailError = validateInput('email', email, this.validation);
    const passwordError = validateInput('password', password, this.validation);
    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return;
    }
    const params = {
      email,
      password,
    };
    this.props.signIn(params);
  }

  componentWillReceiveProps(nextProps) {
    const { snsMessage, snsSuccess } = nextProps;
    if (nextProps.isSuccess || snsSuccess) {
      Orientation.lockToLandscape();
      this.props.navigation.goBack();
      EventRegister.emit(Constants.EVENT_SIGNIN_SUCCESS);
    }
    if (!snsSuccess && snsMessage == 'failed') {
      this.props.navigation.navigate('SignUpConfirmCode', {
        isSnsSignUp: true,
        snsSignUpParams: this.state.paramSignUp,
      });
    }
  }

  componentWillUnmount() {
    this.props.signInClear();
    this.props.snsSignInClear();
    EventRegister.removeEventListener(this.listenerSNSSignInAgain);
  }

  componentWillMount() {
    this.listenerSNSSignInAgain = EventRegister.addEventListener(
      Constants.EVENT_SNS_SIGNIN_AGAIN,
      (data) => {
        this.props.snsSignIn(this.state.paramsSNS);
      },
    );
  }

  async handleLoginFacebook() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      console.log('Login cancelled');
    } else {
      const data = await AccessToken.getCurrentAccessToken();
      const { accessToken } = data;
      const response = await fetch(
        'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
        accessToken,
      );
      const json = await response.json();
      const paramSignUp = {
        email: json.email,
        sns_connect_info: {
          type: 'facebook',
          id: json.id,
          token: accessToken,
        },
      };
      const paramsSNS = {
        email: json.email,
        sns_type: 'facebook',
        id: json.id,
        token: accessToken,
      };
      this.setState({ paramSignUp, paramsSNS });
      this.props.snsSignIn(paramsSNS);
    }
  }

  async handleLoginGoogle() {
    try {
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const paramSignUp = {
        email: userInfo.user.email,
        sns_connect_info: {
          type: 'google',
          id: userInfo.user.id,
          token: userInfo.idToken,
        },
      };
      const paramsSNS = {
        email: userInfo.user.email,
        sns_type: 'google',
        id: userInfo.user.id,
        token: userInfo.idToken,
      };
      this.setState({ paramSignUp, paramsSNS });
      this.props.snsSignIn(paramsSNS);
    } catch (error) {
      console.log('error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  naverLogin = (props) => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        this.getUserProfile(token);
      });
    });
  };

  getUserProfile = async (naverToken) => {
    const profileResult = await getProfile(naverToken.accessToken);
    console.log('profileResult:', profileResult);
    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message);
      return;
    }
    const paramSignUp = {
      email: profileResult.response.email,
      sns_connect_info: {
        type: 'naver',
        id: profileResult.response.id,
        token: naverToken.accessToken,
      },
    };
    const paramsSNS = {
      email: profileResult.response.email,
      sns_type: 'naver',
      id: profileResult.response.id,
      token: naverToken.accessToken,
    };
    this.setState({ paramSignUp, paramsSNS });
    this.props.snsSignIn(paramsSNS);
  };

  render() {
    const {
      email,
      emailError,
      password,
      passwordError,
      width,
      height,
    } = this.state;
    const initials = Platform.OS == 'ios' ? ioskeys : androidkeys;
    const { loading, reason, snsLoading } = this.props;
    return (
      <Container>
        <Body>
          <Content showsVerticalScrollIndicator={false}>
            <View
              onLayout={this.onLayout}
              style={{
                height,
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: 50,
              }}>
              <View>
                <Spinner
                  visible={loading || snsLoading}
                  textStyle={{ color: '#fff' }}
                />
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={Images2.imgLogo2}
                    style={{
                      width: width / 3,
                      height: ((width / 3) * 90) / 340,
                      marginTop: 60,
                      marginBottom: 40,
                    }}
                  />
                  <Image
                    source={Images2.imgIcOnAir}
                    style={{
                      width: 53,
                      height: 42,
                      marginTop: 60,
                      marginBottom: 40,
                    }}
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
                  <View style={{ marginBottom: 10 }}>
                    <TextInput
                      width={width - 42}
                      placeholder="이메일"
                      value={email}
                      onChangeText={(email) =>
                        this.setState({ email, emailError: null })
                      }
                      error={emailError}
                    />
                  </View>
                  <TextInput
                    width={width - 42}
                    placeholder="비밀번호"
                    isPassword
                    value={password}
                    onChangeText={(password) =>
                      this.setState({ password, passwordError: null })
                    }
                    error={passwordError || reason}
                  />
                  <View style={{ marginTop: 40 }}>
                    <ButtonBase
                      width={width - 46}
                      text={'로그인'}
                      style={{ borderRadius: 30 }}
                      backgroundColor={'#50CCC3'}
                      onPress={() => this.handleSignIn()}
                    />
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: width - 46,
                      marginTop: 10,
                    }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => this.gotoSignUp()}
                        style={{
                          borderRightWidth: 1,
                          borderRightColor: '#333030',
                          paddingRight: 10,
                        }}>
                        <Text style={{ color: '#333030' }}>회원가입</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('FindPassword')
                        }
                        style={{ paddingLeft: 10 }}>
                        <Text style={{ color: '#333030' }}>비밀번호 찾기</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1FC800',
                  width: width - 46,
                  height: 45,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => this.naverLogin(initials)}>
                <Text
                  style={{
                    fontSize: 30,
                    color: 'white',
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                  }}>
                  N
                </Text>
                <Text style={{ color: 'white', textAlign: 'center' }}>
                  네이버로 시작하기
                </Text>
                <Text
                  style={{
                    fontSize: 30,
                    color: 'transparent',
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                  }}>
                  N
                </Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.signInReducer.loading,
    isSuccess: state.signInReducer.isSuccess,
    reason: state.signInReducer.reason,

    snsLoading: state.snsSignInReducer.snsLoading,
    snsSuccess: state.snsSignInReducer.snsSuccess,
    snsMessage: state.snsSignInReducer.snsMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateAccessToken: () => dispatch(authActions.generateAccessToken()),
    signIn: (params) => dispatch(authActions.signIn(params)),
    signInClear: () => dispatch(authActions.signInClear()),
    signUp: (params) => dispatch(authActions.signUp(params)),
    snsSignIn: (params) => dispatch(authActions.snsSignIn(params)),
    snsSignInClear: (params) => dispatch(authActions.snsSignInClear()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
