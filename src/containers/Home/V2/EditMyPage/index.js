import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Switch,
} from 'react-native';
import { Container, Body, Header } from 'native-base';
import HeaderBase from '../../../../components/HeaderBase';
import Config from '../../../../config';
import Images from '../../../../assets/images';
import ImagePicker from 'react-native-image-picker';
import TextInputRight from '../../../../components/TextFieldRight';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment/moment';
import Spinner from 'react-native-loading-spinner-overlay';
import * as myPageActions from '../../../../redux/actions/myPageActions';
import Image2 from '../../../../assets/images2';
import DatePicker from 'react-native-datepicker';

import { getWidthScreen, getHeightScreen } from '../../../../utils';
let width = 0;
let height = 0;
const GENDER = {
  MALE: 0,
  FEMALE: 1,
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      imageSource: null,
      profileImage: null,
      year: '',
      month: '',
      day: '',
      date: '2020.10.10',
    };
    width = getWidthScreen();
    height = getHeightScreen();
  }

  componentDidMount() {
    this.props.getMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.meData) {
      const meData = nextProps.meData;
      const childName = meData?.student_name;
      const profileImage = meData?.profile_image_url;
      const gender = meData?.sex == 'MALE' ? GENDER.MALE : GENDER.FEMALE;
      const year = meData?.birthday?.substring(0, 4);
      const month = meData?.birthday?.substring(4, 6);
      const day = meData?.birthday?.substring(6, 8);
      this.setState({
        childName,
        gender,
        date: year + '.' + month + '.' + day,
        profileImage,
      });
    }
    if (nextProps.isUpdateSuccess) {
      this.props.clearProfileReducer();
      this.props.getMe();
    }
  }

  componentWillUnmount() {
    this.props.getMe();
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
        const source = { uri: response.uri };
        this.setState({ imageSource: source });
      }
    });
  }

  onUpdateProfile() {
    const { childName, gender, date } = this.state;
    const params = {
      student_name: childName,
      birthday: date.toString().split('.').join(''),
      sex: gender == GENDER.MALE ? 'MALE' : 'FEMALE',
    };
    this.props.updateProfile(params);
  }

  render() {
    const { gender, imageSource, profileImage, childName } = this.state;
    const { meData, loadingMe, isUpdating, isUpdatingImage } = this.props;
    return (
      <Container>
        <Header style={Config.Styles.headerGray}>
          <HeaderBase title="아이 정보 수정" />
        </Header>
        <Body>
          <View style={{ width, height, backgroundColor: '#F0F0F0' }}>
            <Spinner
              visible={loadingMe || isUpdating}
              textStyle={{ color: '#fff' }}
            />
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
              <View
                style={{
                  display: 'flex',
                  flex: 3,
                  alignItems: 'flex-end',
                }}>
                {imageSource != null && (
                  <ImageBackground
                    style={{ width: 120, height: 120, borderRadius: 60 }}
                    imageStyle={{ borderRadius: 60 }}
                    source={imageSource}>
                    <View
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        backgroundColor: '#000000',
                        opacity: 0.6,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (isUpdatingImage) {
                            return;
                          }
                          this.onHandleChooseImage();
                        }}>
                        <Image
                          style={{ width: 40, height: 40 }}
                          source={Images.imgIcCamera}
                        />
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                )}
                {imageSource == null && profileImage != null && (
                  <ImageBackground
                    style={{ width: 120, height: 120, borderRadius: 60 }}
                    imageStyle={{ borderRadius: 60 }}
                    source={{ uri: profileImage }}>
                    <View
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        backgroundColor: '#000000',
                        opacity: 0.6,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (isUpdatingImage) {
                            return;
                          }
                          this.onHandleChooseImage();
                        }}>
                        <Image
                          style={{ width: 40, height: 40 }}
                          source={Images.imgIcCamera}
                        />
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                )}
              </View>
              <View
                style={{
                  flex: 6,
                  paddingLeft: 10,
                  paddingLeft: 30,
                }}>
                <TextInputRight
                  title={'이름'}
                  value={childName}
                  onChangeText={(childName) => this.setState({ childName })}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: '#BEBEC0',
                    paddingBottom: 10,
                    paddingTop: 10,
                  }}>
                  <Text style={{ color: '#333333', fontWeight: 'bold' }}>
                    성별
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 20,
                      }}
                      onPress={() => {
                        if (gender != GENDER.MALE) {
                          this.setState({ gender: GENDER.MALE });
                        }
                      }}>
                      <Image
                        style={{ width: 20, height: 20, marginRight: 5 }}
                        source={
                          gender == GENDER.MALE
                            ? Images.imgIcCheck
                            : Images.imgIcUnCheck
                        }
                      />
                      <Text
                        style={{
                          color: gender == GENDER.MALE ? '#575757' : '#9A9A9A',
                        }}>
                        남자
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        if (gender != GENDER.FEMALE) {
                          this.setState({ gender: GENDER.FEMALE });
                        }
                      }}>
                      <Image
                        style={{ width: 20, height: 20, marginRight: 5 }}
                        source={
                          gender == GENDER.FEMALE
                            ? Images.imgIcCheck
                            : Images.imgIcUnCheck
                        }
                      />
                      <Text
                        style={{
                          color:
                            gender == GENDER.FEMALE ? '#575757' : '#9A9A9A',
                        }}>
                        여자
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#BEBEC0',
                    marginTop: 5,
                    paddingBottom: 5,
                  }}
                  onPress={() => this.datePicker.onPressDate()}>
                  <Text style={{ color: '#333333', fontWeight: 'bold' }}>
                    생년월일
                  </Text>
                  <DatePicker
                    ref={(picker) => {
                      this.datePicker = picker;
                    }}
                    date={this.state.date}
                    showIcon={false}
                    mode="date"
                    placeholder="select date"
                    format="YYYY.MM.DD"
                    minDate="1900.01.01"
                    maxDate="2100.01.01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: { borderWidth: 0 },
                      dateText: {
                        textAlign: 'right',
                        width: 150,
                        fontSize: 15,
                        paddingRight: 10,
                        color: '#575757',
                      },
                    }}
                    onDateChange={(input) => {
                      this.setState({ date: input });
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2 }} />
            </View>
            <View
              style={{
                width,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: '#9A9A9A',
                    paddingVertical: 10,
                    marginRight: 5,
                    width: 90,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.props.navigation.goBack()}>
                  <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>
                    취소
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    backgroundColor: '#50CCC3',
                    paddingVertical: 10,
                    marginRight: 5,
                    width: 90,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5,
                  }}
                  onPress={() => this.onUpdateProfile()}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Body>
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
