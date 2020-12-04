import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';

export default class ProcessLoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {step: 1, loading: '25%', isStep2: false, isStep3: false};
  }
  componentDidMount() {
    switch (this.props.Step) {
      case 1:
        this.setState({loading: '25%'});
        break;
      case 2:
        this.setState({loading: '75%', isStep2: true,isStep3: false});
        break;
      case 3:
        this.setState({loading: '100%',  isStep2: true,isStep3: true});
        break;

      default:
        break;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '75%',
            height: Sizes.s30,
            alignItems: 'center',
            marginBottom: Sizes.s15,
          }}>
          <Text style={{color:this.state.isStep2 == true ?'#1890FF' : 'black'}}>Xác nhận API</Text>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View
            style={{width: '75%', height: Sizes.s30, justifyContent: 'center'}}>
            <View
              style={{
                width: '100%',
                height: Sizes.s10,
                backgroundColor: '#D9D9D9',
                borderRadius: Sizes.s30,
              }}
            />
            <View
              style={{
                position: 'absolute',
                height: Sizes.s30,
                width: Sizes.s30,
                borderRadius: Sizes.s15,
                backgroundColor: '#1890FF',
              }}
            />
            <View
              style={{
                position: 'absolute',
                height: Sizes.s30,
                width: Sizes.s30,
                borderRadius: Sizes.s15,
                backgroundColor: 'white',
                alignSelf: 'center',
                borderColor: '#1890FF',
                borderWidth: 1,
              }}
            />
            <View
              style={{
                position: 'absolute',
                height: Sizes.s30,
                width: Sizes.s30,
                borderRadius: Sizes.s15,
                backgroundColor: 'white',
                alignSelf: 'flex-end',
                borderColor: '#1890FF',
                borderWidth: 1,
              }}
            />
          </View>

          <View
            style={{
              width: '75%',
              height: Sizes.s30,
              justifyContent: 'center',
              position: 'absolute',
            }}>
            <View
              style={{
                width: this.state.loading,
                height: Sizes.s5,
                backgroundColor: '#1890FF',
              }}
            />
            <View
              style={{
                position: 'absolute',
                height: Sizes.s30,
                width: Sizes.s30,
                borderRadius: Sizes.s15,
                backgroundColor: '#1890FF',
              }}
            />
            <View
              style={{
                position: 'absolute',
                height: Sizes.s30,
                width: Sizes.s30,
                borderRadius: Sizes.s15,
                backgroundColor:
                  this.state.isStep2 == true ? '#1890FF' : 'white',
                borderWidth: 1,
                borderColor: '#1890FF',
                alignSelf: 'center',
              }}
            />
            <View
              style={{
                position: 'absolute',
                height: Sizes.s30,
                width: Sizes.s30,
                borderRadius: Sizes.s15,
                backgroundColor:
                  this.state.isStep3 == true ? '#1890FF' : 'white',
                borderWidth: 1,
                borderColor: '#1890FF',
                alignSelf: 'flex-end',
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '75%',
            
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: Sizes.s10,
          }}>
          <Text style={{color:'#1890FF'}}>Nhập code</Text>
          <Text style={{color:this.state.isStep3 == true ?'#1890FF' : 'black'}}>Đăng nhập</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.s30,
    alignItems: 'center',
  },
});
