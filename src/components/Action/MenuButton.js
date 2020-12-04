import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import Icon from 'react-native-vector-icons/FontAwesome5'

const MenuButton = props => {
    return (
        <TouchableOpacity style={styles.backgourdMenu} onPress={() => props.onPress()}>
            <Icon name={props.icon} size={30} color={props.color} />
            <Text style={{ fontSize: Sizes.h22, }}> {props.title} </Text>
        </TouchableOpacity >
    )
}


const styles = StyleSheet.create({
    backgourdMenu: {
        borderRadius: Sizes.s10,
        backgroundColor: 'white',
        width: '24%',
        height: Sizes.s120,
        justifyContent: 'center',
        alignItems: 'center',


    }
})
export default MenuButton;