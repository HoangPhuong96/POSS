import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import Icon from 'react-native-vector-icons/FontAwesome5'
class ChangeOutLet extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.backgourdMenu} onPress={() => this.props.onPress()}>
                <Icon name='map-marker' size={30} />
                <Text style={{ paddingVertical: Sizes.s10 }}> {this.props.title} </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    backgourdMenu: {
        borderRadius: Sizes.s10,
        backgroundColor: 'white',
        width: '24%',
        height: Sizes.s120,
        justifyContent: 'center',
        alignItems: 'center'

    }
})

export default ChangeOutLet;