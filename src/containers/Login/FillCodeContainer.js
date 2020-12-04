import React, {Component} from 'react';
import {connect} from 'react-redux';
import FillCodeComponent from '../../components/Login/FillCodeComponent';
import {postFillCodeAction} from '../../redux/actions/Login/FillCodeAction';

export class FillCodeContainer extends Component {
  render() {
    return <FillCodeComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => {
   
  return {
    fillCodeReducers: state.fillCodeReducers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onPostFillCodeAction: (code) => {
      dispatch(postFillCodeAction(code));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FillCodeContainer);
