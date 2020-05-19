import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import {Container, Body, Header, Content} from 'native-base';
import Images from '../../../assets/images';
import {connect} from 'react-redux';
import ItemChannel from '../Component/ItemChannel';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import * as liveActions from '../../../redux/actions/liveActions';
const {width, height} = Dimensions.get('window');

const widthView = width - 20;

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.getListReplay();
  }

  render() {
    const {list, loading} = this.props;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="" />
        </Header>
        <Body>
          <Content
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => this.props.getListReplay()}
              />
            }>
            <View style={{width: widthView}}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>
                방송 다시보기
              </Text>

              <View
                style={{
                  width: widthView,
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: 100,
                }}>
                <Image
                  style={{width: 130, height: 130, borderRadius: 65}}
                  source={Images.imgReplayAlert}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 10,
                    textAlign: 'center',
                  }}>
                  서비스 준비중 입니다
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#AAAAAA',
                  }}>
                  빠른 시일내에 준비해서 찾아 뵐게요
                </Text>
              </View>
              {/* {list && list.length > 0 && (
                <FlatList
                  data={list}
                  showsVerticalScrollIndicator={false}
                  style={{marginBottom: 30}}
                  keyExtractor={(item) => item.live_uid}
                  renderItem={({item}) => {
                    return (
                      <ItemChannel
                        item={item}
                        widthView={widthView - 10}
                        navigation={this.props.navigation}
                      />
                    );
                  }}
                />
              )}
              {(!list || list.length == 0) && !loading && (
                <Text style={{textAlign: 'center', marginTop: 100}}>
                  찜한 방송이 없습니다.
                </Text>
              )} */}
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.liveReplayGetReducer.list,
    loading: state.liveReplayGetReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListReplay: () => dispatch(liveActions.replayGet()),
    clearListReplay: () => dispatch(liveActions.replayClear()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
