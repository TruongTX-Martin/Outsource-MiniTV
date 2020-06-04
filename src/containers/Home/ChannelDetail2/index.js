import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { Container, Body, Header, Content, Footer } from 'native-base';
import Config from '../../../config';
import HeaderBase from '../../../components/HeaderBase';
import { connect } from 'react-redux';
import Images from '../../../assets/images';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modals';
import * as liveActions from '../../../redux/actions/liveActions';
import Share from 'react-native-share';
const { width } = Dimensions.get('window');

const TAB = {
  TAB_INFOR: 'TAB_INFOR',
  TAB_SERI_LIST: 'TAB_SERI_LIST',
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: TAB.TAB_INFOR,
    };
  }

  render() {
    const { currentTab } = this.state;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase
            navigation={this.props.navigation}
            title="Channel Detail"
          />
        </Header>
        <Body>
          <Content showsVerticalScrollIndicator={false}>
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    marginRight: 20,
                    borderBottomWidth: currentTab == TAB.TAB_INFOR ? 2 : 0,
                    borderBottomColor: '#cacaca',
                  }}
                  onPress={() => this.setState({ currentTab: TAB.TAB_INFOR })}>
                  <Text
                    style={{
                      fontWeight:
                        currentTab == TAB.TAB_INFOR ? 'bold' : 'normal',
                    }}>
                    Channel Infor
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginLeft: 20,
                    borderBottomWidth: currentTab == TAB.TAB_INFOR ? 0 : 2,
                    borderBottomColor: '#cacaca',
                  }}
                  onPress={() =>
                    this.setState({ currentTab: TAB.TAB_SERI_LIST })
                  }>
                  <Text
                    style={{
                      fontWeight:
                        currentTab == TAB.TAB_SERI_LIST ? 'bold' : 'normal',
                    }}>
                    Series List
                  </Text>
                </TouchableOpacity>
              </View>
              {currentTab == TAB.TAB_INFOR && (
                <View
                  style={{
                    width,
                    paddingLeft: 20,
                    paddingTop: 20,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: 250,
                      height: 150,
                      borderWidth: 1,
                      borderColor: '#cacaca',
                      borderRadius: 10,
                      backgroundColor: '#F7F7F7',
                    }}
                  />
                  <View>
                    <Text style={{ paddingHorizontal: 20, paddingRight: 150 }}>
                      Channel description. 공유주신 엑셀-방송 썸네일 리스 트 중
                      “채널 설명” 탭에 들어가는 내용을 바탕으로 작성하면 될 것
                      같 습니다. 예를 들어 이 채널은 어떤 내용으로 구성이
                      되어있고 어떤 활동등을 진행하고 이를 통해 아이들의 어떤
                      부분이 성장할 수 있다 등등등 의 내용을 줄 글로 길게
                      풀어써주시면 될 것 .
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </Content>
        </Body>
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
