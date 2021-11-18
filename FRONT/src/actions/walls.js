export const storeWallInputValue = (name, value) => (
  { type: 'STORE_WALL_INPUT', name: name, value: value }
);

export const deleteCoworker = (user) => (
  { type: 'DELETE_COWORKER', user: user }
);

export const createWallAction = (picture, title_color) => (
  { type: 'CREATE_WALL', picture, title_color }
);

export const deleteWall = (id) => (
  { type: 'DELETE_WALL', id }
);

export const getWalls = () => (
  { type: 'GET_WALLS' }
);

export const storeAllWalls = (data) => {
  return { type: 'STORE_WALLS', data }
}

export const emptyWallsList = () => (
  { type: 'EMPTY_WALLS_LIST' }
)

