import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import {Container, Body, Header} from 'native-base';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import Images from '../../../assets/images';
const {width} = Dimensions.get('window');
const widthView = width - 20;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
    };
  }

  render() {
    const {isEnabled} = this.state;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="설정" />
        </Header>
        <Body>
          <View style={{width: widthView}}>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 60,
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: '#cccccc',
              }}
              onPress={() => this.props.navigation.navigate('Setting')}>
              <Text>계정 비활성화</Text>
              <Switch
                trackColor={{false: 'white', true: '#6634EA'}}
                thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.setState({isEnabled: !isEnabled})}
                value={isEnabled}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 60,
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: '#cccccc',
              }}
              onPress={() => this.props.navigation.navigate('Setting')}>
              <Text>내 정보 수정</Text>
              <Image
                style={{width: 15, height: 15}}
                source={Images.imgIcArrowRight}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 60,
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: '#cccccc',
              }}
              onPress={() => this.props.navigation.navigate('Setting')}>
              <Text>비밀번호 변경</Text>
              <Image
                style={{width: 15, height: 15}}
                source={Images.imgIcArrowRight}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 60,
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: '#cccccc',
              }}
              onPress={() => this.props.navigation.navigate('Setting')}>
              <Text>계정 삭제</Text>
              <Image
                style={{width: 15, height: 15}}
                source={Images.imgIcArrowRight}
              />
            </TouchableOpacity>
          </View>
        </Body>
      </Container>
    );
  }
}

export default index;
