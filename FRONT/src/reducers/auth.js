const initialState = {
  id: 1,
  email: '',
  password: '',
  token: '',
  name: '',
  lastname: '',
  role: '',
  loggedUserName: '',
  logged: false,
  credentials: {
    email: '',
    password: '',
  },
  users: '',
  loggedUserInfos: {
    id: null,
    name: '',
    lastname: '',
  },
  logError: '',
  isMenuOpen: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'TOGGLE_USER_MENU':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    case 'STORE_USER_LOGIN_INPUT':
      return {
        ...state,
        credentials: {
          ...state.credentials,
          [action.name]: action.inputValue,
        },
      };
    case 'STORE_USER_REGISTER_INPUT':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'POPULATE_LOGGEDINFOS_FROM_LOCALSTORAGE':
      return {
        ...state,
        logged: true,
        loggedUserName: `${action.name} ${action.lastname}`,
        name: action.name,
        lastname: action.lastname,
        loggedUserInfos: {
          name: action.name,
          lastname: action.lastname,
          id: action.userId,
        },
      };
    case 'UPDATED_PROFILE':
      localStorage.setItem('name', action.newProfile.name);
      localStorage.setItem('lastname', action.newProfile.lastname);
      // localStorage.setItem('userId', action.updateProfile.updatedUser.id );
      return {
        ...state,
        loggedUserName: `${action.newProfile.name} ${action.newProfile.lastname}`,
        name: action.newProfile.name,
        lastname: action.newProfile.lastname,
        loggedUserInfos: {
          name: action.newProfile.name,
          lastname: action.newProfile.lastname,
          // id: action.userData.result.id
        },
        credentials: {
          email: '',
          password: '',
        },
        // logged: true,
      };
    case 'LOG_USER':
      localStorage.setItem('profile', JSON.stringify(action.userData.token));
      localStorage.setItem('name', action.userData.result.name);
      localStorage.setItem('lastname', action.userData.result.lastname);
      localStorage.setItem('userId', action.userData.result.id);
      return {
        ...state,
        loggedUserName: `${action.userData.result.name} ${action.userData.result.lastname}`,
        name: action.userData.result.name,
        lastname: action.userData.result.lastname,
        loggedUserInfos: {
          name: action.userData.result.name,
          lastname: action.userData.result.lastname,
          id: action.userData.result.id,
        },
        credentials: {
          email: '',
          password: '',
        },
        logged: true,
        logError: '',
        isMenuOpen: false,
      };
    case 'DISCONNECT_USER':
      localStorage.clear();
      return {
        ...state,
        loggedUserName: '',
        name: '',
        lastname: '',
        logged: false,
      };
    case 'LOGIN_ERRORS':
      return {
        ...state,
        logError: action.message,
      };
    case 'CLEAR_LOGIN_ERRORS':
      return {
        ...state,
        logError: '',
      };
    case 'STORE_USERS':
      return {
        ...state,
        users: [...action.users],
      };
    case 'UPDATE_USERS':
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
