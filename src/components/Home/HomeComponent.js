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
  BackHandler,
  Button,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  SafeAreaViewBase,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {backToggle} from '../../config/settings';
import images from '../../res/images/index';
import {getStatusBarHeight} from '../../res/values/getStatusBarHeight';
import AppStatusBar from '../Custom/AppStatusBar';
import ViewOpaticyLoading from '../Custom/ViewOpaticyLoading';
import TabItem from './TabItem';
import {color, getAppMode} from '../../res/colors';

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacityView: false,
      visibleInfoGuest: false,
      dataLocation: [],
      dataTable: [],
      loading: true,
      nameLocation: '',
      modalLocation: false,
      selectedItem: null,
      loadingFullLocation: true,
      loadingFullTable: true,
      refreshing: false,
      interval: null,
      appMode: '',
    };
  }

  async componentDidMount() {
    this.test();
    this.props.onGetLocationAction();

    // let appMode = await getAppMode();
    // if (appMode === 'light') {
    //   console.log('lightttttttt')
    //   this.props.changeAppModeAction(0);
    // } else {
    //   console.log('darkkkkkkkkkkkk')
    //   this.props.changeAppModeAction(1);
    // }
  }

  test = () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  };
  componentWillUnmount() {
    this.killBack();
  }
  killBack = () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  };
  handleBackButtonClick = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn thoát ứng dụng không ?',
      [
        {
          text: 'Không',
          onPress: () => {
            return true;
          },
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      {cancelable: false},
    );
    return true;
  };

  async componentDidUpdate(prevProps) {
    if (backToggle.status == true) {
      this.props.navigation.toggleDrawer();
      backToggle.status = false;
    }
    if (prevProps.appMode !== this.props.appMode) {
      console.log(appMode, 'Home AppMode');
      this.setState({appMode: this.props.appMode});
    }
    if (prevProps.getLocationReducers !== this.props.getLocationReducers) {
      if (this.props.getLocationReducers.isInternet == false) {
        Alert.alert(
          'Thông báo',
          'Không thể kết nối tới server. Vui lòng xem lại kết nối Internet hoặc liên hệ với bộ phận CSKH',
          [{text: 'OK', onPress: () => this.props.navigation.replace('Login')}],
          {cancelable: false},
        );
      } else {
        if (!objectIsNull(this.props.getLocationReducers)) {
          await this.setState({
            dataLocation: this.props.getLocationReducers,

            nameLocation:
              'Khu vực' + ' ' + this.props.getLocationReducers[0].NAME,
            selectedItem: this.props.getLocationReducers[0],
          });

          this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            () => {
              this.setState(
                {refreshing: true, loading: true, dataTable: []},
                () => {
                  this.test();
                  this.props.onGetAllTableMapAction();
                },
              );
            },
          );
          this.props.onGetAllTableMapAction();
        } else {
          alert('Get Data Location Error');
        }
      }
    }
    if (prevProps.tableMapReducers !== this.props.tableMapReducers) {
      if (!objectIsNull(this.props.tableMapReducers)) {
        await this.setState({dataTable: this.props.tableMapReducers}, () =>
          this.setState({
            loadingFullLocation: false,
            loadingFullTable: false,
            loading: false,
            refreshing: false,
            // selectedItem: this.state.dataLocation[0],
            // nameLocation:
            //   'Khu vực' + ' ' + this.props.getLocationReducers[0].NAME,
          }),
        );
      } else {
        alert('Get Data Table Error');
      }
    }
  }

  openModal = () => {
    this.setState({
      modalLocation: !this.state.modalLocation,
    });
  };
  renderItem = ({item, index}) => (
    <View style={{borderRadius: 30}}>
      <TouchableOpacity
        key={index}
        style={{
          marginHorizontal: Sizes.h38,
          paddingTop: Sizes.h32,
          paddingBottom: Sizes.h16,
          borderBottomColor: color.text,
          borderBottomWidth: 1,
          alignItems: 'center',
        }}
        onPress={() => {
          this.setState({
            selectedItem: item,
            nameLocation: 'Khu vực' + ' ' + item.NAME,
            modalLocation: !this.state.modalLocation,
          });
        }}>
        <Text
          style={[
            {fontSize: 14},
            this.state.selectedItem == item
              ? {color: '#0294e1'}
              : {color: color.imageIcon},
          ]}>
          {'Khu vực' + ' ' + item.NAME}
        </Text>
      </TouchableOpacity>
    </View>
  );
  render() {
    const {
      nameLocation,
      modalLocation,
      dataLocation,
      selectedItem,
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="#1890FF"
        />
        <View
          style={{
            backgroundColor: color.header,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: Sizes.s70 - Sizes.s2,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.toggleDrawer();
              this.killBack();
            }}
            style={styles.IconDraw}>
            <Image
              source={images.ic_menu_home}
              style={{
                resizeMode: 'contain',
                height: Sizes.h48,
                width: Sizes.h48,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.openModal()}>
            <Text
              style={{
                marginRight: Sizes.s10,
                color: 'white',
                fontSize: Sizes.h34,
              }}>
              {nameLocation}
            </Text>
            <Image
              source={images.ic_down_home}
              style={{
                resizeMode: 'contain',
                height: Sizes.h48,
                width: Sizes.h48,
              }}
            />
          </TouchableOpacity>
          <View style={{marginRight: Sizes.s70}}></View>
        </View>
        {this.state.loading == true ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#1890FF" />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <TabItem
              killBack={() => this.killBack()}
              {...this.props}
              handleRefresh={() => {
                this.setState({refreshing: true, loading: true, dataTable: []});
                this.props.onGetAllTableMapAction();
              }}
              refreshing={this.state.refreshing}
              tabData={this.state.selectedItem}
              tableData={this.state.dataTable}
            />
          </View>
        )}
        <Modal
          animationType="fade"
          transparent={this.state.modalLocation}
          visible={modalLocation}
          
          >
          <TouchableWithoutFeedback
            onPress={() => this.setState({modalLocation: false})}>
            <View style={styles.centeredView}></View>
          </TouchableWithoutFeedback>
          <View
            style={{
              width: '100%',
              height: '65%',
              backgroundColor: color.backgroundColor,
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
            }}>
            <View style={styles.modalTitle}>
              <TouchableOpacity
                onPress={() => this.setState({modalLocation: false})}
                style={{paddingHorizontal: 10}}>
                <Image
                  source={images.ic_cancel}
                  resizeMode="contain"
                  style={{width: Sizes.s25, tintColor: color.imageIcon}}
                />
              </TouchableOpacity>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    marginLeft: Sizes.s25,
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: color.imageIcon,
                  }}>
                  Chọn khu vực
                </Text>
              </View>
            </View>
            <FlatList
              data={dataLocation}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              renderItem={this.renderItem}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: getStatusBarHeight(),
  },
  header: {
    backgroundColor: '#1890FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Sizes.s70 - Sizes.s2,
  },
  titile: {
    color: '#fff',
    fontSize: Sizes.h24,
    fontWeight: 'bold',
  },
  IconDraw: {
    left: Sizes.s10,
    padding: Sizes.s25,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: Sizes.s20,
    padding: Sizes.s20,
    flexWrap: 'wrap',
  },

  centeredView: {
    flex: 1,
    backgroundColor: '#00000036',
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
  itemLocation: {
    marginHorizontal: Sizes.h38,
    paddingTop: Sizes.h32,
    paddingBottom: Sizes.h16,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});
