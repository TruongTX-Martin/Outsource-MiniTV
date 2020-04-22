import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import {Container, Body, Content, Footer} from 'native-base';
import Images from '../../../assets/images';
const {width, height} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canNext: false,
      optionAll: {
        key: 'optionAll',
        title: '모두 확인, 동의합니다',
        isCheck: false,
      },
      listOption: [
        {
          key: 'termOfUse',
          title: '서비스 이용 약관 동의 (필수)',
          isMust: true,
          isCheck: false,
        },
        {
          key: 'privacyTerm',
          title: '개인정보 수집 동의 (필수)',
          isMust: true,
          isCheck: false,
        },
        {
          key: 'marketing',
          title: '마케팅 정보 수신 동의 (선택)',
          isMust: false,
          isCheck: false,
        },
      ],
    };
  }

  onPressChild(item) {
    if (item.key == 'termOfUse') {
      this.props.navigation.navigate('TermOfUse');
    } else if (item.key == 'privacyTerm') {
    } else if (item.key == 'marketing') {
    }
  }

  handleClickOption(option) {
    var {listOption, optionAll} = this.state;
    listOption = listOption.map((e) => {
      if (e.key == option.key) {
        return {
          ...e,
          isCheck: !e.isCheck,
        };
      }
      return e;
    });
    if (option.isCheck) {
      optionAll = {
        ...optionAll,
        isCheck: false,
      };
    }
    const canNext = !(
      listOption.filter((e) => e.isMust && !e.isCheck).length > 0
    );
    this.setState({listOption, canNext, optionAll});
  }

  handleClickOptionAll() {
    var {listOption, optionAll} = this.state;
    listOption = listOption.map((e) => {
      return {
        ...e,
        isCheck: !optionAll.isCheck,
      };
    });
    optionAll = {
      ...optionAll,
      isCheck: !optionAll.isCheck,
    };
    const canNext = !(
      listOption.filter((e) => e.isMust && !e.isCheck).length > 0
    );
    this.setState({optionAll, listOption, canNext});
  }

  render() {
    const {listOption, optionAll, canNext} = this.state;
    return (
      <Container>
        <Body>
          <Content>
            <View
              style={{
                width,
                paddingHorizontal: 20,
                backgroundColor: '#f7f7f7',
              }}>
              <Text style={{color: '#222222', fontSize: 25, paddingTop: 100}}>
                약관 동의
              </Text>
              <Text style={{color: '#222222', fontSize: 15, paddingTop: 10}}>
                {'원할한 서비스 이용을 위해 필수항목 동의가 필요합니다.'}
              </Text>

              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 30,
                  borderWidth: 1,
                  borderColor: '#CCCCCC',
                  paddingHorizontal: 5,
                  paddingVertical: 12,
                  backgroundColor: 'white',
                }}
                onPress={() => this.handleClickOptionAll()}>
                <Image
                  source={
                    optionAll.isCheck ? Images.imgIcCheck : Images.imgIcUnCheck
                  }
                  style={{width: 20, height: 20, marginRight: 10}}
                />
                <Text
                  style={{color: optionAll.isCheck ? '#222222' : '#555555'}}>
                  {optionAll.title}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 25,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  backgroundColor: 'white',
                  paddingVertical: 10,
                }}>
                {listOption.map((e) => {
                  return (
                    <TouchableOpacity
                      key={e.key}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        paddingVertical: 12,
                        justifyContent: 'space-between',
                      }}
                      onPress={() => this.handleClickOption(e)}>
                      <TouchableOpacity
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() => this.handleClickOption(e)}>
                        <Image
                          source={
                            e.isCheck ? Images.imgIcCheck : Images.imgIcUnCheck
                          }
                          style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                          style={{color: e.isCheck ? '#222222' : '#555555'}}>
                          {e.title}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 50,
                          height: 20,
                          display: 'flex',
                          alignItems: 'flex-end',
                        }}
                        onPress={() => this.onPressChild(e)}>
                        <Image
                          style={{width: 15, height: 15}}
                          source={Images.imgIcArrowRight}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </Content>
        </Body>
        <Footer style={{backgroundColor: '#499DA7'}}>
          <TouchableOpacity
            disabled={!canNext}
            style={{
              backgroundColor: canNext ? '#499DA7' : '#999999',
              width,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={{color: 'white', fontSize: 18}}>다음</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

export default index;
