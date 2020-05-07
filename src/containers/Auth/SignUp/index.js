import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {Container, Body, Content, Footer} from 'native-base';
import TextInput from '../../../components/TextField';
import validateInput from '../../../helpers/Validate';
import DataRemote from '../../../services/DataRemote';
import Spinner from 'react-native-loading-spinner-overlay';
const {width} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      rePassword: '',
      rePasswordError: '',
      loading: false,
    };
    this.validation = {
      email: {
        presence: {
          message: '^이메일 주소를 입력해 주세요.',
        },
        email: {
          message: '^이메일 주소를 정확히 입력해주세요. ',
        },
      },
      password: {
        presence: {
          message: '^비밀번호를 입력해 주세요.',
        },
        length: {
          minimum: 6,
          message: '^6글자/숫자 이상의 비밀번호를 입력해주세요. ',
        },
      },
      rePassword: {
        presence: {
          message: '^비밀번호를 한번더 입력해 주세요.',
        },
        length: {
          minimum: 6,
          message: '^6글자/숫자 이상의 비밀번호를 입력해주세요. ',
        },
      },
    };
  }

  async handleSignUp() {
    const {email, password, rePassword} = this.state;
    const emailError = validateInput('email', email, this.validation);
    const passwordError = validateInput('password', password, this.validation);
    const rePasswordError = validateInput(
      'rePassword',
      rePassword,
      this.validation,
    );
    if (emailError || passwordError || rePasswordError) {
      this.setState({emailError, passwordError, rePasswordError});
      return;
    }
    if (password.trim() !== rePassword.trim()) {
      this.setState({rePasswordError: '입력한 비밀번호가 일치하지 않습니다. '});
      return;
    }
    this.setState({loading: true});
    const results = await DataRemote.validateEmail(email);
    this.setState({loading: false});
    if (!results?.data?.is_valid) {
      this.setState({
        emailError:
          '등록되지 않았거나 잘못된 이메일 주소입니다. 확인 후 다시 입력해주세요.',
      });
      return;
    }

    this.props.navigation.navigate('SignUpMoreInfor', {
      email: email,
      password: password,
    });
  }

  render() {
    const {
      email,
      emailError,
      password,
      passwordError,
      rePassword,
      rePasswordError,
      loading,
    } = this.state;
    const isEnable =
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      rePassword.trim().length > 0;

    return (
      <Container>
        <Body>
          <Content>
            <View
              style={{
                padding: 20,
                width,
              }}>
              <Spinner visible={loading} textStyle={{color: '#fff'}} />
              <Text style={{color: '#222222', fontSize: 25, paddingTop: 50}}>
                회원가입
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  marginTop: 5,
                  paddingLeft: 5,
                }}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#5DC3D0',
                    marginRight: 5,
                  }}
                />
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#999999',
                  }}
                />
              </View>
              <Text
                style={{
                  color: '#333333',
                  fontSize: 17,
                  marginTop: 30,
                  marginBottom: 5,
                }}>
                이메일
              </Text>
              <TextInput
                width={width - 40}
                placeholder="아이디로 사용할 이메일을 입력해주세요."
                value={email}
                onChangeText={(email) =>
                  this.setState({email, emailError: null})
                }
                error={emailError}
              />
              <Text
                style={{
                  color: '#333333',
                  fontSize: 17,
                  marginTop: 20,
                  marginBottom: 5,
                }}>
                비밀번호
              </Text>
              <TextInput
                width={width - 40}
                placeholder="6글자 이상의 비밀번호를 설정해주세요."
                isPassword
                value={password}
                onChangeText={(password) =>
                  this.setState({password, passwordError: null})
                }
                error={passwordError}
              />
              <Text
                style={{
                  color: '#333333',
                  fontSize: 17,
                  marginTop: 20,
                  marginBottom: 5,
                }}>
                비밀번호 확인
              </Text>
              <TextInput
                width={width - 40}
                placeholder="비밀번호를 다시 한 번 입력해주세요."
                isPassword
                value={rePassword}
                onChangeText={(rePassword) =>
                  this.setState({rePassword, rePasswordError: null})
                }
                error={rePasswordError}
              />
            </View>
          </Content>
        </Body>
        <Footer style={{backgroundColor: '#499DA7'}}>
          <TouchableOpacity
            disabled={!isEnable}
            style={{
              backgroundColor: isEnable ? '#499DA7' : '#999999',
              width,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.handleSignUp()}>
            <Text style={{color: 'white', fontSize: 18}}>다음</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

export default index;
