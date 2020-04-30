import React, {Component} from 'react';
import {Text, View, Dimensions, FlatList, RefreshControl} from 'react-native';
import {Container, Body, Header, Content} from 'native-base';
import {connect} from 'react-redux';
import ItemChannel from '../Component/ItemChannel';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import * as liveActions from '../../../redux/actions/liveActions';
const {width} = Dimensions.get('window');

const widthView = width - 20;

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getListReplay();
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
              {list && list.length > 0 && (
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
                  Items is empty
                </Text>
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
