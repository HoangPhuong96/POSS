import React from 'react';

import {connect} from 'react-redux';
import {CustomDrawerContent} from '../../containers/App';
import {changeAppModeAction} from '../../redux/actions/DarkMode/changeAppModeAction';

class CustomDrawerContainer extends React.Component {
  render() {
    return <CustomDrawerContent {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAppModeAction: (data) => {
      dispatch(changeAppModeAction(data));

    },
  };
};

const mapStateToProps = (state) => {
    console.log(state.changeAppModeReducers,'appMode')
  return {
    appMode: state.changeAppModeReducers.appMode,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawerContainer);
