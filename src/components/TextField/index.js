import React, { Component } from 'react';
import {
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  Platform,
  Text,
  Image,
} from 'react-native';
const { width } = Dimensions.get('window');

class index extends Component {
  render() {
    return (
      <View
        style={[
          {
            borderRadius: 5,
            marginTop: 5,
            height: 45,
            backgroundColor: this.props.backgroundColor || '#F4F5FA',
            marginBottom: Platform.OS === 'ios' ? 4 : 0,
            paddingLeft: 5,
            width: this.props.width,
          },
          this.props.style,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {this.props.icon && (
            <Image source={this.props.icon} style={this.props.styleIcon} />
          )}
          <TextInput
            style={[Styles.text, { width: this.props.widthText || width - 60 }]}
            value={this.props.value}
            secureTextEntry={this.props.isPassword ? true : false}
            returnKeyType={this.props.keyType ? this.props.keyType : 'next'}
            keyboardType={
              this.props.keyboardType ? this.props.keyboardType : 'default'
            }
            onChangeText={(text) =>
              this.props.onChangeText && this.props.onChangeText(text)
            }
            onBlur={() =>
              this.props.onBlur ? this.props.onBlur() : console.log('')
            }
            placeholder={this.props.placeholder ? this.props.placeholder : ''}
            onSubmitEditing={() => this.props.onSearch && this.props.onSearch()}
          />
        </View>
        {this.props.error != null && this.props.error.length > 0 && (
          <Text
            style={{
              color: 'red',
              fontSize: 10,
              marginBottom: 5,
              paddingLeft: 5,
              fontFamily: 'Mono-Regular',
            }}>
            {this.props.error}
          </Text>
        )}
      </View>
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
    height: 45,
    paddingLeft: 5,
    width: width - 55,
    paddingTop: Platform.OS === 'android' ? 5 : 0,
    fontFamily: 'Mono-Regular',
  },
});
