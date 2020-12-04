import { Sizes } from '@dungdang/react-native-basic';
import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ProcessLoginComponent from '../../components/Custom/ProcessLoginComponent';
import { dataPOS } from '../../config/settings';
import images from '../../res/images/index';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class ConfirmApiComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ flex: 0.5, justifyContent: 'center' }}>
            <ProcessLoginComponent Step={2} />
            <View
              style={{
                width: '98%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.sizeContentItem, { width: '30%' }]}>
                  <Text style={{ color: '#8C8C8C' }}>Nhập code</Text>
                  <Text>{dataPOS.CODE}</Text>
                </View>
                <View style={[styles.sizeContentItem, { width: '60%' }]}>
                  <Text style={{ color: '#8C8C8C' }}>Tên khách sạn</Text>
                  <Text>{dataPOS.NAME}</Text>
                </View>
              </View>
              <View style={[styles.sizeContentItem]}>
                <Text style={{ color: '#8C8C8C' }}>API Url</Text>
                <Text>{dataPOS.POS_API_URL}</Text>
              </View>
              <View style={[styles.sizeContentItem]}>
                <Text style={{ color: '#8C8C8C' }}>Logo</Text>
                <Text>{dataPOS.POS_LOGO_HOTEL_URL}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.3,
              height: '100%',
              width: '100%',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={{
                uri: `${dataPOS.POS_LOGO_HOTEL_URL}`,
              }}
              style={{
                width: '40%',
                height: (windowWidth / 100) * 40,
                alignSelf: 'center',
              }}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.replace('Login')}
            style={{
              height: Sizes.h48 * 2,
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
              Xác nhận
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: Sizes.h48 * 2,
              width: '90%',
              backgroundColor: '#8C8C8C',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: Sizes.s20,
              padding: Sizes.s20,
              borderRadius: Sizes.s15,
              alignSelf: 'center',
              marginBottom: Sizes.s20,
            }}
            onPress={() => this.props.navigation.replace('FillCode')}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#FFFFFF',
                fontSize: Sizes.h34,
              }}>
              Quay lại trang trước
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
