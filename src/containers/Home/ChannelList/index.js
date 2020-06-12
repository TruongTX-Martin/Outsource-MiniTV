import React, { Component } from 'react';
import { Text, View, Dimensions, FlatList } from 'react-native';
import { Container, Body, Header } from 'native-base';
import { connect } from 'react-redux';
import Config from '../../../config';
import HeaderBase from '../../../components/HeaderBase';
import ItemChannel from '../Component/ItemChannel';
const { width } = Dimensions.get('window');


const widthView = width - 20;

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { todayList } = this.props;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="" />
        </Header>
        <Body>
          <View style={{ width: widthView }}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>
              MiniTV Channel
            </Text>
            {todayList.length > 0 && (
              <FlatList
                data={todayList}
                style={{ marginBottom: 30 }}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
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
            {todayList.length == 0 && (
              <Text style={{ textAlign: 'center', marginTop: 100 }}>
                찜한 방송이 없습니다.
              </Text>
            )}
          </View>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todayList: state.liveMainGetReducer.todayList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
