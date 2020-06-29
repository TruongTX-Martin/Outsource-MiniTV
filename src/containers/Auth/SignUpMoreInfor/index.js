import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Container, Body, Content, Footer, Header } from 'native-base';
import TextInputCustom from '../../../components/TextField';
import Images from '../../../assets/images';
import Modal from 'react-native-modal';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import { EventRegister } from 'react-native-event-listeners';
import Constants from '../../../config/Constant';
import DatePicker from 'react-native-datepicker';
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

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childName: '',
      isModalVisible: false,
      date: null,
      gender: -1,
      loading: false,
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

  async handleSignUp() {
    const { childName, gender, date } = this.state;
    let params = this.props.navigation.getParam('params', null);
    params.student_name = childName;
    params.birthday = date.split('.').join('');
    params.sex = gender == GENDER.MALE ? 'MALE' : 'FEMALE';
    params.marketing_agree = true;
    if (this.isSnsSignUp && this.snsSignUpParams != null) {
      params = {
        ...this.snsSignUpParams,
        ...params,
      };
    }
    this.setState({ loading: true });
    const result = await DataRemote.signUp(params);
    this.setState({ loading: false });
    if (result.status == 200) {
      if (this.isSnsSignUp) {
        this.props.navigation.pop(2);
        EventRegister.emit(Constants.EVENT_SNS_SIGNIN_AGAIN);
      } else {
        this.showModal();
      }
    }
  }

  render() {
    const { childName, isModalVisible, date, gender, loading } = this.state;
    const isValidAll =
      gender != -1 && childName.trim().length > 0 && date != null;
    return (
      <Container>
        <Header
          style={[
            Config.Styles.headerWhite,
            { backgroundColor: '#FDF9ED', borderBottomColor: '#FDF9ED' },
          ]}>
          <HeaderBase navigation={this.props.navigation} smallBack />
        </Header>
        <Body>
          <Content style={{ backgroundColor: '#FDF9ED' }}>
            <View
              style={{
                padding: 20,
                width,
              }}>
              <Spinner visible={loading} textStyle={{ color: '#fff' }} />
              <Text
                style={{
                  color: '#222222',
                  fontSize: 25,
                  paddingTop: 50,
                  fontWeight: '700',
                  fontFamily: 'Mono-Blod',
                }}>
                아이 정보
              </Text>
              <Text
                style={{
                  color: '#333333',
                  fontSize: 17,
                  marginTop: 30,
                  marginBottom: 5,
                  fontFamily: 'Mono-Blod',
                }}>
                아이 이름
              </Text>
              <TextInputCustom
                width={widthView}
                backgroundColor={'white'}
                value={childName}
                placeholder={'아이 이름을 입력해주세요'}
                onChangeText={(childName) => this.setState({ childName })}
              />
              <Text
                style={{
                  color: '#333333',
                  fontSize: 17,
                  marginTop: 20,
                  marginBottom: 5,
                  fontFamily: 'Mono-Blod',
                }}>
                성별
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: gender == GENDER.MALE ? '#50CCC3' : '#CCCCCC',
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                    marginRight: 10,
                  }}
                  onPress={() => this.setState({ gender: GENDER.MALE })}>
                  <Image
                    style={{ width: 20, height: 20, marginRight: 5 }}
                    source={
                      gender == GENDER.MALE
                        ? Images.imgIcCheck
                        : Images.imgIcUnCheck
                    }
                  />
                  <Text
                    style={{
                      fontSize: 17,
                      color: gender == GENDER.MALE ? '#50CCC3' : '#777777',
                      fontFamily: 'Mono-Blod',
                    }}>
                    남자
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor:
                      gender == GENDER.FEMALE ? '#50CCC3' : '#CCCCCC',
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                  }}
                  onPress={() => this.setState({ gender: GENDER.FEMALE })}>
                  <Image
                    style={{ width: 20, height: 20, marginRight: 5 }}
                    source={
                      gender == GENDER.FEMALE
                        ? Images.imgIcCheck
                        : Images.imgIcUnCheck
                    }
                  />
                  <Text
                    style={{
                      fontSize: 17,
                      color: gender == GENDER.FEMALE ? '#50CCC3' : '#777777',
                      fontFamily: 'Mono-Blod',
                    }}>
                    여자
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: '#333333',
                  fontSize: 17,
                  marginTop: 20,
                  marginBottom: 5,
                  fontFamily: 'Mono-Blod',
                }}>
                생년월일
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  paddingLeft: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 3,
                }}
                onPress={() => this.datePicker.onPressDate()}>
                <Text style={{ color: date ? '#222222' : '#A2A2A2' }}>
                  {date || '생년월일을 입력해주세요.'}
                </Text>
                <DatePicker
                  ref={(picker) => {
                    this.datePicker = picker;
                  }}
                  date={this.state.date}
                  showIcon={false}
                  mode="date"
                  format="YYYY.MM.DD"
                  minDate="1900.01.01"
                  maxDate={moment(new Date()).format('YYYY.MM.DD')}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: { borderWidth: 0 },
                    dateText: {
                      textAlign: 'right',
                      width: 0,
                      fontSize: 0,
                      paddingRight: 0,
                      color: '#575757',
                    },
                  }}
                  onDateChange={(input) => {
                    this.setState({ date: input });
                  }}
                />
              </TouchableOpacity>
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
                  this.props.navigation.pop(4);
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
