import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Switch,
} from 'react-native';
import { Container, Body, Header } from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import Config from '../../../../config';
import Images from '../../../../assets/images';
import { connect } from 'react-redux';
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
    };
    width = getWidthScreen();
    height = getHeightScreen();
  }

  componentDidMount() {
    this.props.getMe();
  }

  getBirthDay(birthDay) {
    const year = birthDay.substring(0, 4);
    const month = birthDay.substring(4, 6);
    const day = birthDay.substring(6, 8);
    return year + '.' + month + '.' + day;
  }

  render() {
    const { meData } = this.props;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase
            navigation={this.props.navigation}
            title="마이페이지"
            setting
            openSetting={() => this.props.navigation.navigate('SettingV2')}
          />
        </Header>
        <Body>
          <ImageBackground
            style={{ width, height }}
            source={Image2.imgBgMyPage}
            resizeMode="cover">
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
              <View
                style={{
                  display: 'flex',
                  flex: 4,
                  alignItems: 'flex-end',
                }}>
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                  }}
                  source={{ uri: meData?.profile_image_url }}
                />
              </View>
              <View style={{ flex: 6, paddingLeft: 10, paddingTop: 30 }}>
                <Text
                  style={{ fontSize: 20, color: '#333333', fontWeight: 'bold' }}>
                  {meData?.student_name}
                </Text>
                <Text style={{ fontSize: 15, color: '#9A9A9A', paddingLeft: 1 }}>
                  {meData?.email}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 5,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={Image2.imgIcBtnPlay}
                  />
                  <Text style={{ fontSize: 16, color: '#333333', marginLeft: 5 }}>
                    생년월일
                  </Text>
                  <Text
                    style={{ fontSize: 16, color: '#333333', marginLeft: 15 }}>
                    {this.getBirthDay(meData?.birthday)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: '#50CCC3',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => this.props.navigation.navigate('EditMyPageV2')}>
                <Text style={{ color: '#50CCC3' }}>수정하기</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    meData: state.getMeReducers.meData,
    loadingMe: state.getMeReducers.loadingMe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMe: () => dispatch(myPageActions.getMe()),
    clearMe: () => dispatch(myPageActions.clearMe()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
