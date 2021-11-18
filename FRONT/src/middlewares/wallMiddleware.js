// import axios from 'axios';
import { CHANGE_WALL, deleteWallFromStore, storeNewWall, updateWall, changePanel } from '../actions/wall';
import { storeAllWalls } from '../actions/walls';
import API from './api';

const wallMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case 'CREATE_WALL': {
      // TODO on va chercher dans le store la liste de tous les utilisateurs
      // ( allUsers) et les users du mur (wallUsers)
      const wallUsers = state.walls.wallCreation.users;
      const allUser = state.user.users;

      // apres on va récupérer l'id des utilisateurs
      // du mur en comparant avec la liste de tout les utilisateurs
      const usersId = wallUsers.map((user) => allUser.filter((oneUser) => oneUser.name === user));
      const wallUserIds = usersId.map((user) => user[0].id);

      // on crée un formData à envoyer au back
      const wallData = new FormData();
      wallData.append('photo', action.picture);
      wallData.append('title', state.walls.wallCreation.title);
      wallData.append('description', state.walls.wallCreation.description);
      wallData.append('users', wallUserIds);
      wallData.append('title_color', action.title_color);
      const config = {
        method: 'post',
        url: '/user/walls',
        data: wallData,
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      API(config)
        .then((response) => {
          store.dispatch(storeNewWall(response.data));
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }
    case 'DELETE_WALL_ACTION': {
      const config = {
        method: 'delete',
        url: `/user/walls/${action.wallId}`,
      };
      API(config)
        .then((response) => {
          store.dispatch(deleteWallFromStore(action.wallId));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case 'GET_WALLS': {
      const config = {
        method: 'get',
        url: '/user/walls',
      };
      API(config)
        .then((response) => {
          store.dispatch(storeAllWalls(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case CHANGE_WALL: {
      //MODIFICATIONS DES INFO DU MUR
      //si image changée, envoyer son filedata, sinon son nom existant
      let picture;
      state.wall.wallStamp.photo != state.wall.photo ? picture = state.wall.img : picture = state.wall.photo.substring(state.wall.photo.lastIndexOf('/') + 1);

      const usersId = state.wall.users.map((user) => user.id);
      //création formData pour envoyer au back
      const wallData = new FormData();
      wallData.set('photo', picture);
      wallData.set('title', state.wall.title);
      wallData.set('description', state.wall.description);
      wallData.set('users', usersId);
      wallData.set('title_color', state.wall.title_color);
      const config = {
        method: 'patch',
        url: `/user/walls/${state.wall.id}`,
        data: wallData,
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      API(config)
        .then((response) => {
          //fermer panneau
          //maj des info du mur dans state wall
          store.dispatch(changePanel(false));
          store.dispatch(updateWall(response.data));
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
