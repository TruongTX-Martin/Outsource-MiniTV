import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Images2 from '../../assets/images2';
import styles from './style';

class index extends Component {
  render() {
    return (
      <View style={styles.parrentView}>
        <View style={styles.viewLeft}>
          {this.props.navigation && (
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => this.props.navigation.goBack()}>
              <Image
                style={styles.imageButtonLeft}
                source={Images2.imgIcBack}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.viewCenter}>
          <Text style={styles.textCenter}>{this.props.title}</Text>
        </View>
        <View style={styles.viewRight} />
      </View>
    );
  }
}

export default index;
