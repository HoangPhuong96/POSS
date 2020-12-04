import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginComponent from '../../components/Login/LoginComponent';
import {
  getAllPropertyAction,
  getOutletAction,
} from '../../redux/actions/Login/LoginAction';
import {postRegisterDeviceAction} from '../../redux/actions/Login/RegisterDeviceAction';
import {postCheckDeviceAction} from '../../redux/actions/Login/CheckDeviceAction';
import {changeAppModeAction} from '../../redux/actions/DarkMode/changeAppModeAction';
import {changeAppModeReducers} from '../../redux/reducers/DarkMode/ChangeAppModeReducer';

export class LoginContainer extends Component {
  render() {
    return <LoginComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    allPropertyReducers: state.allPropertyReducers,
    outletReducers: state.outletReducers,
    statusRegisterDevice: state.registerDeviceReducers,
    statusCheckDevice: state.checkDeviceReducers,
    appMode: state.changeAppModeReducers.appMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllPropertyAction: () => {
      dispatch(getAllPropertyAction());
    },
    onGetOutletAction: (code) => {
      dispatch(getOutletAction(code));
    },
    onPostRegisterDeviceAction: (info) => {
      dispatch(postRegisterDeviceAction(info));
    },
    onPostCheckDeviceAction: (info) => {
      dispatch(postCheckDeviceAction(info));
      // console.log('okkkkk');
    },
    changeAppModeAction: (data) => {
      dispatch(changeAppModeAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
