import { Sizes } from '@dungdang/react-native-basic';
import React, { Component } from 'react';
import { Alert, Button, Dimensions, ImageBackground, Keyboard, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import images from '../../res/images/index';
import ProcessLoginComponent from '../Custom/ProcessLoginComponent';
import TextInputAnimated from '../Custom/TextInputAnimated';
import ViewOpaticyLoading from '../Custom/ViewOpaticyLoading';
import { getDataObj, getDataVal, storeDataObj, storeDataVal } from '../Function/FunctionAsyncStorage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {
  objectIsNull,
  arrayIsEmpty,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import { dataPOS, IsLogin, deviceInfo } from '../../config/settings';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class FillCodeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      code: '',
      nameDevice: '',
      macAddress: '',
      loading: false,
    };
  }
  async componentDidMount() {
    let mac = await DeviceInfo.getMacAddress();
    let name = await DeviceInfo.getDeviceName();
    this.setState({ nameDevice: name, macAddress: mac });
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.fillCodeReducers != this.props.fillCodeReducers) {
      if (this.props.fillCodeReducers.isInternet == false) {
        Alert.alert(
          'Thông báo',
          'Không thể kết nối tới server. Vui lòng xem lại kết nối Internet hoặc liên hệ với bộ phận CSKH',
          [
            {
              text: 'OK',
              onPress: () => { },
            },
          ],
          this.setState({ loading: false }),
          { cancelable: false },
        );
        // this.props.navigation.navigate('ConfirmApi');
      } else {
        if (arrayIsEmpty(this.props.fillCodeReducers)) {
          Alert.alert(
            'Thông báo',
            'Code không hợp lệ. Yêu cầu xem lại passcode hoặc liên hệ bộ phận CSKH',
            [
              {
                text: 'OK',
                onPress: () => { },
              },
            ],
            this.setState({ loading: false }),
            { cancelable: false },
          );
        } else {
          dataPOS.CODE = this.props.fillCodeReducers[0].CODE;
          dataPOS.NAME = this.props.fillCodeReducers[0].NAME;
          dataPOS.HKP_API_URL = this.props.fillCodeReducers[0].HKP_API_URL;
          dataPOS.HKP_LOGO_HOTEL_URL = this.props.fillCodeReducers[0].HKP_LOGO_HOTEL_URL;
          dataPOS.POS_API_URL = this.props.fillCodeReducers[0].POS_API_URL;
          dataPOS.POS_LOGO_HOTEL_URL = this.props.fillCodeReducers[0].POS_LOGO_HOTEL_URL;

          this.setState({ loading: false });
          this.SavePosLogo(this.props.fillCodeReducers[0]);
          this.SaveStatusLogin();
          this.props.navigation.replace('ConfirmApi');
        }
      }
    }
  }
  CheckCode = () => {
    this.state.code == ''
      ? Alert.alert(
        'Thông báo',
        'Passcode không được để trống',
        [
          {
            text: 'OK',
            onPress: () => { },
          },
        ],
        this.setState({ loading: false }),
        { cancelable: false },
      )
      : this.setState({ loading: true }, () =>
        this.props.onPostFillCodeAction({
          CUSTOMER_CODE: this.state.code,
          MAC_ADRESS: this.state.macAddress,
          DEVICE_NAME: this.state.nameDevice,
        }),
      );
    // this.props.navigation.navigate('ConfirmApi');
  };
  SavePosLogo = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@lgPOS', jsonValue);
    } catch (error) {
      console.log(error);
    }
  };
  SaveStatusLogin = async () => {
    // let result = await getDataVal('@isLogin');
    // console.log(result);
    try {
      await AsyncStorage.setItem('@Logined', 'True');
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    // console.log('fillcodeeee', this.props.fillCodeReducers);
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        {this.state.loading == true && <ViewOpaticyLoading />}
        <ImageBackground
          source={images.bg_login1}
          style={styles.imageBackground}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
              behavior={'padding'}
              contentContainerStyle={{
                flexGrow: 1,
                flex: 1,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '75%',
                  height: windowHeight / 2,
                  backgroundColor: '#FFFFFF',
                  borderRadius: Sizes.s15,
                  opacity: 0.9,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <ProcessLoginComponent Step={1} />

                {/* <Text style={{color: '#8C8C8C', marginTop: Sizes.s10}}>
                  Nhập code
                </Text>
                <TextInput selectionColor="#FADB14" /> */}
                <TextInputAnimated
                  title="Nhập code"
                  textInputStyles={{ width: '90%' }}
                  value={this.state.code}
                  onChangeText={(text) => this.setState({ code: text })}
                />

                <TouchableOpacity
                  onPress={() => this.CheckCode()}
                  style={{
                    width: '90%',
                    backgroundColor: '#1890FF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: Sizes.s20,
                    padding: Sizes.s20,
                    borderRadius: Sizes.s15,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      fontSize: Sizes.h34,
                    }}>
                    Đồng ý
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
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ code: '' });
                      this.props.navigation.navigate('Setup');

                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#1890FF',
                        fontSize: Sizes.h34,
                      }}>
                      Cấu hình bằng tay
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  lineBackground: {
    height: Sizes.s40,
    width: '30%',
    justifyContent: 'center',
  },
});
