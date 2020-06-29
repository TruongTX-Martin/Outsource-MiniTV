import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Container, Body, Content, Footer, Header } from 'native-base';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import Images from '../../../assets/images';
const { width, height } = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header style={Config.Styles.headerGray}>
          <HeaderBase
            navigation={this.props.navigation}
            backGray
            title={'마케팅 활용 동의'}
          />
        </Header>
        <Body>
          <Content showsVerticalScrollIndicator={false}>
            <View style={{ width: width - 40, paddingVertical: 20 }}>
              <Text style={styles.textStyle1}>
                (주)미니스쿨(이하, "회사")은 개인정보보호법에 따라 이용자의
                개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의
                고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고
                있습니다. 회사는 개인정보처리방침을 개정하는 경우 웹사이트
                공지사항(또는 개별공지)을 통하여 공지할 것입니다.
              </Text>
              <Text style={styles.textStyle2}>1. 제공목적</Text>
              <Text style={styles.textStyle1}>
                이용자에 대한 편의제공, 귀사 및 제휴업체의 상품·서비스 안내 및
                이용권유, 사은행사 등의 마케팅 활동, 시장조사 및 상품·서비스
                개발연구 등을 목적으로 수집·이용
              </Text>
              <Text style={styles.textStyle2}>2. 제공항목</Text>
              <Text style={styles.textStyle1}>
                - 개인식별정보: 성명, 성별, 휴대전화번호, e-mail, 주소 등
              </Text>
              <Text style={styles.textStyle1}>
                - 고객 ID, 접속 일시, IP주소 SNS아이디 등
              </Text>
              <Text style={styles.textStyle2}>3. 보유기간</Text>
              <Text style={styles.textStyle1}>
                동의일로부터 회원 탈퇴 혹은 마케팅 동의 해제시 까지 보유·이용
              </Text>
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  textStyle1: {
    color: '#555555',
    fontSize: 17,
    marginTop: 5,
    fontFamily: 'Mono-Regular',
  },
  textStyle2: {
    color: '#555555',
    fontSize: 17,
    marginTop: 15,
    fontWeight: 'bold',
    fontFamily: 'Mono-Regular',
  },
});
