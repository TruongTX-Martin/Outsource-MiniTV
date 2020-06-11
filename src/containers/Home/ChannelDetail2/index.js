import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
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
import images2 from '../../../assets/images2';
const { width, height } = Dimensions.get('window');

const TAB = {
  TAB_INFOR: 'TAB_INFOR',
  TAB_SERI_LIST: 'TAB_SERI_LIST',
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: TAB.TAB_SERI_LIST,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout(e) {
    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    });
  }

  getChildTag(index) {
    if (index < 4) {
      switch (index) {
        case 0:
          return (
            <TouchableOpacity
              style={{
                backgroundColor: '#F0DEEF',
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 20,
                marginRight: 10,
              }}>
              <Text style={{ color: '#A15FDB' }}>#동요</Text>
            </TouchableOpacity>
          );
        case 1:
          return (
            <TouchableOpacity
              style={{
                backgroundColor: '#CCF2E6',
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 20,
                marginRight: 10,
              }}>
              <Text style={{ color: '#28B5AD' }}>#노래</Text>
            </TouchableOpacity>
          );
        case 2:
          return (
            <TouchableOpacity
              style={{
                backgroundColor: '#FDE3CE',
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 20,
                marginRight: 10,
              }}>
              <Text style={{ color: '#C7693A' }}>#영어</Text>
            </TouchableOpacity>
          );
        case 3:
          return (
            <TouchableOpacity
              style={{
                backgroundColor: '#FDEEC4',
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 20,
                marginRight: 10,
              }}>
              <Text style={{ color: '#C19E34' }}>#블루래빗</Text>
            </TouchableOpacity>
          );
      }
    }
  }

  render() {
    const { currentTab, width } = this.state;
    const listSeries = [1, 2, 3, 4, 5, 6, 7];
    const listTag = [1, 2, 3, 4];
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="나는 가수왕" />
        </Header>
        <Body>
          <Content
            showsVerticalScrollIndicator={false}
            style={Config.Styles.body}>
            <View onLayout={this.onLayout}>
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
                    borderBottomColor: '#333333',
                    paddingBottom: 3,
                  }}
                  onPress={() => this.setState({ currentTab: TAB.TAB_INFOR })}>
                  <Text
                    style={{
                      fontWeight:
                        currentTab == TAB.TAB_INFOR ? 'bold' : 'normal',
                      color:
                        currentTab == TAB.TAB_INFOR ? '#333333' : '#757677',
                    }}>
                    소개
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginLeft: 20,
                    borderBottomWidth: currentTab == TAB.TAB_INFOR ? 0 : 2,
                    borderBottomColor: '#333333',
                    paddingBottom: 3,
                  }}
                  onPress={() =>
                    this.setState({ currentTab: TAB.TAB_SERI_LIST })
                  }>
                  <Text
                    style={{
                      fontWeight:
                        currentTab == TAB.TAB_SERI_LIST ? 'bold' : 'normal',
                      color:
                        currentTab == TAB.TAB_SERI_LIST ? '#333333' : '#757677',
                    }}>
                    방송
                  </Text>
                </TouchableOpacity>
              </View>
              {currentTab == TAB.TAB_INFOR && (
                <View
                  style={{
                    width: width - 30,
                    display: 'flex',
                    flexDirection: 'row',
                    paddingTop: 20,
                  }}>
                  <View style={{ flex: 4, padding: 10 }}>
                    <Image
                      source={images2.imgItemHomeTest}
                      style={{
                        width: ((width - 30) * 2) / 5 - 15,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 6,
                      paddingHorizontal: 15,
                      paddingTop: 10,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{ color: '#333333', fontWeight: '300' }}>
                        나의 노래실력을 뽐낼 때가 왔다! 캐릭터가 들려주는 노래를
                        배우며 영어도 배우고 함께 노래도 배우면서 나의 노래
                        실력을 모두에게 자랑해보아요. 영어 동요를 통해 영어를
                        처음 접하는 아이들을 영어와 친해지게 해주세요. 노래를
                        듣고 따라 부르는 것만으로도 영어에 대한 호기심과
                        자신감을 키워줄 수 있어요.
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}>
                        {listTag.map((e, index) => {
                          return this.getChildTag(index);
                        })}
                      </View>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <TouchableOpacity>
                        <Image
                          source={images2.imgIconAlamp}
                          style={{ width: 40, height: 40 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              {currentTab == TAB.TAB_SERI_LIST && (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 20,
                    }}>
                    {listSeries.map((e) => {
                      return (
                        <TouchableOpacity
                          style={{
                            marginRight: 20,
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}
                          onPress={() =>
                            this.props.navigation.navigate('ProgramDetail')
                          }>
                          <Image
                            source={images2.imgItemHomeTest}
                            style={{ width: width / 3 - 20, borderRadius: 10 }}
                          />
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 5,
                            }}>
                            <Text style={{ width: width / 3 - 20 - 50 }}>
                              Ten Little Indians
                            </Text>
                            <Image
                              style={{ width: 35, height: 35 }}
                              source={images2.imgIconAlamp}
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
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
