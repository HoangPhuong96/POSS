import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Sizes} from '@dungdang/react-native-basic';
import Icon from 'react-native-vector-icons/AntDesign';
import MenuOrderContainer from '../../containers/OrderItem/MenuOrderContainer';
import DetailOrderContainer from '../../containers/OrderItem/DetailOrderContainer';
import {getStatusBarHeight} from '../../res/values/getStatusBarHeight';
import {color} from '../../res/colors';

const Tab = createMaterialTopTabNavigator();
class OrderItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      visible: false,
      detailsItem: [],
      showTab: false,
      isRemind: false,
      visibleRemind: false,
      total: 0,
    };
  }
  componentDidMount() {
    console.log(this.props.route.params.guestInfo);
    // this.getOrderItem();\
    this.loadDone();
    // this.props.onPostGetDetailOrderAction(this.props.route.params.checkID);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.detailOrderReducers !== this.props.detailOrderReducers) {
      this.setState(
        {detailsItem: this.props.detailOrderReducers},
        () => {},
        // console.log(this.props.detailOrderReducersr)
      );
    }
  }
  loadDone = () => {
    this.setState({showTab: true});
  };

  getOrderItem = () => {
    // CheckDetailService.getOrderedItemCheck(
    //   this.props.route.params.checkID,
    // ).then((res) => {
    //   if (this._isMounted) {
    //     this.setState({
    //       detailsItem: res.data,
    //       showTab: true,
    //     });
    //   }
    // });
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.backgroundColor,
        }}>
        <SafeAreaView style={{backgroundColor: color.aboutHeader}} />
        <View style={{
              height: Sizes.s100,
              backgroundColor: '#1890FF',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
              backgroundColor: color.aboutHeader,
        }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 5}}
            onPress={() => this.props.navigation.goBack()}>
            <Icon
              name="left"
              size={20}
              color="white"
              style={{paddingLeft: Sizes.s20}}
            />
          </TouchableOpacity>
          {this.state.showTab ? (
            <Text style={styles.titile}>
              Bàn {this.props.route.params.tableName} -{' '}
              {this.props.route.params.guestInfo.GUEST_NAME}
            </Text>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}

          {/* <Icon
            name="ellipsis-v"
            size={20}
            style={{ color: 'white', marginRight: Sizes.s15 }}
          /> */}
        </View>

        {this.state.showTab ? (
          <Tab.Navigator
            // initialRouteName={
            //   this.props.isSave ? "DetailOrderScreen" : "CaptainOrderScreen"
            // }
            tabBarOptions={{
              activeTintColor: '#1890FF',
              labelStyle: {
                fontWeight: 'bold',
                textTransform: 'none',
              },
              tabStyle:{backgroundColor:color.drawer},
              inactiveTintColor: '#8C8C8C',
              indicatorStyle: {
                backgroundColor: '#1890FF',
              },
            }}>
            <Tab.Screen
              name="CaptainOrderScreen"
              component={MenuOrderContainer}
              options={{
                tabBarLabel: 'Món đã đặt',
              }}
              initialParams={{guestInfo: this.props.route.params.guestInfo}}
            />
            <Tab.Screen
              name="DetailOrderScreen"
              component={DetailOrderContainer}
              options={{tabBarLabel: 'Đã gửi bếp'}}
              initialParams={{
                // detailsItem: this.state.detailsItem,
                checkID: this.props.route.params.checkID,
              }}
            />
          </Tab.Navigator>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Sizes.s100,
    backgroundColor: '#1890FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
  },
  titile: {
    color: '#fff',
    fontSize: Sizes.h28,
    fontWeight: 'bold',
  },
});

export default OrderItemComponent;
