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
import Config from '../../../../config';
import HeaderBase from '../../../../components/HeaderBase';
import { connect } from 'react-redux';
import * as liveActions from '../../../../redux/actions/liveActions';
import DataRemote from '../../../../services/DataRemote';
import images2 from '../../../../assets/images2';

const TAB = {
  TAB_INFOR: 'TAB_INFOR',
  TAB_SERI_LIST: 'TAB_SERI_LIST',
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: TAB.TAB_INFOR,
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

  getChildTag(e, index) {
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
              <Text style={{ color: '#A15FDB' }}>{e}</Text>
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
              <Text style={{ color: '#28B5AD' }}>{e}</Text>
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
              <Text style={{ color: '#C7693A' }}>{e}</Text>
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
              <Text style={{ color: '#C19E34' }}>{e}</Text>
            </TouchableOpacity>
          );
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const id = this.props.navigation.getParam('id', null);
    this.props.getChannelDetail(id);
  }

  async handlePokeChannel(liveId, params) {
    const results = await DataRemote.pokeChannel(liveId, params);
    if (results.status == 200) {
      this.getData();
    }
  }

  render() {
    const { currentTab, width } = this.state;
    const { detail } = this.props;
    const listTag = detail?.tags.split(' ');
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="나는 가수왕" />
        </Header>
        <Body>
          <Content
            showsVerticalScrollIndicator={false}
            style={Config.Styles.body}>
            <View onLayout={this.onLayout} style={{ width }}>
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
                      source={{ uri: detail?.thumbnail }}
                      style={{
                        width: ((width - 30) * 2) / 5 - 15,
                        height: ((((width - 30) * 2) / 5 - 15) * 49) / 80,
                        borderRadius: 5,
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
                        {detail?.title}
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}>
                        {listTag != null &&
                          listTag.map((e, index) => {
                            return this.getChildTag(e, index);
                          })}
                      </View>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.pokeChannel(
                            detail?.channel_uid,
                            detail?.channel_uid,
                            {
                              available: !detail?.wish_available,
                            },
                          );
                        }}>
                        <Image
                          source={
                            detail?.wish_available
                              ? images2.imgIconAlamp
                              : images2.imgIconAlampOff
                          }
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
                      paddingTop: 30,
                    }}>
                    {detail?.lives.map((e) => {
                      return (
                        <TouchableOpacity
                          style={{
                            marginRight: 20,
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}
                          onPress={() =>
                            this.props.navigation.navigate('ProgramDetail', {
                              live_uid: e.live_uid,
                            })
                          }>
                          <Image
                            source={{ uri: e.thumbnail }}
                            style={{
                              width: width / 3 - 20,
                              height: ((width / 3 - 20) * 49) / 80,
                              borderRadius: 10,
                            }}
                          />
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 5,
                            }}>
                            <Text
                              style={{
                                width: width / 3 - 20 - 50,
                                textAlign: 'center',
                              }}>
                              {e.title}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                this.handlePokeChannel(e?.live_uid, {
                                  available: !e?.wish_available,
                                })
                              }>
                              <Image
                                style={{ width: 35, height: 35 }}
                                source={
                                  e.wish_available
                                    ? images2.imgIconAlamp
                                    : images2.imgIconAlampOff
                                }
                              />
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                    {detail?.lives.length == 0 && (
                      <View>
                        <Text>Items is empty</Text>
                      </View>
                    )}
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
    detail: state.channelGetDetailReducer.detail,
    isSuccessPoke: state.getPokeListReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChannelDetail: (id) => dispatch(liveActions.channelDetailGet(id)),
    pokeChannel: (liveId, available) =>
      dispatch(liveActions.pokeChannel(liveId, available)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
