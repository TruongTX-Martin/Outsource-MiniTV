import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Container, Body, Content} from 'native-base';
import Images from '../../assets/images';
const {width, height} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Body>
          <Content showsVerticalScrollIndicator={false}>
            <View
              style={{width, height: height - 50, backgroundColor: '#EFEDED'}}>
              <View>
                <Text>{'건너뛰기'}</Text>
                <Text>{'키즈를 위한'}</Text>
                <Text>{'양방향 배움 & 놀이터'}</Text>
                <Text>{'캐릭터가 교사를 대신해서 실시간 방송을 진행하여'}</Text>
                <Text>
                  {'아이들이 보다 편하고 재미있게 방송에 참여할 수 있습니다.'}
                </Text>
              </View>
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

export default index;
