import {Sizes} from '@dungdang/react-native-basic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import {
  ActivityIndicatorBase,
  Alert,
  Animated,
  Button,
  Dimensions,
  Image,
  Keyboard,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import {dataPOS, IsLogin, userData} from '../../config/settings';
import images from '../../res/images/index';
import {colors} from '../../res/values/styles/color';
import Picker from '../Custom/Picker';
import ProcessLoginComponent from '../Custom/ProcessLoginComponent';
import TextInputAnimated from '../Custom/TextInputAnimated';
import ViewOpaticy from '../Custom/ViewOpaticy';
import ViewOpaticyLoading from '../Custom/ViewOpaticyLoading';
import {
  getDataObj,
  getDataVal,
  storeDataObj,
  storeDataVal,
} from '../Function/FunctionAsyncStorage';
import RegisterDeviceModal from './RegisterDeviceModal';
import {getAppMode, color} from '../../res/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class LoginComponent extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      deviceBodyCheck: '',
      macAddress: '',
      propertySelection: null,
      outletSelection: null,
      valueProperty: [],
      valueOutlet: [],
      passCode: '',
      visibleRegister: false,
      opacityView: false,
      opacityLoadingView: false,
      propertyShow: false,
      outletShow: false,
      deviceBodyFull: [],
      isLoading: false,
      isError: false,
      appMode: '',
    };
    this.scaleImg = new Animated.Value(0);
  }

  handleFocusTextInput() {
    Animated.timing(this.scaleImg, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }

  handleBlurTextInput() {
    Animated.timing(this.scaleImg, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }

  async componentDidMount() {
    let appMode = await getAppMode();
    if (appMode === 'light') {
      this.props.changeAppModeAction(0);
    } else {
      this.props.changeAppModeAction(1);
    }
    this._isMounted = true;
    this.getMacAddressDevice();
    await this.props.onGetAllPropertyAction();
    // this.setState({
    //   propertySelection: valueProperty[0],
    //   outletSelection: valueOutlet[0],
    // });
  }

  getMacAddressDevice = async () => {
    let mac = await DeviceInfo.getMacAddress();
    if (this._isMounted) {
      this.setState(
        {
          deviceBodyCheck: {
            ...this.state.deviceBodyCheck,
            NAME: mac,
          },
        },
        () => {
          // console.log('deviceBodyCheck: ', this.state.deviceBodyCheck);
        },
      );
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.allPropertyReducers !== this.props.allPropertyReducers) {
      this.getAllProperty();
    }

    if (prevProps.outletReducers !== this.props.outletReducers) {
      this.setOutlet();
    }

    if (prevProps.statusRegisterDevice !== this.props.statusRegisterDevice) {
      this.props.statusRegisterDevice.status === true
        ? Alert.alert(
            'Thông báo',
            'Đăng Ký Thiết Bị Thành Công',
            [
              {
                text: 'OK',
                onPress: () => {
                  this.setState({visibleRegister: false, opacityView: false});
                },
              },
            ],
            {cancelable: false},
          )
        : {};
    }
    if (prevProps.statusCheckDevice !== this.props.statusCheckDevice) {
      if (this.props.statusCheckDevice.status === 0) {
        this.setState({
          opacityLoadingView: false,
        });
        Alert.alert(
          'Thông báo',
          this.props.statusCheckDevice.mess,
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
      } else {
        userData.PROPERTY_NAME = this.state.propertySelection.label;
        userData.OUTLET_NAME = this.state.outletSelection.label;

        setTimeout(() => {
          this.setState({
            opacityLoadingView: false,
          });
          this.props.navigation.replace('Home');
        }, 1000);
      }
    }
    if (this.props.appMode !== prevProps.appMode) {
      console.log(this.props.appMode);
      this.setState({appMode: this.props.appMode});
    }
  }

  getAllProperty = async () => {
    let arrProperty = [];
    let indexTMP = 0;

    await this.props.allPropertyReducers.map((item) => {
      arrProperty.push({
        id: indexTMP++,
        label: item.NAME,
        value: item.CODE,
      });
    });

    this.setState({valueProperty: arrProperty}, () => {
      this.setState({propertySelection: arrProperty[0]}, () => {});
      this.getOutlet(this.state.valueProperty[0].value);
    });
  };

  getOutlet = (code) => {
    this.props.onGetOutletAction(code);
  };
  setOutlet = () => {
    let arrOutlet = [];
    let indexTMP = 0;
    this.props.outletReducers.map((item) => {
      arrOutlet.push({
        id: indexTMP++,
        value: item.OUTLET_ID,
        code: item.OUTLET_CODE,
        label: item.NAME,
      });
    });

    this.setState({valueOutlet: arrOutlet}, () =>
      this.setState({outletSelection: arrOutlet[0]}),
    );
  };
  postRegisterDevice = () => {
    if (this._isMounted) {
      this.setState(
        {
          deviceBodyCheck: {
            ...this.state.deviceBodyCheck,
            PROPERTY_CODE: this.state.propertySelection.value,
            OUTLET_ID: this.state.outletSelection.value,
            LANG_CODE: 'en',
          },
        },
        () => {
          this.props.onPostRegisterDeviceAction(this.state.deviceBodyCheck);
        },
      );
    }
  };

  postCheckDevice = () => {
    if (this._isMounted) {
      this.setState(
        {
          deviceBodyCheck: {
            ...this.state.deviceBodyCheck,
            PROPERTY_CODE: this.state.propertySelection.value,
            OUTLET_ID: this.state.outletSelection.value,
          },
          deviceBodyFull: {
            PROPERTY_CODE: this.state.propertySelection.value,
            OUTLET_ID: this.state.outletSelection.value,
            // NAME_INTERNAL: this.state.deviceBodyCheck.NAME,
            NAME_INTERNAL: '2913700881fe2765',
            PASSCODE: this.state.passCode,
          },
        },
        () => {
          let box = [this.state.deviceBodyCheck, this.state.deviceBodyFull];
          this.props.onPostCheckDeviceAction(box);
        },
      );
    }
  };

  onLogin = () => {
    if (this.state.passCode == '') {
      this.setState({isError: true});
    } else {
      if (
        this.state.outletSelection == null ||
        this.state.propertySelection == null
      ) {
        Alert.alert(
          'Thông báo',
          'Không thể kết nối tới server. Vui lòng xem lại kết nối Internet hoặc liên hệ với bộ phận CSKH',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
      } else {
        this.postCheckDevice();
        this.setState({
          opacityLoadingView: true,
        });
      }
    }
  };

  // checkDemo = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@lgPOS');
  //     console.log('ASYC');
  //     console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
  //   } catch (e) {
  //     console.log('NO-DT', e);
  //   }
  //   console.log(dataPOS);
  // };
  render() {
    const {isLoading} = this.state;
    const imgSize = this.scaleImg.interpolate({
      inputRange: [0, 1],
      outputRange: [Sizes.s200, Sizes.s200 / 2],
    });
    return isLoading === true ? (
      <ViewOpaticyLoading />
    ) : (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: color.popupBackground,
        }}>
        <StatusBar
          barStyle="dark-content"
          // translucent
          // backgroundColor="transparent"
        />
        {this.state.opacityLoadingView === true ? (
          <ViewOpaticyLoading />
        ) : (
          <View />
        )}

        {/* <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />
          {this.state.opacityLoadingView === true ? (
            <ViewOpaticyLoading />
          ) : (
              <View />
            )} */}

        <RegisterDeviceModal
          visibleRegister={this.state.visibleRegister}
          valueProperty={this.state.valueProperty}
          valueOutlet={this.state.valueOutlet}
          setPropertySelection={(item) =>
            this.setState({propertySelection: item})
          }
          setOutletSelection={(item) => this.setState({outletSelection: item})}
          propertySelection={this.state.propertySelection}
          outletSelection={this.state.outletSelection}
          offModal={() =>
            this.setState({visibleRegister: false, opacityView: false})
          }
          postRegisterDevicee={() => this.postRegisterDevice()}
        />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            style={{flex: 1, justifyContent: 'center'}}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ProcessLoginComponent Step={3} />
              <View
                style={{
                  flex: 0.6,
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <Animated.Image
                  resizeMode="contain"
                  source={{
                    uri: `${dataPOS.POS_LOGO_HOTEL_URL}`,
                  }}
                  style={{
                    width: imgSize,
                    height: imgSize,
                    alignSelf: 'center',
                  }}
                />
              </View>

              <View style={{marginTop: Sizes.s40}}>
                <View
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                    borderRadius: Sizes.s35,
                    borderColor: colors.black,
                  }}>
                  {/* <Text style={{fontSize: Sizes.h30, fontWeight: 'bold'}}>
                  Khách sạn
                  </Text> */}
                </View>

                <Picker
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: Sizes.s15,
                    borderColor: '#8C8C8C',
                    borderWidth: 1,
                    height: Sizes.s100,
                    // borderColor: colors.black,
                  }}
                  data={this.state.valueProperty} //lable
                  noDataMessage="Dữ Liệu Trống"
                  placeholder="Chọn Property"
                  title="Chọn Property"
                  value={this.state.propertySelection}
                  onChangeItem={(item) =>
                    this.setState({propertySelection: item}, () =>
                      this.getOutlet(item.value),
                    )
                  }
                />
                <View
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                    borderRadius: Sizes.s35,
                    borderColor: colors.black,
                  }}></View>

                <Picker
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: Sizes.s15,
                    borderColor: '#8C8C8C',
                    borderWidth: 1,
                    height: Sizes.s100,
                    // borderColor: colors.black,
                  }}
                  data={this.state.valueOutlet} //lable
                  noDataMessage="Dữ Liệu Trống"
                  placeholder="Chọn Outlet"
                  title="Chọn Outlet"
                  value={this.state.outletSelection}
                  onChangeItem={(item) =>
                    this.setState({outletSelection: item})
                  }
                />

                <View style={[styles.sizeContentItem]}>
                  <TextInput
                    style={{
                      paddingVertical: 0,
                    }}
                    keyboardAppearance={color.keyboardAppearance}
                    onFocus={() => this.handleFocusTextInput()}
                    onBlur={() => this.handleBlurTextInput()}
                    placeholder="Nhập Passcode"
                    value={this.state.passCode}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      this.setState({isError: true, passCode: text})
                    }
                  />
                </View>
                <View
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                    marginTop: Sizes.s15,
                    marginLeft: Sizes.s25,
                  }}>
                  <Text style={{color: colors.red, fontWeight: 'bold'}}>
                    {this.state.passCode === '' && this.state.isError == true
                      ? 'Passcode không được để trống!'
                      : ''}
                  </Text>
                </View>

                <View
                  style={{
                    alignSelf: 'center',
                    width: '70%',
                    paddingTop: Sizes.s40,
                  }}></View>

                {/* <TouchableOpacity
                  style={{alignItems: 'center', marginTop: Sizes.s5}}
                  onPress={() => {
                  this.setState({opacityView: true, visibleRegister: true});
                }}>
                <Text style={{fontWeight: 'bold'}}>Đăng ký thiết bị</Text>
                    </TouchableOpacity> */}
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.onLogin()}
                style={{
                  width: '90%',
                  backgroundColor: '#1890FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: Sizes.s20,
                  padding: Sizes.s20,
                  borderRadius: Sizes.s15,
                  alignSelf: 'center',
                  height: Sizes.h48 * 2,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    fontSize: Sizes.h34,
                  }}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: Sizes.s20,
                  padding: Sizes.s20,
                  borderRadius: Sizes.s15,
                  alignSelf: 'center',
                  marginBottom: Sizes.s15,
                  height: Sizes.h48 * 2,
                }}
                onPress={() => {
                  this.setState({
                    opacityView: true,
                    visibleRegister: true,
                    isError: false,
                  });
                  setTimeout(() => {
                    this.setState({passCode: ''});
                  }, 300);
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#1890FF',
                    fontSize: Sizes.h34,
                  }}>
                  Đăng ký thiết bị
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    backgroundColor: color.backgroundColor,
  },
  sizeContentItem: {
    width: '80%',
    margin: Sizes.s10,
    padding: Sizes.s15,

    justifyContent: 'center',
    borderRadius: Sizes.s15,
    borderColor: '#8C8C8C',
    borderWidth: 1,
    paddingHorizontal: Sizes.s15,
    alignSelf: 'center',
    backgroundColor: 'white',
    height: Sizes.s100,
  },
});
