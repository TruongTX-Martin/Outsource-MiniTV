import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {Container, Body, Header, Footer} from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import Images from '../../../../assets/images';
import Config from '../../../../config';
import TextInput from '../../../../components/TextField';
const {width} = Dimensions.get('window');
const widthView = width - 20;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase
            navigation={this.props.navigation}
            title="Edit my profile"
          />
        </Header>
        <Body>
          <View style={{width: widthView}}>
            <View
              style={{
                width,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 50,
              }}>
              <View style={{width: 100, height: 100, borderRadius: 50}} />
              <ImageBackground
                style={{
                  width: 100,
                  height: 100,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={Images.imgProfile2}
                imageStyle={{borderRadius: 50}}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    color: 'gray',
                  }}
                />

                <Image
                  style={{width: 30, height: 30}}
                  source={Images.imgIcCamera}
                />
              </ImageBackground>
            </View>
            <Text>Edit My Infor</Text>
          </View>
        </Body>
        <Footer
          style={{
            width,
            height: 80,
            borderTopColor: 'white',
          }}>
          <TouchableOpacity
            style={{
              width: widthView,
              backgroundColor: '#499DA7',
              height: 70,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // onPress={() => this.setState({isModalVisible: true})}
          >
            <Text style={{color: 'white', fontSize: 17}}>
              Confirm to Change
            </Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

export default index;
