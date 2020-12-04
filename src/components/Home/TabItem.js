import {Sizes} from '@dungdang/react-native-basic';
import {parseTime} from '@dungdang/react-native-basic/src/Functions';
import React, {Component} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// import {color} from 'react-native-reanimated';
import {color} from '../../res/colors';
import images from '../../res/images/index';
import TextInputAnimated from '../Custom/TextInputAnimated';
// import Table from "../table";
import Table from '../Home/TableComponent';

class TabItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      //data: []
      modalOpenTable: false,
      nameGuest: '',
      countGuest: '1',
      CheckIDValChoosse: 0,
      nameTableChoose: '',
      guestInfoChoose: null,
      appMode: '',
    };
  }
  componentDidMount() {
    this.setState({
      data: this.props.tableData.filter(
        (item) => item.LOCATION_ID === this.props.tabData.LOCATION_ID,
      ),
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.appMode !== this.props.appMode) {
      this.setState({appMode: this.props.appMode});
    }

    if (prevProps.tabData !== this.props.tabData) {
      this.setState({
        data: this.props.tableData.filter(
          (item) => item.LOCATION_ID === this.props.tabData.LOCATION_ID,
        ),
      });
    }
  }
  // componentDidMount() {
  //   console.log("this.props.tabData: ", this.props.tabData);
  //   this.loadTable();
  // }

  // loadTable = () => {
  //   TableService.getDataPosPlan(this.props.tabData.LOCATION_ID).then(res => {
  //     // console.log("TABLE: ", res);
  //     this.setState({
  //       data: res.data
  //     });
  //   });
  // };
  openModal = () => {
    this.setState({
      modalOpenTable: true,
    });
    // this.inputRef.current.focus();
  };
  hideModal = () => {
    this.setState({
      modalOpenTable: false,
    });
  };

  onChangeNameGuest = (input) => {
    this.setState({nameGuest: input});
  };

  onChangeCountGuest = (input) => {
    this.setState({countGuest: input});
  };
  renderItem = ({item, index}) => {
    return (
      // <Table
      //   {...this.props}
      //   style={{ borderRadius: 10 }}
      //   name={this.props.tabData.NAME}
      //   item={item}
      //   key={item.DINING_TABLE_ID}
      // />

      <Table
        {...this.props}
        //  navigation={this.props.navigation}
        item={item}
        STT={item.STT}
        DINING_TABLE_ID={item.DINING_TABLE_ID}
        OUTLET_ID={item.OUTLET_ID}
        NAME={item.NAME}
        COVERS={item.COVERS}
        CHECK_ID={item.CHECK_ID}
        USING_CASHIER_ID={item.USING_CASHIER_ID}
        WAITER={item.WAITER}
        BALANCE={item.BALANCE}
        GUEST_NAME={item.GUEST_NAME}
        MINUTE_ORDER={item.MINUTE_ORDER}
        FIRE={item.FIRE}
        PRINT_COUNT={item.PRINT_COUNT}
        NO_OF_GUEST={item.NO_OF_GUEST}
        LOCATION_ID={item.LOCATION_ID}
        openTable={(guestInfo) => this.openTable(guestInfo)}
      />
    );
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.tabData.LOCATION_ID === this.props.tabData.LOCATION_ID)
  //     return false;

  //   return true;
  // }
  openTable = (guestInfo) => {
    this.setState({
      modalOpenTable: !this.state.modalOpenTable,
      guestInfoChoose: guestInfo,
    });
  };

  openTablee = () => {
    const {nameGuest, countGuest} = this.state;
    if (nameGuest == '' || countGuest == 0) {
      return Alert.alert(
        'Thông báo',
        'Vui lòng nhập đầy đủ thông tin',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } else {
      this.props.killBack();
      // alert(
      //   'Chức năng này đang cập nhật. Sẽ có trong ngày mai. Mai quay lại nhé <3',
      // );
      let arrDataSend = this.state.guestInfoChoose;
      arrDataSend.COVERS = parseInt(this.state.countGuest);
      arrDataSend.GUEST_NAME = this.state.nameGuest;

      this.props.navigation.navigate('OrderItemScreen', {
        checkID: arrDataSend.CHECK_ID,
        guestInfo: arrDataSend,
        tableName: arrDataSend.NAME,
      });
    }

    this.hideModal();
  };
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: color.backgroundColorHome,
        }}>
        {this.state.data.length > 0 ? (
          <View>
            <Modal
              transparent
              visible={this.state.modalOpenTable}
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
                  <TouchableWithoutFeedback onPress={() => this.hideModal()}>
                    <View style={{flex: 1}} />
                  </TouchableWithoutFeedback>
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
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          style={{padding: Sizes.s15}}
                          onPress={() => this.hideModal()}>
                          <Image
                            source={images.ic_cancel}
                            resizeMode="contain"
                            style={{
                              width: Sizes.s25,
                              height: Sizes.s25,
                           
                            }}
                          />
                        </TouchableOpacity>

                        <Text
                          style={{marginLeft: Sizes.s20, fontSize: Sizes.s30}}>
                          Mở Bàn {this.props.NAME}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{padding: Sizes.s15}}
                        onPress={() => {
                          this.openTablee();
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
                        style={{marginTop: Sizes.h48}}
                        // titleStyles={{ fontStyle: 'italic' }}
                        value={this.state.nameGuest}
                        title="Khách hàng"
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
                            onChangeText={(input) =>
                              this.onChangeCountGuest(input)
                            }
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
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.DINING_TABLE_ID}
              refreshing={this.props.refreshing}
              onRefresh={() => this.props.handleRefresh()}
            />
          </View>
        ) : (
          // <View style={{backgroundColor: 'grey', flex: 1}}>
          //   <Modal visible={true}>
          //     <View
          //       style={{
          //         flex: 1,
          //         backgroundColor: 'yellow',
          //         justifyContent: 'flex-end',
          //       }}>
          //       <View style={{height: 100, backgroundColor: 'white'}}>
          //         <TextInput />
          //       </View>
          //     </View>
          //   </Modal>
          // </View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>Khu vực này không có bàn!</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default TabItem;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: Sizes.s35,
    color: '#8C8C8C',
  },
  CustomModal: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: Sizes.h24,
    borderTopLeftRadius: Sizes.h24,
    paddingBottom: Sizes.s15,
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
  iconContent: {width: Sizes.h34, height: Sizes.h34},
  txtContent: {
    justifyContent: 'center',

    marginLeft: Sizes.s15,
    borderBottomWidth: 1,
    flex: 1,
    borderColor: '#E8E8E8',
  },
});
