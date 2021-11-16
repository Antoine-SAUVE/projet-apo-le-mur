// import axios from 'axios';

import { GET_WALL, GET_WALL_INFO, CHANGE_POS, setWall, setWallInfo, emptyWall, updatePos, clearPanel } from "src/actions/wall";
import { storeAllWalls } from "src/actions/walls";
import { POST_DOC, SUP_DOC, CHANGE_DOC, SUP_POS, addDoc, deleteDoc, updateDoc, emptyForm, supPos } from "src/actions/element";

import API from './api';

const wallMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const { id } = state.wall;
  switch (action.type) {
    case POST_DOC: {
      // on crée un formData à envoyer au back
      const { name, description, type, src, link, img } = state.elements;
      const owner_id = state.user.loggedUserInfos.id;
      console.log('owner_id', state.user.loggedUserInfos.id);
      console.log('owner_id', owner_id);
      const position = state.wall.docList.length + 1;
      let linkToPost = link.join('\\');

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
          console.log(response.data, 'élément crée');
          store.dispatch(addDoc(response.data));
          store.dispatch(clearPanel(false));
          setTimeout(store.dispatch(emptyForm()), 500);
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }
    case CHANGE_DOC: {
      const doc = state.elements;
      const docList = state.wall.docList;
      let FormerDoc = docList.find((elem) => elem.id == doc.id);
      const docData = new FormData();
      let index = 0;
      let propName = '';
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
      docData.get('photo') ? console.log('data photo', docData.get('photo')) : console.log('data src', docData.get('src'));
      console.log('position', docData.get('position'));
      const config = {
        method: 'patch',
        url: `/user/walls/${state.wall.id}/elements/${doc.id}`,
        data: docData,
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      API(config)
        .then((response) => {
          console.log('doc changé');
          console.log(response.data);
          store.dispatch(updateDoc(response.data));
          store.dispatch(clearPanel(false));
          setTimeout(store.dispatch(emptyForm()), 500);
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case SUP_DOC: {
      const config = {
        method: 'delete',
        url: `/user/walls/${state.wall.id}/elements/${state.elements.id}`,
      };
      API(config)
        .then((response) => {
          console.log('doc effacé', response.data);
          store.dispatch(supPos(state.elements.id, state.elements.position));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case GET_WALL: {
      const config = {
        method: 'get',
        url: `/user/walls/${id}/elements`,
      };
      API(config)
        .then((response) => {
          console.log('récupère les éléments',response.data);
          store.dispatch(setWall(response.data));
        })
        .catch((error) => {
          if (error.response.status === 404) store.dispatch(emptyWall());
        });
      next(action);
      break;
    }
    case CHANGE_POS :{
      let newDocList = action.docList;
      const { newPos, oldPos } = action;
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
          console.log('change les elem de position',response.data);
          store.dispatch(updatePos(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case SUP_POS: {
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
          console.log('elements repositionnés après sup',response.data);
          store.dispatch(deleteDoc(response.data));
          setTimeout(store.dispatch(emptyForm()), 500);
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case GET_WALL_INFO: {
      const config = {
        method: 'get',
        url: `/user/walls/${id}`,
      };
      API(config)
        .then((response) => {
          console.log('récupère les infos du mur',response.data);
          store.dispatch(setWallInfo(response.data));
          if (!state.walls.wallsList.length) {
            store.dispatch(storeAllWalls({result:[response.data.result],collabsData: response.data.collabsData}));
          }
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
