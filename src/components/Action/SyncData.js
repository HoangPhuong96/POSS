import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import Icon from 'react-native-vector-icons/FontAwesome5'
class SyncData extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.backgourdMenu}>
                <Icon name='sync-alt' size={30} />
                <Text style={{ paddingVertical: Sizes.s10 }}> SyncData </Text>
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

export default SyncData;