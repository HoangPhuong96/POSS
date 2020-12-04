import {Sizes} from '@dungdang/react-native-basic';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {color} from '../../../res/colors';

const ListItemRequest = (props) => {
  const [selected, setSetlected] = useState(props.select);

  return (
    <View style={[props.style, selected && {backgroundColor: '#1890FF'}]}>
      <TouchableOpacity
        onPress={() => {
          setSetlected(!selected);
          props.onPress(!selected);
        }}>
        <Text
          style={[
            {padding: Sizes.s20},
            selected ? {color: color.text} : {color: color.text},
          ]}>
          {props.NAME}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListItemRequest;
