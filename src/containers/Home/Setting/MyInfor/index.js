import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Container, Body, Header, Footer, Content} from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import Images from '../../../../assets/images';
import {connect} from 'react-redux';
import Config from '../../../../config';
import TextInputCustom from '../../../../components/TextField';
import Spinner from 'react-native-loading-spinner-overlay';
import * as myPageActions from '../../../../redux/actions/myPageActions';
import Modal, {SlideAnimation} from 'react-native-modals';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
const {width} = Dimensions.get('window');
const widthView = width - 20;

const GENDER = {
  MALE: 0,
  FEMALE: 1,
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childName: '',
      year: '',
      month: '',
      day: '',
      gender: null,
      isValidYear: false,
      isValidMonth: false,
      isValidDay: false,
      isValidAll: false,
      isModalVisible: false,
      imageSource: null,
      profileImage: null,
    };
  }

  componentDidMount() {
    this.props.getMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.meData) {
      const childName = nextProps.meData.student_name;
      const profileImage = nextProps.meData.profile_image_url;
      const gender =
        nextProps.meData.sex == 'MALE' ? GENDER.MALE : GENDER.FEMALE;
      const birthDay = nextProps.meData.birthday;
      const year = birthDay.substring(0, 4);
      const month = birthDay.substring(4, 6);
      const day = birthDay.substring(6, 8);
      this.setState({
        childName,
        gender,
        year,
        month,
        day,
        isValidYear: true,
        isValidMonth: true,
        isValidDay: true,
        profileImage,
      });
      this.props.clearMe();
    }
    if (nextProps.isUpdateSuccess) {
      this.setState({isModalVisible: true});
      this.props.clearProfileReducer();
    }
  }

  componentWillUnmount() {
    this.props.getMe();
  }

  handleUpdateInfor() {
    const {
      childName,
      year,
      month,
      day,
      isValidYear,
      isValidMonth,
      isValidDay,
      gender,
    } = this.state;
    if (
      childName.trim().length == 0 ||
      !isValidYear ||
      !isValidMonth ||
      !isValidDay
    ) {
      return;
    }
    const validMonth =
      parseInt(month) < 10 && month.length < 2 ? '0' + month : month;
    const validDay = parseInt(day) < 10 && day.length < 2 ? '0' + day : day;
    const params = {
      student_name: childName,
      birthday: year.toString() + validMonth.toString() + validDay.toString(),
      sex: gender == GENDER.MALE ? 'MALE' : 'FEMALE',
    };
    this.props.updateProfile(params);
  }

  onHandleChooseImage() {
    const options = {
      title: '프로필 사진 바꾸기',
      cancelButtonTitle: '취소',
      takePhotoButtonTitle: '사진 찍기',
      chooseFromLibraryButtonTitle: '앨범에서 선택',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const params = [];
        params.push({
          name: 'file',
          filename: 'test.jpeg',
          type: 'image/jpeg',
          data: RNFetchBlob.wrap(response.uri.split('file://').pop()),
        });
        this.props.updateProfileImage(params);
        const source = {uri: response.uri};
        this.setState({imageSource: source});
      }
    });
  }

  render() {
    const {
      year,
      month,
      day,
      gender,
      isValidYear,
      isValidMonth,
      isValidDay,
      childName,
      isModalVisible,
      imageSource,
      profileImage,
    } = this.state;
    const {loadingMe, isUpdating, isUpdatingImage} = this.props;
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase navigation={this.props.navigation} title="내 정보 수정" />
        </Header>
        <Body>
          <Content showsVerticalScrollIndicator={false}>
            <View style={{width}}>
              <Spinner
                visible={loadingMe || isUpdating}
                textStyle={{color: '#fff'}}
              />
              <View
                style={{
                  width,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 50,
                }}>
                <View style={{width: 100, height: 100, borderRadius: 50}}>
                  {imageSource != null && (
                    <Image
                      style={{width: 100, height: 100, borderRadius: 50}}
                      source={imageSource}
                    />
                  )}
                  {imageSource == null && profileImage != null && (
                    <Image
                      style={{width: 100, height: 100, borderRadius: 50}}
                      source={{uri: profileImage}}
                    />
                  )}

                  <TouchableOpacity
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      position: 'absolute',
                      backgroundColor: 'black',
                      opacity: 0.4,
                      display: 'flex',
                    }}
                    onPress={() => {
                      if (isUpdatingImage) {
                        return;
                      }
                      this.onHandleChooseImage();
                    }}
                  />
                  {!isUpdatingImage && (
                    <TouchableOpacity
                      onPress={() => {
                        if (isUpdatingImage) {
                          return;
                        }
                        this.onHandleChooseImage();
                      }}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          position: 'absolute',
                          bottom: 30,
                          left: 35,
                        }}
                        source={Images.imgIcCamera}
                      />
                    </TouchableOpacity>
                  )}
                  {isUpdatingImage && (
                    <ActivityIndicator
                      style={{position: 'absolute', bottom: 30, left: 35}}
                      size="large"
                      color="#499DA7"
                    />
                  )}
                </View>
              </View>
              <Text style={{textAlign: 'center', marginTop: 20}}>
                프로필 사진 수정
              </Text>

              <View style={{paddingHorizontal: 15}}>
                <Text
                  style={{
                    color: '#333333',
                    fontSize: 17,
                    marginTop: 30,
                    marginBottom: 5,
                  }}>
                  자녀 이름
                </Text>
                <TextInputCustom
                  width={widthView}
                  placeholder="김성국"
                  value={childName}
                  onChangeText={(childName) => this.setState({childName})}
                />
                <Text
                  style={{
                    color: '#333333',
                    fontSize: 17,
                    marginTop: 30,
                  }}>
                  생년월일
                </Text>
                <View
                  style={{
                    display: 'flex',
                    width: widthView,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: '#cccccc',
                      width: widthView / 3 - 5,
                      paddingBottom: 5,
                    }}>
                    <TextInput
                      style={{
                        width: widthView / 3 - 35,
                        textAlign: 'right',
                        paddingRight: 5,
                      }}
                      // placeholderTextColor="#666"
                      // color="#333"
                      keyboardType="numeric"
                      value={year}
                      onChangeText={(year) => {
                        if (year.toString().length < 5) {
                          this.setState({
                            year,
                            isValidYear:
                              year.toString().length == 4 ? true : false,
                          });
                        }
                      }}
                    />
                    <Text style={{color: isValidYear ? '#222222' : '#AAAAAA'}}>
                      년
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: '#cccccc',
                      width: widthView / 3 - 5,
                      paddingBottom: 5,
                    }}>
                    <TextInput
                      style={{
                        width: widthView / 3 - 35,
                        textAlign: 'right',
                        paddingRight: 5,
                      }}
                      // placeholderTextColor="#666"
                      // color="#333"
                      keyboardType="numeric"
                      value={month}
                      onChangeText={(month) => {
                        if (month.toString().length < 3) {
                          this.setState({
                            month,
                            isValidMonth:
                              parseInt(month) > 0 && parseInt(month) < 13
                                ? true
                                : false,
                          });
                        }
                      }}
                    />
                    <Text style={{color: isValidMonth ? '#222222' : '#AAAAAA'}}>
                      월
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: '#cccccc',
                      width: widthView / 3 - 5,
                      paddingBottom: 5,
                    }}>
                    <TextInput
                      style={{
                        width: widthView / 3 - 35,
                        textAlign: 'right',
                        paddingRight: 5,
                      }}
                      // placeholderTextColor="#666"
                      // color="#333"
                      keyboardType="numeric"
                      value={day}
                      onChangeText={(day) => {
                        if (day.toString().length < 3) {
                          this.setState({
                            day,
                            isValidDay:
                              parseInt(day) > 0 && parseInt(day) <= 31
                                ? true
                                : false,
                          });
                        }
                      }}
                    />
                    <Text style={{color: isValidDay ? '#222222' : '#AAAAAA'}}>
                      일
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    color: '#333333',
                    fontSize: 17,
                    marginTop: 30,
                    marginBottom: 5,
                  }}>
                  성별
                </Text>
                <View
                  style={{
                    display: 'flex',
                    width: widthView,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    marginBottom: 30,
                  }}>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: '#cccccc',
                      width: widthView / 2 - 10,
                      paddingBottom: 5,
                    }}
                    onPress={() => this.setState({gender: GENDER.MALE})}>
                    <Image
                      source={
                        gender == GENDER.MALE
                          ? Images.imgIcCheck
                          : Images.imgIcUnCheck
                      }
                      style={{width: 20, height: 20, marginRight: 10}}
                    />
                    <Text
                      style={{
                        color: gender == GENDER.MALE ? '#222222' : '#AAAAAA',
                      }}>
                      남성
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: '#cccccc',
                      width: widthView / 2 - 10,
                      paddingBottom: 5,
                    }}
                    onPress={() => this.setState({gender: GENDER.FEMALE})}>
                    <Image
                      source={
                        gender == GENDER.FEMALE
                          ? Images.imgIcCheck
                          : Images.imgIcUnCheck
                      }
                      style={{width: 20, height: 20, marginRight: 10}}
                    />
                    <Text
                      style={{
                        color: gender == GENDER.FEMALE ? '#222222' : '#AAAAAA',
                      }}>
                      여성
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Content>
        </Body>
        <Footer
          style={{
            width,
            height: 80,
            borderTopColor: 'white',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={{
              width: widthView,
              backgroundColor: '#499DA7',
              height: 70,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.handleUpdateInfor()}>
            <Text style={{color: 'white', fontSize: 17}}>변경하기</Text>
          </TouchableOpacity>
        </Footer>
        <Modal
          visible={isModalVisible}
          modalAnimation={
            new SlideAnimation({
              initialValue: 0,
              slideFrom: 'bottom',
              useNativeDriver: true,
            })
          }
          useNativeDriver={true}
          onTouchOutside={() => {
            this.setState({isModalVisible: false});
          }}
          onHardwareBackPress={() => {
            this.setState({isModalVisible: false});
            return true;
          }}>
          <View
            style={{
              width: width - 40,
              height: 300,
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: 5,
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 225,
              }}>
              <Text
                style={{
                  color: '#222222',
                  fontSize: 25,
                  width: width - 50,
                  textAlign: 'center',
                }}>
                수정이 완료되었습니다.
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingBottom: 20,
              }}>
              <TouchableOpacity
                style={{
                  width: width - 60,
                  backgroundColor: '#499DA7',
                  height: 55,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  this.setState({isModalVisible: false});
                  console.log('Demamaa');
                  this.props.navigation.goBack();
                }}>
                <Text style={{color: 'white', fontSize: 17}}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    meData: state.getMeReducers.meData,
    loadingMe: state.getMeReducers.loadingMe,
    isUpdating: state.updateProfileReducer.isUpdating,
    isUpdateSuccess: state.updateProfileReducer.isUpdateSuccess,
    isUpdatingImage: state.updateProfileImageReducer.isUpdatingImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMe: () => dispatch(myPageActions.getMe()),
    clearMe: () => dispatch(myPageActions.clearMe()),
    updateProfile: (params) => dispatch(myPageActions.updateProfile(params)),
    clearProfileReducer: () => dispatch(myPageActions.clearProfileReducer()),
    updateProfileImage: (params) =>
      dispatch(myPageActions.updateImageProfile(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
