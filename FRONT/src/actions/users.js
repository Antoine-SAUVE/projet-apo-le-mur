export const storeUSerInputValue = (name, value) => (
  { type: 'STORE_USER_LOGIN_INPUT', name: name, inputValue: value }
);

export const storeUserRegisterInput = (inputName, inputValue) => (
  { type: 'STORE_USER_REGISTER_INPUT', name: inputName, value: inputValue }
);

export const createUser = () => (
  { type: 'CREATE_USER' }
);

export const logUser = (userData) => (
  { type: 'LOG_USER', userData: userData }
);

export const submitUserLogin = () => (
  { type: 'SUBMIT_USER_LOGIN' }
);

export const disconnectUser = () => (
  { type: 'DISCONNECT_USER' }
);

export const getAllUsers = () => (
  { type: 'GET_ALL_USERS' }
);

export const storeAllUsers = (users) => (
  { type: 'STORE_USERS', users }
);

export const populateLoggedInfosIfLogged = (name, lastname, userId) => (
  {
    type: 'POPULATE_LOGGEDINFOS_FROM_LOCALSTORAGE', name, lastname, userId,
  }
);

export const updateUser = () => (
  { type: 'UPDATE_USER' }
);

export const updatedUser = (newProfile) => (
  { type: 'UPDATED_PROFILE', newProfile }
);

export const loginErrors = (error) => (
  { type: 'LOGIN_ERRORS', message: error.message }
);

export const clearLoginErrors = () => (
  { type: 'CLEAR_LOGIN_ERRORS' }
);

export const toggleUserMenu = () => (
  { type: 'TOGGLE_USER_MENU' }
);
