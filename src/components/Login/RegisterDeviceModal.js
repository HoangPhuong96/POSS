import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import Picker from '../Custom/Picker';
import images from '../../res/images/index';

export default class RegisterDeviceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        visible={this.props.visibleRegister}
        transparent={true}
        animationType="fade">
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.offModal();
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <TouchableWithoutFeedback>
              <View style={[styles.modal]}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                  }}>
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: Sizes.h65,
                        fontWeight: 'bold',
                      }}>
                      POS
                    </Text>
                    <Image
                      source={images.ic_fpt_is}
                      resizeMode="contain"
                      style={{alignSelf: 'center', width: '30%'}}
                    />
                  </View>
                </View>

                <Picker
                  iconStyle={{tintColor: '#FFC53D'}}
                  style={{
                    width: '85%',
                    height: Sizes.h28 * 4,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: Sizes.s15,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,

                    elevation: 4,
                    borderWidth: 0,
                    // borderColor: colors.black,
                  }}
                  data={this.props.valueProperty} //lable
                  noDataMessage="Dữ Liệu Trống"
                  placeholder="Chọn Property"
                  title="Chọn Khách Sạn"
                  value={this.props.propertySelection}
                  onChangeItem={(item) => this.props.setPropertySelection(item)}
                />

                <Picker
                  iconStyle={{tintColor: '#FFC53D'}}
                  style={{
                    width: '85%',
                    height: Sizes.h28 * 4,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: Sizes.s15,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,

                    elevation: 4,
                    borderWidth: 0,
                    // borderColor: colors.black,
                  }}
                  data={this.props.valueOutlet} //lable
                  noDataMessage="Dữ Liệu Trống"
                  placeholder="Chọn Outlet"
                  title="Chọn Nhà Hàng"
                  value={this.props.outletSelection}
                  onChangeItem={(item) => this.props.setOutletSelection(item)}
                />
                <View>
                  <TouchableOpacity
                    disabled={this.state.passCode == '' ? true : false}
                    onPress={() => {
                      this.props.postRegisterDevicee();
                    }}
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
                      Đăng Ký
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '90%',
                      height: Sizes.h48 * 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: Sizes.s20,
                      padding: Sizes.s20,
                      borderRadius: Sizes.s15,
                      alignSelf: 'center',
                      marginBottom: Sizes.s15,
                    }}
                    onPress={() => {
                      this.props.offModal();
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#1890FF',
                        fontSize: Sizes.h34,
                      }}>
                      Quay lại trang trước
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: Sizes.s40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: Sizes.s15,
    borderColor: '#EFEFEF',
    borderBottomWidth: Sizes.s2,
  },
  item: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizes.s30,
    marginHorizontal: Sizes.s30,
    borderColor: '#EFEFEF',
    borderBottomWidth: Sizes.s2 * 0.7,
  },
  pickerStyle: {
    borderColor: '#D7DDE3',
    borderWidth: 1,
    paddingVertical: Sizes.s20,
    marginTop: Sizes.s10,
    marginBottom: Sizes.s10,
    borderRadius: Sizes.s7,
    justifyContent: 'center',
    paddingHorizontal: Sizes.s10,
  },
  modal: {
    height: '100%',
    // borderRadius: Sizes.s40,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
