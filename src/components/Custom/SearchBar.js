import { Sizes } from '@dungdang/react-native-basic';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { color } from '../../res/colors';

import images from '../../res/images';
import { getStatusBarHeight } from '../../res/values/getStatusBarHeight';

const { width, height } = Dimensions.get('window');

const SearchBar = (props) => {
  const [show, setShow] = useState(false);
  const animation = new Animated.Value(0);
  const inputRef = useRef();
  const onShow = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const onHide = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const inputWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.5],
  });

  useEffect(() => {
    if (show) {
      onShow();
      inputRef.current.focus();
    } else {
      onHide();
    }
  }, [show]);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: Sizes.h32,
      }}>
      <TouchableOpacity
        onPress={() => {
          setShow(!show);
        }}>
        <Image
          source={images.ic_search}
          resizeMode="contain"
          style={{ width: Sizes.s60 }}
        />
      </TouchableOpacity>

      <Animated.View style={{ width: inputWidth }}>
        <TextInput
          ref={inputRef}
          placeholder="Search"
          keyboardAppearance={color.keyboardAppearance}
          onSubmitEditing={(e) => {
            inputRef.current.clear();
            inputRef.current.blur();
            onHide();
            props.onSubmitEditing(e);
          }}
          onBlur={() => {
            inputRef.current.clear();
            inputRef.current.blur();

            onHide();
            setTimeout(() => {
              setShow(false);
            }, 300);
            props.onBlur();
          }}
          onChangeText={(text) => props.postSearch(text)}
          placeholderTextColor="white"
          style={{
            color: 'white',
            borderColor: 'white',
            borderBottomWidth: 1,
            padding: 0,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default SearchBar;
SearchBar.defaultProps = {
  onBlur: () => { },
  onChangeText: () => { },
};
