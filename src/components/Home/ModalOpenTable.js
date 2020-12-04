import { Sizes } from '@dungdang/react-native-basic';
import React, { Component } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import images from '../../res/images/index';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class ModalOpenTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        visible={this.props.visibleInfoGuest}
        transparent={true}
        animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Modal
            visible={this.props.visibleInfoGuest}
            transparent={true}
            animationType="fade">
            <View style={{ flex: 1, backgroundColor: '#00000050' }}></View>
          </Modal>
          <View style={styles.CustomModal}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: Sizes.s30,
                borderBottomWidth: 1,
                borderColor: '#E8E8E8',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                // onPress={() => this.hideModal()}
                >
                  <Image
                    source={images.ic_cancel}
                    resizeMode="contain"
                    style={{ width: Sizes.s25, height: Sizes.s25 }}
                  />
                </TouchableOpacity>

                <Text style={{ marginLeft: Sizes.s20, fontSize: Sizes.s30 }}>
                  Mở Bàn {this.props.NAME}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.openTable();
                }}>
                <Text style={{ color: '#1890FF', fontWeight: 'bold' }}>
                  Đồng ý
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
              }}>
              <TextInput
                autoFocus
                style={[styles.input]}
                value={this.state.nameGuest}
                placeholder="Tên Khách"
                onChangeText={(input) => this.onChangeNameGuest(input)}
                autoFocus={true}
              />

              <View
                style={[
                  styles.input,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderColor: 'white',
                  },
                ]}>
                <Text style={{ fontWeight: 'bold', fontSize: Sizes.h30 }}>
                  Số người
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 0.6,
                    borderColor: 'white',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6,
                    width: 100,
                    height: 40,
                    borderRadius: Sizes.s50,
                    paddingHorizontal: Sizes.s10,
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.state.countGuest == '1'
                        ? alert('Min : 1')
                        : this.setState({
                          countGuest: (
                            parseInt(this.state.countGuest) - 1
                          ).toString(),
                        })
                    }>
                    <Image
                      source={images.ic_down}
                      resizeMode="contain"
                      style={{ width: Sizes.s70, height: Sizes.s70 }}
                    />
                  </TouchableOpacity>

                  <TextInput
                    style={{
                      paddingVertical: 0,
                      textAlign: 'center',
                    }}
                    value={this.state.countGuest}
                    onChangeText={(input) =>
                      this.props.onChangeCountGuest(input)
                    }
                    keyboardType="numeric"
                    placeholder="0"
                  />
                  <TouchableOpacity onPress={() => this.props.upGuest()}>
                    <Image
                      source={images.ic_up}
                      resizeMode="contain"
                      style={{ width: Sizes.s70, height: Sizes.s70 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: Sizes.s10,
                marginTop: Sizes.s35,
              }}>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  table: {
    flex: 1 / 2,
    width: '45%',
    height: screenWidth / 2.5,
    borderRadius: Sizes.s25,
    marginBottom: Sizes.s25,
    margin: Sizes.s10,

    backgroundColor: 'white',
  },
  headerTable: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: Sizes.s10,
    paddingVertical: Sizes.s10,
    height: '20%',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#E8E8E8',
    borderTopEndRadius: Sizes.s25,
    borderTopLeftRadius: Sizes.s25,
  },
  contentTable: {
    flexDirection: 'column',
    paddingHorizontal: Sizes.s20,
    height: '80%',
    justifyContent: 'center',
  },
  CustomModal: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: Sizes.h24,
    borderTopLeftRadius: Sizes.h24,
  },
  input: {
    borderColor: '#8C8C8C',
    borderRadius: Sizes.s20,
    borderWidth: 1,
    // height: Sizes.s100,
    paddingHorizontal: 25,
    fontSize: 18,
    margin: 10,
    height: Sizes.s100,
  },
  title: {
    fontSize: Sizes.h26,
    fontWeight: 'bold',
    padding: Sizes.s15,
    borderColor: '#EFEFEF',
  },
  lineContent: {
    flexDirection: 'row',
    marginBottom: Sizes.s10,
  },
  iconContent: { width: Sizes.h34, height: Sizes.h34 },
  txtContent: {
    justifyContent: 'center',

    marginLeft: Sizes.s15,
    borderBottomWidth: 1,
    flex: 1,
    borderColor: '#E8E8E8',
  },
});
