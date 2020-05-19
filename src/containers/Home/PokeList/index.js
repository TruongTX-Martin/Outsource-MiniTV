import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Container, Body, Header, Content} from 'native-base';
import {connect} from 'react-redux';
import Images from '../../../assets/images';
import ItemChannel from '../Component/ItemChannel';
import Config from '../../../config';
import * as liveActions from '../../../redux/actions/liveActions';
import HeaderBase from '../../../components/HeaderBase';
const {width} = Dimensions.get('window');

const widthView = width - 20;

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPokeList();
  }

  componentWillUnmount() {
    this.props.clearPokeList();
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
                onRefresh={() => this.props.getPokeList()}
              />
            }>
            <View style={{width: widthView}}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>
                찜한 방송
              </Text>
              <FlatList
                data={list}
                style={{marginBottom: 30}}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
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
              {(!list || list.length == 0) && !loading && (
                <Text style={{textAlign: 'center', marginTop: 100}}>
                  찜한 방송이 없습니다.
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
    list: state.getPokeListReducer.list,
    loading: state.getPokeListReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPokeList: () => dispatch(liveActions.getPokeList()),
    clearPokeList: () => dispatch(liveActions.clearPokeList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
