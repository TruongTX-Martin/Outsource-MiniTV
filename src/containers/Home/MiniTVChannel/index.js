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
import Config from '../../../config';
import Images from '../../../assets/images';
import ItemChannel from '../Component/ItemChannel';
const {width} = Dimensions.get('window');

const widthView = width - 20;

class index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {todayList} = this.props;
    console.log('Todaylist:', todayList);
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <View style={{width, paddingLeft: 15, height: 50}}>
            <TouchableOpacity
              style={{width: 50, height: 50}}
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
              MiniTV Channel
            </Text>
            <FlatList
              data={todayList}
              style={{marginBottom: 30}}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <ItemChannel
                    item={item}
                    widthView={widthView - 10}
                    navigation={this.props.navigation}
                  />
                );
              }}
            />
          </View>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todayList: state.liveMainGetReducer.todayList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
