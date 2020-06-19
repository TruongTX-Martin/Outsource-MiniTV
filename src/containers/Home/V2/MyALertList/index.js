import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Container, Body, Header } from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import Config from '../../../../config';
import Images from '../../../../assets/images';
import { connect } from 'react-redux';
import * as liveActions from '../../../../redux/actions/liveActions';
import Spinner from 'react-native-loading-spinner-overlay';
import Images2 from '../../../../assets/images2';
import moment from 'moment';
import { getWidthScreen, getHeightScreen } from '../../../../utils';
let width = 0;
let height = 0;

class index extends Component {
  constructor(props) {
    super(props);
    width = getWidthScreen();
    height = getHeightScreen();
  }

  componentDidMount() {
    this.props.getPokeList();
  }

  componentWillUnmount() {
    this.props.clearPokeList();
  }

  handlePokeChannel(liveId, wish_available) {
    const params = {
      available: wish_available,
    };
    this.props.pokeChannel(liveId, params);
  }

  render() {
    const { loading, list } = this.props;
    console.log('this.props:', this.props);
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="MY 편성표" />
        </Header>
        <Body>
          <ImageBackground
            style={{ width, height }}
            source={Images2.imgBgMyPage}
            resizeMode="cover">
            <Spinner visible={loading} textStyle={{ color: '#fff' }} />
            {list.length == 0 && !loading && (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 30,
                }}>
                <Image source={Images2.imgMyAlertListEmpty} />
              </View>
            )}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ paddingLeft: 30 }}
              scrollEventThrottle={100}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: (width * 0.4 * 14) / 25 + 100,
                }}>
                {list.map((e, index) => {
                  return (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{ paddingLeft: 3 }}>
                        <View
                          style={{
                            borderWidth: 5,
                            borderColor: e.rgb_value,
                            borderRadius: 5,
                            marginTop: 10,
                            marginRight: 20,
                          }}>
                          <ImageBackground
                            style={{
                              width: width * 0.4,
                              height: (width * 0.4 * 14) / 25,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            source={{ uri: e.thumbnail }}>
                            <View
                              style={{
                                backgroundColor: e.rgb_value,
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                borderTopLeftRadius: 5,
                              }}>
                              <Text
                                style={{
                                  color: '#59317C',
                                  fontWeight: 'bold',
                                  paddingHorizontal: 10,
                                  paddingVertical: 5,
                                  fontSize: 15,
                                }}>
                                {moment(e.start_datetime).format(
                                  ' 낮 hh시mm분',
                                )}
                              </Text>
                            </View>
                          </ImageBackground>
                        </View>
                        <View
                          style={{
                            width: width * 0.4 + 10,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            marginTop: 3,
                          }}>
                          <View>
                            <Text
                              style={{
                                color: '#141414',
                                fontSize: 13,
                                width: width * 0.4 - 50,
                                marginTop: 5,
                                paddingLeft: 5,
                              }}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {e.title}
                            </Text>
                            <Text
                              style={{
                                color: '#141414',
                                fontSize: 10,
                                width: width * 0.4 - 50,
                                marginTop: 5,
                                paddingLeft: 5,
                              }}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {e.subscript}
                            </Text>
                          </View>

                          <TouchableOpacity
                            onPress={() =>
                              this.handlePokeChannel(
                                e.live_uid,
                                !e.wish_available,
                              )
                            }>
                            <Image
                              style={{ width: 30, height: 30 }}
                              source={
                                e.wish_available
                                  ? Images2.imgIconAlamp
                                  : Images2.imgIconAlampOff
                              }
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            backgroundColor: e.rgb_value,
                            position: 'absolute',
                            left: 0,
                            top: 3,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              color: '#59317C',
                              fontWeight: 'bold',
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                              fontSize: 15,
                            }}>
                            {moment(e.start_datetime).format('MM월 DD일')}
                          </Text>
                        </View>
                      </View>
                      {(index + 1) % 4 == 0 && list.length > index + 1 && (
                        <Image
                          style={{
                            width: width * 0.3 - 60,
                            height: ((width * 0.3 - 60) * 133) / 161,
                            marginHorizontal: 30,
                          }}
                          source={Images2.imgHome3}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </ImageBackground>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.getPokeListReducer.list,
    loading: state.getPokeListReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPokeList: () => dispatch(liveActions.getPokeList()),
    clearPokeList: () => dispatch(liveActions.clearPokeList()),
    pokeChannel: (liveId, available) =>
      dispatch(liveActions.pokeChannel(liveId, available)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
