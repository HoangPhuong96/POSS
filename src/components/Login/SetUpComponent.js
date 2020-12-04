import { Sizes } from '@dungdang/react-native-basic';
import React, { Component } from 'react';
import { Alert, Animated, Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ProcessLoginComponent from '../../components/Custom/ProcessLoginComponent';
import { API_URL, dataPOS } from '../../config/settings';
import images from '../../res/images/index';
import TextInputAnimated from '../Custom/TextInputAnimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SetupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      name: '',
      ApiUrl: 'https://ihotel.fis.vn/ihotelposapi/api/',
      logo: 'https://ihotel.fis.vn/iHOTELLogo/DV11.jpg',
    };
    this.scaleImg = new Animated.Value(0);
  }
  ///
  handelFocusTextInput() {
    Animated.timing(this.scaleImg, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }
  handleBlurTextInput() {
    Animated.timing(this.scaleImg, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }
  //////
  ////
  SetupAPI = async () => {
    if (this.state.logo == '' || this.state.ApiUrl == '') {
      Alert.alert(
        'Thông báo',
        'Api Url và Logo không được để trống',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      dataPOS.POS_LOGO_HOTEL_URL = this.state.logo;
      dataPOS.NAME = this.state.name;
      dataPOS.CODE = this.state.code;
      dataPOS.POS_API_URL = this.state.ApiUrl;
      (await this.checkUrl(this.state.ApiUrl)) == true
        ? this.props.navigation.replace('Login')
        : Alert.alert(
            'Thông báo',
            'Api Url Không Tồn Tại. Yêu Cầu Xem Lại',
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
      // console.log( this.checkUrl(this.state.ApiUrl));
    }
  };

  checkUrl = async (url) => {
    // let uri = 'https://reactnative.dev.vn/oiqeuroioq';
    var request = false;
    const response = await fetch(url)
      .then((res) => {
        // console.log('checkUrl - res: ', res);
        return true;
      })
      .catch((err) => {
        // console.log('checkUrl - error: ', err);
        return false;
      });

    return response;
  };
  render() {
    const imgSize = this.scaleImg.interpolate({
      inputRange: [0, 1],
      outputRange: [Sizes.s200, Sizes.s200 / 2],
    });
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          // translucent
          // backgroundColor="transparent"
        />
        <ScrollView
          contentContainerStyle={{paddingTop: Sizes.h44 * 2, flexGrow: 1}}>
          <View style={{justifyContent: 'center'}}>
            <ProcessLoginComponent Step={2} />
            <View
              style={{
                width: '98%',
                justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInputAnimated
                  onFocus={(isFocused) => this.handelFocusTextInput()} ///////////////////////////////////////////////////
                  onBlur={(isFocused) => this.handleBlurTextInput()}
                  title="code"
                  style={{width: '25%'}}
                  value={this.state.code}
                  onChangeText={(text) => this.setState({code: text})}
                />
                <TextInputAnimated
                  onFocus={(isFocused) => this.handelFocusTextInput()} ///////////////////////////////////////////////////
                  onBlur={(isFocused) => this.handleBlurTextInput()}
                  title="Tên khách sạn"
                  style={{width: '55%'}}
                  value={this.state.name}
                  onChangeText={(text) => this.setState({name: text})}
                />
              </View>

              <TextInputAnimated
                style={{marginVertical: Sizes.s40}}
                onFocus={(isFocused) => this.handelFocusTextInput()} ///////////////////////////////////////////////////
                onBlur={(isFocused) => this.handleBlurTextInput()}
                title="API url"
                value={this.state.ApiUrl}
                onChangeText={(text) => this.setState({ApiUrl: text})}
              />
              <TextInputAnimated
                onFocus={(isFocused) => this.handelFocusTextInput()} ///////////////////////////////////////////////////
                onBlur={(isFocused) => this.handleBlurTextInput()}
                title="Logo"
                value={this.state.logo}
                onChangeText={(text) => this.setState({logo: text})}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Animated.Image
              resizeMode="contain"
              source={
                //   {
                //   // uri: `${dataPOS.POS_LOGO_HOTEL_URL}`,
                // }
                images.ic_main
              }
              style={{
                width: imgSize,
                height: imgSize,
                // alignSelf: 'center',
              }}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => this.SetupAPI()}
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
            Xác Nhận
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '90%',
            backgroundColor: '#8C8C8C',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Sizes.s20,
            padding: Sizes.s20,
            borderRadius: Sizes.s15,
            alignSelf: 'center',
            marginBottom: Sizes.s15,
          }}
          onPress={() => this.props.navigation.goBack()}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#FFFFFF',
              fontSize: Sizes.h34,
            }}>
            Hủy
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sizeContentItem: {
    width: '92%',
    margin: Sizes.s10,
    padding: Sizes.s15,
    borderWidth: 1,
    borderColor: '#8C8C8C',
    borderRadius: Sizes.s15,
    paddingHorizontal: Sizes.s15,
  },
});
