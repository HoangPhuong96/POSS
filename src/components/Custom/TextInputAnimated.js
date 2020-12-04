import { Sizes } from '@dungdang/react-native-basic';
import React, { Component } from 'react';
import { Animated, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import {color} from '../../res/colors'
const BASE_SIZE = Sizes.h32; //text size and padding size
const VIEW_HEIGHT = BASE_SIZE * 3.5; //chiều cao của view tổng

export default class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      hidePassword: true,
      labelHeight: 0,
    };
    this.slideLabel = new Animated.Value(0);
    this.textInput = React.createRef();
  }

  UNSAFE_componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
    Animated.timing(this.slideLabel, {
      toValue: BASE_SIZE,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      this.slideLabel.setValue(0);
    });
    this.props.onFocus(this.state.isFocused);
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
    this.props.onBlur(this.state.isFocused);
  };

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const { title, ...props } = this.props;
    const { isFocused, labelHeight } = this.state;
    const centerLabel = (VIEW_HEIGHT - labelHeight - 2) / 2;

    const labelStyle = {
      color: this.props.disabled ? 'black' : color.text,
      padding: 0,
      textAlignVertical: 'top',
      position: 'absolute',
      left: BASE_SIZE,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [centerLabel, BASE_SIZE / 2],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [BASE_SIZE, BASE_SIZE * 0.8125],
      }),
      // backgroundColor: '#00000036',
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.textInput.current.focus();
        }}
        style={[
          styles.container,
          isFocused && { borderColor: color.labelFocus },
          this.props.style,
          // {justifyContent: 'center'},
        ]}>
        <Animated.Text
          onLayout={(event) => {
            labelHeight === 0 &&
              this.setState({ labelHeight: event.nativeEvent.layout.height });
          }}
          style={[labelStyle, this.props.titleStyles]}>
          {title}
        </Animated.Text>

        <TextInput
          {...props}
          ref={this.textInput}
          autoCorrect={false}
          autoCompleteType="off"
          editable={!this.props.disabled}
          style={[styles.textInput, this.props.disabled && { color: 'gray' }]}
          style={styles.textInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </TouchableOpacity>
    );
  }
}

FloatingLabelInput.defaultProps = {
  onFocus: () => { },
  onBlur: () => { },
};
const styles = StyleSheet.create({
  container: {
    borderColor: 'gray',
    borderRadius: BASE_SIZE / 2,
    borderWidth: 1,
    marginHorizontal: BASE_SIZE,
    paddingHorizontal: BASE_SIZE,
    paddingVertical: BASE_SIZE,
    height: VIEW_HEIGHT,
    justifyContent: 'center',
  },
  textInput: {
    width: '90%',
    position: 'absolute',
    left: BASE_SIZE,
    bottom: BASE_SIZE / 2 - 4,
    // top: BASE_SIZE / 2,
    fontSize: BASE_SIZE,
    padding: 0,
    borderWidth: 0,
    // backgroundColor: '#00000036',
  },
});
