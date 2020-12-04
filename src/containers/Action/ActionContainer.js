import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionComponents from '../../components/Action/ActionComponents';


class ActionContainer extends Component {
    render() {
        return (
            <ActionComponents {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ActionContainer);