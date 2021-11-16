import { UPDATE_DOC_PROPS, UPDATE_FILE_PROPS, POST_LINK, DELETE_LINK, VIEW_DOC, EMPTY_FORM } from "src/actions/element";

const initialState = {
  id: 1,
  name: '',
  description: '',
  type: '',
  position: 1,
  currentLink: '',
  link: [],
  src: '',
  owner_id: 1,
  img:{}
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_DOC_PROPS :
      return{
        ...state,
        [action.prop]: action.name,
      }
    case UPDATE_FILE_PROPS :
      return{
        ...state,
        [action.prop]: action.name.name,
        img: action.name,
      }
    case POST_LINK :{
      const allLinks = state.link;
      const newLinks = [
        ...allLinks,
        action.link,
      ];
      return{
        ...state,
        link: newLinks,
        currentLink: '',
      }
    }
    case DELETE_LINK :{
      const allLinks = state.link;
      const newLinks = allLinks.filter((link) => {
        return link != action.link
      });

      return{
        ...state,
        link: newLinks,
        currentLink: '',
      }
    }
    case VIEW_DOC :
      const {id, name, description, type, link, src, owner_id, position} = action.doc;
      return{
        ...state,
        id: id,
        name: name,
        description: description,
        type: type,
        link: link,
        src: src,
        owner_id: owner_id,
        position: position,
      }
    case EMPTY_FORM :
      return{
        ...state,
        name: '',
        description: '',
        type: '',
        link: [],
        src: '',
        currentLink: '',
      }
    default:
      return state;
  }
};

export default reducer;
