import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { Container, Body, Header } from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import * as authActions from '../../../../redux/actions/authActions';
import Config from '../../../../config';
import Images from '../../../../assets/images';
import validateInput from '../../../../helpers/Validate';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import TextInputRight from '../../../../components/TextFieldRight';
import * as myPageActions from '../../../../redux/actions/myPageActions';
import Localization from '../../../../localization';
import { getWidthScreen, getHeightScreen } from '../../../../utils';
let width = 0;
let height = 0;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      currentPassword: '',
      currentPasswordError: '',
      newPassword: '',
      newPasswordError: '',
      reNewPassword: '',
      reNewPasswordError: '',
    };
    this.validation = {
      currentPassword: {
        presence: {
          message: Localization.password_cannot_empty,
        },
        length: {
          minimum: 6,
          message: Localization.password_length_invaid,
        },
      },
      newPassword: {
        presence: {
          message: '^Please enter  new password',
        },
        length: {
          minimum: 6,
          message: '^Your new password must be at least 6 characters',
        },
      },
      reNewPassword: {
        presence: {
          message: '^Please reenter new password',
        },
        length: {
          minimum: 6,
          message: '^Your new password must be at least 6 characters',
        },
      },
    };
    width = getWidthScreen();
    height = getHeightScreen();
  }

  onUpdatePassword() {
    const { currentPassword, newPassword, reNewPassword } = this.state;
    const currentPasswordError = validateInput(
      'currentPassword',
      currentPassword,
      this.validation,
    );
    const newPasswordError = validateInput(
      'newPassword',
      newPassword,
      this.validation,
    );
    const reNewPasswordError = validateInput(
      'reNewPassword',
      reNewPassword,
      this.validation,
    );
    if (currentPasswordError || newPasswordError || reNewPasswordError) {
      this.setState({
        currentPasswordError,
        newPasswordError,
        reNewPasswordError,
      });
      return;
    }
    if (currentPassword.trim() == newPassword.trim()) {
      this.setState({
        newPasswordError: 'Current password and new password can not same',
      });
      return;
    }
    if (newPassword.trim() !== reNewPassword.trim()) {
      this.setState({
        reNewPasswordError: 'ReNewPassword and NewPassword not match',
      });
      return;
    }
    const params = {
      current_password: currentPassword,
      new_password: newPassword,
    };
    this.props.changePassword(params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccess) {
      this.setState({ isModalVisible: true });
    }
  }

  render() {
    const {
      isUpdateEnableState,
      currentPassword,
      currentPasswordError,
      newPassword,
      newPasswordError,
      reNewPassword,
      reNewPasswordError,
      isModalVisible,
    } = this.state;
    if (!isUpdateEnableState) {
      this.setState({
        isUpdateEnableState: true,
        isEnabled: this.props.isEnablePush,
      });
    }
    const { reason } = this.props;
    return (
      <Container>
        <Header style={Config.Styles.headerGray}>
          <HeaderBase
            navigation={this.props.navigation}
            title="비밀번호 변경"
            backGray
          />
        </Header>
        <Body>
          <View style={{ width, height, backgroundColor: '#F0F0F0' }}>
            <View style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
              <View style={{ display: 'flex', flex: 1 }} />
              <View style={{ display: 'flex', flex: 7, paddingTop: 30 }}>
                <TextInputRight
                  title={'현재 비밀번호'}
                  value={currentPassword}
                  isPassword
                  placeholder={'현재 비밀번호를 입력하세요'}
                  onChangeText={(currentPassword) =>
                    this.setState({ currentPassword })
                  }
                  onChangeText={(currentPassword) =>
                    this.setState({ currentPassword, currentPasswordError: null })
                  }
                  error={currentPasswordError || reason}
                />
                <TextInputRight
                  title={'새 비밀번호'}
                  value={newPassword}
                  isPassword
                  placeholder={'6글자 이상의 비밀번호를 설정해주세요'}
                  onChangeText={(newPassword) => this.setState({ newPassword })}
                  onChangeText={(newPassword) =>
                    this.setState({ newPassword, newPasswordError: null })
                  }
                  error={newPasswordError}
                />
                <TextInputRight
                  title={'비밀번호 확인'}
                  value={reNewPassword}
                  isPassword
                  placeholder={'비밀번호를 다시 한 번 입력해주세요'}
                  onChangeText={(reNewPassword) =>
                    this.setState({ reNewPassword })
                  }
                  onChangeText={(reNewPassword) =>
                    this.setState({ reNewPassword, reNewPasswordError: null })
                  }
                  error={reNewPasswordError}
                />
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
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
                      onPress={() => this.onUpdatePassword()}>
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
          isVisible={isModalVisible}
          onBackButtonPress={() => {
            this.setState({ isModalVisible: false });
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
                비밀번호가 성공적으로 변경되었습니다.
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
