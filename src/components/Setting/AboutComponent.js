import {Sizes} from '@dungdang/react-native-basic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  BackHandler,
  Button,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {dataMenu, dataPOS, userData} from '../../config/settings';
import {backToggle} from '../../config/settings';
import images from '../../res/images/index';
import {getStatusBarHeight} from '../../res/values/getStatusBarHeight';
import ViewOpaticy from '../Custom/ViewOpaticy';
import {color} from '../../res/colors';

export default class AboutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalConfirm: false,
      appMode: '',
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.appMode !== this.props.appMode) {
      this.setState({appMode: this.props.appMode});
    }
  }

  onReset = () => {
    this.setState({
      modalConfirm: !this.state.modalConfirm,
    });
  };
  resetApp = async () => {
    try {
      await AsyncStorage.removeItem('@Logined');
    } catch (e) {
      console.log('Cant not Remove Ok');
    }
    (userData.PROPERTY_CODE = null),
      (userData.CASHIER_ID = ''),
      (userData.POS_CASHIER_WORK_ID = 0),
      (userData.POS_WORKSTATION_ID = 0),
      (userData.WORKSTATION_ID = 0),
      (userData.TITLE = ''),
      (userData.PASSCODE = null),
      (userData.CASHIER_DATE = ''),
      (userData.TOKEN = null),
      (userData.ORDER_TYPE_ID = 0),
      (userData.OUTLET_ID = null),
      (userData.DEVICE_CODE = null),
      (userData.OUTLET_NAME = null),
      (userData.PROPERTY_NAME = null),
      (userData.LANG_CODE = 'en'),
      (dataPOS.CODE = null),
      (dataPOS.NAME = null),
      (dataPOS.HKP_API_URL = null),
      (dataPOS.HKP_LOGO_HOTEL_URL = null),
      (dataPOS.POS_API_URL = null),
      (dataPOS.POS_LOGO_HOTEL_URL = null),
      this.setState({modalConfirm: false});
    this.props.navigation.dispatch(
      StackActions.replace('FillCode', {
        user: 'NCQ',
      }),
    );

    //  navigation.replace('FillCode');
  };
  render() {
    const {modalConfirm} = this.state;
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: color.aboutHeader,
        }}>
        <SafeAreaView style={{backgroundColor: color.aboutHeader}} />
        <View
          style={{
            marginTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
            height: Sizes.s100,
            backgroundColor: color.aboutHeader,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 0, padding: Sizes.s15}}
            onPress={() => {
              backToggle.status = true;
              this.props.navigation.goBack();
            }}>
            {/* <Image source={images.ic_left} resizeMode='contain' style={{ width: '30%' }} /> */}
            <Icon name="left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.titile}>About</Text>
        </View>

        <View
          style={{padding: Sizes.s20, flex: 1, backgroundColor: color.drawer}}>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.sizeContentItem, {width: '30%'}]}>
              <View style={styles.mr_10}>
                <Text style={{color: '#8C8C8C'}}>Code</Text>
                <Text style={{color: color.text}}>
                  {userData.PROPERTY_CODE}
                </Text>
              </View>
            </View>

            <View style={[styles.sizeContentItem, {width: '65%'}]}>
              <View style={styles.mr_10}>
                <Text style={{color: '#8C8C8C'}}>Tên khách sạn</Text>
                <Text style={{color: color.text}}>
                  {userData.PROPERTY_NAME}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.sizeContentItem]}>
            <View styles={styles.mr_10}>
              <Text style={{color: '#8C8C8C'}}>API Url</Text>
              <Text style={{color: color.text}}>{dataPOS.POS_API_URL}</Text>
            </View>
          </View>
          <View style={[styles.sizeContentItem]}>
            <View style={styles.mr_10}>
              <Text style={{color: '#8C8C8C'}}>Logo</Text>
              <Text style={{color: color.text}}>
                {dataPOS.POS_LOGO_HOTEL_URL}
              </Text>
            </View>
          </View>

          <View style={[styles.sizeContentItem]}>
            <View style={styles.mr_10}>
              <Text style={{color: '#8C8C8C'}}>Outlet</Text>
              <Text style={{color: color.text}}>{userData.OUTLET_NAME}</Text>
            </View>
          </View>
          <View style={[styles.sizeContentItem]}>
            <View style={styles.mr_10}>
              <Text style={{color: '#8C8C8C'}}>Cashier</Text>
              <Text style={{color: color.text}}>{userData.CASHIER_ID}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.sizeContentItem, {width: '45.5%'}]}>
              <View style={styles.mr_10}>
                <Text style={{color: '#8C8C8C'}}>Version</Text>
                <Text style={{color: color.text}}>1.0.0</Text>
              </View>
            </View>

            <View style={[styles.sizeContentItem, {width: '49%'}]}>
              <View styles={styles.mr_10}>
                <Text style={{color: '#8C8C8C'}}>Device</Text>
                <Text style={{color: color.text}}>{userData.DEVICE_CODE}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.sizeContentItem]}>
            <View style={styles.mr_10}>
              <Text style={{color: '#8C8C8C'}}>Copyright</Text>
              <Text style={{color: color.text}}>FPT Information System</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.onReset();
            }}
            style={styles.btnReset}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#FFFFFF',
                fontSize: Sizes.h34,
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        <Modal animationType="fade" transparent={true} visible={modalConfirm}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: '#00000036',
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: Sizes.h42,
                  }}>
                  Thông Báo!
                </Text>
                <Text style={styles.modalText}>
                  Bạn có muốn cài đặt lại thiết bị không?
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.btnOk}
                    onPress={() => this.resetApp()}>
                    <Text style={{color: '#fff', fontSize: Sizes.h32}}>
                      Đồng ý
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={() =>
                      this.setState({
                        modalConfirm: false,
                      })
                    }>
                    <Text style={{color: '#fff', fontSize: Sizes.h32}}>
                      Hủy
                    </Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
    height: Sizes.s100,
    backgroundColor: '#1890FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titile: {
    color: '#fff',
    fontSize: Sizes.h32,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: Sizes.s10,
    padding: Sizes.s15,
    flexWrap: 'wrap',
  },
  sizeContentItem: {
    width: '97.5%',
    margin: Sizes.s10,
    padding: Sizes.s25,
    borderWidth: 1,
    borderColor: '#8C8C8C',
    borderRadius: Sizes.s15,
    paddingHorizontal: Sizes.s15,
  },
  mr_10: {
    marginLeft: Sizes.s10,
  },
  btnReset: {
    width: '90%',
    backgroundColor: '#1890FF',
    alignItems: 'center',
    padding: Sizes.s20,
    margin: Sizes.h16 * 2,
    borderRadius: Sizes.s15,
    alignSelf: 'center',
    // marginTop:Sizes.s120*2
  },
  modalText: {
    padding: Sizes.s10,
    fontSize: Sizes.h32,
  },
  btnOk: {
    width: '40%',
    backgroundColor: '#1890FF',
    alignItems: 'center',
    padding: Sizes.s20,
    margin: Sizes.s10,
    borderRadius: Sizes.s15,
    alignSelf: 'center',
  },
  btnCancel: {
    width: '40%',
    backgroundColor: '#8C8C8C',
    alignItems: 'center',
    padding: Sizes.s20,
    margin: Sizes.s10,
    borderRadius: Sizes.s15,
    alignSelf: 'center',
  },
});
