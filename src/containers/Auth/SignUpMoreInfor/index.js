import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
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
const { width } = Dimensions.get('window');

const widthView = width - 40;
const GENDER = {
  MALE: 0,
  FEMALE: 1,
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childName: '',
      phoneNumber: '',
      confirmCode: '',
      isValidAll: false,
      isModalVisible: false,
    };
    this.isSnsSignUp = props.navigation.getParam('isSnsSignUp', null);
    this.snsSignUpParams = props.navigation.getParam('snsSignUpParams', null);
    this.showModal = this.showModal.bind(this);
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

  checkValidAll() { }

  handleSignUp() {
    const email = this.props.navigation.getParam('email', null);
    const password = this.props.navigation.getParam('password', null);
    const { childName } = this.state;
    let params = null;
    const validMonth =
      parseInt(month) < 10 && month.length < 2 ? '0' + month : month;
    const validDay = parseInt(day) < 10 && day.length < 2 ? '0' + day : day;
    if (this.isSnsSignUp && this.snsSignUpParams != null) {
      params = {
        ...this.snsSignUpParams,
        student_name: childName,
        birthday: year.toString() + validMonth.toString() + validDay.toString(),
        sex: gender == GENDER.MALE ? 'MALE' : 'FEMALE',
      };
    } else {
      params = {
        email,
        password,
        student_name: childName,
        birthday: year.toString() + validMonth.toString() + validDay.toString(),
        sex: gender == GENDER.MALE ? 'MALE' : 'FEMALE',
      };
    }
    this.props.signUp(params);
  }

  render() {
    const {
      childName,
      isValidAll,
      isModalVisible,
      phoneNumber,
      confirmCode,
    } = this.state;
    const { loading } = this.props;
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
                value={childName}
                onChangeText={(childName) => this.setState({ childName })}
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
                  onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#50CCC3',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 70,
                    height: 45,
                    marginTop: 5,
                  }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>인증</Text>
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
                  onChangeText={(confirmCode) => this.setState({ confirmCode })}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#50CCC3',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 70,
                    height: 45,
                    marginTop: 5,
                  }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>확인</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 13, color: '#F7543F', fontWeight: '300' }}>
                인증번호를 다시 확인해주세요.
              </Text>
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
