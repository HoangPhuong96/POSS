import React, { Component } from 'react'
import SettingComponents from '../../components/Setting/SettingComponents'
class SettingContainer extends Component {
    render() {
        return (
            <SettingComponents {...this.props} />
        )
    }
}

export default SettingContainer
