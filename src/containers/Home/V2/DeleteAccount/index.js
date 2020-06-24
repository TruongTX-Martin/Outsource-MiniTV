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
import Spinner from 'react-native-loading-spinner-overlay';
import Config from '../../../../config';
import Images from '../../../../assets/images';
import { EventRegister } from 'react-native-event-listeners';
import Constants from '../../../../config/Constant';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import * as myPageActions from '../../../../redux/actions/myPageActions';
import { getWidthScreen, getHeightScreen } from '../../../../utils';
let width = 0;
let height = 0;
const listReasons = [
  '삭제하고 싶은 내용이 있어요',
  '광고가 너무 많아요',
  '2차 계정을 만들었어요',
  '앱에 버그가 많아요',
];

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentReasonIndex: -1,
      isShowModalConfirm: false,
      isShowModalSuccess: false,
    };
    width = getWidthScreen();
    height = getHeightScreen();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccess) {
      this.setState({ isShowModalSuccess: true });
    }
  }

  render() {
    const {
      currentReasonIndex,
      isShowModalConfirm,
      isShowModalSuccess,
    } = this.state;
    const { loading } = this.props;
    return (
      <Container>
        <Header style={Config.Styles.headerGray}>
          <HeaderBase
            navigation={this.props.navigation}
            title="계정 삭제"
            backGray
          />
        </Header>
        <Body>
          <Content>
            <View style={{ width, height, backgroundColor: '#F0F0F0' }}>
              <Spinner visible={loading} textStyle={{ color: '#fff' }} />
              <View style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <View style={{ display: 'flex', flex: 1 }} />
                <View style={{ display: 'flex', flex: 7, paddingTop: 20 }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 3,
                    }}>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginRight: 3,
                      }}>
                      김재이
                    </Text>
                    <Text style={{ color: '#333333', fontSize: 16 }}>
                      님 안녕하세요!
                    </Text>
                  </View>
                  <Text style={{ color: '#333333', fontSize: 16 }}>
                    계정을 삭제하신다니 너무 아쉽습니다.
                  </Text>
                  <Text style={{ color: '#333333', fontSize: 16 }}>
                    삭제하는 이유를알려주시면 미니TV의 발전에 큰 도움이 될
                    거에요.
                  </Text>
                  <View style={{ backgroundColor: 'white', marginTop: 20 }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingVertical: 10,
                      }}>
                      <TouchableOpacity
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flex: 1,
                          alignItems: 'center',
                          paddingLeft: 30,
                        }}
                        onPress={() => this.setState({ currentReasonIndex: 0 })}>
                        <Image
                          style={{ width: 20, height: 20, marginRight: 5 }}
                          source={
                            currentReasonIndex == 0
                              ? Images.imgIcCheck
                              : Images.imgIcUnCheck
                          }
                        />
                        <Text
                          style={{
                            color:
                              currentReasonIndex == 0 ? '#333333' : '#797979',
                          }}>
                          {listReasons[0]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flex: 1,
                          alignItems: 'center',
                          paddingLeft: 30,
                        }}
                        onPress={() => this.setState({ currentReasonIndex: 1 })}>
                        <Image
                          style={{ width: 20, height: 20, marginRight: 5 }}
                          source={
                            currentReasonIndex == 1
                              ? Images.imgIcCheck
                              : Images.imgIcUnCheck
                          }
                        />
                        <Text
                          style={{
                            color:
                              currentReasonIndex == 1 ? '#333333' : '#797979',
                          }}>
                          {listReasons[1]}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingVertical: 10,
                      }}>
                      <TouchableOpacity
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flex: 1,
                          alignItems: 'center',
                          paddingLeft: 30,
                        }}
                        onPress={() => this.setState({ currentReasonIndex: 2 })}>
                        <Image
                          style={{ width: 20, height: 20, marginRight: 5 }}
                          source={
                            currentReasonIndex == 2
                              ? Images.imgIcCheck
                              : Images.imgIcUnCheck
                          }
                        />
                        <Text
                          style={{
                            color:
                              currentReasonIndex == 2 ? '#333333' : '#797979',
                          }}>
                          {listReasons[2]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flex: 1,
                          alignItems: 'center',
                          paddingLeft: 30,
                        }}
                        onPress={() => this.setState({ currentReasonIndex: 3 })}>
                        <Image
                          style={{ width: 20, height: 20, marginRight: 5 }}
                          source={
                            currentReasonIndex == 3
                              ? Images.imgIcCheck
                              : Images.imgIcUnCheck
                          }
                        />
                        <Text
                          style={{
                            color:
                              currentReasonIndex == 3 ? '#333333' : '#797979',
                          }}>
                          {listReasons[3]}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          currentReasonIndex != -1 ? '#50CCC3' : '#9A9A9A',
                        borderRadius: 5,
                        paddingHorizontal: 25,
                        paddingVertical: 7,
                      }}
                      disabled={currentReasonIndex == -1}
                      onPress={() => this.setState({ isShowModalConfirm: true })}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}>
                        계정 삭제
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ display: 'flex', flex: 1 }} />
              </View>
            </View>
          </Content>
        </Body>
        <Modal
          isVisible={isShowModalConfirm}
          onBackButtonPress={() => {
            this.setState({ isShowModalConfirm: false });
            return true;
          }}>
          <View
            style={{
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              width,
            }}>
            <View
              style={{
                width: 300,
                height: 200,
                backgroundColor: 'white',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#222222',
                  fontSize: 18,
                  paddingHorizontal: 50,
                  paddingTop: 50,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                미니TV 계정을 정말 삭제하시겠습니까?
              </Text>
              <View
                style={{
                  width: 300,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#9A9A9A',
                    width: 120,
                    height: 45,
                    display: 'flex',
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginLeft: 20,
                  }}
                  onPress={() => {
                    this.setState({ isShowModalConfirm: false });
                  }}>
                  <Text style={{ color: 'white', fontSize: 17 }}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#50CCC3',
                    width: 120,
                    height: 45,
                    display: 'flex',
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginRight: 20,
                  }}
                  onPress={() => {
                    this.setState({ isShowModalConfirm: false }, () => {
                      const reason = listReasons[currentReasonIndex];
                      const params = {
                        reason,
                      };
                      this.props.deleteAccount(params);
                    });
                  }}>
                  <Text style={{ color: 'white', fontSize: 17 }}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={isShowModalSuccess}
          onBackButtonPress={() => {
            this.setState({ isShowModalSuccess: false });
            return true;
          }}>
          <View
            style={{
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              width,
            }}>
            <View
              style={{
                width: 300,
                height: 200,
                backgroundColor: 'white',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#222222',
                  fontSize: 18,
                  paddingHorizontal: 50,
                  paddingTop: 50,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                계정이 성공적으로 삭제 되었습니다.
              </Text>
              <View
                style={{
                  width: 300,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#50CCC3',
                    width: 120,
                    height: 45,
                    display: 'flex',
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginRight: 20,
                  }}
                  onPress={() => {
                    this.setState({ isShowModalSuccess: false });
                    this.props.navigation.pop(3);
                    EventRegister.emit(Constants.EVENT_SIGN_OUT);
                  }}>
                  <Text style={{ color: 'white', fontSize: 17 }}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.deleteAccountReducer.loading,
    isSuccess: state.deleteAccountReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccount: (params) => dispatch(myPageActions.deleteAccount(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
