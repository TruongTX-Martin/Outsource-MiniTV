import React, {Component} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {Container, Body, Header} from 'native-base';
import HeaderBase from '../../components/HeaderBase';
import Config from '../../config';
import {connect} from 'react-redux';
import * as listDataAction from '../../redux/actions/getListDataAction';
import {EventRegister} from 'react-native-event-listeners';

class index extends Component {
  componentDidMount() {
    this.props.getListData();
  }

  renderItem({item, index}) {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#CACACA',
        }}>
        <Text style={{fontSize: 15, fontWeight: '600', marginLeft: 10}}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }

  componentWillMount() {
    // this.listener = EventRegister.addEventListener('TokenExpired', (data) => {
    //   console.log('Token expired, please lgout');
    // });
  }
  componentWillUnmount() {
    // EventRegister.removeEventListener(this.listener);
  }

  render() {
    const {listData} = this.props;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase title={'Home'} />
        </Header>
        <Body>
          <View>
            <FlatList
              data={listData}
              extraData={this.props}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(item, index) => this.renderItem(item, index)}
            />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Detail');
              }}>
              <Text>Detail</Text>
            </TouchableOpacity>
          </View>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listData: state.listDataReducer.listData.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListData: () => dispatch(listDataAction.getListData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
