export const UPDATE_DOC_PROPS = 'UPDATE_DOC_PROPS';
export const UPDATE_FILE_PROPS = 'UPDATE_FILE_PROPS';
export const POST_LINK = 'POST_LINK';
export const DELETE_LINK = 'DELETE_LINK';
export const VIEW_DOC = 'VIEW_DOC';
export const EMPTY_FORM = 'EMPTY_FORM';
export const ADD_DOC = 'ADD_DOC';
export const POST_DOC = 'POST_DOC';
export const CHANGE_DOC = 'CHANGE_DOC';
export const UPDATE_DOC = 'UPDATE_DOC';
export const SUP_DOC = 'SUP_DOC';
export const SUP_POS = 'SUP_POS';
export const DELETE_DOC = 'DELETE_DOC';

export const updateDocName = (name, prop) => ({
  type: UPDATE_DOC_PROPS,
  name: name,
  prop: prop,
});

export const updateFileName = (name, prop) => ({
  type: UPDATE_FILE_PROPS,
  name: name,
  prop: prop,
});

export const postLink = (link) => ({
  type: POST_LINK,
  link: link,
});

export const deleteLink = (link) => ({
  type: DELETE_LINK,
  link: link,
});

export const viewDoc = (doc) => ({
  type: VIEW_DOC,
  doc: doc,
});

export const emptyForm = () => ({
  type: EMPTY_FORM,
});

export const addDoc = (doc) => ({
  type: ADD_DOC,
  doc: doc,
});

export const changeDoc = () => ({
  type: CHANGE_DOC,
});

export const updateDoc = (doc) => ({
  type: UPDATE_DOC,
  doc:doc,
});

export const postDoc = () => ({
  type: POST_DOC,
});

export const supDoc = () => ({
  type: SUP_DOC,
});

export const supPos = (id, position) => ({
  type: SUP_POS,
  id: id,
  position: position,
});

export const deleteDoc = (docList) => ({
  type: DELETE_DOC,
  docList: docList,
});

export const storeNewDoc = (items) => ({
  type: 'STORE_NEW_DOC',
  items,
})



