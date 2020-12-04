import {Sizes} from '@dungdang/react-native-basic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import React, {Component, useState, useEffect} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ViewOpaticyLoading from '../components/Custom/ViewOpaticyLoading';
import {dataPOS} from '../config/settings';
import images from '../res/images';
import ActionContainer from './Action/ActionContainer';
import FindGuestContainer from './Action/FindGuestContainer';
import FindTransactionContainer from './Action/FindTransactionContainer';
import HomeContainer from './Home/HomeContainer';
import ConfirmApiContainer from './Login/ConfirmApiContainer';
import FillCodeContainer from './Login/FillCodeContainer';
import LoginContainer from './Login/LoginContainer';
import SetupContainer from './Login/SetupContainer';
import OrderItemContainer from './OrderItem/OrderItemContainer';
import AboutContainer from './Setting/AboutContainer';
import SettingContainer from './Setting/SettingContainer';
import Switcher from '../components/Custom/Switcher';
import CustomDrawerContainer from '../containers/Action/ChangeAppModeContainer';

import {color, getAppMode, onChangeAppMode} from '../res/colors';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
  customMenu: {
    flexDirection: 'row',
    marginLeft: Sizes.s20,
    height: Sizes.s200,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Sizes.s7,
  },
  headerMenu: {
    flexDirection: 'row',
    backgroundColor: '#1890FF',
    paddingVertical: Sizes.h36,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewText: {
    flexDirection: 'row',
    height: Sizes.s200,
    flex: 1,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});

export const CustomDrawerContent = (props) => {
  // const {data} = props;
  const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [appModeValue, setAppModeValue] = useState(0);

  useEffect(() => {
    let tmp = async () => {
      let mode = await getAppMode();
      console.log(mode, 'dark start');
      if (mode === 'dark') {
        setAppModeValue(1);
      } else setAppModeValue(0);
    };
    tmp();
  }, []);

  useEffect(() => {
    console.log('props AppMode', props.appMode);
  }, [props.appMode]);

  // const toggleSwitch = () => {
  //   console.log('chức năng đang được cập nhật');
  //   setIsEnabled(
  //     Alert.alert(
  //       'Thông báo',
  //       'Chức năng đang cập nhật',
  //       [{text: 'OK', onPress: () => console.log('OK')}],
  //       {cancelable: false},
  //     ),
  //   );
  // };

  const onChangeSwitch = async (value) => {
    await onChangeAppMode();
    if (value) {
      props.changeAppModeAction(1);
    } else {
      props.changeAppModeAction(0);
    }
  };

  return (
    <View style={{backgroundColor: color.drawer, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: color.header,
          paddingVertical: Sizes.h36,
          borderBottomColor: '#E8E8E8',
          borderBottomWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#FFFFFF',
            paddingTop: Sizes.s40,
            fontWeight: '500',
            fontSize: Sizes.h40,
            // backgroundColor: color.backgroundColor,
          }}>
          Mở Rộng
        </Text>
      </View>
      <View >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Login');
          }}
          style={styles.customMenu}>
          <Image
            source={images.ic_change_out_let}
            resizeMode="contain"
            style={{width: Sizes.s120}}
          />
          <View style={styles.viewText}>
            <Text style={{marginLeft: Sizes.s15, color: color.text}}>
              Change outlet
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('FindTransaction');
          }}
          style={styles.customMenu}>
          <Image
            source={images.ic_transaction}
            resizeMode="contain"
            style={{width: Sizes.s120}}
          />
          <View style={styles.viewText}>
            <Text style={{marginLeft: Sizes.s15, color: color.text}}>
              Find transaction
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('FindGuest')}
          style={styles.customMenu}>
          <Image
            source={images.ic_find_guest}
            resizeMode="contain"
            style={{width: Sizes.s120}}
          />
          <View style={styles.viewText}>
            <Text style={{marginLeft: Sizes.s15, color: color.text}}>
              Find guest
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('About')}
          style={styles.customMenu}>
          <Image
            source={images.ic_about}
            resizeMode="contain"
            style={{width: Sizes.s120}}
          />
          <View style={styles.viewText}>
            <Text style={{marginLeft: Sizes.s15, color: color.text}}>
              About
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.customMenu}>
          {/* <Switch
            trackColor={{false: '#000', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          /> */}
          <Switcher
            value={appModeValue}
            color={color.green}
            onChangeSwitch={(value) => onChangeSwitch(value)}
            size={Sizes.s60}
            style={{
              marginHorizontal: Sizes.s20,
            }}
          />
          <View style={styles.viewText}>
            <Text style={{marginLeft: Sizes.s15, color: color.text}}>
              Dark Mode
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

class MainStackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 'FillCode',
      Loading: true,
    };
  }
  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('@Logined');
      if (value == 'True') {
        try {
          const jsonValue = await AsyncStorage.getItem('@lgPOS');
          // console.log(
          //   'DataFull',
          //   jsonValue != null ? JSON.parse(jsonValue) : null,
          // );
          dataPOS.HKP_API_URL = JSON.parse(jsonValue).HKP_API_URL;
          dataPOS.HKP_LOGO_HOTEL_URL = JSON.parse(jsonValue).HKP_LOGO_HOTEL_URL;
          dataPOS.NAME = JSON.parse(jsonValue).NAME;
          dataPOS.CODE = JSON.parse(jsonValue).CODE;
          dataPOS.POS_API_URL = JSON.parse(jsonValue).POS_API_URL;
          dataPOS.POS_LOGO_HOTEL_URL = JSON.parse(jsonValue).POS_LOGO_HOTEL_URL;
          this.setState({a: 'Login', Loading: false});
        } catch (e) {
          console.log('NO-DT-POSLG', e);
        }
      } else {
        this.setState({a: 'FillCode', Loading: false});
      }
    } catch (e) {
      this.setState({a: 'FillCode', Loading: false});
      console.log('NO-DT-Save', e);
    }
  }
  render() {
    return this.state.Loading == true ? (
      <ViewOpaticyLoading />
    ) : (
      <NavigationContainer>
        {/* <StatusBar translucent /> */}
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: 'white',
            },
            transitionSpec: {
              close: TransitionSpecs.TransitionIOSSpec,
              open: TransitionSpecs.TransitionIOSSpec,
            },
            cardStyleInterpolator: ({current, next, layouts}) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                    {
                      scale: next
                        ? next.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0.9],
                          })
                        : 1,
                    },
                  ],
                },
                overlayStyle: {
                  opacity: next
                    ? current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.5],
                      })
                    : 0,
                  backgroundColor: '#e0e0e0',
                },
              };
            },
          }}
          // defaultNavigationOptionOptions={}
          initialRouteName={this.state.a}>
          <Stack.Screen
            name="FillCode"
            component={FillCodeContainer}
            options={{}}
          />
          <Stack.Screen
            name="ConfirmApi"
            component={ConfirmApiContainer}
            options={{}}
          />
          <Stack.Screen name="Setup" component={SetupContainer} options={{}} />

          <Stack.Screen name="Login" component={LoginContainer} options={{}} />

          <Stack.Screen name="Home" component={MainDraverScreen} options={{}} />

          <Stack.Screen
            name="FindTransaction"
            component={FindTransactionContainer}
            options={{}}
          />
          <Stack.Screen
            name="FindGuest"
            component={FindGuestContainer}
            options={{}}
          />
          <Stack.Screen name="About" component={AboutContainer} options={{}} />
          <Stack.Screen
            name="OrderItemScreen"
            component={OrderItemContainer}
            options={{}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// const MainStackScreen = () => {
//   let a = '';
//   try {
//     const value = AsyncStorage.getItem('@Logined');
//     if (value == 'True') {
//       a = 'Login';
//     }
//   } catch (e) {
//     a = 'FillCode';
//     console.log('NO-DT', e);
//   }

//   return (

//   );
// };

const MainDraverScreen = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Homee"
      drawerContent={(props) => <CustomDrawerContainer {...props} />}>
      <Drawer.Screen name="Homee" component={homeNavigation} />
      <Drawer.Screen name="Action" component={actionNavigation} />
      <Drawer.Screen name="About" component={AboutContainer} />
      <Drawer.Screen name="FindGuest" component={FindGuestContainer} />
      <Drawer.Screen
        name="FindTransaction"
        component={FindTransactionContainer}
      />
    </Drawer.Navigator>
  );
};
const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Homee"
      activeColor="#4dbd74"
      barStyle={{
        backgroundColor: '#fff',
        borderTopColor: 'gray',
        borderTopWidth: 1,
      }}>
      <Tab.Screen
        name="Homee"
        component={homeNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon name="home-outline" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Action"
        component={actionNavigation}
        options={{
          tabBarLabel: 'Action',
          tabBarIcon: ({color}) => (
            <Icon name="vector-combine" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={settingNavigation}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color}) => <Icon2 name="cog" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

const homeNavigation = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeContainer} options={{}} />
    </Stack.Navigator>
  );
};

const actionNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Action">
      <Stack.Screen name="Action" component={ActionContainer} options={{}} />
    </Stack.Navigator>
  );
};
const changeOutLetNavigation = () => {
  <Stack.Navigator>{this.props.goback()}</Stack.Navigator>;
};

const settingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Setting">
      <Stack.Screen name="Setting" component={SettingContainer} options={{}} />
    </Stack.Navigator>
  );
};

export default MainStackScreen;
