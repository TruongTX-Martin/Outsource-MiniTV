import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {Container, Body, Header, Footer, Content} from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import Config from '../../../../config';
import TextInput from '../../../../components/TextField';
import validateInput from '../../../../helpers/Validate';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modals';
import {connect} from 'react-redux';
import * as myPageAction from '../../../../redux/actions/myPageActions';

const {width} = Dimensions.get('window');
const widthView = width - 20;

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
          message: '^Please enter password',
        },
        length: {
          minimum: 6,
          message: '^Your password must be at least 6 characters',
        },
      },
      newPassword: {
        presence: {
          message: '^Please enter password',
        },
        length: {
          minimum: 6,
          message: '^Your password must be at least 6 characters',
        },
      },
      reNewPassword: {
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

  onHandleChangePassword() {
    const {currentPassword, newPassword, reNewPassword} = this.state;
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
      this.setState({isModalVisible: true});
    }
  }

  render() {
    const {
      currentPassword,
      currentPasswordError,
      newPassword,
      newPasswordError,
      reNewPassword,
      reNewPasswordError,
      isModalVisible,
    } = this.state;
    const {loading} = this.props;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase
            navigation={this.props.navigation}
            title="비밀번호 변경"
          />
        </Header>
        <Body>
          <Content>
            <View style={{width: widthView}}>
              <Spinner visible={loading} textStyle={{color: '#fff'}} />
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
                isPassword
                value={currentPassword}
                onChangeText={(currentPassword) =>
                  this.setState({currentPassword, currentPasswordError: null})
                }
                error={currentPasswordError}
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
                value={newPassword}
                onChangeText={(newPassword) =>
                  this.setState({newPassword, newPasswordError: null})
                }
                error={newPasswordError}
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
                value={reNewPassword}
                onChangeText={(reNewPassword) =>
                  this.setState({reNewPassword, reNewPasswordError: null})
                }
                error={reNewPasswordError}
              />
            </View>
          </Content>
        </Body>
        <Footer
          style={{
            width,
            height: 80,
            borderTopColor: 'white',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={{
              width: widthView,
              backgroundColor: '#499DA7',
              height: 70,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.onHandleChangePassword()}>
            <Text style={{color: 'white', fontSize: 17}}>
              Confirm to Change
            </Text>
          </TouchableOpacity>
        </Footer>
        <Modal
          visible={isModalVisible}
          onTouchOutside={() => {
            this.setState({isModalVisible: false});
          }}
          onHardwareBackPress={() => {
            this.setState({isModalVisible: false});
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
                  fontSize: 20,
                  width: width - 50,
                  textAlign: 'center',
                }}>
                비밀번호가 성공적으로 변경되었습니다.
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
                  this.setState({isModalVisible: false});
                  this.props.navigation.goBack();
                }}>
                <Text style={{color: 'white', fontSize: 17}}>확인</Text>
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
    changePassword: (params) => dispatch(myPageAction.changePassword(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
