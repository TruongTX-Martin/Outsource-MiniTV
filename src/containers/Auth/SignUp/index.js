import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Container, Body, Content, Footer, Header } from 'native-base';
import TextInput from '../../../components/TextField';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import validateInput from '../../../helpers/Validate';
import DataRemote from '../../../services/DataRemote';
import Spinner from 'react-native-loading-spinner-overlay';
import Localization from '../../../localization';
const { width } = Dimensions.get('window');

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
      rePassword: {
        presence: {
          message: Localization.repassword_cannot_empty,
        },
        length: {
          minimum: 6,
          message: Localization.repassword_length_invalid,
        },
      },
    };
  }

  async handleSignUp() {
    const { email, password, rePassword } = this.state;
    const emailError = validateInput('email', email, this.validation);
    const passwordError = validateInput('password', password, this.validation);
    const rePasswordError = validateInput(
      'rePassword',
      rePassword,
      this.validation,
    );
    if (emailError || passwordError || rePasswordError) {
      this.setState({ emailError, passwordError, rePasswordError });
      return;
    }
    if (password.trim() !== rePassword.trim()) {
      this.setState({
        rePasswordError: Localization.password_and_repassword_not_match,
      });
      return;
    }
    this.setState({ loading: true });
    const results = await DataRemote.validateEmail(email);
    this.setState({ loading: false });
    if (!results?.data?.is_valid) {
      this.setState({
        emailError: Localization.email_error,
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
        <Header style={Config.Styles.headerWhite}>
          <HeaderBase navigation={this.props.navigation} smallBack />
        </Header>
        <Body>
          <Content>
            <View
              style={{
                padding: 20,
                width,
              }}>
              <Spinner visible={loading} textStyle={{ color: '#fff' }} />
              <Text style={{ color: '#222222', fontSize: 25, paddingTop: 50 }}>
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
                placeholder={Localization.email_place_holder}
                value={email}
                onChangeText={(email) =>
                  this.setState({ email, emailError: null })
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
                placeholder={Localization.password_place_holder}
                isPassword
                value={password}
                onChangeText={(password) =>
                  this.setState({ password, passwordError: null })
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
                placeholder={Localization.repassword_place_holder}
                isPassword
                value={rePassword}
                onChangeText={(rePassword) =>
                  this.setState({ rePassword, rePasswordError: null })
                }
                error={rePasswordError}
              />
            </View>
          </Content>
        </Body>
        <Footer
          style={{ backgroundColor: 'white', height: 60, borderTopWidth: 0 }}>
          <TouchableOpacity
            disabled={!isEnable}
            style={{
              backgroundColor: isEnable ? '#50CCC3' : '#999999',
              width: width - 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              height: 50,
            }}
            onPress={() => this.handleSignUp()}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              다음
            </Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

export default index;
