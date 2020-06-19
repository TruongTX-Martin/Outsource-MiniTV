import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Container, Body, Content, Footer, Header } from 'native-base';
import TextInput from '../../../components/TextField';
import Config from '../../../config';
import HeaderBase from '../../../components/HeaderBase';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import DataRemote from '../../../services/DataRemote';
import validateInput from '../../../helpers/Validate';
import * as authActions from '../../../redux/actions/authActions';
import { getWidthScreen, getHeightScreen } from '../../../utils';

let width = 0;
let height = 0;
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: null,
      isValidEmail: false,
      isModalVisible: false,
      checkingEmail: false,
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
    };
    width = getWidthScreen();
    height = getHeightScreen();
  }

  async findPassword() {
    const { email } = this.state;
    this.setState({ checkingEmail: true });
    const results = await DataRemote.validateEmail(email);
    this.setState({ checkingEmail: false });
    if (results?.data?.is_valid) {
      this.setState({
        emailError:
          '이메일 주소가 잘못 입력 되었거나 등록되지 않은 주소입니다. 다시 입력해 주세요.',
      });
      return;
    }
    this.props.findPassword(email);
  }

  checkValidEmail() {
    const { email } = this.state;
    const emailError = validateInput('email', email, this.validation);
    this.setState({
      isValidEmail: emailError == null,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccess) {
      this.setState({ isModalVisible: true });
    }
  }

  render() {
    const {
      email,
      isValidEmail,
      isModalVisible,
      checkingEmail,
      emailError,
    } = this.state;
    const { loading } = this.props;
    return (
      <Container>
        <Header style={Config.Styles.headerWhite}>
          <HeaderBase smallBack navigation={this.props.navigation} />
        </Header>
        <Body>
          <Content>
            <Spinner
              visible={loading || checkingEmail}
              textStyle={{ color: '#fff' }}
            />
            <View
              style={{
                padding: 20,
                height: height - 150,
                width,
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{ marginTop: 50, fontSize: 30 }}>비밀번호 찾기</Text>
                <Text style={{ marginTop: 50, fontSize: 20 }}>이메일</Text>
                <TextInput
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChangeText={(email) =>
                    this.setState({ email }, () => this.checkValidEmail())
                  }
                  error={emailError}
                />
              </View>
              <View>
                <Text
                  style={{ textAlign: 'center', color: '#555555', fontSize: 17 }}>
                  아직 문제가 있으신가요?
                </Text>
                <Text
                  style={{ textAlign: 'center', color: '#555555', fontSize: 17 }}>
                  고객센터 : 02-123-2012
                </Text>
              </View>
            </View>
          </Content>
        </Body>
        <Footer
          style={{ backgroundColor: 'white', height: 60, borderTopWidth: 0 }}>
          <TouchableOpacity
            style={{
              backgroundColor: isValidEmail ? '#50CCC3' : '#999999',
              width: width - 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              height: 50,
            }}
            disabled={!isValidEmail}
            onPress={() => this.findPassword()}>
            <Text style={{ color: 'white', fontSize: 18 }}>확인</Text>
          </TouchableOpacity>
        </Footer>
        <Modal
          isVisible={isModalVisible}
          onBackButtonPress={() => {
            this.setState({ isModalVisible: false });
            return true;
          }}>
          <View
            style={{
              width: width - 40,
              height: 300,
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: 5,
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 225,
              }}>
              <Text
                style={{
                  color: '#222222',
                  fontSize: 18,
                  width: width - 50,
                  textAlign: 'center',
                }}>
                {
                  '임시 비밀번호가 발송되었습니다. \n등록하신 이메일 주소를 확인하세요.'
                }
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingBottom: 20,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#50CCC3',
                  height: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  paddingHorizontal: 55,
                }}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                  this.props.navigation.goBack();
                }}>
                <Text style={{ color: 'white', fontSize: 17 }}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSuccess: state.findPasswordReducer.isSuccess,
    loading: state.findPasswordReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findPassword: (email) => dispatch(authActions.findPassword(email)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
