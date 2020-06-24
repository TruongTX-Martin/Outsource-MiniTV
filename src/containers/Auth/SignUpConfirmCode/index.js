import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Container, Body, Content, Footer, Header } from 'native-base';
import TextInputCustom from '../../../components/TextField';
import Images from '../../../assets/images';
import Modal from 'react-native-modal';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { EventRegister } from 'react-native-event-listeners';
import Constants from '../../../config/Constant';
import * as authActions from '../../../redux/actions/authActions';
import { getWidthScreen, getHeightScreen } from '../../../utils';
import DataRemote from '../../../services/DataRemote';

let width = 0;
let height = 0;

let widthView = 0;
const GENDER = {
  MALE: 0,
  FEMALE: 1,
};

const CERTIFICATE_STATUS = {
  NOT_CHECK: 0,
  PASS: 1,
  FAILED: 2,
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parrentName: '',
      phoneNumber: '',
      confirmCode: '',
      isModalVisible: false,
      checkingPhone: false,
      certificateNumber: '',
      certificateStatus: CERTIFICATE_STATUS.NOT_CHECK,
    };
    this.isSnsSignUp = props.navigation.getParam('isSnsSignUp', null);
    this.snsSignUpParams = props.navigation.getParam('snsSignUpParams', null);
    this.showModal = this.showModal.bind(this);
    width = getWidthScreen();
    height = getHeightScreen();
    widthView = width - 40;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccess) {
      if (this.isSnsSignUp) {
        this.props.navigation.goBack();
        EventRegister.emit(Constants.EVENT_SNS_SIGNIN_AGAIN);
      } else {
        this.showModal();
      }
    }
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  componentWillUnmount() {
    this.props.clearSignUpData();
  }

  handleSignUp() {
    let params = null;
    const email = this.props.navigation.getParam('email', null);
    const password = this.props.navigation.getParam('password', null);
    const { parrentName, phoneNumber } = this.state;
    if (this.isSnsSignUp && this.snsSignUpParams != null) {
      params = {
        email,
        password,
        member_name: parrentName,
        phone_number: phoneNumber,
        ...this.snsSignUpParams,
      };
      this.props.navigation.navigate('SignUpMoreInfor', {
        params,
        isSnsSignUp: true,
      });
    } else {
      params = {
        email,
        password,
        member_name: parrentName,
        phone_number: phoneNumber,
      };
      this.props.navigation.navigate('SignUpMoreInfor', { params });
    }
  }

  async getCMS() {
    const { phoneNumber } = this.state;
    if (phoneNumber.trim().toString().length == 0) {
      return;
    }
    const params = {
      phone_number: phoneNumber,
    };
    this.setState({ checkingPhone: true });
    const results = await DataRemote.authPhone(params);
    if (results.status == 200) {
      const cerNumber = results.data.certi_number;
      this.setState({
        certificateNumber: cerNumber,
        checkingPhone: false,
      });
    } else {
      this.setState({ checkingPhone: false });
    }
  }

  isValidPhone(phone) {
    return /^\d+$/.test(phone) && phone.trim().length == 11;
  }

  isValidCode(code, certificate) {
    return /^\d+$/.test(code) && code.trim().length > 2;
  }

  checkConfirmCode() {
    const { certificateNumber, confirmCode } = this.state;
    if (certificateNumber == confirmCode) {
      this.setState({ certificateStatus: CERTIFICATE_STATUS.PASS });
    } else {
      this.setState({ certificateStatus: CERTIFICATE_STATUS.FAILED });
    }
  }

  render() {
    const {
      parrentName,
      isModalVisible,
      phoneNumber,
      confirmCode,
      checkingPhone,
      certificateNumber,
      certificateStatus,
    } = this.state;
    const { loading } = this.props;
    const isValidPhone = this.isValidPhone(phoneNumber);
    const isValidCode = this.isValidCode(confirmCode, certificateNumber);
    const isValidAll =
      certificateStatus == CERTIFICATE_STATUS.PASS && parrentName.length > 0;
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
                    backgroundColor: '#999999',
                    marginRight: 5,
                  }}
                />
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#5DC3D0',
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
                이름
              </Text>
              <TextInputCustom
                width={widthView}
                value={parrentName}
                onChangeText={(parrentName) => this.setState({ parrentName })}
              />
              <Text
                style={{
                  color: '#333333',
                  fontSize: 17,
                  marginTop: 20,
                  marginBottom: 5,
                }}>
                휴대전화
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <TextInputCustom
                  width={widthView - 80}
                  value={phoneNumber}
                  keyboardType={'numeric'}
                  placeholder={'‘-‘를 제외한 숫자만 입력해주세요.'}
                  onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: isValidPhone ? '#50CCC3' : '#DDDDDD',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 70,
                    height: 45,
                    marginTop: 5,
                  }}
                  disabled={!isValidPhone}
                  onPress={() => this.getCMS()}>
                  {checkingPhone && (
                    <ActivityIndicator size="small" color="white" />
                  )}
                  {!checkingPhone && (
                    <Text
                      style={{
                        color: isValidPhone ? 'white' : '#222222',
                        fontWeight: 'bold',
                      }}>
                      인증
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: '#333333',
                  fontSize: 17,
                  marginTop: 20,
                  marginBottom: 5,
                }}>
                인증번호
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <TextInputCustom
                  width={widthView - 80}
                  value={confirmCode}
                  keyboardType={'numeric'}
                  onChangeText={(confirmCode) =>
                    this.setState({
                      confirmCode,
                      certificateStatus: CERTIFICATE_STATUS.NOT_CHECK,
                    })
                  }
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: isValidCode ? '#50CCC3' : '#DDDDDD',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 70,
                    height: 45,
                    marginTop: 5,
                  }}
                  disabled={!isValidCode}
                  onPress={() => this.checkConfirmCode()}>
                  <Text
                    style={{
                      color: isValidCode ? 'white' : '#222222',
                      fontWeight: 'bold',
                    }}>
                    확인
                  </Text>
                </TouchableOpacity>
              </View>
              {certificateStatus == CERTIFICATE_STATUS.FAILED && (
                <Text
                  style={{ fontSize: 13, color: '#F7543F', fontWeight: '300' }}>
                  인증번호를 다시 확인해주세요.
                </Text>
              )}
              {certificateStatus == CERTIFICATE_STATUS.PASS && (
                <Text
                  style={{ fontSize: 13, color: '#1A8DFF', fontWeight: '300' }}>
                  인증되었습니다!
                </Text>
              )}
            </View>
          </Content>
        </Body>
        <Footer
          style={{ backgroundColor: 'white', height: 60, borderTopWidth: 0 }}>
          <TouchableOpacity
            disabled={!isValidAll}
            style={{
              backgroundColor: isValidAll ? '#499DA7' : '#999999',
              width: width - 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              height: 50,
            }}
            onPress={() => this.handleSignUp()}>
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
                  '인증을 위한 이메일이 발송되었습니다.\n 이메일 확인 후 가입을 완료해 주세요.'
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
                  width: width - 60,
                  backgroundColor: '#499DA7',
                  height: 55,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                  this.props.navigation.pop(3);
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
    loading: state.signUpReducer.loading,
    isSuccess: state.signUpReducer.isSuccess,
    reason: state.signUpReducer.reason,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (params) => dispatch(authActions.signUp(params)),
    clearSignUpData: () => dispatch(authActions.signUpClearData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
