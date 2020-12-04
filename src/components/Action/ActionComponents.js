import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Sizes } from '@dungdang/react-native-basic'

import MenuButton from './MenuButton'

const data = [
    { title: 'ChangeOutlet', icon: 'map-marker', screen: 'Login', color: 'orange' },
    { title: 'FindTransaction', icon: 'search', screen: 'FindTransaction', color: 'green' },
    { title: 'FindGuest', icon: 'search', screen: 'FindGuest', color: 'skyblue' },
    { title: 'SyncData', icon: 'sync-alt', screen: 'SyncData', color: 'skyblue' }
]
class ActionComponents extends Component {

    render() {
        const menuOption = data.map((item, index) => {
            return <MenuButton onPress={() => this.props.navigation.navigate(item.screen)}
                key={index}
                title={item.title}
                icon={item.icon}
                screen={item.screen}
                color={item.color}
            />
        })
        return (
            <View style={styles.container} >
                <View style={styles.menuButton}>
                    {menuOption}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    menuButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.s10,
        paddingVertical: Sizes.s10,
        // flexWrap: 'wrap',
    }
})
export default ActionComponents;