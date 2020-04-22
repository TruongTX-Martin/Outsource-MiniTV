import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {Container, Body, Content, Footer} from 'native-base';
import TextInput from '../../../components/TextField';
import Modal, {ModalContent} from 'react-native-modals';
import validateInput from '../../../helpers/Validate';
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
      rePassword: {
        presence: {
          message: '^Please enter repassword',
        },
        length: {
          minimum: 6,
          message: '^Your repassword must be at least 6 characters',
        },
      },
    };
  }

  async componentDidMount() {}

  handleSignUp() {
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
      this.setState({rePasswordError: 'Password and repassword not match'});
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
      isModalVisible,
    } = this.state;
    return (
      <Container>
        <Body>
          <Content>
            <View
              style={{
                padding: 20,
                width,
              }}>
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
            style={{
              backgroundColor: '#499DA7',
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
