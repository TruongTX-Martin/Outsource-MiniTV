import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Images2 from '../../assets/images2';
import Images from '../../assets/images';
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
              {this.props.smallBack && (
                <Image
                  style={{ width: 13, height: 25 }}
                  source={Images.imgIcBack}
                />
              )}
              {!this.props.smallBack && (
                <Image
                  style={styles.imageButtonLeft}
                  source={
                    this.props.backGray
                      ? Images2.imgIcBackGray
                      : Images2.imgIcBack
                  }
                />
              )}
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.viewCenter}>
          <Text style={styles.textCenter}>{this.props.title}</Text>
        </View>
        <View style={styles.viewRight}>
          {this.props.setting && (
            <TouchableOpacity onPress={() => this.props.openSetting()}>
              <Image
                style={{ width: 50, height: 50 }}
                source={Images2.imgIcSet}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

export default index;
