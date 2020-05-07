import React, {Component} from 'react';
import {
  View,
  Dimensions,
  BackHandler,
  UIManager,
  findNodeHandle,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Container, Body, Content} from 'native-base';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation';
import PermissionWebview from './PermisionWebView';
import {WebView} from 'react-native-webview';
import {showToast} from '../../../utils';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
const {width, height} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countPress: 0,
      isHavePermission: false,
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
  }

  componentDidMount() {
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

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
  }

  onAndroidBackPress = () => {
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
          // UIManager.dispatchViewManagerCommand(
          //   findNodeHandle(this.webviewRef.current),
          //   'clearAudio',
          //   [
          //     /* additional arguments */
          //   ],
          // );
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

    return true;
  };

  render() {
    const playUrl = this.props.navigation.getParam('playUrl', null);
    const {isHavePermission} = this.state;
    const INJECTED_JAVASCRIPT = `(function() {
                window.NativeInfo = { 
                        deviceInfo: {
                              os: 'Android',
                              osVer: '7.0',
                              apiLevel: '24',
                              model: 'SM-T583',
                        },
                        appInfo: {
                              name: 'minitv',
                              version: '1.0.0'
                        }
                }
          })();`;
    return (
      <Container>
        <Body>
          <Content showsVerticalScrollIndicator={false}>
            <View style={{width: height, height: width}}>
              {isHavePermission && (
                <WebView
                  style={{width: height, overflow: 'hidden'}}
                  source={{uri: playUrl}}
                  javaScriptEnabled={true}
                  allowUniversalAccessFromFileURLs={true}
                  mediaPlaybackRequiresUserAction={true}
                  injectedJavaScript={INJECTED_JAVASCRIPT}
                  onMessage={(event) => {
                    alert(event.nativeEvent.data);
                  }}
                />
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
