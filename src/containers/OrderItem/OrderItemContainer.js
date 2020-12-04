import React, {Component} from 'react';
import {connect} from 'react-redux';
import OrderItemComponent from '../../components/OrderItem/OrderItemComponent';
import {postGetDetailOrderAction} from '../../redux/actions/OrderItem/PostGetDetailOrderAction';
class OrderItemContainer extends Component {
  render() {
    return <OrderItemComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    // detailOrderReducers: state.detailOrderReducers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onPostGetDetailOrderAction: (data) => {
    //   dispatch(postGetDetailOrderAction(data));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemContainer);
