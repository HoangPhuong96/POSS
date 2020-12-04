import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  SafeAreaView,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import images from '../../res/images/index';
import TextInputAnimated from '../Custom/TextInputAnimated';
import {Sizes} from '@dungdang/react-native-basic';
import {userData} from '../../config/settings';
import ViewOpaticyLoading from '../Custom/ViewOpaticyLoading';
import {color} from '../../res/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class DetailOrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      isRemind: false,
      CHECK_DETAIL_ID_Remind: null,
      modalVisibleDelelet: false,
      detailsItem: new Array(),
      arrCondiment: new Array(),
      loading: true,
    };
  }
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.props.onPostGetDetailOrderAction(this.props.route.params.checkID);
      },
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.detailOrderReducers !== this.props.detailOrderReducers) {
      // console.log(this.props.detailOrderReducers);

      this.setState({detailsItem: this.props.detailOrderReducers}, () =>
        this.handleData(),
      );
    }

    if (prevProps.remindOrderReducers !== this.props.remindOrderReducers) {
      if (this.props.remindOrderReducers.loading == false) {
        if (this.props.remindOrderReducers.data == true) {
          Alert.alert(
            'Thông Báo',
            'Nhắc bếp thành công',
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );

          this.setState({isRemind: false});
        } else {
          Alert.alert(
            'Thông Báo',
            'Nhắc bếp thất bại. Có thể do món đã lên bàn',
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        }
      }
    }
  }

  currencyFormat = (num) => {
    if (num == 0) {
      return '';
    } else {
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  };

  handleData = () => {
    let arrCDM = [];
    this.state.detailsItem.map((item) => {
      item.DETAIL_TYPE == 'CONDIMENT' && arrCDM.push(item);
    });

    let data = this.state.detailsItem.map((item) => item.TOTAL);

    let total = data.reduce((acc, val) => acc + val, 0);

    this.setState({arrCondiment: arrCDM, total}, () =>
      this.setState({loading: false}),
    );
  };

  showModalDelete = () => {
    Alert.alert(
      'Thông báo',
      'Chức năng đang được cập nhật',
      [{text: 'OK', onPress: () => {}}],
      {cancelable: false},
    );
  };

  Remind = (item) => {
    let infoRemind = {
      PROPERTY_CODE: userData.PROPERTY_CODE,
      CREATED_USER: userData.CASHIER_ID,
      CHECK_ID: this.props.route.params.checkID,
      OUTLET_ID: userData.OUTLET_ID,
      PRINT_TYPE: 'SEND',
      CHECK_REMIND_TABLE: [
        {
          CHECK_DETAIL_ID: item.CHECK_DETAIL_ID,
          CHECK_ITEM_ID: item.ITEM_ID,
          SALES_COUNT: item.QUANTITY,
          NAME: 'SEND',
          ORDER_DEVICE_ID: 2509,
        },
      ],
      WORKSTATION_ID: userData.WORKSTATION_ID,
    };
    this.props.onSendRemindAction(infoRemind);
  };
  renderItem = ({item, index}) => {
    switch (item.DETAIL_TYPE) {
      case 'ITEM':
        return (
          <TouchableOpacity
            disabled={item.STATUS == 'ORDERED' ? true : false}
            onPress={() =>
              this.setState({isRemind: false, CHECK_DETAIL_ID_Remind: null})
            }
            onLongPress={() =>
              this.setState({
                isRemind: true,
                CHECK_DETAIL_ID_Remind: item.CHECK_DETAIL_ID,
              })
            }>
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: Sizes.s15,
                elevation: 2,
                backgroundColor: color.backgroundColor,
                margin: Sizes.s10,
              }}>
              {item.STATUS == 'ORDERED' && (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    backgroundColor: '#389e0d',
                    opacity: 0.2,
                    zIndex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: Sizes.s15,
                  }}
                />
              )}
              {this.state.isRemind == true &&
                this.state.CHECK_DETAIL_ID_Remind == item.CHECK_DETAIL_ID && (
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      zIndex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: Sizes.s15,
                    }}>
                    <TouchableOpacity onPress={() => this.Remind(item)}>
                      <View
                        style={{
                          borderRadius: Sizes.s15,
                          backgroundColor: '#1890FF',
                          padding: Sizes.s20,
                          paddingHorizontal: Sizes.s35,
                        }}>
                        <Text style={{fontSize: Sizes.h32, color: 'white'}}>
                          Nhắc bếp
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

              <View style={{padding: Sizes.s20}}>
                <Text
                  style={[
                    {
                      fontSize: Sizes.h30,
                      fontWeight: 'bold',
                      color: `${
                        item.DETAIL_TYPE === 'CONDIMENT' ? 'red' : '#000'
                      }`,
                    },
                  ]}>
                  <Text numberOfLines={1} style={{color: color.text}}>
                    {item.NAME.length < (windowWidth / 2 / Sizes.h30).toFixed(0)
                      ? `${item.NAME}`
                      : `${item.NAME.substring(
                          0,
                          (windowWidth / 2 / Sizes.h30).toFixed(0),
                        )}...`}
                  </Text>
                  <Text style={{color: color.text}}>
                    ({this.currencyFormat(item.PRICE)}) x{item.QUANTITY}
                  </Text>
                </Text>
                {this.state.arrCondiment.map(
                  (itemm) =>
                    item.PARENT_CHECK_DETAIL_ID ==
                      itemm.PARENT_CHECK_DETAIL_ID && (
                      <Text style={styles.txtNote}>{itemm.NAME}</Text>
                    ),
                )}
                {item.REQUEST != null ? (
                  <Text style={styles.txtNote}>{item.REQUEST}</Text>
                ) : (
                  <Text style={[styles.txtNote, {color: color.text}]}>
                    Chú thích : Không có
                  </Text>
                )}
              </View>
              <View
                style={{padding: Sizes.s20, justifyContent: 'space-between'}}>
                <Text style={{fontSize: Sizes.h28, color: 'red'}}>
                  {this.currencyFormat(parseInt(item.TOTAL))}
                </Text>
                <View style={{alignItems: 'flex-end'}}>
                  {/* {item.STATUS == 'ORDERING' && (
                    <TouchableOpacity onPress={() => this.showModalDelete()}>
                      <Image
                        source={images.ic_huymon}
                        resizeMode="contain"
                        style={{
                          width: Sizes.s50,
                          height: Sizes.s50,
                          padding: 13,
                        }}
                      />
                    </TouchableOpacity>
                  )} */}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
        break;
      case 'SERVICE_CHARGE':
        return (
          <View
            style={{
              paddingVertical: Sizes.s15,
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: Sizes.s15,
              elevation: 2,
              backgroundColor: '#FFFFFF',
              margin: Sizes.s10,
            }}>
            <View style={{padding: Sizes.s20}}>
              <Text
                style={[
                  {
                    fontSize: Sizes.h30,
                    fontWeight: 'bold',
                    color: `${
                      item.DETAIL_TYPE === 'CONDIMENT' ? 'red' : '#000'
                    }`,
                  },
                ]}>
                {item.NAME} x{item.QUANTITY}
              </Text>
            </View>
            <View style={{padding: Sizes.s20, justifyContent: 'space-between'}}>
              <Text style={{fontSize: Sizes.h28, color: 'red'}}>
                {this.currencyFormat(parseInt(item.TOTAL))}
              </Text>
            </View>
          </View>
        );
        break;
      case 'TAX':
        return (
          <View
            style={{
              paddingVertical: Sizes.s15,
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: Sizes.s15,
              elevation: 2,
              backgroundColor: '#FFFFFF',
              margin: Sizes.s10,
            }}>
            <View style={{padding: Sizes.s20}}>
              <Text
                style={[
                  {
                    fontSize: Sizes.h30,
                    fontWeight: 'bold',
                    color: `${
                      item.DETAIL_TYPE === 'CONDIMENT' ? 'red' : '#000'
                    }`,
                  },
                ]}>
                {item.NAME} x{item.QUANTITY}
              </Text>
            </View>
            <View style={{padding: Sizes.s20, justifyContent: 'space-between'}}>
              <Text style={{fontSize: Sizes.h28, color: 'red'}}>
                {this.currencyFormat(item.TOTAL)}
              </Text>
            </View>
          </View>
        );
        break;
      default:
        break;
    }
  };
  render() {
    const {modalVisibleDelelet} = this.state;
    return this.state.loading == true ? (
      <ViewOpaticyLoading />
    ) : (
      <View style={[styles.container, {backgroundColor: color.drawer}]}>
        <SafeAreaView style={{backgroundColor: '#1890FF'}} />
        <View style={[styles.totalBottom, {backgroundColor: color.drawer}]}>
          <View
            style={{
              borderBottomColor: '#E8E8E8',
              borderBottomWidth: Sizes.s2,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingBottom: Sizes.s5,
            }}>
            <Text
              style={{
                fontSize: Sizes.h30,
                fontWeight: 'bold',
                color: color.text,
              }}>
              Tất cả
            </Text>
            <Text style={styles.total}>
              {this.currencyFormat(this.state.total)}
            </Text>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.detailsItem}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <Modal
          visible={this.state.modalVisibleDelelet}
          transparent={true}
          animationType="fade">
          <View
            style={{
              flex: 1,
              backgroundColor: '#00000036',
            }}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={this.state.modalVisibleDelelet}
          visible={modalVisibleDelelet}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTitle}>
                <TouchableOpacity
                  onPress={() => this.setState({modalVisibleDelelet: false})}
                  style={{paddingHorizontal: 10}}>
                  <Image
                    source={images.ic_cancel}
                    resizeMode="contain"
                    style={{width: Sizes.s25}}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    marginLeft: Sizes.s25,
                    fontWeight: 'bold',
                    textAlignVertical: 'center',
                    fontSize: 16,
                  }}>
                  Hủy món
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({modalVisibleDelelet: false});
                  }}
                  style={{
                    alignSelf: 'center',
                    position: 'absolute',
                    right: 16,
                  }}>
                  <Text
                    style={{
                      marginLeft: Sizes.s25,
                      fontWeight: 'normal',
                      textAlignVertical: 'center',
                      fontSize: 14,
                      color: '#1890FF',
                    }}>
                    Đồng ý
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewText}>
                <TextInputAnimated
                  title="Nhập mã quản lý"
                  textInputStyles={{width: '90%'}}
                  value={this.state.username}
                  onChangeText={(text) => this.onChangeUsername(text)}
                />
              </View>

              <View style={styles.viewText2}>
                <TextInputAnimated
                  title="Lý do hủy"
                  textInputStyles={{width: '90%'}}
                  value={this.state.username}
                  onChangeText={(text) => this.onChangeUsername(text)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingVertical: Sizes.s20,
                }}>
                <TouchableOpacity
                  style={{
                    padding: 13,
                    elevation: 2,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    width: '40%',
                  }}>
                  <Text style={{textAlign: 'center'}}>Khách đợi lâu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 13,
                    elevation: 2,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    width: '40%',
                  }}>
                  <Text style={{textAlign: 'center'}}>Khách đổi ý</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  totalBottom: {
    paddingTop: Sizes.s20,
    paddingBottom: Sizes.s15,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.s35,
  },
  total: {
    textAlign: 'right',
    fontSize: 16,
    color: '#FF4D4F',
    fontWeight: 'bold',
  },
  txtNote: {
    fontSize: Sizes.h24,
    fontWeight: 'normal',
    paddingTop: Sizes.s5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    width: '100%',

    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalTitle: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.s30,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  viewText: {
    paddingHorizontal: Sizes.s30,
    paddingBottom: Sizes.s30,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  viewText2: {
    paddingHorizontal: Sizes.s30,
    paddingBottom: Sizes.s30,
  },
});
