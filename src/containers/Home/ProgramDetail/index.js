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
import Config from '../../../config';
import HeaderBase from './HeaderBase';
import { connect } from 'react-redux';
import Images from '../../../assets/images';
import Spinner from 'react-native-loading-spinner-overlay';
import * as liveActions from '../../../redux/actions/liveActions';
import Share from 'react-native-share';
import images2 from '../../../assets/images2';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      isShowModal: false,
    };
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout(e) {
    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    });
  }

  render() {
    const { width, isShowModal } = this.state;
    const listSeries = [1, 2, 3, 4, 5, 6, 7];
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase
            navigation={this.props.navigation}
            title="Ten Little Indians"
            showCalendar={() => this.setState({ isShowModal: true })}
          />
        </Header>
        <Body>
          <Content
            showsVerticalScrollIndicator={false}
            style={Config.Styles.body}>
            <View onLayout={this.onLayout}>
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
                  {listSeries.map((e) => {
                    return (
                      <View
                        style={{
                          marginRight: 20,
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}>
                        <Image
                          source={images2.imgItemHomeTest}
                          style={{ width: width / 2, borderRadius: 10 }}
                        />
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#222222',
                            fontWeight: 'bold',
                            fontSize: 14,
                            marginTop: 20,
                          }}>
                          숫자세며 물건 줍기
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#222222',
                            fontWeight: '300',
                            fontSize: 14,
                          }}>
                          인디언 친구들이 필요로 하는 물건을 수에 맞게
                          찾아보아요.
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
          <View
            style={{
              width,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: 50,
            }}>
            <Image
              source={images2.imgPopup}
              style={{
                height: height - 50,
                width: ((height - 50) * 25) / 16,
              }}
            />
            <TouchableOpacity
              onPress={() => this.setState({ isShowModal: false })}
              style={{ position: 'absolute', top: 5, right: 20 }}>
              <Image source={images2.imgClose} />
            </TouchableOpacity>
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
