import { UPDATE_CONTENT, SET_CONTENT } from "src/actions/textEdit";

const initialState = {
  subject: "",
  contents: {},
  workings: {},
  fileIds: [],
  delta: {},
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CONTENT :
    return{
      ...state,
      contents: action.contents,
    }
    case UPDATE_CONTENT :
      return{
        ...state,
        contents: action.contents,
        delta: action.delta,
      }
    default:
      return state;
  }
};

export default reducer;
