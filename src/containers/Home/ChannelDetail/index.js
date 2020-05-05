import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Container, Body, Header, Content, Footer} from 'native-base';
import Config from '../../../config';
import HeaderBase from '../../../components/HeaderBase';
import {connect} from 'react-redux';
import Images from '../../../assets/images';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modals';
import * as liveActions from '../../../redux/actions/liveActions';
import Share from 'react-native-share';
const {width} = Dimensions.get('window');

const widthView = width - 30;
const TAB = {
  TAB_COURSE_INFOR: '발달 영역',
  TAB_NEXT_SCHEDULER: '다음 방송',
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: TAB.TAB_COURSE_INFOR,
      isModalSuccess: false,
      pokeAvailabe: false,
    };
  }

  componentDidMount() {
    this.getDetail();
  }

  getDetail() {
    const id = this.props.navigation.getParam('id', null);
    this.props.getDetail(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pokeSuccess) {
      this.setState({
        isModalSuccess: true,
        pokeAvailabe: nextProps.pokeAvailabe,
      });
      this.props.pokeChannelClear();
      const timeout = setTimeout(() => {
        this.setState({isModalSuccess: false});
        this.getDetail();
        clearTimeout(timeout);
      }, 2000);
    }
  }

  componentWillUnmount() {
    this.props.getPokeList();
  }

  handlePokeChannel(liveId, wish_available) {
    const params = {
      available: wish_available,
    };
    this.props.pokeChannel(liveId, params);
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
    const {currentTab, isModalSuccess, pokeAvailabe} = this.state;
    const {detail, pokeLoading, loadingChannel} = this.props;
    console.log('render pokeAvailabe:', pokeAvailabe);
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="" />
        </Header>
        <Body>
          <Content showsVerticalScrollIndicator={false}>
            <View style={{width, display: 'flex', alignItems: 'center'}}>
              <Spinner
                visible={pokeLoading || loadingChannel}
                textStyle={{color: '#fff'}}
              />
              <View style={{width: widthView}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>
                  {detail?.title}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginVertical: 10,
                  }}>
                  참여 인원 {detail?.room_join_cnt}/{detail?.room_max_cnt}
                </Text>
                <Image
                  style={{
                    width: widthView,
                    height: (widthView * 500) / 980,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                  source={{
                    uri: `${detail?.thumbnail}`,
                  }}
                />
                <Text style={{fontWeight: 'bold', marginTop: 10, fontSize: 15}}>
                  {detail?.title}
                </Text>
                <Text style={{color: '#797979', marginTop: 5}}>
                  {detail?.subscript}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    backgroundColor: '#F8F8F8',
                    marginVertical: 15,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: widthView / 3,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{width: 15, height: 16}}
                      source={Images.imgIcTarget}
                    />
                    <Text
                      style={{color: '#222222', fontSize: 13, marginLeft: 5}}>
                      {`${detail?.target_age}세 대상`}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: widthView / 3,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{width: 15, height: 15}}
                      source={Images.imgIcDuration}
                    />
                    <Text
                      style={{color: '#222222', fontSize: 13, marginLeft: 5}}>
                      {`${detail?.duration} 세 대상`}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: widthView / 3,
                      justifyContent: 'center',
                    }}
                    onPress={() => this.handleShare(detail.share_link)}>
                    <Image
                      style={{width: 15, height: 16}}
                      source={Images.imgIcShare}
                    />
                    <Text
                      style={{color: '#222222', fontSize: 13, marginLeft: 5}}>
                      공유하기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width,
                  height: 15,
                  backgroundColor: '#F7F7F7',
                  borderTopWidth: 0.5,
                  borderTopColor: '#EAEAEA',
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#EAEAEA',
                }}
              />
              <View style={{width, paddingTop: 10}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 20,
                  }}>
                  <TouchableOpacity
                    style={{
                      marginRight: 20,
                      borderBottomWidth: 2,
                      borderBottomColor:
                        currentTab == TAB.TAB_COURSE_INFOR
                          ? '#5f3de9'
                          : 'white',
                      paddingVertical: 5,
                    }}
                    onPress={() =>
                      this.setState({currentTab: TAB.TAB_COURSE_INFOR})
                    }>
                    <Text
                      style={{
                        color:
                          currentTab == TAB.TAB_COURSE_INFOR
                            ? '#000000'
                            : '#aaaaaa',
                      }}>
                      발달 영역
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginRight: 20,
                      borderBottomWidth: 2,
                      borderBottomColor:
                        currentTab == TAB.TAB_NEXT_SCHEDULER
                          ? '#5f3de9'
                          : 'white',
                      paddingVertical: 5,
                    }}
                    onPress={() =>
                      this.setState({currentTab: TAB.TAB_NEXT_SCHEDULER})
                    }>
                    <Text
                      style={{
                        color:
                          currentTab == TAB.TAB_NEXT_SCHEDULER
                            ? '#000000'
                            : '#aaaaaa',
                      }}>
                      다음 방송
                    </Text>
                  </TouchableOpacity>
                </View>
                {currentTab == TAB.TAB_COURSE_INFOR && (
                  <View style={{display: 'flex', alignItems: 'center'}}>
                    <Image
                      style={{width: width / 2, height: width / 2}}
                      source={{uri: detail?.graph_image_url}}
                    />
                  </View>
                )}
                {currentTab == TAB.TAB_NEXT_SCHEDULER && (
                  <View style={{marginBottom: 20}}>
                    {detail?.next_lives.map((e) => {
                      return (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 10,
                            paddingHorizontal: 20,
                          }}>
                          <Text style={{color: '#222222'}}>
                            {e.live_time_text}
                          </Text>
                          <TouchableOpacity
                            style={{
                              borderWidth: 2,
                              borderColor: '#499DA7',
                              paddingVertical: 5,
                              paddingHorizontal: 15,
                              borderRadius: 20,
                            }}
                            onPress={() =>
                              this.handlePokeChannel(
                                e.live_uid,
                                !e.wish_available,
                              )
                            }>
                            <Text style={{color: '#499DA7'}}>찜하기</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
          </Content>
        </Body>
        <Footer style={{height: 60, width, backgroundColor: 'white'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width,
            }}>
            <View style={{paddingLeft: 10}}>
              <Text style={{color: '#6733F2', fontSize: 12}}>방송시간</Text>
              <Text style={{fontWeight: 'bold'}}>{detail?.live_time_text}</Text>
            </View>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#499DA7',
                width: 130,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                marginRight: 20,
                borderRadius: 5,
              }}
              onPress={() =>
                this.handlePokeChannel(
                  detail?.live_uid,
                  !detail?.wish_available,
                )
              }>
              <Image
                style={{width: 17, height: 15}}
                source={Images.imgIcHear}
              />
              <Text style={{color: 'white', marginLeft: 5, fontWeight: 'bold'}}>
                찜하기
              </Text>
            </TouchableOpacity>
          </View>
        </Footer>
        <Modal
          modalStyle={{backgroundColor: 'transparent'}}
          // overlayBackgroundColor={'transparent'}
          visible={isModalSuccess}
          onTouchOutside={() => {
            this.setState({isModalVisible: false});
          }}
          onHardwareBackPress={() => {
            this.setState({isModalVisible: false});
            return true;
          }}>
          <View
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: pokeAvailabe ? '#499DA7' : '#333333',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 40, height: 36, marginTop: 50}}
              source={pokeAvailabe ? Images.imgIcHearFull : Images.imgIcHear}
            />
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 40,
                textAlign: 'center',
                marginTop: 15,
              }}>
              {pokeAvailabe
                ? '찜한 방송 리스트에 추가하였습니다.'
                : '찜한 방송 리스트에서 삭제하였습니다.'}
            </Text>
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detail: state.liveDetailReducer.detail,
    loadingChannel: state.liveDetailReducer.loading,
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
