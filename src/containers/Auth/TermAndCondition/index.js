import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { Container, Body, Content, Footer, Header } from 'native-base';
import Images from '../../../assets/images';
import Config from '../../../config';
import HeaderBase from '../../../components/HeaderBase';
import { getWidthScreen, getHeightScreen } from '../../../utils';

let width = 0;
let height = 0;
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
    width = getWidthScreen();
    height = getHeightScreen();
  }

  onPressChild(item) {
    if (item.key == 'termOfUse') {
      this.props.navigation.navigate('TermOfUse');
    } else if (item.key == 'privacyTerm') {
      this.props.navigation.navigate('PrivacyTerm');
    } else if (item.key == 'marketing') {
      this.props.navigation.navigate('MarketingTerm');
    }
  }

  handleClickOption(option) {
    var { listOption, optionAll } = this.state;
    listOption = listOption.map((e) => {
      if (e.key == option.key) {
        return {
          ...e,
          isCheck: !e.isCheck,
        };
      }
      return e;
    });
    if (listOption.filter((e) => e.isCheck).length == 3) {
      optionAll = {
        ...optionAll,
        isCheck: true,
      };
    } else {
      optionAll = {
        ...optionAll,
        isCheck: false,
      };
    }
    const canNext = !(
      listOption.filter((e) => e.isMust && !e.isCheck).length > 0
    );
    this.setState({ listOption, canNext, optionAll });
  }

  handleClickOptionAll() {
    var { listOption, optionAll } = this.state;
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
    this.setState({ optionAll, listOption, canNext });
  }

  render() {
    const { listOption, optionAll, canNext } = this.state;
    return (
      <Container>
        <Header style={Config.Styles.headerWhite}>
          <HeaderBase smallBack navigation={this.props.navigation} backGray />
        </Header>
        <Body>
          <Content>
            <View
              style={{
                width,
                paddingHorizontal: 20,
                backgroundColor: '#ffffff',
              }}>
              <Text
                style={{
                  color: '#222222',
                  fontSize: 25,
                  paddingTop: 80,
                  fontFamily: 'Mono-Blod',
                }}>
                약관 동의
              </Text>
              <Text
                style={{
                  color: '#222222',
                  fontSize: 15,
                  paddingTop: 10,
                  fontFamily: 'Mono-Regular',
                }}>
                {'원할한 서비스 이용을 위해 필수항목 동의가 필요합니다.'}
              </Text>

              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 30,
                  backgroundColor: '#ffffff',
                  borderBottomWidth: 2,
                  borderBottomColor: '#50CCC3',
                  paddingHorizontal: 5,
                  paddingVertical: 12,
                }}
                onPress={() => this.handleClickOptionAll()}>
                <Image
                  source={
                    optionAll.isCheck ? Images.imgIcCheck : Images.imgIcUnCheck
                  }
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text
                  style={{
                    color: optionAll.isCheck ? '#318E87' : '#222222',
                    fontWeight: optionAll.isCheck ? 'bold' : 'normal',
                    fontFamily: 'Mono-Blod',
                  }}>
                  {optionAll.title}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 25,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  backgroundColor: '#f6f7fb',
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
                          style={{ width: 20, height: 20, marginRight: 10 }}
                        />
                        <Text
                          style={{
                            color: e.isCheck ? '#222222' : '#555555',
                            fontFamily: 'Mono-Regular',
                          }}>
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
                          style={{ width: 15, height: 15 }}
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
        <Footer
          style={{ backgroundColor: 'white', height: 60, borderTopWidth: 0 }}>
          <TouchableOpacity
            disabled={!canNext}
            style={{
              backgroundColor: canNext ? '#50CCC3' : '#999999',
              width: width - 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              height: 50,
            }}
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              다음
            </Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

export default index;
