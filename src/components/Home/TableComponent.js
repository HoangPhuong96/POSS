import {Sizes} from '@dungdang/react-native-basic';
import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import images from '../../res/images/index';
import TextInputAnimated from '../Custom/TextInputAnimated';
import ModalOpenTable from './ModalOpenTable';
import {color} from '../../res/colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleInfoGuest: false,
      isModalGuest: false,
      nameGuest: '',
      countGuest: '1',
      HeightFixKeyBoard: 0,
      appMode: '',
    };
    this.inputRef = React.createRef();
  }

  currencyFormat = (num) => {
    if (num == 0) {
      return '0';
    } else {
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  };
  componentDidMount() {
    this.setState({HeightFixKeyBoard: screenWidth / 2.5});
    this.showKeyBoard();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.appMode !== this.props.appMode) {
      this.setState({appMode: this.props.appMode});
    }
  }

  decimalHoursToString = (hoursDecimal) => {
    const numMinutes = hoursDecimal % 60;
    const numHours = (hoursDecimal - numMinutes) / 60;
    if (hoursDecimal == 0) {
      return '0:0';
    } else {
      return numHours + ':' + numMinutes;
    }
  };
  onChangeNameGuest = (input) => {
    this.setState({nameGuest: input});
  };

  onChangeCountGuest = (input) => {
    this.setState({countGuest: input});
  };
  showInfoGuest = () => {
    // console.log('ITEM CHECK: ', this.props.item);

    if (this.props.item.CHECK_ID !== 0) {
      this.props.navigation.navigate('OrderItemScreen', {
        checkID: this.props.item.CHECK_ID,
        guestInfo: this.props.item,
        tableName: this.props.item.NAME,
      });
      this.props.killBack();
    } else {
      this.props.openTable(this.props.item);
    }
  };
  openModal = () => {
    this.setState({
      visibleInfoGuest: true,
    });
    // this.inputRef.current.focus();
  };
  hideModal = () => {
    this.setState({
      visibleInfoGuest: false,
    });
  };
  showKeyBoard = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
  };
  openTable = () => {
    const {nameGuest, countGuest} = this.state;
    if (nameGuest == '' || countGuest == 0) {
      return Alert.alert(
        'Thông báo',
        'Vui lòng nhập đầy đủ thông tin',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } else {
      let DataFormat = this.props.item;
      DataFormat['COVERS'] = this.state.countGuest;
      DataFormat['GUEST_NAME'] = this.state.nameGuest;

      this.props.navigation.navigate('OrderItemScreen', {
        checkID: this.props.item.CHECK_ID,
        guestInfo: DataFormat,
        tableName: this.props.item.NAME,
      });
    }

    this.hideModal();
  };
  render() {
    const {visibleInfoGuest, nameGuest} = this.state;

    return (
      <View style={styles.table} key={this.props.key}>
        <View
          style={{
            backgroundColor: color.drawer,
            borderRadius: Sizes.s25,
          }}>
          <TouchableOpacity
            styles={{elevation: 5, borderWidth: 0.5}}
            onPress={() => {
              this.showInfoGuest();
            }}>
            <View
              style={{
                backgroundColor: color.drawer,
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: Sizes.s10,
                paddingVertical: Sizes.s10,
                height: '20%',
                alignItems: 'center',
                borderBottomWidth: 0,
                borderRadius:30
              }}>
              <View />
              <Text style={{color: color.text}}>Bàn {this.props.NAME}</Text>

              {this.props.CHECK_ID != 0 ? (
                <View
                  style={{
                    height: Sizes.s40,
                    width: Sizes.s40,
                    backgroundColor: '#FF4D4F',
                    borderRadius: Sizes.s30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: Sizes.h20}}>
                    {this.props.COVERS}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
            {this.props.CHECK_ID != 0 ? (
              <View style={styles.contentTable}>
                <View style={styles.lineContent}>
                  <Image
                    style={{
                      width: Sizes.h34,
                      height: Sizes.h34,
                      tintColor: color.imageIcon,
                    }}
                    resizeMode="contain"
                    source={images.ic_user_home}
                  />
                  <View style={styles.txtContent}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        color: color.text,
                        borderBottomWidth: 1,
                        flex: 1,
                        borderColor: '#E8E8E8',
                      }}>
                      {this.props.GUEST_NAME}
                    </Text>
                  </View>
                </View>
                <View style={styles.lineContent}>
                  <Image
                    style={{
                      width: Sizes.h34,
                      height: Sizes.h34,
                      tintColor: color.imageIcon,
                    }}
                    resizeMode="contain"
                    source={images.ic_time}
                  />
                  <View style={styles.txtContent}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        color: color.text,
                        borderBottomWidth: 1,
                        flex: 1,
                        borderColor: '#E8E8E8',
                      }}>
                      {this.decimalHoursToString(this.props.MINUTE_ORDER)}
                    </Text>
                  </View>
                </View>
                <View style={styles.lineContent}>
                  <Image
                    style={{
                      width: Sizes.h34,
                      height: Sizes.h34,
                      tintColor: color.imageIcon,
                    }}
                    resizeMode="contain"
                    source={images.ic_money}
                  />
                  <View style={styles.txtContent}>
                    <Text style={[styles.textContent, {color: '#FF4D4F'}]}>
                      {this.currencyFormat(this.props.BALANCE)}
                    </Text>
                  </View>
                </View>
                <View style={styles.lineContent}>
                  <Image
                    style={{
                      width: Sizes.h34,
                      height: Sizes.h34,
                      tintColor: color.imageIcon,
                    }}
                    resizeMode="contain"
                    source={images.ic_waiter}
                  />
                  <View style={styles.txtContent}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        color: color.text,
                        borderBottomWidth: 1,
                        flex: 1,
                        borderColor: '#E8E8E8',
                      }}>
                      {this.props.WAITER}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={[
                  styles.contentTable,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text
                  style={{
                    justifyContent: 'center',
                    color: color.text,
                    borderBottomWidth: 1,
                    borderColor: '#E8E8E8',
                    fontSize: Sizes.h32,
                  }}>
                  Trống
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Modal
          visible={visibleInfoGuest}
          transparent={true}
          animationType="fade">
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: '#00000036',
              }}>
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => this.hideModal()}>
                      <Image
                        source={images.ic_cancel}
                        resizeMode="contain"
                        style={{width: Sizes.s25, height: Sizes.s25}}
                      />
                    </TouchableOpacity>

                    <Text style={{marginLeft: Sizes.s20, fontSize: Sizes.s30}}>
                      Mở Bàn {this.props.NAME}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.openTable();
                    }}>
                    <Text style={{color: '#1890FF', fontWeight: 'bold'}}>
                      Đồng ý
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                  }}>
                  <TextInputAnimated
                    style={styles.input}
                    value={nameGuest}
                    placeholder="Khách hàng"
                    onChangeText={(input) => this.onChangeNameGuest(input)}
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
                    <Text style={{fontWeight: 'bold', fontSize: Sizes.h30}}>
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
                          style={{width: Sizes.s70, height: Sizes.s70}}
                        />
                      </TouchableOpacity>

                      <TextInput
                        style={{
                          paddingVertical: 0,
                          textAlign: 'center',
                        }}
                        value={this.state.countGuest}
                        onChangeText={(input) => this.onChangeCountGuest(input)}
                        keyboardType="numeric"
                        placeholder="0"
                      />
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            countGuest: (
                              parseInt(this.state.countGuest) + 1
                            ).toString(),
                          })
                        }>
                        <Image
                          source={images.ic_up}
                          resizeMode="contain"
                          style={{width: Sizes.s70, height: Sizes.s70}}
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
                  }}></View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  table: {
    width: screenWidth / 2,
    height: Sizes.s340,
    padding: Sizes.h16,
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
    fontSize: Sizes.h18 * 2,
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
  iconContent: {width: Sizes.h34, height: Sizes.h34},
  txtContent: {
    justifyContent: 'center',
    marginLeft: Sizes.s15,
    borderBottomWidth: 1,
    flex: 1,
    borderColor: '#E8E8E8',
  },
});
export default TableComponent;
