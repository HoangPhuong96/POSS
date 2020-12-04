import React from 'react';
import {Text, View, StyleSheet, Image, SafeAreaView} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import images from '../../res/images/index';
import {color} from '../../res/colors'

const GuestItem =  (props) => {
  const currencyFormat = (num) => {
    if (num == 0) {
      return 0;
    } else {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flexDirection: 'row'}}>
        <Image
          source={images.ic_guest}
          resizeMode="contain"
          style={{
            width: Sizes.s100,
            height: Sizes.s200,
            marginRight: Sizes.s25,
          }}
        />
        <View style={styles.guest}>
          <View style={{marginTop: Sizes.s20}}>
            <Text style={{fontWeight: 'bold',color:color.text}}>{props.FULL_NAME}</Text>
            <Text style={{paddingVertical: Sizes.s10,color:color.text}}>
              {props.CONFIRMATION_NO}
            </Text>
            <Text style ={{color:color.text}} >{props.RESV_STATUS}</Text>
          </View>
          <View style={{marginTop: Sizes.s20}}>
            <Text style={{textAlign: 'right', paddingVertical: Sizes.s10,color:color.text}}>
              Phòng {props.ROOM_CODE}
            </Text>
            <Text style={{textAlign: 'right', color: 'red'}}>
              {currencyFormat(props.BALANCE)}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  guest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    width: '83%',
  },
});
export default GuestItem;
