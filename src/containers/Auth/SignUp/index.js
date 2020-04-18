import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import {Container, Body, Content, Footer, Header} from 'native-base';
import TextInput from '../../../components/TextField';
import Images from '../../../assets/images';
import Modal from 'react-native-modal';
const {width, height} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  handleSignUp() {
    this.setState({isModalVisible: true});
  }

  render() {
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
                    backgroundColor: '#5DC3D0',
                    marginRight: 5,
                  }}
                />
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#999999',
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
                이메일
              </Text>
              <TextInput
                width={width - 40}
                placeholder="아이디로 사용할 이메일을 입력해주세요."
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
              />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 40,
                  fontSize: 18,
                }}>
                Or Sign up by Social
              </Text>
              <View
                style={{
                  width: width - 40,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 180,
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                      }}
                      source={Images.imgFacebook}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                      }}
                      source={Images.imgFacebook}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                      }}
                      source={Images.imgFacebook}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Content>
        </Body>
        <Footer>
          <TouchableOpacity
            style={{
              backgroundColor: '#499DA7',
              width,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.handleSignUp()}>
            <Text style={{color: 'white', fontSize: 18}}>다음</Text>
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
                  fontSize: 25,
                  width: width - 50,
                  textAlign: 'center',
                }}>
                수정이 완료되었습니다.
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
                  this.props.navigation.navigate('SignUpMoreInfor');
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
