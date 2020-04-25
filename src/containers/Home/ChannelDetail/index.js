import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Container, Body, Header, Content, Footer} from 'native-base';
import Config from '../../../config';
import HeaderBase from '../../../components/HeaderBase';
import {connect} from 'react-redux';
import Images from '../../../assets/images';
import * as liveActions from '../../../redux/actions/liveActions';
const {width} = Dimensions.get('window');

const widthView = width - 30;
const TAB = {
  TAB_COURSE_INFOR: '발달 영역',
  TAB_NEXT_SCHEDULER: '다음 방송',
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: TAB.TAB_COURSE_INFOR,
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', null);
    this.props.getDetail(id);
  }

  render() {
    const {currentTab} = this.state;
    const {detail} = this.props;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="" />
        </Header>
        <Body>
          <Content>
            <View style={{width, display: 'flex', alignItems: 'center'}}>
              <View style={{width: widthView}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>
                  {detail?.title}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginVertical: 10,
                  }}>
                  참여 인원 231/500
                </Text>
                <Image
                  style={{
                    width: widthView,
                    height: (widthView * 500) / 980,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                  source={{
                    uri: `${detail?.thumbnail}`,
                  }}
                />
                <Text style={{fontWeight: 'bold', marginTop: 10, fontSize: 15}}>
                  쿠리와 함께하는 단어게임
                </Text>
                <Text style={{color: '#797979', marginTop: 5}}>
                  쿠리와 함께 놀면서 한글을 배울수 있어요.한솔교육에서 만든
                  신기한 한글나라를 적용한 교육 프로그램이랍니다. 쿠리와 함께
                  한글공부를 시작해볼까요?
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    backgroundColor: '#F8F8F8',
                    marginVertical: 15,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: widthView / 3,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{width: 15, height: 16}}
                      source={Images.imgIcTarget}
                    />
                    <Text
                      style={{color: '#222222', fontSize: 13, marginLeft: 5}}>
                      {`${detail?.target_age}세 대상`}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: widthView / 3,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{width: 15, height: 15}}
                      source={Images.imgIcDuration}
                    />
                    <Text
                      style={{color: '#222222', fontSize: 13, marginLeft: 5}}>
                      {`${detail?.duration} 세 대상`}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: widthView / 3,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{width: 15, height: 15}}
                      source={Images.imgIcShare}
                    />
                    <Text
                      style={{color: '#222222', fontSize: 13, marginLeft: 5}}>
                      4~6세 대상
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width,
                  height: 15,
                  backgroundColor: '#F7F7F7',
                  borderTopWidth: 0.5,
                  borderTopColor: '#EAEAEA',
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#EAEAEA',
                }}
              />
              <View style={{width, paddingTop: 10}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 20,
                  }}>
                  <TouchableOpacity
                    style={{
                      marginRight: 20,
                      borderBottomWidth: 2,
                      borderBottomColor:
                        currentTab == TAB.TAB_COURSE_INFOR
                          ? '#5f3de9'
                          : 'white',
                      paddingVertical: 5,
                    }}
                    onPress={() =>
                      this.setState({currentTab: TAB.TAB_COURSE_INFOR})
                    }>
                    <Text
                      style={{
                        color:
                          currentTab == TAB.TAB_COURSE_INFOR
                            ? '#000000'
                            : '#aaaaaa',
                      }}>
                      발달 영역
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginRight: 20,
                      borderBottomWidth: 2,
                      borderBottomColor:
                        currentTab == TAB.TAB_NEXT_SCHEDULER
                          ? '#5f3de9'
                          : 'white',
                      paddingVertical: 5,
                    }}
                    onPress={() =>
                      this.setState({currentTab: TAB.TAB_NEXT_SCHEDULER})
                    }>
                    <Text
                      style={{
                        color:
                          currentTab == TAB.TAB_NEXT_SCHEDULER
                            ? '#000000'
                            : '#aaaaaa',
                      }}>
                      다음 방송
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Content>
        </Body>
        <Footer style={{height: 60, width, backgroundColor: 'white'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width,
            }}>
            <View style={{paddingLeft: 10}}>
              <Text style={{color: '#6733F2', fontSize: 12}}>방송시간</Text>
              <Text style={{fontWeight: 'bold'}}>
                2020년 4월 20일 오후 2:20
              </Text>
            </View>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#499DA7',
                width: 130,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                marginRight: 20,
                borderRadius: 5,
              }}>
              <Image
                style={{width: 17, height: 15}}
                source={Images.imgIcHear}
              />
              <Text style={{color: 'white', marginLeft: 5, fontWeight: 'bold'}}>
                찜하기
              </Text>
            </TouchableOpacity>
          </View>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detail: state.liveDetailReducer.detail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetail: (id) => dispatch(liveActions.detailGet(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
