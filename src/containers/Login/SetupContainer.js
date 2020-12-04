import React, { Component } from 'react';
import SetupComponent from '../../components/Login/SetUpComponent';
class SetupContainer extends Component {
    render() {
        return (
            <SetupComponent {...this.props} />
        )
    }
}
export default SetupContainer;