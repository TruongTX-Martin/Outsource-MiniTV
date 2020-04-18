import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import {Container, Body, Content, Footer} from 'native-base';
import TextInputCustom from '../../../components/TextField';
import Images from '../../../assets/images';
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
    };
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

  handleUpdateInfor() {}

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
                placeholder="김성국"
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
            </View>
          </Content>
        </Body>
        <Footer>
          <TouchableOpacity
            disabled={!isValidAll}
            style={{
              backgroundColor: isValidAll ? '#499DA7' : '#999999',
              width,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.handleUpdateInfor()}>
            <Text style={{color: 'white', fontSize: 18}}>완료</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

export default index;
