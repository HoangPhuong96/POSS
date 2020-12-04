import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';


class TabLocation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabData: [],
            selectedFloor: 1
        }

    }
    async componentDidMount() {
        this.setState({ tabData: this.props.data, selectedFloor: this.props.LocationSelected })
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({
                tabData: this.props.data,
                selectedFloor: this.props.LocationSelected
            });
        }
    }
    renderTabLayout() {

        let floor = [];
        this.state.tabData.map((item, index) => {
            floor.push(
                <TouchableOpacity onPress={() => {
                    this.setState({ selectedFloor: item.id }, () => this.props.onChangeSelect(item.value))
                }} style={styles.itemFloor} key={index}><Text style={this.state.selectedFloor === item.id ? { color: 'red' } : { color: 'black' }}>{item.label}</Text></TouchableOpacity>
            )
        })
        return floor;
    }
    render() {

        return (
            <View style={styles.container} >
                <View style={styles.TabCustom}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, }}>
                        <View style={{ flexDirection: 'row' }}>{this.renderTabLayout()}</View>
                    </ScrollView>
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        backgroundColor: 'white',
    },
    TabCustom: {
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    itemFloor: {
        paddingVertical: Sizes.s10,
        paddingHorizontal: Sizes.s45,

    }
})

export default TabLocation;