import { Sizes } from '@dungdang/react-native-basic';
import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Button,
  StyleSheet,
} from 'react-native';
import Table from '../Home/TableComponent';
import TabItem from '../Home/TabItem';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Header from '../custom/Header';

const width = Dimensions.get('window').width;

const Tab = createMaterialTopTabNavigator();
const menu = [
  {id: 0, label: 'A'},
  {id: 1, label: 'B'},
  // { id: 2, label: 'C' },
  // { id: 3, label: 'D' },
  // { id: 4, label: 'E' },
];

const layout = [
  {id: 0, contentLayout: <Text>abc</Text>},
  {id: 1, contentLayout: <Text>XYZ</Text>},
  // { id: 2, label: 'screen C' },
  // { id: 3, label: 'screen D' },
  // { id: 4, label: 'screen E' },
];

export default class TabLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      menu: [],
      layout: [],
      layoutHandled: [],
    };
  }
  componentDidMount() {
    this.setState({
      menu: this.props.dataLocation,
      layout: this.props.dataTable,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.dataLocation !== prevProps.dataLocation &&
      this.props.dataTable !== prevProps.dataTable
    ) {
      
      this.setState(
        {
          menu: this.props.dataLocation,
          layout: this.props.dataTable,
        }
      );
    }
  }

  render() {
    return this.state.menu.length > 0 ? (
      <Tab.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          indicatorStyle: {
            backgroundColor: 'transparent',
          },
          tabStyle: {
            width: 100,
          },
        }}>
        {this.state.menu.map((itemTab, index) => {
          return (
            <Tab.Screen name={itemTab.NAME} key={itemTab.LOCATION_ID}>
              {(props) => (
                <TabItem
                  {...props}
                  tabData={itemTab}
                  tableData={this.state.layout}
                />
              )}
            </Tab.Screen>
          );
        })}
      </Tab.Navigator>
    ) : null;
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: Sizes.s10,
    padding: Sizes.s10,
    flexWrap: 'wrap',
    width: Dimensions.get('window').width,
  },
});
