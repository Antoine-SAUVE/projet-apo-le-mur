import { UPDATE_POS, CHANGE_PANEL, TOGGLE_EYE, POST_USER, DELETE_USER, UPDATE_DOC_PROPS, 
        DISPLAY_MODE, REDIRECT_PDF, SET_WALL , SET_WALL_INFO, UPDATE_WALL, EMPTY_WALL,
        UPDATE_WALL_FILE, UPDATE_USER_ADD, CLEAR_PANEL, BACK_TO_STAMP } from "src/actions/wall";
import { ADD_DOC, DELETE_DOC, UPDATE_DOC } from "src/actions/element";

const initialState = {
  id: 1,
  owner_id: 1,
  owner_name: '',
  title: 'Rap',
  photo: '/tyler.png',
  users: [],
  description: 'description du thème Rap: Le rap est un mouvement culturel et musical qui tire ses origines du hip-hop',
  created_at: '20/10/2021',
  updated_at: '28/10/2021',
  currentAdded: '',
  addedError: '',
  img:{},
  panel: '',
  detailed: -1,
  displaysquare: false,
  toPDF:false,
  docList:[],
  wallStamp:{},
};

const localPath = 'http://localhost:3000/';

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_WALL :
      const newDocList = action.docList.map((elem) => {
        let linkArray, srcEdit = elem.src;
        if (elem.type == 'image') srcEdit = localPath+srcEdit;
        elem.link == null ? linkArray = [] : linkArray = elem.link.split('\\');
        return({
          id: parseInt(elem.id),
          name: elem.name,
          description: elem.description,
          type: elem.type,
          position: elem.position,
          link: linkArray,
          src: srcEdit,
          owner_id: elem.owner_id,
          width: 2,
          height: 3,
        })
      });
      return{
        ...state,
        docList: newDocList,
      }
    case ADD_DOC : {
      const { id, name, description, type, link, src, owner_id, position } = action.doc;
      const docList = state.docList;
      let linkArray, srcEdit = src;
      if (type == 'image') srcEdit = localPath+src;
      link == null ? linkArray = [] : linkArray = link.split('\\');
      const idList = state.docList.map((elem) => {
        return elem.id;
      }); 
      const newDoc = {
        id: id,
        name: name,
        description: description,
        type: type,
        position: position,
        link: linkArray,
        src: srcEdit,
        owner_id: owner_id,
        width:2,
        height:3,
      };
      const allDocs = state.docList;
      console.log('newDoc',newDoc);
      const newDocs = [
        ...allDocs,
        newDoc,
      ];
      return{
        ...state,
        docList: newDocs,
      }
    }
    case 'STORE_NEW_DOC':
      return {
        ...state, 
        docList: action.items
      }
    case DELETE_DOC : {
      let newDocList = action.docList;
      newDocList.sort((a, b) => a.position - b.position);
      return{
        ...state,
        docList: newDocList,
      }
    }
    case UPDATE_DOC : {
      let newDoc = action.doc;
      let newDocList = state.docList.filter((doc) => doc.id != action.doc.id);
      if (newDoc.type == 'image') newDoc.src = localPath+newDoc.src;
      newDoc.link = newDoc.link.split('\\');
      newDocList = [...newDocList, newDoc];
      newDocList.sort((a, b) => a.position - b.position);
      return{
        ...state,
        docList: newDocList,
      }
    }
    case CHANGE_PANEL :
      return{
        ...state,
        panel: action.panel,
      }
    case TOGGLE_EYE :
      return{
        ...state,
        detailed: action.detailed,
      }
    case POST_USER:{
      const registered = state.users;

      let isThere
      if (typeof action.user == 'object') isThere = registered.find((user) => user.id == action.user.id);

      if (typeof action.user == 'object' && isThere == undefined) {
        const newUsers = [
          ...registered,
          {
            id: action.user.id, 
            wallId: state.id, 
            name: action.user.name, 
            lastname: action.user.lastname,
          },
        ];
        return{
          ...state,
          users: newUsers,
          currentAdded: '',
          addedError: '',
        }
      } else {
        let error = "";
        typeof action.user == 'object' ? error = 'Cet utilisateur est déjà membre' : error = 'Cet utilisateur n\'existe pas';
        return{
          ...state,
          addedError: error,
        }
      }
    }
    case DELETE_USER :{
      const infoUser = action.user.split(' ');
      const allUsers = state.users;
      const newUsers = allUsers.filter((user) => {
        return (user.lastname != infoUser[1] && user.name != infoUser[0]);
      });
      return{
        ...state,
        users: newUsers,
        currentAdded: '',
      }
    }
    case UPDATE_DOC_PROPS :
      return{
        ...state,
        [action.prop]: action.name,
      }

    case UPDATE_USER_ADD :
      return{
        ...state,
        [action.prop]: action.name,
        addedError: ''
      }
    case UPDATE_WALL_FILE :
      return{
        ...state,
        [action.prop]: action.name.name,
        img: action.name,
      }
    case DISPLAY_MODE :
      return{
        ...state,
        displaysquare: !state.displaysquare,
      }
    case REDIRECT_PDF :
      return{
        ...state,
        toPDF: !state.toPDF,
      }
    case UPDATE_POS :{
      return{
        ...state,
        position: action.docList,
      }
    }
    case SET_WALL_INFO : {
      let {created_at, description, id, owner_id, photo, title, updated_at} = action.wall.result;
      const usersTab = action.wall.collabsData;
      const owner = usersTab.find((user) => user.id == owner_id);
      
      const users = usersTab.map((user) => {
        return user.name;
      });

      const dateToString = (date) => {
        let stringDate = date.substring(0, 10);
        stringDate = stringDate.split('-');
        stringDate = stringDate.reverse();
        stringDate = stringDate.join('-');
        return stringDate;
      }
      return{
        ...state,
        created_at: dateToString(created_at),
        description: description,
        id: id,
        owner_name: owner.name + ' ' + owner.lastname,
        owner_id: owner_id,
        photo: localPath+photo,
        title: title,
        updated_at: dateToString(updated_at),
        users: usersTab,
        wallStamp: {description: description, photo: localPath+photo, title: title, users: usersTab},
      }
    }
    case UPDATE_WALL : {
      let {created_at, description, photo, title, updated_at} = action.wall.result;
      const usersTab = action.wall.collabsData;
      
      const users = usersTab.map((user) => {
        return user.name;
      });

      const dateToString = (date) => {
        let stringDate = date.substring(0, 10);
        stringDate = stringDate.split('-');
        stringDate = stringDate.reverse();
        stringDate = stringDate.join('-');
        return stringDate;
      }
      return{
        ...state,
        created_at: dateToString(created_at),
        description: description,
        photo: localPath+photo,
        title: title,
        updated_at: dateToString(updated_at),
        users: usersTab,
        wallStamp: {description: description, photo: localPath+photo, title: title, users: usersTab},
      }
    }
    case BACK_TO_STAMP:{
      const {description, photo,title, users} = state.wallStamp;
      return{
        ...state,
        description: description, 
        photo: photo, 
        title: title, 
        users: users,
      }
    }
    case EMPTY_WALL:
      return{
        ...state,
        docList: [],
      }
    case CLEAR_PANEL:
      return{
        ...state,
        panel: action.panel,
      }
    default:
      return state;
  }
};

export default reducer;
