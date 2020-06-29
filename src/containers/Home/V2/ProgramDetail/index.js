import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Container, Body, Header, Content, Footer } from 'native-base';
import Config from '../../../../config';
import HeaderBase from './HeaderBase';
import { connect } from 'react-redux';
import Images from '../../../../assets/images';
import Spinner from 'react-native-loading-spinner-overlay';
import * as liveActions from '../../../../redux/actions/liveActions';
import Share from 'react-native-share';
import images2 from '../../../../assets/images2';
import Modal from 'react-native-modal';
import DataRemote from '../../../../services/DataRemote';

import { getWidthScreen, getHeightScreen } from '../../../../utils';
let width = 0;
let height = 0;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
    };
    width = getWidthScreen();
    height = getHeightScreen();
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const live_uid = this.props.navigation.getParam('live_uid', null);
    this.props.getDetail(live_uid);
  }

  getColorItemSchedule(index) {
    if (index == 0) {
      return '#50CCC3';
    } else if (index == 1) {
      return '#FC8D56';
    }
    return '#B969FF';
  }

  async handlePoke(e) {
    const result = await DataRemote.pokeChannel(e?.live_uid, {
      available: !e?.wish_available,
    });
    if (result.status == 200) {
      this.getData();
    }
  }

  generateItemSchedule(e, index) {
    return (
      <View style={{ padding: 10, width: (width - 300) / 3 }}>
        <View
          style={{
            borderWidth: 3,
            borderColor: this.getColorItemSchedule(index),
            backgroundColor: e.wish_available
              ? this.getColorItemSchedule(index)
              : 'white',
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Text
            style={{
              color: e.wish_available ? 'white' : '#50CCC3',
              fontSize: 14,
              fontFamily: 'Mono-ExtraBold',
            }}>
            {e.startDate}
          </Text>
          <Text
            style={{
              color: e.wish_available ? 'white' : '#50CCC3',
              fontSize: 14,
              fontFamily: 'Mono-ExtraBold',
            }}>
            {e.startTime}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          onPress={() => this.handlePoke(e)}>
          <Image
            style={{ width: 40, height: 40 }}
            source={
              e.wish_available ? images2.imgIconAlamp : images2.imgIconAlampOff
            }
          />
        </TouchableOpacity>
      </View>
    );
  }

  handleShare(url) {
    const shareOptions = {
      title: '',
      message: '',
      url,
    };
    Share.open(shareOptions);
  }

  render() {
    const { isShowModal } = this.state;
    const { detail, loadingProgram } = this.props;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase
            navigation={this.props.navigation}
            title={detail?.title}
            onShare={() => this.handleShare(detail?.share_link)}
            showCalendar={() => this.setState({ isShowModal: true })}
          />
        </Header>
        <Body>
          <Content
            showsVerticalScrollIndicator={false}
            style={Config.Styles.body}>
            <View onLayout={this.onLayout}>
              <Spinner visible={loadingProgram} textStyle={{ color: '#fff' }} />
              <Text
                style={{
                  textAlign: 'center',
                  color: '#333333',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                6월 24일 저녁 7시
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingHorizontal: width / 4,
                    marginTop: 20,
                  }}>
                  {detail?.activity_list.map((e, index) => {
                    //only show 3 item -> this is requirement
                    if (index > 2) {
                      return null;
                    }
                    return (
                      <View
                        style={{
                          marginRight: 20,
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}>
                        <Image
                          source={{ uri: e.thumbnail }}
                          style={{
                            width: width / 2,
                            height: ((width / 2) * 198) / 352,
                            borderRadius: 10,
                          }}
                        />
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#222222',
                            fontWeight: 'bold',
                            fontSize: 14,
                            marginTop: 10,
                            fontFamily: 'Mono-Regular',
                          }}>
                          {e.title}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#222222',
                            fontWeight: '300',
                            fontSize: 14,
                            fontFamily: 'Mono-Regular',
                          }}>
                          {e.subscript}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </Content>
        </Body>
        <Modal
          isVisible={isShowModal}
          onBackButtonPress={() => {
            this.setState({ isShowModal: false });
            return true;
          }}>
          <ImageBackground
            source={images2.imgPopup}
            style={{
              width: width - 100,
              height: height - 50,
              marginLeft: 25,
            }}
            resizeMode={'cover'}>
            <View
              style={{
                paddingHorizontal: 100,
                paddingTop: 80,
              }}>
              <Text
                style={{
                  color: '#333333',
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontFamily: 'Mono-ExtraBold',
                }}>
                다음 방송이 기다리고 있어요!
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: width - 300,
                }}>
                {detail?.next_lives.map((e, index) => {
                  return this.generateItemSchedule(e, index);
                })}
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
              }}>
              <TouchableOpacity
                onPress={() => this.setState({ isShowModal: false })}>
                <Image
                  source={images2.imgClose}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detail: state.liveDetailReducer.detail,
    loadingProgram: state.liveDetailReducer.loading,
    pokeLoading: state.pokeChannelReducer.loading,
    pokeSuccess: state.pokeChannelReducer.isSuccess,
    pokeAvailabe: state.pokeChannelReducer.pokeAvailabe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetail: (id) => dispatch(liveActions.detailGet(id)),
    pokeChannel: (liveId, available) =>
      dispatch(liveActions.pokeChannel(liveId, available)),
    pokeChannelClear: () => dispatch(liveActions.pokeChannelClear()),
    getPokeList: () => dispatch(liveActions.getPokeList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
