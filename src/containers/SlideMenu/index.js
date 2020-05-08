import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Container, Body, Content} from 'native-base';
import {connect} from 'react-redux';
import {EventRegister} from 'react-native-event-listeners';
import Constants from '../../config/Constant';
import Images from '../../assets/images';
import * as myPageActions from '../../redux/actions/myPageActions';
const {width, height} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMe();
  }

  render() {
    const {meData} = this.props;
    return (
      <Container>
        <Body>
          <Content>
            <View style={{width: width - 30, height}}>
              <View style={{paddingHorizontal: 15}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{width: 40, height: 40}}>
                    <Image
                      style={{width: 15, height: 15}}
                      source={Images.imgIcClose}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{width: 40, height: 40}}
                    onPress={() => this.props.navigation.navigate('Alert')}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={Images.imgIcBell}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{flexDirection: 'row', display: 'flex'}}>
                  <Image
                    style={{width: 60, height: 60, borderRadius: 30}}
                    source={{uri: meData?.profile_image_url}}
                  />
                  <View style={{marginLeft: 10, marginTop: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                      {meData?.student_name}
                    </Text>
                    <Text style={{fontSize: 14, color: '#999999'}}>
                      {meData?.email}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 15,
                  backgroundColor: '#F7F7F7',
                  marginTop: 20,
                  borderTopWidth: 1,
                  borderTopColor: '#efefef',
                  borderBottomWidth: 1,
                  borderBottomColor: '#efefef',
                }}
              />
              <View style={{paddingHorizontal: 15}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingVertical: 20,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: (width - 60) / 2,
                      display: 'flex',
                      alignItems: 'center',
                      borderRightWidth: 0.5,
                      borderRightColor: '#cccccc',
                    }}
                    onPress={() => this.props.navigation.navigate('PokeList')}>
                    <Image
                      style={{width: 40, height: 35}}
                      source={Images.imgIcPokeProgram}
                    />
                    <Text
                      style={{color: '#333333', fontSize: 13, marginTop: 5}}>
                      찜한 방송
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: (width - 60) / 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('ReplayProgram')
                    }>
                    <Image
                      style={{width: 40, height: 32}}
                      source={Images.imgIcReplayProgram}
                    />
                    <Text
                      style={{color: '#333333', fontSize: 13, marginTop: 5}}>
                      방송 다시보기
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{height: 0.5, backgroundColor: '#cccccc'}} />
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 50,
                    alignItems: 'center',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#cccccc',
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('MiniTVChannel')
                  }>
                  <Text>미니티비</Text>
                  <Image
                    style={{width: 15, height: 15}}
                    source={Images.imgIcArrowRight}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 50,
                    alignItems: 'center',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#cccccc',
                  }}
                  onPress={() => this.props.navigation.navigate('ChannelList')}>
                  <Text>채널 리스트</Text>
                  <Image
                    style={{width: 15, height: 15}}
                    source={Images.imgIcArrowRight}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 50,
                    alignItems: 'center',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#cccccc',
                  }}
                  onPress={() => this.props.navigation.navigate('Setting')}>
                  <Text>설정</Text>
                  <Image
                    style={{width: 15, height: 15}}
                    source={Images.imgIcArrowRight}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 50,
                    alignItems: 'center',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#cccccc',
                  }}
                  onPress={() => EventRegister.emit(Constants.EVENT_SIGN_OUT)}>
                  <Text>로그 아웃</Text>
                  <Image
                    style={{width: 15, height: 15}}
                    source={Images.imgIcArrowRight}
                  />
                </TouchableOpacity>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMe: () => dispatch(myPageActions.getMe()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
