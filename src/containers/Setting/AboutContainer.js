import React, { Component } from 'react'
import { connect } from 'react-redux'
import AboutComponent from '../../components/Setting/AboutComponent'

export class AboutContainer extends Component {
    render() {
        return (
         <AboutComponent {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    appMode : state.changeAppModeReducers.appMode
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer)
