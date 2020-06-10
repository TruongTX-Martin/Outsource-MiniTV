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
const { width, height } = Dimensions.get('window');

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
      this.props.navigation.navigate('SignUpMoreInfor', {
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
    const { email, emailError, password, passwordError } = this.state;
    const initials = Platform.OS == 'ios' ? ioskeys : androidkeys;
    const { loading, reason, snsLoading } = this.props;
    return (
      <Container>
        <Body>
          <Content showsVerticalScrollIndicator={false}>
            <View
              style={{
                height,
              }}>
              <View>
                <Spinner
                  visible={loading || snsLoading}
                  textStyle={{ color: '#fff' }}
                />
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    source={Images.imgLogo}
                    style={{
                      width: width / 3,
                      height: ((width / 3) * 90) / 340,
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
                      icon={Images.imgIcUserName}
                      width={width - 42}
                      styleIcon={{ width: 15, height: 14 }}
                      placeholder="이메일"
                      value={email}
                      onChangeText={(email) =>
                        this.setState({ email, emailError: null })
                      }
                      error={emailError}
                    />
                  </View>
                  <TextInput
                    icon={Images.imgIcPassword}
                    width={width - 42}
                    styleIcon={{ width: 15, height: 18 }}
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
                      onPress={() => this.handleSignIn()}
                    />
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      width: width - 46,
                      marginTop: 10,
                    }}>
                    <TouchableOpacity onPress={() => this.gotoSignUp()}>
                      <Text style={{ color: '#797979', marginRight: 10 }}>
                        이메일 회원가입
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('FindPassword')
                      }>
                      <Text style={{ color: '#797979', marginRight: 10 }}>
                        비밀번호 찾기
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 50,
                      width: width - 45,
                      marginBottom: 25,
                    }}>
                    <View
                      style={{ flex: 2, height: 1, backgroundColor: '#cacaca' }}
                    />
                    <View
                      style={{
                        flex: 4,
                        height: 30,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: '#797979' }}>
                        SNS 회원가입 / 로그인
                      </Text>
                    </View>
                    <View
                      style={{ flex: 2, height: 1, backgroundColor: '#cacaca' }}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#54c43a',
                      width: width - 46,
                      height: 45,
                      borderRadius: 5,
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
