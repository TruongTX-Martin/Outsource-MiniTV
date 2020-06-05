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
const { width, height } = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexImage: 0,
    };
    this.listImages = [
      {
        id: 0,
        url: Images.imgIcTemWebCase1,
      },
      {
        id: 1,
        url: Images.imgIcTemWebCase2,
      },
      {
        id: 3,
        url: Images.imgIcTemWebCase1,
      },
      {
        id: 4,
        url: Images.imgIcTemWebCase2,
      },
      {
        id: 5,
        url: Images.imgIcTemWebCase1,
      },
    ];
  }

  handleChangeImage(isNext) {
    const { indexImage } = this.state;
    if (isNext) {
      if (indexImage < this.listImages.length - 1) {
        const nextIndex = indexImage + 1;
        this.setState({ indexImage: nextIndex });
      } else {
        this.setState({ indexImage: 0 });
      }
    } else {
      if (indexImage > 0) {
        const nextIndex = indexImage - 1;
        this.setState({ indexImage: nextIndex });
      } else {
        this.setState({ indexImage: this.listImages.length - 1 });
      }
    }
  }

  render() {
    const { indexImage } = this.state;
    const currentImage = this.listImages[indexImage];
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase
            navigation={this.props.navigation}
            title="Web CastTitle"
          />
        </Header>
        <Body>
          <Content showsVerticalScrollIndicator={false}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                June 24 PM 7:00
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => this.handleChangeImage(false)}>
                  <Image
                    style={{ width: 35, height: 35 }}
                    source={Images.imgIcTemPrevious}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#DBDBDB',
                    borderRadius: 10,
                    marginHorizontal: 10,
                  }}>
                  <Image source={currentImage.url} />
                  <Image
                    source={Images.imgBtnAlert}
                    style={{ position: 'absolute', bottom: 0, right: 0 }}
                  />
                </View>
                <TouchableOpacity onPress={() => this.handleChangeImage(true)}>
                  <Image
                    style={{ width: 35, height: 35 }}
                    source={Images.imgIcTemNext}
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
