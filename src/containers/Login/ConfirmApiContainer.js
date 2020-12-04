import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmApiComponent from '../../components/Login/ConfirmApiComponent'

export class ConfirmApiContainer extends Component {
    render() {
        return (
           <ConfirmApiComponent {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmApiContainer)
