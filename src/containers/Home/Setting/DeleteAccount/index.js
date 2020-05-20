import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import {Container, Body, Header, Footer, Content} from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import Config from '../../../../config';
import ActionSheet from 'react-native-actionsheet';
import {EventRegister} from 'react-native-event-listeners';
import Images from '../../../../assets/images';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import * as myPageAction from '../../../../redux/actions/myPageActions';

const {width} = Dimensions.get('window');

const LIST_REASON = [
  '삭제하고 싶은 내용이 있어요',
  '2차 계정을 만들었어요',
  '광고가 너무 많아요',
  '앱에 버그가 많아요',
  '취소',
];

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reasonIndex: -1,
      isModelConfirmVisible: false,
      isModalSuccess: false,
    };
  }

  deleteAccount() {
    const reason = LIST_REASON[this.state.reasonIndex];
    const params = {
      reason,
    };
    this.props.deleteAccount(params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccess) {
      this.setState({isModalSuccess: true});
    }
  }

  render() {
    const {reasonIndex, isModelConfirmVisible, isModalSuccess} = this.state;
    const {loading} = this.props;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="계정 삭제" />
        </Header>
        <Body>
          <Content>
            <View style={{width, paddingHorizontal: 15}}>
              <Spinner visible={loading} textStyle={{color: '#fff'}} />
              <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 40}}>
                김성국님 안녕하세요!
              </Text>
              <Text style={{fontSize: 15, marginTop: 30, color: '#222222'}}>
                계정을 삭제하신다니 너무 아쉽습니다.
              </Text>
              <Text style={{fontSize: 15, color: '#222222'}}>
                삭제하는 이유를 알려주시면
              </Text>
              <Text style={{fontSize: 15, color: '#222222'}}>
                미니TV의 발전에 큰 도움이 될 거에요.
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 40,
                  borderBottomWidth: 2,
                  borderBottomColor: '#e7e7ea',
                  paddingBottom: 4,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                onPress={() => this.actionSheet.show()}>
                <Text
                  style={{
                    color: reasonIndex > -1 ? '#222222' : '#bfbfbf',
                    width: width - 60,
                  }}>
                  {reasonIndex > -1
                    ? LIST_REASON[reasonIndex]
                    : '계정을 삭제하시는 이유가 무엇인가요?'}
                </Text>
                <Image
                  style={{width: 20, height: 20, marginRight: 5}}
                  source={Images.imgIcDropdown}
                />
              </TouchableOpacity>
            </View>
          </Content>
          <ActionSheet
            ref={(o) => (this.actionSheet = o)}
            title={'계정을 삭제하시는 이유가 무엇인가요?'}
            options={LIST_REASON}
            cancelButtonIndex={LIST_REASON.length - 1}
            onPress={(index) => {
              if (index != LIST_REASON.length - 1) {
                this.setState({reasonIndex: index});
              }
            }}
            destructiveButtonIndex={reasonIndex}
          />
        </Body>
        <Footer
          style={{
            width,
            height: 70,
            borderTopColor: 'white',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            disabled={reasonIndex == -1}
            style={{
              width,
              backgroundColor: reasonIndex == -1 ? '#999999' : '#499DA7',
              height: 70,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.setState({isModelConfirmVisible: true})}>
            <Text style={{color: 'white', fontSize: 17}}>계정 삭제</Text>
          </TouchableOpacity>
        </Footer>
        <Modal
          visible={isModelConfirmVisible}
          onTouchOutside={() => {
            this.setState({isModalVisible: false});
          }}
          onHardwareBackPress={() => {
            this.setState({isModalVisible: false});
            return true;
          }}>
          <View
            style={{
              width: width - 40,
              height: 250,
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
                height: 195,
              }}>
              <Text
                style={{
                  color: '#222222',
                  fontSize: 16,
                  width: width - 50,
                  textAlign: 'center',
                }}>
                미니TV 계정을 정말 삭제하시겠습니까?
              </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  width: (width - 40) / 2,
                  height: 55,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopWidth: 1,
                  borderTopColor: '#e1e1e1',
                  borderRightWidth: 1,
                  borderRightColor: '#e1e1e1',
                }}
                onPress={() => {
                  this.setState({isModelConfirmVisible: false});
                }}>
                <Text style={{color: '#999999', fontSize: 17}}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: (width - 40) / 2,
                  height: 55,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopWidth: 1,
                  borderTopColor: '#e1e1e1',
                }}
                onPress={() => {
                  this.setState({isModelConfirmVisible: false});
                  this.deleteAccount();
                }}>
                <Text style={{color: '#499DA7', fontSize: 17}}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={isModalSuccess}
          onBackButtonPress={() => {
            this.setState({isModalVisible: false});
            return true;
          }}>
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
                  fontSize: 16,
                  width: width - 50,
                  textAlign: 'center',
                }}>
                계정이 성공적으로 삭제 되었습니다.
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
                  this.setState({isModalSuccess: false});
                  this.props.navigation.pop(2);
                  EventRegister.emit(Config.Constant.EVENT_SIGN_OUT);
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

const mapStateToProps = (state) => {
  return {
    loading: state.deleteAccountReducer.loading,
    isSuccess: state.deleteAccountReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccount: (params) => dispatch(myPageAction.deleteAccount(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
