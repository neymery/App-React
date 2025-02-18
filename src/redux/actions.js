export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHANGE_COLOR = 'CHANGE_COLOR';
 

export const loginUser = (userData) => ({
  type: LOGIN,
  payload: userData,
});

export const logoutUser = () => ({
  type: LOGOUT,
});

export const changeColor = (color) => ({
  type: CHANGE_COLOR,
  payload: color,
});


