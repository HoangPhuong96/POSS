import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { userData } from '../../config/settings';
export default class SettingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabData: [],
      tableData: [],
      opacityView: false,
      visibleInfoGuest: false,
      locationSelected: 0,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <Text style={styles.titile}>Setting</Text>
        </SafeAreaView>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('About')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: Sizes.s80,
                borderBottomWidth: 1,
              }}>
              <Text style={{ marginLeft: Sizes.s10 }}>About</Text>
              <Icon
                style={{ marginRight: Sizes.s15 }}
                name="angle-right"
                size={Sizes.s25}
              />
            </View>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#4dbd73',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titile: {
    color: '#fff',
    fontSize: Sizes.h24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: Sizes.s10,
    padding: Sizes.s10,
    flexWrap: 'wrap',
  },
});
