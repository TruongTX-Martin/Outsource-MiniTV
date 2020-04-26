import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  // BackHandler,
} from 'react-native';
import {Container, Body, Content} from 'native-base';
import Images from '../../../assets/images';
import {connect} from 'react-redux';
import * as authActions from '../../../redux/actions/authActions';
import TextInput from '../../../components/TextField';
import {EventRegister} from 'react-native-event-listeners';
import Constants from '../../../config/Constant';
import validateInput from '../../../helpers/Validate';
import ButtonBase from '../../../components/ButtonBase';
import Spinner from 'react-native-loading-spinner-overlay';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

const {width} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
    };
    this.validation = {
      email: {
        presence: {
          message: '^Please enter an email address',
        },
        email: {
          message: '^Please enter a valid email address',
        },
      },
      password: {
        presence: {
          message: '^Please enter password',
        },
        length: {
          minimum: 6,
          message: '^Your password must be at least 6 characters',
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
        '68351548425-qsou5lr4g8qghae5ajjp7ko1k7eh66be.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      loginHint: '',
      forceConsentPrompt: true,
      accountName: '',
      androidClientId:
        '68351548425-v3oplo93abbtf1qpj7e2emnt72igh06e.apps.googleusercontent.com',
      iosClientId:
        'XXXXXX-krv1hjXXXXXXp51pisuc1104q5XXXXXXe.apps.googleusercontent.com',
    });
  }

  handleSignIn() {
    const {email, password} = this.state;
    const emailError = validateInput('email', email, this.validation);
    const passwordError = validateInput('password', password, this.validation);
    if (emailError || passwordError) {
      this.setState({emailError, passwordError});
      return;
    }
    const params = {
      email,
      password,
    };
    this.props.signIn(params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccess) {
      this.props.navigation.goBack();
      EventRegister.emit(Constants.EVENT_SIGNIN_SUCCESS);
    }
  }

  componentWillUnmount() {
    this.props.signInClear();
  }

  handleLoginFacebook() {
    console.log('Handle login facebook');
    LoginManager.setLoginBehavior('web_only');
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then((data) => {
            console.log('Accesstoken:', data.accessToken.toString());
            const {accessToken} = data;
            fetch(
              'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
                accessToken,
            )
              .then((response) => response.json())
              .then((json) => {
                // Some user object has been set up somewhere, build that user here
                console.log('User information:', json);
                const email = json.email;
                const id = json.id;
                console.log('Email:', email);
                console.log('id:', id);
                const params = {
                  email: email,
                  sns_connect_info: {
                    type: 'facebook',
                    id: id,
                    token: accessToken,
                  },
                };
              })
              .catch((error) => {
                console.log('Get user error:', error);
              });
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }

  async handleLoginGoogle() {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo:', userInfo);
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

  render() {
    const {email, emailError, password, passwordError} = this.state;
    const {loading, reason} = this.props;
    return (
      <Container>
        <Body>
          <Content>
            <View>
              <Spinner visible={loading} textStyle={{color: '#fff'}} />
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image
                  source={Images.imgLogo}
                  style={{
                    width: 150,
                    height: 34,
                    marginTop: 60,
                    marginBottom: 40,
                  }}
                />
              </View>
              <View
                style={{display: 'flex', alignItems: 'center', marginTop: 30}}>
                <View style={{marginBottom: 10}}>
                  <TextInput
                    icon={Images.imgIcUserName}
                    width={width - 42}
                    styleIcon={{width: 15, height: 14}}
                    placeholder="이메일"
                    value={email}
                    onChangeText={(email) =>
                      this.setState({email, emailError: null})
                    }
                    error={emailError}
                  />
                </View>
                <TextInput
                  icon={Images.imgIcPassword}
                  width={width - 42}
                  styleIcon={{width: 15, height: 18}}
                  placeholder="비밀번호"
                  isPassword
                  value={password}
                  onChangeText={(password) =>
                    this.setState({password, passwordError: null})
                  }
                  error={passwordError}
                />
                <View style={{marginTop: 40}}>
                  <ButtonBase
                    width={width - 46}
                    text={'로그인'}
                    onPress={() => this.handleSignIn()}
                  />
                </View>
                {reason != null && (
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      paddingHorizontal: 20,
                    }}>
                    {reason}
                  </Text>
                )}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    width: width - 46,
                    marginTop: 10,
                  }}>
                  <TouchableOpacity onPress={() => this.gotoSignUp()}>
                    <Text style={{color: '#797979', marginRight: 10}}>
                      회원가입
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('FindPassword')
                    }>
                    <Text style={{color: '#797979', marginRight: 10}}>
                      비밀번호 찾기
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={{color: '#222222', marginTop: 40}}>
                  SNS 간편 로그인
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 180,
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity onPress={() => this.handleLoginFacebook()}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                      }}
                      source={Images.imgFacebook}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                      }}
                      source={Images.imgIcNavor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.handleLoginGoogle()}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                      }}
                      source={Images.imgFacebook}
                    />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateAccessToken: () => dispatch(authActions.generateAccessToken()),
    signIn: (params) => dispatch(authActions.signIn(params)),
    signInClear: () => dispatch(authActions.signInClear()),
    signUp: (params) => dispatch(authActions.signUp(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
