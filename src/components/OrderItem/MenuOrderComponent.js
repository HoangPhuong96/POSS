import {Sizes} from '@dungdang/react-native-basic';
import {
  arrayIsEmpty,
  objectIsNull,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {set} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';

import {dataMenu, userData} from '../../config/settings';
import images from '../../res/images/index';
import ModalBackground from '../Custom/ModalBackground';
import SearchBar from '../Custom/SearchBar';
import TextInputAnimated from '../Custom/TextInputAnimated';
import ViewOpaticyLoading from '../Custom/ViewOpaticyLoading';
import {color} from '../../res/colors';
//
import ListItemRequest from './itemRequest/ListItemRequest';

class MenuOrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOrder: [],
      categoryMenu: [],
      visibleModal: false,
      showMenuItem: false,
      fullMenu: [],
      menuSearch: [],
      menuCategoryChoose: 1267,
      isShow: false,
      modalCondiment: false,
      modalRequest: false,
      requestText: '',
      nameChooseCondiment: '',
      ChooseRequest: '',
      selectRequest: '',
      dataMajor: [],
      loading: false,
      condimentDataChoose: [],
      requestDataChoose: [],
      cartDataItem: [],
      cartDataItemPrev: new Array(),
      cartCondimentData: [],
      requestText: '',
      QTYCart: 0,
      tickAll: false,
      guestInfo: {},
      totalCart: 0,
      itemRequestFocus_ID: null,
      itemCondimentFocus_ID: null,
      txtRequest: '',
      session_Condiment: [],
      session_Request: [],
      timeOut: null,
      isSearch: false,
      loadingSearch: false,
    };
    this.arrRequest = [];
  }

  async componentDidMount() {
    this.props.onPostGetFullMenuAction();

    this.setState({guestInfo: this.props.route.params.guestInfo});
    dataMenu.isSaveMenu == true
      ? this.setState({menuItem: dataMenu.CATEGORY_MENU})
      : this.props.onGetCategoryMenuAction();
  }
  async componentDidUpdate(preProps) {
    if (preProps.categoryMenuReducers !== this.props.categoryMenuReducers) {
      if (!objectIsNull(this.props.categoryMenuReducers)) {
        this.setState(
          {
            categoryMenu: this.props.categoryMenuReducers,
            menuCategoryChoose: this.props.categoryMenuReducers[0].MENU_ID,
            isShow: true,
          },
          () => {
            dataMenu.CATEGORY_MENU = this.props.categoryMenuReducers;
          },
        );
      }
    }
    if (preProps.fullMenuReducers !== this.props.fullMenuReducers) {
      // console.log(this.props.fullMenuReducers)
      if (!objectIsNull(this.props.fullMenuReducers)) {
        this.setState({fullMenu: this.props.fullMenuReducers}, () => {
          dataMenu.FULL_MENU = this.props.fullMenuReducers;
        });
      }
    }

    if (preProps.insertOrderReducers !== this.props.insertOrderReducers) {
      // console.log(this.props.fullMenuReducers)
      this.setState({loading: false});
      if (!objectIsNull(this.props.insertOrderReducers.data)) {
        if (this.props.insertOrderReducers.data > 0) {
          this.setState({cartDataItem: [], totalCart: 0}, () =>
            Alert.alert(
              'Thông báo',
              'Gửi Bếp Thành Công!',
              [
                {
                  text: 'OK',
                  onPress: () => this.props.navigation.goBack(),
                },
              ],
              {cancelable: false},
            ),
          );
        } else {
          Alert.alert(
            'Thông báo',
            'Gửi bếp thất bại. Yêu cầu xem lại kết nối hoặc liên hệ với bộ phận CSKH',
            [
              {
                text: 'OK',
                onPress: () => {},
              },
            ],
            {cancelable: false},
          );
        }
      }
    }

    if (preProps.condimentReducers !== this.props.condimentReducers) {
      // console.log(this.props.fullMenuReducers)
      if (!objectIsNull(this.props.condimentReducers)) {
        this.setState({
          condimentDataChoose: this.props.condimentReducers,
          modalCondiment: true,
        });
      }
    }
    if (preProps.requestReducers !== this.props.requestReducers) {
      if (!objectIsNull(this.props.requestReducers)) {
        this.setState({
          requestDataChoose: this.props.requestReducers,
          modalRequest: true,
        });
      }
    }
    if (preProps.searchItemReducers !== this.props.searchItemReducers) {
      if (this.props.searchItemReducers.loading == false) {
        this.setState({
          isSearch: true,
          loadingSearch: false,
          menuSearch: this.props.searchItemReducers.data,
        });
        // console.log("object", this.props.searchItemReducers.data)
      }
    }
  }
  //Up Item Cart To State
  upItem = (item, typeitem) => {
    switch (typeitem) {
      case 'Item':
        let arrData = this.state.cartDataItem;
        arrData.find((e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID)
          .QTY++;
        this.setState({
          cartDataItem: arrData,
          QTYCart: (parseInt(this.state.QTYCart) + 1).toString(),
          totalCart: (parseInt(this.state.totalCart) + item.PRICE).toString(),
        });

        break;
      case 'Condiment':
        let dataTemp = this.state.cartDataItem;
        dataTemp
          .find((x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID)
          .LST_CONDIMENT.find((e) => e.CONDIMENT_ID == item.CONDIMENT_ID).QTY++;

        this.setState({
          cartDataItem: dataTemp,
          totalCart: this.state.totalCart + item.PRICE,
        });

        break;
      case 'Request':
        break;
      default:
        break;
    }
  };
  //Down Item Cart To State
  downItem = (item, typeitem) => {
    switch (typeitem) {
      case 'Item':
        let arrData = this.state.cartDataItem;
        arrData.find((e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID)
          .QTY--;
        arrData.find((e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID)
          .QTY == 0
          ? this.setState({
              cartDataItem: arrData.filter(
                (e) => e.MENU_ITEM_PRICE_ID != item.MENU_ITEM_PRICE_ID,
              ),
              totalCart: (
                parseInt(this.state.totalCart) -
                item.PRICE -
                arrData
                  .find((e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID)
                  .LST_CONDIMENT.map((item) => item.PRICE * item.QTY)
                  .reduce((acc, val) => acc + val, 0)
              ).toString(),
              QTYCart: (parseInt(this.state.QTYCart) - 1).toString(),
            })
          : this.setState({
              cartDataItem: arrData,
              QTYCart: (parseInt(this.state.QTYCart) - 1).toString(),
              totalCart: (
                parseInt(this.state.totalCart) - item.PRICE
              ).toString(),
            });

        break;
      case 'Condiment':
        let dataTemp = this.state.cartDataItem;
        dataTemp
          .find((x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID)
          .LST_CONDIMENT.find((e) => e.CONDIMENT_ID == item.CONDIMENT_ID).QTY--;

        if (
          dataTemp
            .find(
              (x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID,
            )
            .LST_CONDIMENT.find((e) => e.CONDIMENT_ID == item.CONDIMENT_ID)
            .QTY <= 0
        ) {
          dataTemp
            .find(
              (x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID,
            )
            .LST_CONDIMENT.find(
              (e) => e.CONDIMENT_ID == item.CONDIMENT_ID,
            ).QTY = 0;
        } else {
          this.setState({totalCart: this.state.totalCart - item.PRICE});
        }
        this.setState({cartDataItem: dataTemp});

        break;
      case 'Request':
        break;
      default:
        break;
    }
  };
  //Add Cart To State
  addCart = (item, typeitem) => {
    switch (typeitem) {
      case 'Item':
        this.state.cartDataItem.find(
          (x) => x.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
        ) != undefined
          ? this.upItem(item, 'Item')
          : this.setState({
              // cartDataItemPrev: [
              //   ...this.state.cartDataItem,
              //   {
              //     isTick: true,
              //     MENU_ITEM_PRICE_ID: item.MENU_ITEM_PRICE_ID,
              //     QTY: 1,
              //     NAME_ITEM: item.NAME2,
              //     PRICE: item.PRICE,
              //     ITEM_ID: item.ITEM_ID,
              //     MAJOR_GROUP_ID: item.MAJOR_GROUP_ID,
              //     LST_CONDIMENT: [],
              //     LST_SPECIAL_REQUEST: [],
              //     LST_REQUEST_NOTE: [],
              //   },
              // ],
              cartDataItem: [
                ...this.state.cartDataItem,
                {
                  isTick: true,
                  MENU_ITEM_PRICE_ID: item.MENU_ITEM_PRICE_ID,
                  QTY: 1,
                  NAME_ITEM: item.NAME2,
                  PRICE: item.PRICE,
                  ITEM_ID: item.ITEM_ID,
                  MAJOR_GROUP_ID: item.MAJOR_GROUP_ID,
                  LST_CONDIMENT: [],
                  LST_SPECIAL_REQUEST: [],
                  LST_REQUEST_NOTE: [],
                },
              ],
              tickAll: true,
              QTYCart: (parseInt(this.state.QTYCart) + 1).toString(),
              totalCart: (
                parseInt(this.state.totalCart) + item.PRICE
              ).toString(),
            });

        break;
      case 'Condiment':
        if (
          this.state.cartDataItem
            .find(
              (x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID,
            )
            .LST_CONDIMENT.find((y) => y.CONDIMENT_ID == item.CONDIMENT_ID) ==
          undefined
        ) {
          let dataTemp = this.state.cartDataItem;
          dataTemp
            .find(
              (x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID,
            )
            .LST_CONDIMENT.push({
              CONDIMENT_ID: item.CONDIMENT_ID,
              QTY: 1,
              PRICE: item.PRICE,
              NAME: item.NAME,
            });

          this.setState({
            cartDataItem: dataTemp,
            totalCart: parseInt(this.state.totalCart) + parseInt(item.PRICE),
          });
        } else {
          this.upItem(item, 'Condiment');
        }
        // .find(

        break;
      case 'Request':
        if (
          this.state.cartDataItem
            .find((x) => x.MENU_ITEM_PRICE_ID == this.state.itemRequestFocus_ID)
            .LST_SPECIAL_REQUEST.find(
              (y) => y.SPECIAL_REQUEST_ID == item.SPECIAL_REQUEST_ID,
            ) == undefined
        ) {
          let dataTemp = this.state.cartDataItem;
          dataTemp
            .find((x) => x.MENU_ITEM_PRICE_ID == this.state.itemRequestFocus_ID)
            .LST_SPECIAL_REQUEST.push({
              SPECIAL_REQUEST_ID: item.SPECIAL_REQUEST_ID,
              NAME: item.NAME,
            });

          this.setState({cartDataItem: dataTemp});
        } else {
          let dataTemp = this.state.cartDataItem;
          dataTemp.find(
            (x) => x.MENU_ITEM_PRICE_ID == this.state.itemRequestFocus_ID,
          ).LST_SPECIAL_REQUEST = dataTemp
            .find((x) => x.MENU_ITEM_PRICE_ID == this.state.itemRequestFocus_ID)
            .LST_SPECIAL_REQUEST.filter(
              (x) => x.SPECIAL_REQUEST_ID != item.SPECIAL_REQUEST_ID,
            );

          this.setState({
            cartDataItem: dataTemp,
          });
        }
        // .find(
        //   (y) => y.SPECIAL_REQUEST_ID == item.SPECIAL_REQUEST_ID,
        // ) != undefined
        // ? console.log('Undefine')
        // : console.log('Ex');

        break;
      default:
        break;
    }
  };
  //Change Stick
  changStatusTick = async (item, type = 'default') => {
    let arrData = this.state.cartDataItem;
    switch (type) {
      case 'default':
        arrData.find(
          (e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
        ).isTick = !arrData.find(
          (e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
        ).isTick;

        if (
          arrData.find((e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID)
            .isTick == true
        ) {
          let totalTemp = 0;
          let obj = arrData.find(
            (e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
          );
          totalTemp = this.state.totalCart + obj.PRICE * obj.QTY;

          obj.LST_CONDIMENT.map((item) => {
            totalTemp += item.PRICE * item.QTY;
          });

          this.setState({totalCart: totalTemp});
        } else {
          let totalTemp = 0;
          let obj = arrData.find(
            (e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
          );
          totalTemp = this.state.totalCart - obj.PRICE * obj.QTY;
          obj.LST_CONDIMENT.map((item) => {
            totalTemp -= item.PRICE * item.QTY;
          });
          this.setState({totalCart: totalTemp});
        }

        let num = 0;
        arrData.forEach((element) => element.isTick == true && num++),
          arrData.length == num
            ? this.setState({tickAll: true, cartDataItem: arrData})
            : this.setState({tickAll: false, cartDataItem: arrData});

        break;
      case 'all':
        switch (this.state.tickAll) {
          case true:
            arrData.forEach((element) => (element.isTick = false)),
              this.setState({
                tickAll: false,
                cartDataItem: arrData,
                totalCart: 0,
              });
            break;
          case false:
            let totalMoney = 0;
            arrData.forEach((element) => {
              element.isTick = true;
              totalMoney +=
                element.PRICE * element.QTY +
                element.LST_CONDIMENT.map(
                  (item) => item.PRICE * item.QTY,
                ).reduce((acc, val) => acc + val, 0);
            }),
              this.setState({
                tickAll: true,
                cartDataItem: arrData,
                totalCart: totalMoney,
              });
            // this.setState({
            //   cartDataItem: arrData,
            // });
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };
  //Function Format Money
  currencyFormat = (num) => {
    if (num == 0) {
      return '0';
    } else {
      return parseInt(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  };
  //Reset Total Cart
  ResetTotalCart = () => {
    let totalMoney = 0;
    this.state.cartDataItem.forEach((element) => {
      if (element.isTick == true) {
        totalMoney +=
          element.PRICE * element.QTY +
          element.LST_CONDIMENT.map((item) => item.PRICE * item.QTY).reduce(
            (acc, val) => acc + val,
            0,
          );
      }
    });
    this.setState({totalCart: totalMoney});
  };
  //Edit QTY Item Or Condiment
  editQTYItemOrCondiment = (item, type, qty) => {
    switch (type) {
      case 'Item':
        console.log(qty);
        if (qty == 0 || qty == '') {
          setTimeout(
            () => {
              let arrData = this.state.cartDataItem;
              let QTYPrev = arrData.find(
                (e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
              ).QTY;
              if (
                arrData.find(
                  (x) => x.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
                ) != undefined
              ) {
                this.setState({
                  cartDataItem: arrData.filter(
                    (e) => e.MENU_ITEM_PRICE_ID != item.MENU_ITEM_PRICE_ID,
                  ),
                  totalCart: (
                    parseInt(this.state.totalCart) -
                    item.PRICE * QTYPrev -
                    arrData
                      .find(
                        (e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
                      )
                      .LST_CONDIMENT.map((item) => item.PRICE * item.QTY)
                      .reduce((acc, val) => acc + val, 0)
                  ).toString(),
                  QTYCart: (parseInt(this.state.QTYCart) - QTYPrev).toString(),
                });
              }
            },
            qty == '' ? 1000 : 0,
          );
        } else {
          let arrData = this.state.cartDataItem;
          let QTYPrev = arrData.find(
            (e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
          ).QTY;

          arrData.find(
            (e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
          ).QTY = qty;
          arrData.find((e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID)
            .QTY <= 0
            ? this.setState({
                cartDataItem: arrData.filter(
                  (e) => e.MENU_ITEM_PRICE_ID != item.MENU_ITEM_PRICE_ID,
                ),
                totalCart: (
                  parseInt(this.state.totalCart) -
                  item.PRICE -
                  arrData
                    .find(
                      (e) => e.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
                    )
                    .LST_CONDIMENT.map((item) => item.PRICE * item.QTY)
                    .reduce((acc, val) => acc + val, 0)
                ).toString(),
                QTYCart: (parseInt(this.state.QTYCart) - 1).toString(),
              })
            : this.setState(
                {
                  cartDataItem: arrData,
                  QTYCart: (
                    parseInt(this.state.QTYCart) +
                    (qty - QTYPrev)
                  ).toString(),
                  totalCart: (
                    parseInt(this.state.totalCart) - item.PRICE
                  ).toString(),
                },
                () => {
                  this.ResetTotalCart();
                },
              );
        }

        break;
      case 'Condiment':
        this.state.cartDataItem
          .find((x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID)
          .LST_CONDIMENT.find((y) => y.CONDIMENT_ID == item.CONDIMENT_ID) ==
          undefined && this.addCart(item, 'Condiment');
        let dataTemp = this.state.cartDataItem;
        if (qty == '') {
          setTimeout(() => {
            dataTemp
              .find(
                (x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID,
              )
              .LST_CONDIMENT.find(
                (e) => e.CONDIMENT_ID == item.CONDIMENT_ID,
              ).QTY = 0;
          }, 3000);
        } else {
          let QTYCondimentPrev = dataTemp
            .find(
              (x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID,
            )
            .LST_CONDIMENT.find((e) => e.CONDIMENT_ID == item.CONDIMENT_ID).QTY;
          dataTemp
            .find(
              (x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID,
            )
            .LST_CONDIMENT.find(
              (e) => e.CONDIMENT_ID == item.CONDIMENT_ID,
            ).QTY = qty;

          if (
            dataTemp
              .find(
                (x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID,
              )
              .LST_CONDIMENT.find((e) => e.CONDIMENT_ID == item.CONDIMENT_ID)
              .QTY <= 0
          ) {
            dataTemp
              .find(
                (x) => x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID,
              )
              .LST_CONDIMENT.find(
                (e) => e.CONDIMENT_ID == item.CONDIMENT_ID,
              ).QTY = 0;
          }
        }
        this.setState({cartDataItem: dataTemp}, () => this.ResetTotalCart());
        break;
      default:
        break;
    }
  };

  //Render Data Order Not Post
  renderItem = ({item, index}) => (
    <View
      style={{
        borderRadius: Sizes.s15,
        backgroundColor: color.backgroundColor,
        margin: Sizes.s20,
        padding: Sizes.s15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        flexDirection: 'row',
        elevation: 3,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.changStatusTick(item)}>
          <Image
            source={item.isTick == true ? images.ic_tick : images.ic_notick}
            style={{
              resizeMode: 'contain',
              height: Sizes.h52,
              width: Sizes.h52,
            }}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => this.addCart(item, 'Item')}> */}
        <View style={{width: '70%'}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: Sizes.h30,
              fontWeight: 'bold',
              marginLeft: Sizes.s20,
              height: Sizes.h52,
              textAlignVertical: 'center',
              color: color.text,
            }}>
            {item.NAME_ITEM}({this.currencyFormat(item.PRICE)}) x{item.QTY}
          </Text>

          {item.LST_CONDIMENT.map((item) => {
            if (item.QTY > 0)
              return (
                <Text style={styles.txtNote}>
                  {item.NAME}x{item.QTY}.({item.PRICE}đ)
                </Text>
              );
          })}

          {item.LST_SPECIAL_REQUEST.map((item) => {
            return <Text style={styles.txtNote}>{item.NAME}</Text>;
          })}

          {arrayIsEmpty(item.LST_REQUEST_NOTE) == false ? (
            item.LST_REQUEST_NOTE.map((item) => {
              return (
                <Text style={[styles.txtNote]}>
                  Ghi chú : {item.SPECIAL_REQUEST_NOTE}
                </Text>
              );
            })
          ) : (
            <Text style={[styles.txtNote, {color: color.textdiff}]}>
              Ghi chú : Không có
            </Text>
          )}
        </View>
        {/* </TouchableOpacity> */}
      </View>
      <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: Sizes.h30,

            color: '#FF4D4F',

            fontSize: Sizes.h30,

            height: Sizes.h52,
            textAlignVertical: 'center',
          }}>
          {this.currencyFormat(
            item.PRICE * item.QTY +
              item.LST_CONDIMENT.map((item) => item.PRICE * item.QTY).reduce(
                (acc, val) => acc + val,
                0,
              ),
          )}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: Sizes.s25,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            elevation: 10,
          }}>
          <TouchableOpacity
            onPress={() => this.downItem(item, 'Item')}
            style={{justifyContent: 'center'}}>
            <View
              style={{
                width: Sizes.s35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: Sizes.h34,
                  color: '#FFC53D',
                  fontWeight: 'bold',
                }}>
                -
              </Text>
            </View>
          </TouchableOpacity>
          <TextInput
            maxLength={3}
            onChangeText={(text) => {
              if (text != '') {
                clearTimeout(this.lastTimeout);
                this.lastTimeout = setTimeout(() => {
                  this.editQTYItemOrCondiment(item, 'Item', text);
                }, 0);
              } else {
                clearTimeout(this.lastTimeout);
                this.lastTimeout = setTimeout(() => {
                  this.editQTYItemOrCondiment(item, 'Item', text);
                }, 3000);
              }
            }}
            // onSubmitEditing={(rs) =>
            //   this.editQTYItemOrCondiment(item, 'Item', rs.nativeEvent.text)
            // }
            keyboardType="numeric"
            defaultValue={this.state.cartDataItem
              .find((x) => x.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID)
              .QTY.toString()}
            style={{
              paddingVertical: 0,
              paddingHorizontal: Sizes.s10,
              fontSize: Sizes.h36,

              textAlignVertical: 'center',
              textAlign: 'center',
            }}
          />
          <TouchableOpacity
            onPress={() => this.upItem(item, 'Item')}
            style={{justifyContent: 'center'}}>
            <View
              style={{
                width: Sizes.s35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: Sizes.h34,
                  color: '#FFC53D',
                  fontWeight: 'bold',
                }}>
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  //Action Send API And Show Condiment
  showCondiment = (name, idItem, MENU_ITEM_PRICE_ID) => {
    if (
      this.state.cartDataItem.find(
        (x) => x.MENU_ITEM_PRICE_ID == MENU_ITEM_PRICE_ID,
      ) != undefined
    ) {
      // let newArray = [];
      // this.state.cartDataItem.forEach((v, i) => {
      //   newArray.push(this.state.cartDataItem[i]);
      // });
      // let list = Object.assign({}, this.state.cartDataItem)
      let list = this.state.cartDataItem.map((value) => {
        let arr = value.LST_CONDIMENT.map((item) => {
          return Object.assign({}, item, {});
        });
        return Object.assign({}, value, {LST_CONDIMENT: arr});
        // return Object.assign({}, value, {});
      });

      this.setState({
        nameChooseCondiment: name,
        itemCondimentFocus_ID: MENU_ITEM_PRICE_ID,
        cartDataItemPrev: list,
      });
      this.props.onPostGetCondimentuAction(idItem);
    } else {
      Alert.alert(
        'Thông Báo',
        'Vui lòng chọn món trước',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };
  //Action Send API And Show Request
  showRequest = (name, majoGroupID, MENU_ITEM_PRICE_ID) => {
    if (
      this.state.cartDataItem.find(
        (x) => x.MENU_ITEM_PRICE_ID == MENU_ITEM_PRICE_ID,
      ) != undefined
    ) {
      let list = this.state.cartDataItem.map((value) => {
        let arr = value.LST_SPECIAL_REQUEST.map((item) => {
          return Object.assign({}, item, {});
        });
        return Object.assign({}, value, {LST_SPECIAL_REQUEST: arr});
        // return Object.assign({}, value, {});
      });
      this.setState({
        ChooseRequest: name,
        itemRequestFocus_ID: MENU_ITEM_PRICE_ID,
        cartDataItemPrev: list,
      });
      this.props.onPostGetRequestAction(majoGroupID);
    } else {
      Alert.alert(
        'Thông Báo',
        'Vui lòng chọn món trước',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };
  //View Request
  renderItemRequest = ({item}) => {
    return (
      <ListItemRequest
        select={
          this.state.cartDataItem
            .find((x) => x.MENU_ITEM_PRICE_ID == this.state.itemRequestFocus_ID)
            .LST_SPECIAL_REQUEST.find(
              (y) => y.SPECIAL_REQUEST_ID == item.SPECIAL_REQUEST_ID,
            ) == undefined
            ? false
            : true
        }
        style={[styles.ItemRequest, {backgroundColor: color.drawer}]}
        NAME={item.NAME}
        onPress={(selected) => {
          this.addCart(item, 'Request');
          // console.log(selected, item.SPECIAL_REQUEST_ID);
        }}
      />
    );
  };
  //View Condiment
  renderItemCondiment = ({item, index}) => (
    <View key={index} style={styles.itemCondiment}>
      <TouchableOpacity
        onPress={() => this.addCart(item, 'Condiment')}
        style={{width: '35%'}}>
        <Text
          numberOfLines={1}
          style={{width: '100%', fontSize: Sizes.h30, color: color.text}}>
          {item.NAME}
        </Text>
      </TouchableOpacity>

      <Text style={{fontSize: Sizes.h30, color: '#F5222D'}}>
        {item.PRICE == 0 ? 'Free' : this.currencyFormat(item.PRICE)}
      </Text>

      {
        <View
          style={{
            flexDirection: 'row',
            borderRadius: Sizes.s25,
            backgroundColor: color.backgroundColor,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            elevation: 10,
          }}>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => this.downItem(item, 'Condiment')}>
            <View
              style={{
                width: Sizes.s35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: Sizes.h34,
                  color: '#FFC53D',
                  fontWeight: 'bold',
                }}>
                -
              </Text>
            </View>
          </TouchableOpacity>
          <TextInput
            keyboardType="numeric"
            keyboardAppearance={color.keyboardAppearance}
            onChangeText={(text) => {
              this.editQTYItemOrCondiment(item, 'Condiment', text);
            }}
            defaultValue={
              this.state.cartDataItem
                .find(
                  (x) =>
                    x.MENU_ITEM_PRICE_ID == this.state.itemCondimentFocus_ID,
                )
                .LST_CONDIMENT.find(
                  (e) => e.CONDIMENT_ID == item.CONDIMENT_ID,
                ) == undefined
                ? '0'
                : this.state.cartDataItem
                    .find(
                      (x) =>
                        x.MENU_ITEM_PRICE_ID ==
                        this.state.itemCondimentFocus_ID,
                    )
                    .LST_CONDIMENT.find(
                      (e) => e.CONDIMENT_ID == item.CONDIMENT_ID,
                    )
                    .QTY.toString()
            }
            style={{
              paddingVertical: 0,
              paddingHorizontal: Sizes.s10,
              fontSize: Sizes.h36,
              textAlignVertical: 'center',
              textAlign: 'center',
              color: color.text,
            }}
          />
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => this.addCart(item, 'Condiment')}>
            <View
              style={{
                width: Sizes.s35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: Sizes.h34,
                  color: '#FFC53D',
                  fontWeight: 'bold',
                }}>
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
  //View item menu
  renderItemMenu = ({item, index}) => (
    <View
      style={{
        flex: 1,
        borderRadius: Sizes.s15,
        backgroundColor: color.backgroundColor,
        margin: Sizes.s20,
        padding: Sizes.s15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 3,
      }}>
      <TouchableOpacity onPress={() => this.addCart(item, 'Item')}>
        <Text
          style={{
            fontSize: Sizes.h30,
            marginBottom: Sizes.s10,
            color: color.text,
          }}>
          {item.NAME2}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: Sizes.h30,
          marginBottom: Sizes.s10,
          color: '#FF4D4F',
        }}>
        {this.currencyFormat(item.PRICE)}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: Sizes.s10,
        }}>
        <View style={{flexDirection: 'row'}}>
          {item.ITEM_ID_CONDIMENT != 0 ? (
            <TouchableOpacity
              style={{padding: Sizes.s10}}
              onPress={() => {
                this.showCondiment(
                  item.NAME2,
                  item.ITEM_ID,
                  item.MENU_ITEM_PRICE_ID,
                );
              }}>
              <Image
                source={images.ic_holo}
                style={{width: Sizes.s55, height: Sizes.s55}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <View style={{padding: Sizes.s10}}>
              <View style={{width: Sizes.s55, height: Sizes.s55}} />
            </View>
          )}

          {item.MAJOR_GROUP_ID != 0 ? (
            <TouchableOpacity
              style={{padding: Sizes.s10}}
              onPress={() => {
                this.showRequest(
                  item.NAME2,
                  item.MAJOR_GROUP_ID,
                  item.MENU_ITEM_PRICE_ID,
                );
              }}>
              <Image
                source={images.ic_edit}
                style={{
                  width: Sizes.s55,
                  height: Sizes.s55,
                  marginLeft: Sizes.s10,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <View style={{padding: Sizes.s10}}>
              <View
                style={{
                  width: Sizes.s55,
                  height: Sizes.s55,
                  marginLeft: Sizes.s10,
                }}
              />
            </View>
          )}
        </View>

        {this.state.cartDataItem.find(
          (x) => x.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID,
        ) != undefined ? (
          <View
            style={{
              flexDirection: 'row',
              borderRadius: Sizes.s25,
              backgroundColor: color.backgroundColor,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.44,
              shadowRadius: 10.32,
              elevation: 10,
            }}>
            <TouchableOpacity
              onPress={() => this.downItem(item, 'Item')}
              style={{justifyContent: 'center'}}>
              <View
                style={{
                  width: Sizes.s35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: Sizes.h34,
                    color: '#FFC53D',
                    fontWeight: 'bold',
                  }}>
                  -
                </Text>
              </View>
            </TouchableOpacity>
            <TextInput
              maxLength={3}
              keyboardType="numeric"
              keyboardAppearance = {color.keyboardAppearance}
              onChangeText={(text) => {
                if (text != '') {
                  clearTimeout(this.lastTimeout);
                  this.lastTimeout = setTimeout(() => {
                    this.editQTYItemOrCondiment(item, 'Item', text);
                  }, 0);
                } else {
                  clearTimeout(this.lastTimeout);
                  this.lastTimeout = setTimeout(() => {
                    this.editQTYItemOrCondiment(item, 'Item', text);
                  }, 3000);
                }
              }}
              defaultValue={this.state.cartDataItem
                .find((x) => x.MENU_ITEM_PRICE_ID == item.MENU_ITEM_PRICE_ID)
                .QTY.toString()}
              style={{
                paddingVertical: 0,
                paddingHorizontal: Sizes.s10,
                fontSize: Sizes.h36,
                color :color.text,
                textAlignVertical: 'center',
                textAlign: 'center',
              }}
            />
            <TouchableOpacity
              onPress={() => this.upItem(item, 'Item')}
              style={{justifyContent: 'center'}}>
              <View
                style={{
                  width: Sizes.s35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: Sizes.h34,
                    color: '#FFC53D',
                    fontWeight: 'bold',
                  }}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              // flexDirection: 'row',
              // borderRadius: Sizes.s25,
              // backgroundColor: 'white',
              // shadowColor: '#000',
              // shadowOffset: {
              //   width: 0,
              //   height: 8,
              // },
              // shadowOpacity: 0.44,
              // shadowRadius: 10.32,
              // elevation: 10,
            }}
            onPress={
              () => this.addCart(item, 'Item')
              // console.log(this.state.cartDataItem)
            }>
            <Text
              style={{
                fontSize: Sizes.h30,
                color: '#1890FF',
                paddingRight: Sizes.h12 * 2,
              }}>
              Thêm món
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  showMenu = () => {
    this.setState({visibleModal: true});
  };
  offMenu = () => {
    this.setState({visibleModal: false});
  };
  //Function Handle To Insert
  PostToInsert = () => {
    let ListCartFormated = [];
    let arrCondimentFormated = [];
    let arrRequestFormated = [];
    this.state.cartDataItem.map((e) => {
      if (e.isTick == true) {
        e.LST_CONDIMENT.map((it) => {
          for (let i = 0; i < it.QTY; i++) {
            arrCondimentFormated.push({CONDIMENT_ID: it.CONDIMENT_ID});
          }
        });
        e.LST_SPECIAL_REQUEST.map((itt) => {
          arrRequestFormated.push({SPECIAL_REQUEST_ID: itt.SPECIAL_REQUEST_ID});
        });
        ListCartFormated.push({
          MENU_ITEM_PRICE_ID: e.MENU_ITEM_PRICE_ID,
          QTY: e.QTY,
          NAME_ITEM: e.NAME_ITEM,
          LST_CONDIMENT: arrCondimentFormated,
          LST_SPECIAL_REQUEST: arrRequestFormated,
          LST_REQUEST_NOTE: e.LST_REQUEST_NOTE,
        });
      }
    });
    var now = new Date();
    let Data = {
      PROPERTY_CODE: userData.PROPERTY_CODE,
      OUTLET_ID: userData.OUTLET_ID,
      COVERS: this.state.guestInfo.COVERS,
      DINING_TABLE_ID: this.state.guestInfo.DINING_TABLE_ID,
      EMPLOYEE_CODE: userData.CASHIER_ID,
      WORKSTATION_ID: userData.WORKSTATION_ID,
      LANG_CODE: userData.LANG_CODE,
      GUEST_NAME: this.state.guestInfo.GUEST_NAME,
      CHECK_OPEN: new Date(now).toISOString(),
      POS_WORKSTATION_ID: userData.POS_WORKSTATION_ID,
      LOCATION_ID: this.state.guestInfo.LOCATION_ID,
      ORDER_TYPE_ID: userData.ORDER_TYPE_ID,
      ITEM_POS_TABLE: ListCartFormated,
    };
    console.log('------------Fun Insert--------------------');

    if (this.state.totalCart == 0) {
      Alert.alert(
        'Thông Báo',
        'Bạn chưa chọn món để gửi bếp',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } else {
      // console.log(Data);
      this.props.onPostInsertOrderAction(Data);
    }
  };

  SaveTxtRequest = (itemName) => {
    let arrTemp = this.state.cartDataItem;
    arrTemp
      .find((x) => x.NAME_ITEM == itemName)
      .LST_REQUEST_NOTE.push({SPECIAL_REQUEST_NOTE: this.state.txtRequest});
    this.setState({cartDataItem: arrTemp, txtRequest: ''});
  };
  // postSearch = (nameSearch) =>{
  //   // this.props.onPostSearchItemAction(nameSearch);
  //   Alert.alert(
  //     "Thông báo",
  //     "Chức năng đang cập nhật sau",
  //     [

  //       { text: "OK", onPress: () => console.log("OK Pressed") }
  //     ],
  //     { cancelable: false }
  //   );
  // }
  _listEmptyComponent = () => {
    return (
      <View
        style={{
          marginTop: '50%',
          flex: 1,
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{fontSize: Sizes.s30, color: '#8C8C8C', fontStyle: 'italic'}}>
          Không tồn tại món !
        </Text>
      </View>
    );
  };
  postSearch = (text) => {
    this.setState({loadingSearch: true});
    if (!text) return;
    this.state.timeOut && clearTimeout(this.state.timeOut);
    this.setState({
      timeOut: setTimeout(() => {
        this.props.onPostSearchItemAction(text);
      }, 100),
    });
  };

  render() {
    const {
      visibleModal,
      showMenuItem,
      modalCondiment,
      requestText,
      modalRequest,
    } = this.state;

    return (
      <View style={[styles.container, {backgroundColor: color.drawer}]}>
        {this.state.loading == true && <ViewOpaticyLoading />}
        {/* <StatusBar backgroundColor='red' /> */}

        <View
          style={[styles.totalBottomTotal, {backgroundColor: color.drawer}]}>
          <View
            style={{
              borderBottomColor: '#E8E8E8',
              borderBottomWidth: Sizes.s2,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingBottom: Sizes.s5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.changStatusTick(null, 'all')}>
                <Image
                  source={
                    this.state.tickAll == true
                      ? images.ic_tick
                      : images.ic_notick
                  }
                  style={{
                    resizeMode: 'contain',
                    height: Sizes.h40,
                    width: Sizes.h40,
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: Sizes.h30,
                  fontWeight: 'bold',
                  marginLeft: Sizes.s20,
                  color: color.text,
                }}>
                Tất cả
              </Text>
            </View>

            <Text style={styles.total}>
              {this.currencyFormat(this.state.totalCart)}
            </Text>
          </View>
        </View>

        {this.state.cartDataItem.length > 0 ? (
          <FlatList
            contentContainerStyle={{flex: 1}}
            data={this.state.cartDataItem}
            renderItem={this.renderItem}
            // style={{backgroundColor: 'red'}}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {this.state.guestInfo.CHECK_ID == 0 ? (
              <Image
                style={{resizeMode: 'contain', height: '50%', width: '100%'}}
                source={images.img_empty}
              />
            ) : (
              <Text
                style={{
                  fontSize: Sizes.s30,
                  color: '#8C8C8C',
                  fontStyle: 'italic',
                }}>
                Giỏ Hàng Đang Trống!
              </Text>
            )}
          </View>
        )}

        {/* Start Modal Menu */}
        <Modal visible={visibleModal} animationType="fade">
          {/* Modal Condiment */}
          <Modal
            visible={modalCondiment}
            animationType="fade"
            transparent={modalCondiment}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: '#00000036',
                zIndex: 3,
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({
                    cartDataItem: this.state.cartDataItemPrev,
                    modalCondiment: false,
                  });
                }}>
                <View style={{height: '35%', width: '100%'}} />
              </TouchableWithoutFeedback>
              <View
                style={[
                  styles.modalView,
                  {backgroundColor: color.backgroundColor},
                ]}>
                <View style={styles.modalTitle}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        modalCondiment: false,
                        cartDataItem: this.state.cartDataItemPrev,
                      })
                    }
                    style={{padding: Sizes.s15}}>
                    <Image
                      source={images.ic_cancel}
                      resizeMode="contain"
                      style={{width: Sizes.s30, tintColor: color.text}}
                    />
                  </TouchableOpacity>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: color.text,
                        fontSize: 16,
                      }}>
                      {this.state.nameChooseCondiment}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{padding: Sizes.s15}}
                    onPress={() => {
                      this.setState({
                        modalCondiment: false,
                      });
                      // console.log(this.state.cartDataItem);
                      // alert('Chờ API Insert Hoàn Thiện');
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
                <FlatList
                  data={this.state.condimentDataChoose}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index}
                  renderItem={this.renderItemCondiment}
                />
              </View>
            </View>
          </Modal>
          {/* Modal Request */}
          <Modal
            visible={modalRequest}
            animationType="fade"
            transparent={modalRequest}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: '#00000036',
              }}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({
                    modalRequest: false,
                    cartDataItem: this.state.cartDataItemPrev,
                  })
                }>
                <View style={{height: '35%', width: '100%'}} />
              </TouchableWithoutFeedback>
              <View style={[styles.modalView, {backgroundColor: color.drawer}]}>
                <View style={styles.modalTitle}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        modalRequest: false,
                        cartDataItem: this.state.cartDataItemPrev,
                      })
                    }
                    style={{padding: Sizes.s15}}>
                    <Image
                      source={images.ic_cancel}
                      resizeMode="contain"
                      style={{width: Sizes.s30, tintColor: color.text}}
                    />
                  </TouchableOpacity>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: color.text,
                        fontSize: 16,
                      }}>
                      {this.state.ChooseRequest}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{padding: Sizes.s15}}
                    onPress={() => {
                      this.setState({modalRequest: false});
                      // console.log(this.state.cartDataItem);
                      this.SaveTxtRequest(this.state.ChooseRequest);
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
                <TouchableWithoutFeedback
                  style={{backgroundColor: 'red'}}
                  onPress={() => Keyboard.dismiss()}>
                  <View style={{justifyContent: 'center', padding: Sizes.s30}}>
                    <TextInputAnimated
                      keyboardAppearance={color.keyboardAppearance}
                      title="Nhập yêu cầu"
                      value={this.state.txtRequest}
                      onChangeText={(text) => this.setState({txtRequest: text})}
                    />
                  </View>
                </TouchableWithoutFeedback>

                <FlatList
                  data={this.state.requestDataChoose}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index}
                  renderItem={this.renderItemRequest}
                  numColumns={3}
                />
              </View>
            </View>
          </Modal>

          <View style={{flex: 1, backgroundColor: color.drawer}}>
            <SafeAreaView style={{backgroundColor: color.aboutHeader}} />
            <View style={[styles.header, {backgroundColor: color.aboutHeader}]}>
              <TouchableOpacity onPress={() => this.offMenu()}>
                <Icon
                  name="left"
                  size={20}
                  color="white"
                  style={{paddingLeft: Sizes.s20}}
                />
              </TouchableOpacity>
              {this.state.isShow ? (
                <Text style={styles.titile}>
                  Bàn {this.props.route.params.tableName} -{' '}
                  {this.props.route.params.guestInfo.GUEST_NAME}
                </Text>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}

              <SearchBar
                onSubmitEditing={(e) => this.postSearch(e.nativeEvent.text)}
                onBlur={() => this.setState({search: ''})}
                postSearch={this.postSearch}
              />
            </View>

            {/* {Menu} */}
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{width: '30%'}}>
                <ScrollView
                  style={{width: '100%', height: '84%'}}
                  showsVerticalScrollIndicator={false}>
                  {this.state.categoryMenu.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{padding: 10}}
                        onPress={() =>
                          this.setState(
                            {isSearch: false, menuCategoryChoose: item.MENU_ID},
                            () => {
                              this.setState({showMenuItem: false});
                            },
                          )
                        }>
                        <View
                          style={{
                            backgroundColor:
                              this.state.menuCategoryChoose == item.MENU_ID
                                ? color.backgroundColor
                                : color.menuCategoryChoose,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: Sizes.s160,
                            borderRadius: Sizes.s30,
                            elevation: 4,
                            paddingHorizontal: Sizes.s10,
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 10,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 13,
                          }}>
                          <Text style={{color: color.text}}>{item.NAME}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <View
                  style={{
                    height: '16%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.floatingBtnCart}
                    onPress={() => this.offMenu()}>
                    <ImageBackground
                      style={{
                        width: Sizes.h38,
                        height: Sizes.h38,
                        resizeMode: 'contain',
                      }}
                      source={images.ic_cart}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: Sizes.h36,
                          width: Sizes.h36,
                          backgroundColor: 'red',
                          borderRadius: Sizes.s20,
                          position: 'absolute',
                          top: -10,
                          right: -10,
                        }}>
                        <Text style={{color: 'white', fontSize: Sizes.h22}}>
                          {this.state.QTYCart}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  width: '70%',
                  height: '100%',
                  paddingVertical: Sizes.s5,
                }}>
                {this.state.loadingSearch == true ? (
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator size="small" color="red" />
                  </View>
                ) : (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={false}
                    keyboardDismissMode="none"
                    contentContainerStyle={{flexGrow: 1}}
                    style={{
                      padding: Sizes.s10,
                      borderLeftWidth: 0.5,
                      backgroundColor: color.drawer,
                    }}
                    ListEmptyComponent={this._listEmptyComponent}
                    contentContainerStyle={{justifyContent: 'center'}}
                    data={
                      this.state.isSearch == true
                        ? this.state.menuSearch
                        : this.state.fullMenu.filter(
                            (item) =>
                              item.MENU_ID == this.state.menuCategoryChoose,
                          )
                    }
                    renderItem={this.renderItemMenu}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )}
              </View>
            </View>
          </View>
        </Modal>
        {/* End Modal Menu */}

        <View style={{flexDirection: 'row'}}>
          <View style={{width: '20%'}}>
            <TouchableOpacity
              style={styles.floatingBtn}
              onPress={this.showMenu}>
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{width: '80%', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.PostToInsert()}>
              <View style={styles.totalBottom}>
                <Text style={{color: '#1890FF'}}>Gửi Bếp</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  itemCell: {
    width: '33%',
  },
  header: {
    height: Sizes.s100,
    backgroundColor: '#1890FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalBottom: {
    marginRight: Sizes.s20,
    padding: Sizes.s20,
    backgroundColor: '#2dadd2',
    alignItems: 'center',
    borderRadius: Sizes.s15,
    backgroundColor: '#BAE7FF',
  },
  sendCook: {
    fontSize: Sizes.h34,
    color: '#1890FF',
  },
  floatingBtn: {
    width: Sizes.s100,
    height: Sizes.s100,
    borderRadius: 30,
    backgroundColor: '#1890FF',
    margin: Sizes.s25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  floatingBtnCart: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1890FF',
    // position: 'absolute',

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  listMenu: {
    backgroundColor: 'white',
    position: 'absolute',
    right: Sizes.s15,
    top: Sizes.s100,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height * 0.7,
    borderRadius: 2,
    elevation: 10,
    zIndex: 2,
  },
  modalView: {
    width: '100%',
    height: '65%',
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
  txtNote: {
    fontSize: Sizes.h24,
    fontWeight: 'normal',
    paddingTop: Sizes.s5,
    marginLeft: Sizes.s20,
  },
  modalTitle: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.s30,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  titile: {
    color: '#fff',
  },
  itemCondiment: {
    marginHorizontal: Sizes.h38,
    paddingTop: Sizes.h32,
    paddingBottom: Sizes.h16,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    textAlign: 'right',
    fontSize: 16,
    color: '#FF4D4F',
    fontWeight: 'bold',
  },
  totalBottomTotal: {
    paddingTop: Sizes.s20,
    paddingBottom: Sizes.s15,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.s35,
  },

  ItemRequest: {
    margin: Sizes.s20,
    borderRadius: Sizes.s10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Sizes.h32,
    paddingBottom: Sizes.h16,
    width: '30%',
    flex: 1 / 3,
    alignItems: 'center',
    height: Sizes.s160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default MenuOrderComponent;
