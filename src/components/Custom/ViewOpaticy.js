import React, {Component} from 'react';
import {Text, View, Modal} from 'react-native';

export default class ViewOpaticy extends Component {
  render() {
    return (
      <Modal visible={true} transparent statusBarTranslucent>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000036',
            zIndex: 2,
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
        />
      </Modal>
    );
  }
}
