import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Container, Body, Header, Content} from 'native-base';
import {connect} from 'react-redux';
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
    this.props.getListNotice();
  }

  componentWillUnmount() {
    this.props.clearListNotice();
  }

  render() {
    const {listNotice, loading} = this.props;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="" />
        </Header>
        <Body>
          <Content
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => this.props.getListNotice()}
              />
            }>
            <View style={{width: widthView}}>
              {listNotice && listNotice.length > 0 && (
                <FlatList
                  data={listNotice}
                  style={{marginBottom: 30}}
                  keyExtractor={(item) => item.notice_uid}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          borderBottomWidth: 1,
                          borderBottomColor: '#cccccc',
                          marginVertical: 10,
                          paddingBottom: 10,
                        }}>
                        <Image
                          style={{width: 60, height: 60, borderRadius: 5}}
                          source={{uri: item.thumbnail}}
                        />
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingLeft: 10,
                          }}>
                          <Text>{item.description}</Text>
                        </View>
                      </View>
                    );
                  }}
                />
              )}
              {(!listNotice || listNotice.length == 0) && !loading && (
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
    listNotice: state.liveNoticeGetReducer.listNotice,
    loading: state.liveNoticeGetReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListNotice: () => dispatch(liveActions.noticeGet()),
    clearListNotice: () => dispatch(liveActions.noticeClear()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
