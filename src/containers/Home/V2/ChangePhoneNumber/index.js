import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Switch,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Container, Body, Header } from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import * as authActions from '../../../../redux/actions/authActions';
import Config from '../../../../config';
import DataRemote from '../../../../services/DataRemote';
import Spinner from 'react-native-loading-spinner-overlay';
import Images from '../../../../assets/images';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import * as myPageActions from '../../../../redux/actions/myPageActions';
import { getWidthScreen, getHeightScreen } from '../../../../utils';
let width = 0;
let height = 0;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      verifyCode: '',
      certificateNumber: '',
      checkingPhone: false,
      validCertificateNumber: false,
      loading: false,
      isShowModalSuccess: false,
    };
    width = getWidthScreen();
    height = getHeightScreen();
  }

  async getCMS() {
    const { phoneNumber } = this.state;
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

  handleCompareCode() {
    const { certificateNumber, verifyCode } = this.state;
    if (verifyCode == certificateNumber) {
      this.setState({
        validCertificateNumber: true,
      });
    }
  }

  isValidPhone(phone) {
    return /^\d+$/.test(phone) && phone.trim().length == 11;
  }

  isValidCode(phone) {
    return /^\d+$/.test(phone) && phone.trim().length > 0;
  }

  async handleUpdatePhone() {
    const { validCertificateNumber, phoneNumber } = this.state;
    if (!validCertificateNumber) {
      return;
    }
    let phone = phoneNumber;
    if (phoneNumber.includes('-')) {
      phone = phoneNumber.split('-').join('').trim();
    }
    const param = {
      phone_number: phone,
    };
    this.setState({ loading: true });
    const results = await DataRemote.changePhoneNumber(param);
    if (results.status == 200) {
      this.setState({ isShowModalSuccess: true, loading: false });
    } else {
      this.setState({ loading: false });
    }
  }

  onChangeTextPhoneNumber(phoneNumber) {
    let phone = phoneNumber;
    if (phoneNumber.includes('-')) {
      phone = phoneNumber.split('-').join('').trim();
    }
    if (phone.length >= 4) {
      phone = this.insertString(phone, 3, '-');
    }
    if (phone.length >= 9) {
      phone = this.insertString(phone, 8, '-');
    }
    this.setState({
      phoneNumber: phone,
      validCertificateNumber: false,
      certificateNumber: '',
    });
  }

  insertString(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  }

  render() {
    const {
      phoneNumber,
      verifyCode,
      checkingPhone,
      validCertificateNumber,
      loading,
      isShowModalSuccess,
    } = this.state;
    const validPhone = this.isValidPhone(phoneNumber);
    const validCode = this.isValidCode(verifyCode);
    return (
      <Container>
        <Header style={Config.Styles.headerGray}>
          <HeaderBase
            navigation={this.props.navigation}
            title="휴대전화번호 변경"
            backGray
          />
        </Header>
        <Body>
          <View style={{ width, height, backgroundColor: '#F0F0F0' }}>
            <Spinner visible={loading} textStyle={{ color: '#fff' }} />
            <View style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
              <View style={{ display: 'flex', flex: 1 }} />
              <View style={{ display: 'flex', flex: 7, paddingTop: 30 }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#cacaca',
                    paddingBottom: 5,
                  }}>
                  <TextInput
                    style={{
                      paddingLeft: 5,
                      flex: 1,
                    }}
                    keyboardType="numeric"
                    value={phoneNumber}
                    placeholder={'휴대전화 번호를 입력해주세요'}
                    onChangeText={(phoneNumber) =>
                      this.onChangeTextPhoneNumber(phoneNumber)
                    }
                    maxLength={13}
                  />
                  <TouchableOpacity
                    disabled={!validPhone}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 20,
                      backgroundColor: validPhone ? '#50CCC3' : '#DDDDDD',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => this.getCMS()}>
                    {checkingPhone ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={{ color: validPhone ? 'white' : '#222222' }}>
                          인증
                        </Text>
                      )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#cacaca',
                    paddingBottom: 5,
                    marginTop: 10,
                  }}>
                  <TextInput
                    style={{
                      paddingLeft: 5,
                      flex: 1,
                    }}
                    keyboardType="numeric"
                    value={verifyCode}
                    placeholder={'인증번호를 입력하세요'}
                    onChangeText={(verifyCode) =>
                      this.setState({
                        verifyCode,
                        validCertificateNumber: false,
                      })
                    }
                  />
                  <TouchableOpacity
                    disabled={!validCode}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 20,
                      backgroundColor: validCode ? '#50CCC3' : '#DDDDDD',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => this.handleCompareCode()}>
                    <Text style={{ color: validCode ? 'white' : '#222222' }}>
                      인증
                    </Text>
                  </TouchableOpacity>
                </View>
                {validCertificateNumber && (
                  <Text
                    style={{
                      color: '#1A8DFF',
                      fontSize: 13,
                      fontWeight: '300',
                      marginTop: 10,
                    }}>
                    인증되었습니다!
                  </Text>
                )}
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 40,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 5,
                        borderWidth: 2,
                        borderColor: '#9A9A9A',
                        paddingVertical: 10,
                        marginRight: 5,
                        width: 90,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => this.props.navigation.goBack()}>
                      <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>
                        취소
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderRadius: 5,
                        backgroundColor: '#50CCC3',
                        paddingVertical: 10,
                        marginRight: 5,
                        width: 90,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 5,
                      }}
                      onPress={() => this.handleUpdatePhone()}>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ display: 'flex', flex: 1 }} />
            </View>
          </View>
        </Body>
        <Modal
          isVisible={isShowModalSuccess}
          onBackButtonPress={() => {
            this.setState({ isShowModalSuccess: false });
            return true;
          }}>
          <View
            style={{
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              width,
            }}>
            <View
              style={{
                width: 300,
                height: 200,
                backgroundColor: 'white',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#222222',
                  fontSize: 18,
                  paddingHorizontal: 50,
                  paddingTop: 50,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Update Phone Number Success
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#50CCC3',
                  width: 120,
                  height: 45,
                  display: 'flex',
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  this.setState({ isShowModalSuccess: false });
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
    loading: state.changePasswordReducer.loading,
    isSuccess: state.changePasswordReducer.isSuccess,
    reason: state.changePasswordReducer.reason,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (params) => dispatch(myPageActions.changePassword(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
