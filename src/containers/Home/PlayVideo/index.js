import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {Container, Body, Header, Content} from 'native-base';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
const {width} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const playUrl = this.props.navigation.getParam('playUrl', null);
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="" />
        </Header>
        <Body>
          <WebView
            style={{width, overflow: 'hidden'}}
            source={{
              uri: playUrl,
            }}
          />
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
