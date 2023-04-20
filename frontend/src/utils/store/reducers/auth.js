export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

const emptyAuth = {
  logged: false,
  jwt: '',
  userID: '',
  role: ''
}

const initialState = {
  ...emptyAuth,
  ...JSON.parse(localStorage.getItem('store_auth'))
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      const newState = {
        ...state,
        ...action.payload,
        logged: true
      }
      localStorage.setItem('store_auth', JSON.stringify(newState))
      return newState;
      
    case LOGOUT:
      localStorage.clear();
      return {
        ...emptyAuth
      }
  }

  return state;
}

export default reducer;