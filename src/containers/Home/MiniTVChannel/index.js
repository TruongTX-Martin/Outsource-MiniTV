import React, {Component} from 'react';
import {Text, View, Dimensions, ImageBackground, Image} from 'react-native';
import {Container, Body, Header, Content} from 'native-base';
import {connect} from 'react-redux';
import Config from '../../../config';
import HeaderBase from '../../../components/HeaderBase';
import Images from '../../../assets/images';
const {width} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="미니TV 란?" />
        </Header>
        <Body>
          <Content>
            <View>
              <ImageBackground
                source={Images.imgMiniTVMain}
                style={{width, height: (width * 1100) / 1080}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 25,
                    marginTop: 50,
                    fontWeight: 'bold',
                    marginLeft: 20,
                  }}>
                  Learning by playing!
                </Text>
                <Text style={{fontSize: 20, color: 'white', marginLeft: 20}}>
                  놀이를 통한 배움, 미니TV
                </Text>
              </ImageBackground>
              <View
                style={{
                  width,
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: 40,
                  paddingHorizontal: 30,
                }}>
                <Text style={{color: '#222222', fontSize: 20}}>미니TV 란?</Text>
                <View
                  style={{
                    width: 40,
                    height: 3,
                    backgroundColor: '#609ba4',
                    marginTop: 10,
                  }}
                />
                <Text
                  style={{textAlign: 'center', marginTop: 30, fontSize: 18}}>
                  {'미니TV는 (주)미니스쿨에서 개발하고 서비스하는 키즈를 위한'}
                </Text>
                <Text style={{textAlign: 'center', marginTop: 0, fontSize: 18}}>
                  {'양방향 배움 & 놀이터입니다.'}
                </Text>

                <Text
                  style={{textAlign: 'center', marginTop: 30, fontSize: 18}}>
                  {'캐릭터가 교사를 대신해서 실시간 방송을 진행하여'}
                </Text>
                <Text style={{textAlign: 'center', marginTop: 0, fontSize: 18}}>
                  {'아이들이 보다 편하고 재미있게 방송에 참여할 수 있습니다.'}
                </Text>
                <Text
                  style={{textAlign: 'center', marginTop: 30, fontSize: 18}}>
                  {'특허 등록한 “양방향 유아 교육서비스” 기술을 활용하여'}
                </Text>
                <Text style={{textAlign: 'center', marginTop: 0, fontSize: 18}}>
                  {'단순 전달형 VOD 방식이 아닌'}
                </Text>
                <Text style={{textAlign: 'center', marginTop: 0, fontSize: 18}}>
                  {'아이들이 직접 방송에 참여하고,'}
                </Text>
                <Text style={{textAlign: 'center', marginTop: 0, fontSize: 18}}>
                  {'친구들과 함께 배울 수 있는 유익한 프로그램을 진행합니다.'}
                </Text>
              </View>
              <Image
                style={{width, height: (width * 574) / 546, marginTop: 40}}
                source={Images.imgMiniTVImg1}
              />
              <View
                style={{
                  width,
                  backgroundColor: '#f6f4fc',
                  paddingTop: 50,
                  paddingHorizontal: 20,
                }}>
                <Text style={{fontSize: 20, color: '#222222'}}>
                  단순한 놀이가 아닌,
                </Text>
                <Text style={{fontSize: 20, color: '#222222'}}>
                  놀이를 통한 배움!
                </Text>
                <Text style={{fontSize: 16, color: '#767383', marginTop: 30}}>
                  미니TV는 다양한 학습 콘텐츠를 활용하여
                </Text>
                <Text style={{fontSize: 16, color: '#767383'}}>
                  아이들이 친구들과 함께 놀면서 배울 수 있는 환경을 제공하는
                </Text>
                <Text style={{fontSize: 16, color: '#767383'}}>
                  {' '}
                  새로운 미디어입니다.
                </Text>
                <View style={{width, alignItems: 'center', paddingTop: 30}}>
                  <Image
                    style={{
                      width: width / 2,
                      height: ((width / 2) * 500) / 514,
                    }}
                    source={Images.imgMiniTVImg2}
                  />
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 50,
                  paddingHorizontal: 40,
                }}>
                <Text style={{color: '#222222', fontSize: 20}}>
                  미니TV를 만든 사람들
                </Text>
                <View
                  style={{
                    width: 40,
                    height: 3,
                    backgroundColor: '#609ba4',
                    marginTop: 10,
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#555555',
                    marginTop: 30,
                  }}>
                  {'우리의 아이들이 힘들게 한글 공부하는 모습,'}
                </Text>
                <Text
                  style={{textAlign: 'center', fontSize: 15, color: '#555555'}}>
                  {'맞벌이 부부를 위해 아이들을 하루종일 돌봐주시는'}
                </Text>
                <Text
                  style={{textAlign: 'center', fontSize: 15, color: '#555555'}}>
                  {'장모님, 어머님을 보며'}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#555555',
                    marginBottom: 30,
                  }}>
                  {'아빠들이 모여 기획하고 개발하였습니다.'}
                </Text>
              </View>
              <View style={{paddingHorizontal: 50}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{display: 'flex', alignItems: 'center'}}>
                    <Image
                      style={{width: 80, height: 80, borderRadius: 35}}
                      source={Images.imgMemberNeo}
                    />
                    <Text style={{fontWeight: 'bold', color: '#222222'}}>
                      NEO JUNG
                    </Text>
                    <Text style={{color: '#999999'}}>CEO</Text>
                  </View>
                  <View style={{display: 'flex', alignItems: 'center'}}>
                    <Image
                      style={{width: 80, height: 80, borderRadius: 35}}
                      source={Images.imgMemberLeo}
                    />
                    <Text style={{fontWeight: 'bold', color: '#222222'}}>
                      LEO KIM
                    </Text>
                    <Text style={{color: '#999999'}}>CBO</Text>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    marginBottom: 50,
                  }}>
                  <View style={{display: 'flex', alignItems: 'center'}}>
                    <Image
                      style={{width: 80, height: 80, borderRadius: 35}}
                      source={Images.imgMemberDa}
                    />
                    <Text style={{fontWeight: 'bold', color: '#222222'}}>
                      DARREN KIM
                    </Text>
                    <Text style={{color: '#999999'}}>CTO</Text>
                  </View>
                  <View style={{display: 'flex', alignItems: 'center'}}>
                    <Image
                      style={{width: 80, height: 80, borderRadius: 35}}
                      source={Images.imgMemberDa}
                    />
                    <Text style={{fontWeight: 'bold', color: '#222222'}}>
                      ALLEN HUR
                    </Text>
                    <Text style={{color: '#999999'}}>DEV</Text>
                  </View>
                </View>
              </View>
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todayList: state.liveMainGetReducer.todayList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
