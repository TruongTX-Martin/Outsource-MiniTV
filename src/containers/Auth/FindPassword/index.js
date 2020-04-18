import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import {Container, Body, Content, Footer, Header} from 'native-base';
import TextInput from '../../../components/TextField';
import Modal from 'react-native-modal';
import validateInput from '../../../helpers/Validate';

const {width, height} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isValidEmail: false,
      isModalVisible: false,
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
  }

  findPassword() {
    this.setState({isModalVisible: true});
  }

  checkValidEmail() {
    const {email} = this.state;
    const emailError = validateInput('email', email, this.validation);
    this.setState({
      isValidEmail: emailError == null,
    });
    console.log('emailError:', emailError);
  }

  render() {
    const {email, isValidEmail} = this.state;
    return (
      <Container>
        <Body>
          <Content>
            <View
              style={{
                padding: 20,
                height: height - 100,
                width,
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{marginTop: 50, fontSize: 30}}>비밀번호 찾기</Text>
                <Text style={{marginTop: 50, fontSize: 20}}>이메일</Text>
                <TextInput
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChangeText={(email) =>
                    this.setState({email}, () => this.checkValidEmail())
                  }
                />
              </View>
              <View>
                <Text
                  style={{textAlign: 'center', color: '#555555', fontSize: 17}}>
                  아직 문제가 있으신가요?
                </Text>
                <Text
                  style={{textAlign: 'center', color: '#555555', fontSize: 17}}>
                  고객센터 : 02-123-2012
                </Text>
              </View>
            </View>
          </Content>
        </Body>
        <Footer>
          <TouchableOpacity
            style={{
              backgroundColor: isValidEmail ? '#499DA7' : '#999999',
              width,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={!isValidEmail}
            onPress={() => this.findPassword()}>
            <Text style={{color: 'white', fontSize: 18}}>확인</Text>
          </TouchableOpacity>
        </Footer>
        <Modal isVisible={this.state.isModalVisible}>
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

export default index;
