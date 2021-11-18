// import axios from 'axios';

import { GET_WALL, GET_WALL_INFO, CHANGE_POS, setWall, setWallInfo, emptyWall, updatePos, changePanel } from "src/actions/wall";
import { storeAllWalls } from "src/actions/walls";
import { POST_DOC, SUP_DOC, CHANGE_DOC, SUP_POS, addDoc, deleteDoc, updateDoc, emptyForm, supPos } from "src/actions/element";

import API from './api';

const wallMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const { id } = state.wall;
  switch (action.type) {
    case POST_DOC: {
      //AJOUT DE DOCUMENT
      const { name, description, type, src, link, img } = state.elements;
      const owner_id = state.user.loggedUserInfos.id;
      
      const position = state.wall.docList.length + 1;
      // formatage liens pour requete 
      let linkToPost = link.join('\\');
      // création formData pour envoyer au back
      const docData = new FormData();
      docData.append('name', name);
      docData.append('description', description);
      docData.append('type', type);
      if (type == 'image') docData.append('photo', img);
      docData.append('src', src);
      docData.append('link', linkToPost);
      docData.append('position', position);
      docData.append('owner_id', owner_id);
      const config = {
        method: 'post',
        url:  `/user/walls/${id}/elements`,
        data: docData,
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      API(config)
        .then((response) => {
          //envoyer données dans state du mur(liste de docs)
          //fermer panneau
          //vider formulaire
          store.dispatch(addDoc(response.data));
          store.dispatch(changePanel(false));
          setTimeout(store.dispatch(emptyForm()), 500);
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }
    case CHANGE_DOC: {
      //MODIFICATION D'UN DOCUMENT
      const doc = state.elements;
      const docList = state.wall.docList;
      let FormerDoc = docList.find((elem) => elem.id == doc.id);
      const docData = new FormData();
      let index = 0;
      let propName = '';
      //comparaison données objet initial(liste de doc du state wall)/données objet en cours de modif(state element)
      //transmission données à jour dans le formData pour envoie au back 
      for (let prop in FormerDoc) {
        propName = Object.keys(FormerDoc)[index];
        if (doc.hasOwnProperty(propName) && FormerDoc[prop] !== doc[prop]) {
          if (propName == 'link') {
            let linkString = doc.link.join('\\');
            docData.set(propName, linkString);
          } else if (propName == 'src' && doc.type == 'image'){
            docData.set('photo', doc.img);
          } else {
            docData.set(propName, doc[prop]);
          }
        } else {
          if (propName == 'link') {
            let linkString = FormerDoc.link.join('\\');
            docData.set(propName, linkString);
          } else if (propName == 'src' && doc.type == 'image'){
            let imgName = doc.src.substring(doc.src.lastIndexOf('/') + 1);
            docData.set('src', imgName);
          }else {
            docData.set(propName, FormerDoc[prop]);
          }
        }
        index++;
      }
      const config = {
        method: 'patch',
        url: `/user/walls/${state.wall.id}/elements/${doc.id}`,
        data: docData,
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      API(config)
        .then((response) => {
          //envoyer données dans state du mur(liste de docs)
          //fermer panneau
          //vider formulaire
          store.dispatch(updateDoc(response.data));
          store.dispatch(changePanel(false));
          setTimeout(store.dispatch(emptyForm()), 500);
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case SUP_DOC: {
      //SUPPRESSION D'UN DOCUMENT
      const config = {
        method: 'delete',
        url: `/user/walls/${state.wall.id}/elements/${state.elements.id}`,
      };
      API(config)
        .then((response) => {
          //renvoi vers fonction maj positions des docs dans le back
          store.dispatch(supPos(state.elements.id, state.elements.position));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case GET_WALL: {
      //RECUPERATION DES DOCUMENTS DU MUR
      const config = {
        method: 'get',
        url: `/user/walls/${id}/elements`,
      };
      API(config)
        .then((response) => {
          //maj liste des documents dans state wall
          store.dispatch(setWall(response.data));
        })
        .catch((error) => {
          if (error.response.status === 404) store.dispatch(emptyWall());
        });
      next(action);
      break;
    }
    case CHANGE_POS :{
      //MAJ CHANGEMENT ORDRE DES DOCUMENTS
      let newDocList = action.docList;
      const { newPos, oldPos } = action;
      //maj position tous les documents après changement position d'un document
      if (oldPos > newPos) {
        newDocList.forEach((doc) => {
          if (doc.position == oldPos) {
            doc.position = newPos;
          } else if (doc.position < oldPos && doc.position >= newPos) {
            doc.position += 1;
          }
        });
      } else {
        newDocList.forEach((doc) => {
          if (doc.position == oldPos) {
            doc.position = newPos;
          } else if (doc.position > oldPos && doc.position <= newPos) {
            doc.position -= 1;
          }
        });
      }
      newDocList = {newDocList};
      const config = {
        method: 'patch',
        url: `/user/walls/${id}/elements`,
        data: newDocList,
      };
      API(config)
        .then((response) => {
          //maj position des docs dans liste de docs du state wall
          store.dispatch(updatePos(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case SUP_POS: {
      //MAJ POSITIONS DOCUMENTS SUITE A SUPPRESION DOC
      let newDocList = state.wall.docList;
      newDocList.forEach((doc) => {
        if (doc.position > action.position) doc.position -= 1;
      });
      newDocList = newDocList.filter((doc) => doc.id != action.id);
      newDocList = {newDocList};
      const config = {
        method: 'patch',
        url: `/user/walls/${id}/elements`,
        data: newDocList,
      };
      API(config)
        .then((response) => {
          //maj de la liste de doc dans le state wall(suppression doc et nouvelles positions)
          //fermer panneau
          //vider formulaire
          store.dispatch(deleteDoc(response.data));
          store.dispatch(changePanel(false));
          setTimeout(store.dispatch(emptyForm()), 500);
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case GET_WALL_INFO: {
      //RECUPERER LES INFOS DU MUR
      const config = {
        method: 'get',
        url: `/user/walls/${id}`,
      };
      API(config)
        .then((response) => {
          //maj des info du mur => state wall
          store.dispatch(setWallInfo(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default wallMiddleware;
