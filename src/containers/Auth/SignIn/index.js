import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import {Container, Body, Content, Header} from 'native-base';
import Images from '../../../assets/images';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import TextInput from '../../../components/TextField';
import ButtonBase from '../../../components/ButtonBase';
const {width} = Dimensions.get('window');

class index extends Component {
  gotoSignUp() {
    this.props.navigation.navigate('TermAndCondition');
  }
  render() {
    return (
      <Container>
        <Body>
          <Content>
            <View>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image
                  source={Images.imgLogo}
                  style={{
                    width: 150,
                    height: 34,
                    marginTop: 60,
                    marginBottom: 40,
                  }}
                />
              </View>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <View style={{marginBottom: 10}}>
                  <TextInput
                    icon={Images.imgIcUserName}
                    width={width - 42}
                    styleIcon={{width: 15, height: 14}}
                    placeholder="이메일"
                  />
                </View>
                <TextInput
                  icon={Images.imgIcPassword}
                  width={width - 42}
                  styleIcon={{width: 15, height: 18}}
                  placeholder="비밀번호"
                />
                <View style={{marginTop: 20}}>
                  <ButtonBase width={width - 46} text={'로그인'} />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    width: width - 46,
                    marginTop: 10,
                  }}>
                  <TouchableOpacity onPress={() => this.gotoSignUp()}>
                    <Text style={{color: '#797979', marginRight: 10}}>
                      회원가입
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={{color: '#797979', marginRight: 10}}>
                      비밀번호 찾기
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={{color: '#222222', marginTop: 40}}>
                  SNS 간편 로그인
                </Text>
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
                <TouchableOpacity style={{marginTop: 40}}>
                  <Text
                    style={{color: '#797979', textDecorationLine: 'underline'}}>
                    둘러보기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

export default index;
