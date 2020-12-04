import React, {Component} from 'react';
import {connect} from 'react-redux';
import DetailOrderComponent from '../../components/OrderItem/DetailOrderComponent';
import {postGetDetailOrderAction} from '../../redux/actions/OrderItem/PostGetDetailOrderAction';
import {sendRemindAction} from '../../redux/actions/OrderItem/SendRemindAction';

export class DetailOrderContainer extends Component {
  render() {
    return <DetailOrderComponent {...this.props} />;
  }
}
const mapStateToProps = (state) => {
  console.log('STO', state.detailOrderReducers);
  return {
    detailOrderReducers: state.detailOrderReducers,
    remindOrderReducers: state.remindOrderReducers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostGetDetailOrderAction: (data) => {
      dispatch(postGetDetailOrderAction(data));
    },
    onSendRemindAction: (data) => {
      dispatch(sendRemindAction(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailOrderContainer);
