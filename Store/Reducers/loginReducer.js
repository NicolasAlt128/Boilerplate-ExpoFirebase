const initialState = { isLogged: false, userInfos: null };

function connexion(state = initialState, action){
  let nextState;
  switch(action.type){
    case 'LOGIN':
      nextState = {
        ...state,
        isLogged: action.value.isLogged,
        userInfos: action.value['userInfos']
      }
      return nextState;
    case 'LOGOUT':
      nextState = {
        ...state,
        isLogged: false,
        userInfo: null
      }
      return nextState || state;
    default:
      return state;
  }
}

export default connexion;
