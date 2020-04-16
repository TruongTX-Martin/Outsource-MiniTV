import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Container, Body, Content, Header} from 'native-base';
import HeaderBase from '../../components/HeaderBase';
import Config from '../../config';
import TextField from '../../components/TextField';
import validateInput from '../../helpers/Validate';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
    };
    this.validation = {
      email: {
        presence: {
          message: '^Please enter an email address',
        },
        email: {
          message: '^Please enter a valid email address',
        },
      },
    };
  }

  handleValidate() {
    const emailError = validateInput(
      'email',
      this.state.email,
      this.validation,
    );
    console.log('emailError:', emailError);
    this.setState({emailError});
  }
  render() {
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title={'Detail'} />
        </Header>
        <Body>
          <Content>
            <View>
              <TextField
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
                error={this.state.emailError}
              />
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: 'blue',
                  borderRadius: 5,
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.handleValidate()}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Validate
                </Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

export default index;
