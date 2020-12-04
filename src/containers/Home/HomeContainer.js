import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeComponent from '../../components/Home/HomeComponent';
import {getAllTableMapAction} from '../../redux/actions/Table/TableAction';
import {getAllLocation} from '../../redux/actions/Location/LocationAction';
import {changeAppModeAction} from '../../redux/actions/DarkMode/changeAppModeAction';
// import {changeAppModeReducer} from '../../redux/reducers/DarkMode/ChangeAppModeReducer';
export class HomeContainer extends Component {
  render() {
    return <HomeComponent {...this.props} />;
  }
}
const mapStateToProps = (state) => {
  return {
    getLocationReducers: state.getLocationReducers,
    tableMapReducers: state.tableMapReducers,
    appMode: state.changeAppModeReducers.appMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetLocationAction: () => {
      dispatch(getAllLocation());
    },
    onGetAllTableMapAction: () => {
      dispatch(getAllTableMapAction());
    },
    changeAppModeAction: (data) => {
      dispatch(changeAppModeAction(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
