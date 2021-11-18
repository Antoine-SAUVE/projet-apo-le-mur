export const UPDATE_CONTENT = 'UPDATE_CONTENT';
export const SET_CONTENT = 'SET_CONTENT';

export const setContents = (contents) => ({
  type: SET_CONTENT,
  contents:contents,
});

export const updateContents = (contents, delta) => ({
  type: UPDATE_CONTENT,
  contents:contents,
  delta, delta,
});
