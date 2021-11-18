export const CHANGE_PANEL = 'CHANGE_PANEL';
export const TOGGLE_EYE = 'TOGGLE_EYE';
export const TRY_USER = 'TRY_USER';
export const POST_USER = 'POST_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_DOC_PROPS = 'UPDATE_DOC_PROPS';
export const UPDATE_WALL_FILE = 'UPDATE_WALL_FILE';
export const UPDATE_USER_ADD = 'UPDATE_USER_ADD';
export const DISPLAY_MODE = 'DISPLAY_MODE';
export const REDIRECT_PDF = 'REDIRECT_PDF';
export const STORE_NEW_WALL = 'STORE_NEW_WALL';
export const DELETE_WALL_ACTION = 'DELETE_WALL_ACTION';
export const DELETE_WALL_FROM_STORE = 'DELETE_WALL_FROM_STORE';
export const SET_WALL = 'SET_WALL';
export const GET_WALL = 'GET_WALL';
export const GET_WALL_INFO = 'GET_WALL_INFO';
export const SET_WALL_INFO = 'SET_WALL_INFO';
export const CHANGE_POS = 'CHANGE_POS';
export const UPDATE_POS = 'UPDATE_POS';
export const CHANGE_WALL = 'CHANGE_WALL';
export const UPDATE_WALL = 'UPDATE_WALL';
export const EMPTY_WALL = 'EMPTY_WALL';
export const CLEAR_PANEL = 'CLEAR_PANEL';
export const BACK_TO_STAMP = 'BACK_TO_STAMP';
export const MENU_MOB = 'MENU_MOB';
//reducer
export const changePanel = (panel) => ({
  type: CHANGE_PANEL,
  panel: panel,
});
//middleware
export const changePos = (oldPos, newPos, docList) => ({
  type: CHANGE_POS,
  oldPos: oldPos,
  newPos: newPos,
  docList: docList,
});
//(reducer) 
export const updatePos = (docList) => ({
  type: UPDATE_POS,
  docList: docList,
});
//(reducer) 
export const toggleEye = (detailed) => ({
  type: TOGGLE_EYE,
  detailed: detailed
});
//(middleware) 
export const tryUser = (user) => ({
  type: TRY_USER,
  user: user,
});
//(reducer) 
export const postUser = (user) => ({
  type: POST_USER,
  user: user,
});
//(reducer)
export const deleteUser = (user) => ({
  type: DELETE_USER,
  user: user,
});
//(reducer)
export const updateWallInput = (name, prop) => ({
  type: UPDATE_DOC_PROPS,
  name: name,
  prop: prop,
});
//(reducer)
export const updateWallFile = (name, prop) => ({
  type: UPDATE_WALL_FILE,
  name: name,
  prop: prop,
});
//(reducer)
export const updateUserAdd = (name, prop) => ({
  type: UPDATE_USER_ADD,
  name: name,
  prop: prop,
});
//(reducer)
export const displayMode = (displaysquare) => ({
  type: DISPLAY_MODE,
  displaysquare: displaysquare,
});
//(reducer)
export const redirectPDF = () => ({
  type: REDIRECT_PDF,
});
//(reducer)
export const storeNewWall = (wallData) => (
  { type: 'STORE_NEW_WALL', newWall: wallData.newWall, id:wallData.result.wall_id, collabsData: wallData.collabsData }
);
//(middleware)
export const deleteWallAction = (wallId) => (
  { type: 'DELETE_WALL_ACTION', wallId }
);
//(reducer)
export const deleteWallFromStore = (wallId) => (
  { type: 'DELETE_WALL_FROM_STORE', wallId }
);
//(reducer)
export const setWall = (docList) => ({ 
    type: SET_WALL, 
    docList: docList, 
});
//(middleware)
export const getWall = () => ({ 
  type: GET_WALL,  
});
//(middleware)
export const getWallInfo = () => ({ 
  type: GET_WALL_INFO,  
});
//(reducer)
export const setWallInfo = (wall) => ({ 
  type: SET_WALL_INFO,  
  wall: wall,
});
//(middleware)
export const changeWall = () => ({ 
  type: CHANGE_WALL,  
});
//(reducer)
export const updateWall = (wall) => ({ 
  type: UPDATE_WALL,  
  wall: wall,
});
//(reducer)
export const emptyWall = () => ({ 
  type: EMPTY_WALL,  
});
//(reducer)
export const backToStamp = () => ({
  type: BACK_TO_STAMP,
});
//(reducer)
export const menuMobbb = () => ({
  type: MENU_MOB,
});




