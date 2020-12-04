import {Sizes} from '@dungdang/react-native-basic';
import {
  arrayIsEmpty,
  objectIsNull,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {color} from '../../res/colors';

import {backToggle} from '../../config/settings';
import {getStatusBarHeight} from '../../res/values/getStatusBarHeight';
import GuestItem from './GuestItem';

class FindGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      refreshing: false,
      appMode: '',
    };
  }

  async componentDidMount() {
    this.props.onGetFindGuestAction();
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.appMode !== this.props.appMode) {
      this.setState({appMode: this.props.appMode});
    }

    if (prevProps.getFindGuestReducers !== this.props.getFindGuestReducers) {
      if (!objectIsNull(this.props.getFindGuestReducers)) {
        this.setState({
          data: this.props.getFindGuestReducers,
          isLoading: true,
          refreshing: false,
        });
      }
    }
  }
  async handleRefresh() {
    this.setState({refreshing: true});
    this.props.onGetFindGuestAction();
  }
  renderItem = ({item, index}) => (
    <GuestItem
      color={index % 2 === 0 ? 'red' : 'green'}
      BALANCE={item.BALANCE}
      ROOM_CODE={item.ROOM_CODE}
      RESV_NAME_ID={item.RESV_NAME_ID}
      RESV_STATUS={item.RESV_STATUS}
      CONFIRMATION_NO={item.CONFIRMATION_NO}
      FULL_NAME={item.FULL_NAME}
    />
  );
  render() {
    const {data, isLoading} = this.state;
    const showContent =
      isLoading === true ? (
        <FlatList
          onRefresh={() => this.handleRefresh()}
          refreshing={this.state.refreshing}
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#1890FF" />
        </View>
      );
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.drawer,
        }}>
        <SafeAreaView style={{backgroundColor: color.aboutHeader}} />
        <View
          style={{
            height: Sizes.s100,
            marginTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
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
            <Icon name="left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.titile}>Find Guest</Text>
        </View>
        {showContent}
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
    marginTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
    backgroundColor: '#1890FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titile: {
    color: '#fff',
    fontSize: Sizes.h32,
    fontWeight: 'bold',
  },
});

export default FindGuest;
