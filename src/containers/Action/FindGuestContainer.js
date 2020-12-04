import React, {Component} from 'react';
import FindGuest from '../../components/Action/FindGuest';
import {connect} from 'react-redux';
import {getFindGuestAction} from '../../redux/actions/FindGuest/FindGuestAction';
class FindGuestContainer extends Component {
  render() {
    return <FindGuest {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    getFindGuestReducers: state.getFindGuestReducers,
    appMode: state.changeAppModeReducers.appMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFindGuestAction: () => {
      dispatch(getFindGuestAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindGuestContainer);
