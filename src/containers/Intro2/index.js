import React, {Component} from 'react';
import {Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import {Container, Body, Content, Footer} from 'native-base';
import Images from '../../assets/images';
import {EventRegister} from 'react-native-event-listeners';
import Config from '../../config';
const {width, height} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Body>
          <Content
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: '#EFEDED'}}>
            <View
              style={{width, height: height - 100, backgroundColor: '#EFEDED'}}>
              <View>
                <TouchableOpacity
                  style={{marginTop: 50}}
                  onPress={() => {
                    this.props.navigation.pop(2);
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
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    paddingLeft: 10,
                    marginTop: 50,
                    color: '#000000',
                  }}>
                  {'언제 어디서나'}
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    paddingLeft: 10,
                    color: '#000000',
                  }}>
                  {'미니TV 방송에 참여할 수 있어요'}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#555555',
                    paddingLeft: 10,
                    marginTop: 15,
                  }}>
                  {'모바일, 태블릿, 컴퓨터, 노트북, TV 등 '}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#555555',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}>
                  {'다양한 기기에서 만나보세요.'}
                </Text>
              </View>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image
                  source={Images.imgIntro2}
                  style={{
                    width: width - 100,
                    height: ((width - 100) * 810) / 935,
                  }}
                />
              </View>
            </View>
          </Content>
        </Body>
        <Footer style={{height: 60, backgroundColor: '#499DA7'}}>
          <TouchableOpacity
            style={{
              width,
              height: 60,
              backgroundColor: '#499DA7',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.props.navigation.pop(2);
              EventRegister.emit(Config.Constant.EVENT_GOTO_SIGNIN, '');
            }}>
            <Text style={{color: 'white', fontSize: 16}}>다음</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

export default index;
