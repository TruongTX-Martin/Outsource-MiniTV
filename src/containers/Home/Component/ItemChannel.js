import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

class index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item, widthView} = this.props;
    return (
      <View
        style={{
          width: widthView,
          height: (widthView * 450) / 950 + 70,
          marginRight: 20,
          borderRadius: 20,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          marginBottom: 30,
          marginLeft: 5,
        }}>
        <Image
          style={{
            width: widthView,
            height: (widthView * 450) / 950,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          source={{uri: item.image}}
        />
        <View
          style={{
            width: widthView,
            height: 60,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: '#ffffff',
          }}>
          <Text style={{marginLeft: 10, marginTop: 10}}>{item.title}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 10,
            }}>
            {item.tags.map((tag) => {
              return (
                <TouchableOpacity>
                  <Text style={{color: '#999999', marginRight: 5}}>{tag}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}

export default index;
