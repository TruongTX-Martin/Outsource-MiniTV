import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {Container, Body, Header, Footer, Content} from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import Images from '../../../../assets/images';
import Config from '../../../../config';
import TextInputCustom from '../../../../components/TextField';
const {width} = Dimensions.get('window');
const widthView = width - 20;

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
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="내 정보 수정" />
        </Header>
        <Body>
          <Content>
            <View style={{width}}>
              <View
                style={{
                  width,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 50,
                }}>
                <View style={{width: 100, height: 100, borderRadius: 50}}>
                  <Image
                    style={{width: 100, height: 100, borderRadius: 50}}
                    source={Images.imgProfile2}
                  />
                  <TouchableOpacity
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      position: 'absolute',
                      backgroundColor: 'black',
                      opacity: 0.4,
                      display: 'flex',
                    }}
                  />
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      position: 'absolute',
                      bottom: 30,
                      left: 35,
                    }}
                    source={Images.imgIcCamera}
                  />
                </View>
              </View>
              <Text style={{textAlign: 'center', marginTop: 20}}>
                프로필 사진 수정
              </Text>

              <View style={{paddingHorizontal: 15}}>
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
                  onChangeText={(childName) => this.setState({childName})}
                />
                <Text
                  style={{
                    color: '#333333',
                    fontSize: 17,
                    marginTop: 30,
                  }}>
                  생년월일
                </Text>
                <View
                  style={{
                    display: 'flex',
                    width: widthView,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                          this.setState({
                            year,
                            isValidYear:
                              year.toString().length == 4 ? true : false,
                          });
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
                          this.setState({
                            month,
                            isValidMonth:
                              parseInt(month) > 0 && parseInt(month) < 13
                                ? true
                                : false,
                          });
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
                          this.setState({
                            day,
                            isValidDay:
                              parseInt(day) > 0 && parseInt(day) <= 31
                                ? true
                                : false,
                          });
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
                    marginBottom: 30,
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
                    onPress={() => this.setState({gender: GENDER.MALE})}>
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
                    onPress={() => this.setState({gender: GENDER.FEMALE})}>
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
            // onPress={() => this.setState({isModalVisible: true})}
          >
            <Text style={{color: 'white', fontSize: 17}}>
              Confirm to Change
            </Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

export default index;
