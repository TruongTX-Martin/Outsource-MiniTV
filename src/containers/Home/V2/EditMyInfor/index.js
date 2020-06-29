import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { Container, Body, Header, Content } from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import * as authActions from '../../../../redux/actions/authActions';
import Config from '../../../../config';
import Images from '../../../../assets/images';
import { connect } from 'react-redux';
import { EventRegister } from 'react-native-event-listeners';
import Constants from '../../../../config/Constant';
import * as myPageActions from '../../../../redux/actions/myPageActions';
import Image2 from '../../../../assets/images2';
import { getWidthScreen, getHeightScreen } from '../../../../utils';
let width = 0;
let height = 0;
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    width = getWidthScreen();
    height = getHeightScreen();
  }

  componentWillUnmount() { }

  render() {
    return (
      <Container>
        <Header style={Config.Styles.headerGray}>
          <HeaderBase
            navigation={this.props.navigation}
            title="내 정보 수정"
            backGray
          />
        </Header>
        <Body>
          <Content>
            <View style={{ width, height, backgroundColor: '#F0F0F0' }}>
              <View style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <View style={{ display: 'flex', flex: 1 }} />
                <View style={{ display: 'flex', flex: 7, paddingTop: 20 }}>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 10,
                      marginTop: 10,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('ChangePhoneNumberV2')
                    }>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'Mono-ExtraBold',
                      }}>
                      내 정보 수정
                    </Text>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={Images.imgIcArrowRight}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderTopWidth: 1,
                      borderTopColor: '#bebec0',
                      paddingTop: 10,
                      marginTop: 10,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('ChangePasswordV2')
                    }>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'Mono-ExtraBold',
                      }}>
                      개인정보 처리방침
                    </Text>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={Images.imgIcArrowRight}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flex: 1 }} />
              </View>
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    meData: state.getMeReducers.meData,
    loadingMe: state.getMeReducers.loadingMe,
    isEnablePush: state.generateAccessTokenReducer.push_callback_available,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMe: () => dispatch(myPageActions.getMe()),
    clearMe: () => dispatch(myPageActions.clearMe()),
    updatePushAlert: (available) =>
      dispatch(authActions.updatePushAlert(available)),
    generateAccessToken: () => dispatch(authActions.generateAccessToken()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
