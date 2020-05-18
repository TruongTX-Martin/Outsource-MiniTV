import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import {Container, Body, Content, Footer, Header} from 'native-base';
import TextInputCustom from '../../../components/TextField';
import Images from '../../../assets/images';
import Modal from 'react-native-modals';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {EventRegister} from 'react-native-event-listeners';
import Constants from '../../../config/Constant';
import * as authActions from '../../../redux/actions/authActions';
const {width} = Dimensions.get('window');

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
      year: '',
      month: '',
      day: '',
      gender: null,
      isValidYear: false,
      isValidMonth: false,
      isValidDay: false,
      isValidAll: false,
      isModalVisible: false,
    };
    this.isSnsSignUp = props.navigation.getParam('isSnsSignUp', null);
    this.snsSignUpParams = props.navigation.getParam('snsSignUpParams', null);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {}

  // static getDerivedStateFromProps(props, state) {
  //   console.log('getDerivedStateFromProps props:', props);
  //   console.log('getDerivedStateFromProps state:', state);
  //   if (props.isSuccess) {
  //     this.showModal();
  //   }
  //   return null;
  // }

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
    this.setState({isModalVisible: true});
  }

  componentWillUnmount() {
    this.props.clearSignUpData();
  }

  checkValidAll() {
    const {
      childName,
      isValidYear,
      isValidMonth,
      isValidDay,
      gender,
    } = this.state;
    this.setState({
      isValidAll:
        childName.trim().length > 0 &&
        isValidYear &&
        isValidMonth &&
        isValidDay &&
        gender != null
          ? true
          : false,
    });
  }

  handleSignUp() {
    const email = this.props.navigation.getParam('email', null);
    const password = this.props.navigation.getParam('password', null);
    const {childName, year, month, day, gender} = this.state;
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
      year,
      month,
      day,
      gender,
      isValidYear,
      isValidMonth,
      isValidDay,
      childName,
      isValidAll,
      isModalVisible,
    } = this.state;
    const {loading, reason} = this.props;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} />
        </Header>
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
                자녀 이름
              </Text>
              <TextInputCustom
                width={widthView}
                value={childName}
                onChangeText={(childName) =>
                  this.setState({childName}, () => this.checkValidAll())
                }
              />
              <Text
                style={{
                  color: '#333333',
                  fontSize: 17,
                  marginTop: 30,
                  marginBottom: 5,
                }}>
                생년월일
              </Text>
              <View
                style={{
                  display: 'flex',
                  width: widthView,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#cccccc',
                    width: widthView / 3 - 5,
                    paddingBottom: 5,
                  }}>
                  <TextInput
                    style={{
                      width: widthView / 3 - 35,
                      textAlign: 'right',
                      paddingRight: 5,
                    }}
                    // placeholderTextColor="#666"
                    // color="#333"
                    keyboardType="numeric"
                    value={year}
                    onChangeText={(year) => {
                      if (year.toString().length < 5) {
                        this.setState(
                          {
                            year,
                            isValidYear:
                              year.toString().length == 4 ? true : false,
                          },
                          () => this.checkValidAll(),
                        );
                      }
                    }}
                  />
                  <Text style={{color: isValidYear ? '#222222' : '#AAAAAA'}}>
                    년
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#cccccc',
                    width: widthView / 3 - 5,
                    paddingBottom: 5,
                  }}>
                  <TextInput
                    // placeholderTextColor="#666"
                    // color="#333"
                    style={{
                      width: widthView / 3 - 35,
                      textAlign: 'right',
                      paddingRight: 5,
                    }}
                    keyboardType="numeric"
                    value={month}
                    onChangeText={(month) => {
                      if (month.toString().length < 3) {
                        this.setState(
                          {
                            month,
                            isValidMonth:
                              parseInt(month) > 0 && parseInt(month) < 13
                                ? true
                                : false,
                          },
                          () => this.checkValidAll(),
                        );
                      }
                    }}
                  />
                  <Text style={{color: isValidMonth ? '#222222' : '#AAAAAA'}}>
                    월
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#cccccc',
                    width: widthView / 3 - 5,
                    paddingBottom: 5,
                  }}>
                  <TextInput
                    // placeholderTextColor="#666"
                    // color="#333"
                    style={{
                      width: widthView / 3 - 35,
                      textAlign: 'right',
                      paddingRight: 5,
                    }}
                    keyboardType="numeric"
                    value={day}
                    onChangeText={(day) => {
                      if (day.toString().length < 3) {
                        this.setState(
                          {
                            day,
                            isValidDay:
                              parseInt(day) > 0 && parseInt(day) <= 31
                                ? true
                                : false,
                          },
                          () => this.checkValidAll(),
                        );
                      }
                    }}
                  />
                  <Text style={{color: isValidDay ? '#222222' : '#AAAAAA'}}>
                    일
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: '#333333',
                  fontSize: 17,
                  marginTop: 30,
                  marginBottom: 5,
                }}>
                성별
              </Text>
              <View
                style={{
                  display: 'flex',
                  width: widthView,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#cccccc',
                    width: widthView / 2 - 10,
                    paddingBottom: 5,
                  }}
                  onPress={() =>
                    this.setState({gender: GENDER.MALE}, () =>
                      this.checkValidAll(),
                    )
                  }>
                  <Image
                    source={
                      gender == GENDER.MALE
                        ? Images.imgIcCheck
                        : Images.imgIcUnCheck
                    }
                    style={{width: 20, height: 20, marginRight: 10}}
                  />
                  <Text
                    style={{
                      color: gender == GENDER.MALE ? '#222222' : '#AAAAAA',
                    }}>
                    남성
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#cccccc',
                    width: widthView / 2 - 10,
                    paddingBottom: 5,
                  }}
                  onPress={() =>
                    this.setState({gender: GENDER.FEMALE}, () =>
                      this.checkValidAll(),
                    )
                  }>
                  <Image
                    source={
                      gender == GENDER.FEMALE
                        ? Images.imgIcCheck
                        : Images.imgIcUnCheck
                    }
                    style={{width: 20, height: 20, marginRight: 10}}
                  />
                  <Text
                    style={{
                      color: gender == GENDER.FEMALE ? '#222222' : '#AAAAAA',
                    }}>
                    여성
                  </Text>
                </TouchableOpacity>
              </View>
              {reason != null && (
                <Text style={{color: 'red', marginTop: 5}}>{reason}</Text>
              )}
            </View>
          </Content>
        </Body>
        <Footer style={{backgroundColor: '#499DA7'}}>
          <TouchableOpacity
            disabled={!isValidAll}
            style={{
              backgroundColor: isValidAll ? '#499DA7' : '#999999',
              width,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.handleSignUp()}>
            <Text style={{color: 'white', fontSize: 18}}>완료</Text>
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
                  this.setState({isModalVisible: false});
                  this.props.navigation.pop(3);
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
