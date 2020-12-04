import React, {Component} from 'react';
import {connect} from 'react-redux';
import MenuOrderComponent from '../../components/OrderItem/MenuOrderComponent';
import {postGetCategoryMenuAction} from '../../redux/actions/OrderItem/PostGetCategoryMenuAction';
import {postGetFullMenuAction} from '../../redux/actions/OrderItem/PostGetFullMenuAction';
import {postInsertOrderAction} from '../../redux/actions/OrderItem/PostInsertOrderAction';
import {postGetCondimentuAction} from '../../redux/actions/OrderItem/PostGetCondimentAction';
import {postGetRequestAction} from '../../redux/actions/OrderItem/PostGetRequestAction';
import {postSearchItemAction} from '../../redux/actions/SearchItem/SearchItemAction';
export class MenuOrderContainer extends Component {
  render() {
    return <MenuOrderComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  // console.log(state.requestReducers);
  return {
    categoryMenuReducers: state.categoryMenuReducers,
    fullMenuReducers: state.fullMenuReducers,
    condimentReducers: state.condimentReducers,
    requestReducers: state.requestReducers,
    insertOrderReducers: state.postInsertOrderReducers,
    searchItemReducers: state.searchItemReducers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCategoryMenuAction: () => {
      dispatch(postGetCategoryMenuAction());
    },
    onPostGetFullMenuAction: () => {
      dispatch(postGetFullMenuAction());
    },
    onPostInsertOrderAction: (data) => {
      dispatch(postInsertOrderAction(data));
    },
    onPostGetCondimentuAction: (id) => {
      dispatch(postGetCondimentuAction(id));
    },
    onPostGetRequestAction: (id) => {
      dispatch(postGetRequestAction(id));
    },
    onPostSearchItemAction:(info) =>{
      dispatch(postSearchItemAction(info))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuOrderContainer);
