import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {Container, Body, Header} from 'native-base';
import {connect} from 'react-redux';
import Images from '../../../assets/images';
import ItemChannel from '../Component/ItemChannel';
const {width} = Dimensions.get('window');

const widthView = width - 20;

class index extends Component {
  constructor(props) {
    super(props);
    this.listHotChannel = [
      {
        id: 1,
        image:
          'https://s3.ap-northeast-2.amazonaws.com/minischool-dev-001/book/minischool/thumbnail/1585112351121.ico',
        title: '쿠리와 함께하는 문장게임',
        tags: ['#4~5세', '#영어게임', '#놀이'],
      },
      {
        id: 2,
        image:
          'https://s3.ap-northeast-2.amazonaws.com/minischool-dev-001/book/minischool/thumbnail/1585112351121.ico',
        title: '쿠리와 함께하는 문장게임',
        tags: ['#4~5세', '#영어게임', '#놀이'],
      },
      {
        id: 3,
        image:
          'https://s3.ap-northeast-2.amazonaws.com/minischool-dev-001/book/minischool/thumbnail/1585112351121.ico',
        title: '쿠리와 함께하는 문장게임',
        tags: ['#4~5세', '#영어게임', '#놀이'],
      },
      {
        id: 4,
        image:
          'https://s3.ap-northeast-2.amazonaws.com/minischool-dev-001/book/minischool/thumbnail/1585112351121.ico',
        title: '쿠리와 함께하는 문장게임',
        tags: ['#4~5세', '#영어게임', '#놀이'],
      },
    ];
  }

  render() {
    return (
      <Container>
        <Header>
          <View style={{width, paddingLeft: 15}}>
            <TouchableOpacity
              style={{width: 50}}
              onPress={() => this.props.navigation.goBack()}>
              <Image
                style={{width: 13, height: 25}}
                source={Images.imgIcBack}
              />
            </TouchableOpacity>
          </View>
        </Header>
        <Body>
          <View style={{width: widthView}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>
              Poke list
            </Text>
            <FlatList
              data={this.listHotChannel}
              style={{marginBottom: 30}}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return <ItemChannel item={item} widthView={widthView - 10} />;
              }}
            />
          </View>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
