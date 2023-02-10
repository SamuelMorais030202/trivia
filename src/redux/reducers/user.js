const INITIAL_STATE = {
  userName: '',
  userEmail: '',
};
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_LOGIN':
    return {
      ...state,
      userName: action.payload.userName,
      userEmail: action.payload.userEmail,
    };
  default:
    return state;
  }
};
export default user;
