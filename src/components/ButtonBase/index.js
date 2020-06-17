import React, { Component } from 'react';
import {
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  Platform,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
const { width } = Dimensions.get('window');

class index extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress && this.props.onPress()}
        style={[
          {
            width: this.props.width || width,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.props.backgroundColor || '#499DA7',
            borderRadius: 5,
          },
          this.props.style,
        ]}>
        <Text style={{ color: 'white', fontSize: 18 }}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

export default index;
const Styles = StyleSheet.create({
  itemInput: {
    height: 39,
    borderWidth: 1,
    borderColor: '#CACACA',
    borderBottomColor: 'white',
    borderRadius: 5,
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    paddingLeft: 5,
    height: 45,
    width: width - 55,
    paddingTop: Platform.OS === 'android' ? 5 : 0,
  },
});
