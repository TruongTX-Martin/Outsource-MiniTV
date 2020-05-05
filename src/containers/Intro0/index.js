import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Container, Body, Content, Footer} from 'native-base';
import Images from '../../assets/images';
import {EventRegister} from 'react-native-event-listeners';
import Config from '../../config';
import DataLocal from '../../services/DataLocal';
const {width, height} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    DataLocal.setHasShowIntro('True');
  }

  render() {
    return (
      <View style={{width, height}}>
        <Image style={{width, height}} source={Images.imgSplash} />
        <TouchableOpacity
          style={{position: 'absolute', top: 50}}
          onPress={() => {
            this.props.navigation.goBack();
            EventRegister.emit(Config.Constant.EVENT_GOTO_SIGNIN, '');
          }}>
          <Text
            style={{
              width,
              textAlign: 'right',
              paddingRight: 10,
              textDecorationLine: 'underline',
            }}>
            {'건너뛰기'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width,
            height: 60,
            backgroundColor: '#499DA7',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 20,
          }}
          onPress={() => this.props.navigation.navigate('Intro1')}>
          <Text style={{color: 'white', fontSize: 16}}>다음</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default index;
