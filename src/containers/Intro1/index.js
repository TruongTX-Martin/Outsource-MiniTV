import React, {Component} from 'react';
import {Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
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
      <Container>
        <Body>
          <Content
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: '#EFEDED'}}>
            <View
              style={{
                width,
                height: height - 100,
                backgroundColor: '#EFEDED',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <View>
                <TouchableOpacity
                  style={{marginTop: 50}}
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
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    paddingLeft: 10,
                    marginTop: 50,
                    color: '#000000',
                  }}>
                  {'키즈를 위한'}
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    paddingLeft: 10,
                    color: '#000000',
                  }}>
                  {'양방향 배움 & 놀이터'}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#555555',
                    paddingLeft: 10,
                    marginTop: 15,
                  }}>
                  {'캐릭터가 교사를 대신해서 실시간 방송을 진행하여'}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#555555',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}>
                  {'아이들이 보다 편하고 재미있게 방송에 참여할 수 있습니다.'}
                </Text>
              </View>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image
                  source={Images.imgIntro1}
                  style={{
                    width: width - 100,
                    height: ((width - 100) * 957) / 978,
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
            onPress={() => this.props.navigation.navigate('Intro2')}>
            <Text style={{color: 'white', fontSize: 16}}>다음</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

export default index;
