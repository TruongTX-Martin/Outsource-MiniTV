import React, {Component} from 'react';
import {View, Dimensions, BackHandler, StatusBar, Platform} from 'react-native';
import {Container, Body, Content} from 'native-base';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation';
import Spinner from 'react-native-loading-spinner-overlay';
import {WebView} from 'react-native-webview';
import {showToast} from '../../../utils';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import RCTSFSafariViewController from 'react-native-sfsafariviewcontroller';
const {width, height} = Dimensions.get('window');

const INJECTED_JAVASCRIPT = `(function() {
  window.NativeInfo = { 
          deviceInfo: {
                os: 'Android'
          }
  }
})();`;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countPress: 0,
      isHavePermission: false,
      loading: false,
    };
    this.timeoutBackPress = null;
    this.webviewRef = React.createRef();
    Orientation.lockToLandscape();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onAndroidBackPress,
    );
    StatusBar.setHidden(false);
  }

  componentDidMount() {
    if (Platform.OS == 'ios') {
      let playUrl = this.props.navigation.getParam('playUrl', null);
      playUrl = playUrl.replace(/\s/g, '');
      RCTSFSafariViewController.open(playUrl);
      RCTSFSafariViewController.addEventListener('onDismiss', () =>
        this.props.navigation.goBack(),
      );
    } else {
      requestMultiple([
        PERMISSIONS.ANDROID.RECORD_AUDIO,
        PERMISSIONS.ANDROID.CAMERA,
      ]).then((statuses) => {
        if (
          statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] == 'granted' &&
          statuses[PERMISSIONS.ANDROID.CAMERA] == 'granted'
        ) {
          this.setState({isHavePermission: true});
        }
      });
    }
    StatusBar.setHidden(true);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
  }

  onAndroidBackPress = () => {
    this.handleBack();
    return true;
  };

  handleBack() {
    const {countPress} = this.state;
    this.setState(
      {
        countPress: countPress + 1,
      },
      () => {
        if (this.state.countPress == 1) {
          //show toast
          showToast('한 번 더 누르면 종료됩니다.');
        } else if (this.state.countPress >= 2) {
          this.props.navigation.goBack();
          return true;
        }
      },
    );
    if (this.timeoutBackPress != null) {
      clearTimeout(this.timeoutBackPress);
    }
    this.timeoutBackPress = setTimeout(() => {
      this.setState({countPress: 0});
      clearTimeout(this.timeoutBackPress);
    }, 3000);
  }

  render() {
    const playUrl = this.props.navigation.getParam('playUrl', null);
    const {isHavePermission, loading} = this.state;
    return (
      <Container>
        <Body>
          <View style={{width: height, height: width}}>
            <Spinner visible={loading} textStyle={{color: '#fff'}} />
            {isHavePermission && Platform.OS == 'android' && (
              <WebView
                style={{
                  width: height,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  flexGrow: 1,
                }}
                source={{uri: playUrl}}
                javaScriptEnabled={true}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                scalesPageToFit={true}
                allowUniversalAccessFromFileURLs={true}
                mediaPlaybackRequiresUserAction={false}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={(event) => {
                  const jsonEvent = JSON.parse(event.nativeEvent.data);
                  if (jsonEvent.command && jsonEvent.command == 'goHome') {
                    this.handleBack();
                  }
                }}
                onLoadStart={() => this.setState({loading: true})}
                onLoadEnd={() => this.setState({loading: false})}
              />
            )}
          </View>
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
