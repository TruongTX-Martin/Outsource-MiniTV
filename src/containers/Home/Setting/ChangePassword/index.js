import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity, Modal} from 'react-native';
import {Container, Body, Header, Footer} from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import Config from '../../../../config';
import TextInput from '../../../../components/TextField';
const {width} = Dimensions.get('window');
const widthView = width - 20;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  render() {
    const {isModalVisible} = this.state;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase
            navigation={this.props.navigation}
            title="Change password"
          />
        </Header>
        <Body>
          <View style={{width: widthView}}>
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
          </View>
        </Body>
        <Footer
          style={{
            width,
            height: 80,
            borderTopColor: 'white',
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
