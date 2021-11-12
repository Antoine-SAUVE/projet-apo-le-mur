export const CHANGE_PANEL = 'CHANGE_PANEL';
export const TOGGLE_EYE = 'TOGGLE_EYE';
export const POST_USER = 'POST_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_DOC_PROPS = 'UPDATE_DOC_PROPS';
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

export const changePanel = (panel) => ({
  type: CHANGE_PANEL,
  panel: panel,
});

export const changePos = (oldPos, newPos) => ({
  type: CHANGE_POS,
  oldPos: oldPos,
  newPos: newPos,
});

export const toggleEye = (detailed) => ({
  type: TOGGLE_EYE,
  detailed: detailed
});

export const postUser = (user) => ({
  type: POST_USER,
  users: user,
});

export const deleteUser = (user) => ({
  type: DELETE_USER,
  user: user,
});

export const updateWallInput = (name, prop) => ({
  type: UPDATE_DOC_PROPS,
  name: name,
  prop: prop,
});

export const displayMode = (displaysquare) => ({
  type: DISPLAY_MODE,
  displaysquare: displaysquare,
});

export const redirectPDF = () => ({
  type: REDIRECT_PDF,
});

export const storeNewWall = (wallData) => (
  { type: 'STORE_NEW_WALL', newWall: wallData.newWall, id:wallData.result.wall_id, collabsData: wallData.collabsData }
);

export const deleteWallAction = (wallId) => (
  { type: 'DELETE_WALL_ACTION', wallId }
);

export const deleteWallFromStore = (wallId) => (
  { type: 'DELETE_WALL_FROM_STORE', wallId }
);

export const setWall = (docList) => ({ 
    type: SET_WALL, 
    docList: docList, 
});

export const getWall = () => ({ 
  type: GET_WALL,  
});

export const getWallInfo = () => ({ 
  type: GET_WALL_INFO,  
});

export const setWallInfo = (wall) => ({ 
  type: SET_WALL_INFO,  
  wall: wall,
});



