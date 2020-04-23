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
    // BackHandler.removeEventListener(
    //   'hardwareBackPress',
    //   this.onAndroidBackPress,
    // );
  }

  // componentWillMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
  // }
  // onAndroidBackPress = () => {
  //   return true;
  // };

  handleLoginFacebook() {
    console.log('Handle login facebook');
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
    // AccessToken.getCurrentAccessToken().then((token) => {
    //   console.log('Token:', token);
    // });
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
                  <TouchableOpacity>
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
                  <TouchableOpacity>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
