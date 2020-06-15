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

const { width, height } = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
    };
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
        <Header style={Config.Styles.headerGray}>
          <HeaderBase title="아이 정보 수정" />
        </Header>
        <Body>
          <View style={{ width, height, backgroundColor: '#F0F0F0' }}>
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
              <View
                style={{
                  display: 'flex',
                  flex: 3,
                  alignItems: 'flex-end',
                }}>
                <ImageBackground
                  style={{ width: 120, height: 120, borderRadius: 60 }}
                  imageStyle={{ borderRadius: 60 }}
                  source={{ uri: meData?.profile_image_url }}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 60,
                      backgroundColor: '#000000',
                      opacity: 0.6,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity>
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={Images.imgIcCamera}
                      />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
              <View style={{ flex: 7, paddingLeft: 10, paddingTop: 30 }}>
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
                marginTop: 50,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: '#9A9A9A',
                    paddingVertical: 10,
                    marginRight: 5,
                    width: 90,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.props.navigation.goBack()}>
                  <Text style={{ color: '#9A9A9A' }}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    backgroundColor: '#50CCC3',
                    paddingVertical: 10,
                    marginRight: 5,
                    width: 90,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5,
                  }}>
                  <Text style={{ color: 'white' }}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
