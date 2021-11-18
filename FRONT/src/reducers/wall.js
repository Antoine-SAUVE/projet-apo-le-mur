import { UPDATE_POS, CHANGE_PANEL, TOGGLE_EYE, POST_USER, DELETE_USER, UPDATE_DOC_PROPS, 
        DISPLAY_MODE, REDIRECT_PDF, SET_WALL , SET_WALL_INFO, UPDATE_WALL, EMPTY_WALL,
        UPDATE_WALL_FILE, UPDATE_USER_ADD, CLEAR_PANEL, BACK_TO_STAMP, MENU_MOB } from "src/actions/wall";
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
  title_color: '',
  currentAdded: '',
  addedError: '',
  img:{},
  panel: '',
  detailed: -1,
  displaysquare: false,
  toPDF:false,
  docList:[],
  wallStamp:{},
  menuMob: false,
};

const localPath = 'http://localhost:3000/';

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_WALL :
      //INITIALISATION DE DOCLIST(documents du mur)
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
      //AJOUT DOCUMENT DANS LA LISTE DE DOCS
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
      //REORDONNER ET MAJ LISTE DOC APRES SUPPRESION
      let newDocList = action.docList;
      newDocList.sort((a, b) => a.position - b.position);
      return{
        ...state,
        docList: newDocList,
      }
    }
    case UPDATE_DOC : {
      //MAJ DOCUMENT MODIFIE DANS LA LISTE DE DOC
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
      //CHANGE DE PANNEAU
      //si panneau ouvert donne le form à afficher, si doit être fermé donne false
      return{
        ...state,
        panel: action.panel,
      }
    case TOGGLE_EYE :
      //ACTIVE/DESACTIVE BOUTON CONSULTATION DOC
      return{
        ...state,
        detailed: action.detailed,
      }
    case POST_USER:{
      //CONTROLE ET AJOUTE UTILISATEUR AU MUR
      const registered = state.users;

      //vérifie si déjà inscrit au mur
      let isThere
      if (typeof action.user == 'object') isThere = registered.find((user) => user.id == action.user.id);
      //si existe dans base utilisateur et pas inscrit au mur, ajout au utilisateurs du mur
      //sinon défini message d'erreur approprié
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
      //SUPPRIME UTILISATEUR DU MUR
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
      //MAJ CHAMPS FORM
      return{
        ...state,
        [action.prop]: action.name,
      }

    case UPDATE_USER_ADD :
      //MAJ CHAMPS AJOUT UTILISATEUR DU FORM
      return{
        ...state,
        [action.prop]: action.name,
        addedError: ''
      }
    case UPDATE_WALL_FILE :
      //MAJ IMG ET SON NOM (FORM)
      return{
        ...state,
        [action.prop]: action.name.name,
        img: action.name,
      }
    case DISPLAY_MODE :
      //CHANGER LE MODE D'AFFICHAGE DES DOC DU MUR
      return{
        ...state,
        displaysquare: !state.displaysquare,
      }
    case REDIRECT_PDF :
      //REDIRIGER VERS PAGE D'EDITION ET GENERATION DE PDF 
      return{
        ...state,
        toPDF: !state.toPDF,
      }
    case UPDATE_POS :{
      //MAJ DES POSITIONS DES DOCS
      return{
        ...state,
        position: action.docList,
      }
    }
    case SET_WALL_INFO : {
      //INITIALISTAION INFOS DU MUR
      let {created_at, description, id, owner_id, photo, title, updated_at} = action.wall.result;
      const usersTab = action.wall.collabsData;
      const owner = usersTab.find((user) => user.id == owner_id);
      const users = usersTab.map((user) => {
        return user.name;
      });
      //formatage dates
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
      //MODIFICATION DU MUR
      let {created_at, description, photo, title, updated_at} = action.wall.result;
      const usersTab = action.wall.collabsData;
      const users = usersTab.map((user) => {
        return user.name;
      });
      //formatage dates
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
      //RECUPERATION STATE DU MUR AVANT SAISIES DANS LE FORM MODIF DU MUR
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
      //VIDER LE MUR
      return{
        ...state,
        docList: [],
      }
    case MENU_MOB:
      //CHANGER ETAT OUVERT/FERME DU MENU MOBILE
      return{
        ...state,
        menuMob: !state.menuMob,
      }
    default:
      return state;
  }
};

export default reducer;
