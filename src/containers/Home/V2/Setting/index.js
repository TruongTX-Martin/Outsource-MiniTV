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
    this.state = {
      isEnabled: false,
      isUpdateEnableState: false,
    };
    width = getWidthScreen();
    height = getHeightScreen();
  }

  componentWillUnmount() {
    this.props.generateAccessToken();
  }

  render() {
    const { isEnabled, isUpdateEnableState } = this.state;
    if (!isUpdateEnableState) {
      this.setState({
        isUpdateEnableState: true,
        isEnabled: this.props.isEnablePush,
      });
    }
    return (
      <Container>
        <Header style={Config.Styles.headerGray}>
          <HeaderBase
            navigation={this.props.navigation}
            title="설정"
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
                      marginTop: 15,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      앱 알림 push
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: isEnabled ? '#50CCC3' : '#575757',
                          marginRight: 10,
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        {isEnabled ? 'On' : 'OFF'}
                      </Text>
                      <Switch
                        trackColor={{ false: '#d0d0d0', true: '#50CCC3' }}
                        thumbColor={'white'}
                        onValueChange={() => {
                          this.setState({ isEnabled: !isEnabled });
                          this.props.updatePushAlert(!isEnabled);
                        }}
                        value={isEnabled}
                      />
                    </View>
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
                      this.props.navigation.navigate('EditMyInforV2')
                    }>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 16,
                        fontWeight: 'bold',
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
                    onPress={() => {
                      console.log('Goto my policy');
                    }}>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      개인정보 처리방침
                    </Text>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={Images.imgIcArrowRight}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderTopWidth: 1,
                      borderTopColor: '#bebec0',
                      paddingTop: 10,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      버전 정보
                    </Text>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 16,
                        fontWeight: '300',
                      }}>
                      1.2.0
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        style={{
                          paddingRight: 10,
                          borderRightWidth: 1,
                          borderRightColor: '#9A9A9A',
                        }}
                        onPress={() =>
                          this.props.navigation.navigate('DeleteAccountV2')
                        }>
                        <Text style={{ color: '#9A9A9A' }}>회원 탈퇴</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ paddingLeft: 10 }}
                        onPress={() => {
                          this.props.navigation.pop(2);
                          EventRegister.emit(Constants.EVENT_SIGN_OUT);
                        }}>
                        <Text style={{ color: '#9A9A9A' }}>로그아웃</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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
