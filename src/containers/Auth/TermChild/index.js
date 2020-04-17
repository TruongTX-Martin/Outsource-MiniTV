import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import {Container, Body, Content, Footer, Header} from 'native-base';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import Images from '../../../assets/images';
const {width, height} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title={'T&C Detail'} />
        </Header>
        <Body>
          <Content>
            <View style={{padding: 20}}>
              <Text>
                서비스 이용 약관 동의내용 서비스 이용 약관 동의내용서비스 이용
                약관 동의내용서비스 이용 약관 동의내용서비스 이용 약 관 서비스
                이용 약관 동의내용서비스 이용 약관 동의내용동의 내용 서비스 이용
                약관 동의내용서비스 이용 약관 동의내용서 비스 이서비스 이용 약관
                동의내용서비스 이용 약관 동의내용 서비스이용 약관 동의내용용
                약관 동의내용 서비스 이용 약관 동의내용서비스 이용 약관 동의내용
                서비스 이용 약관 동의내용 서비서비스 이용 약관 동의내용서비스
                이용 약관 동의내용서비 스 서비스 이용 약관 동의내용서비스 이용
                약관 동의내용 서비 스 이용 약관 동의내용서비스 이용 약관
                동의내용이용 약관 동의 내용스 이용 약관 동의내용
              </Text>
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

export default index;
