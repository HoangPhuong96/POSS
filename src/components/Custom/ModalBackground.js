import React, {Component} from 'react';
import {Text, View, ActivityIndicator, Modal} from 'react-native';

export default class ModalBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: false,
      mode2: false,
    };
  }
  componentDidMount() {
    this.props.mode == 1 && this.setState({mode: 1});
  }
  render() {
    return (
      <Modal visible={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: this.state.mode == 1 ? 'white' : '#00000036',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#1890FF" />
        </View>
      </Modal>
    );
  }
}
