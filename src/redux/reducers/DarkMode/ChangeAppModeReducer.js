import {CHANGE_MODE} from '../../actions/DarkMode/changeAppModeAction';

const initialState = {
  appMode: '',
};

const changeAppModeReducers = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MODE:
      return Object.assign({}, state, {
        appMode: action.data,
      });
    default:
      return state;
  }
};

export default changeAppModeReducers;
