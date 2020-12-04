import React, {Component} from 'react';
import {Text, View, ActivityIndicator, Modal} from 'react-native';
import {color} from '../../res/colors';

export default class ViewOpaticyLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: false,
      mode2: false,
      appMode: '',
    };
  }
  componentDidMount() {
    this.props.mode == 1 && this.setState({mode: 1});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.appMode !== this.props.appMode) {
      this.setState({appMode: this.props.appMode});
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: this.state.mode == 1 ? 'white' : '#00000036',
          backgroundColor:color.backgroundColorHome,
          // backgroundColor:'red',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 2,
        }}>
        <ActivityIndicator size="large" color="#1890FF" />
      </View>
    );
  }
}
