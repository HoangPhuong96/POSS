import React, {Component} from 'react';
import FindTransaction from '../../components/Action/FindTransaction';
import {connect} from 'react-redux';
import {getFindTransaction} from '../../redux/actions/FindTransaction/FindTransactionAction';

class FindTransactionContainer extends Component {
  render() {
    return <FindTransaction {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    getFindTransactionReducers: state.getFindTransactionReducers,
    appMode: state.changeAppModeReducers.appMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFindTransactionAction: () => {
      dispatch(getFindTransaction());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FindTransactionContainer);
