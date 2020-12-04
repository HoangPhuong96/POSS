export const POST_LOGIN = 'POST_LOGIN';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR';
export const POST_LOGOUT = 'POST_LOGOUT';

export const loginAction = (user, password) => {
  return {
    type: POST_LOGIN, 
    data: {user, password},
  };
};

export const logoutAction = () => {
  return {
    type: POST_LOGOUT,
    data: null,
  };
};

export const GET_ALLPROPERTY = 'GET_ALLPROPERTY';
export const GET_ALLPROPERTY_SUCCESS = 'GET_ALLPROPERTY_SUCCESS';
export const GET_ALLPROPERTY_ERROR = 'GET_ALLPROPERTY_ERROR';

export const getAllPropertyAction = () => {
  return {
    type: GET_ALLPROPERTY,
  };
};

export const GET_OUTLET = 'GET_OUTLET';
export const GET_OUTLET_SUCCESS = 'GET_OUTLET_SUCCESS';
export const GET_OUTLET_ERROR = 'GET_OUTLET_ERROR';

export const getOutletAction = (code) => {
  return {
    type: GET_OUTLET,
    data: {code},
  };
};
