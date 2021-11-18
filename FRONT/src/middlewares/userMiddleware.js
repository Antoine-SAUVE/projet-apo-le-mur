import { storeAllUsers } from '../actions/users';
import { postUser, TRY_USER } from '../actions/wall';
import API from './api';

const userMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case 'GET_ALL_USERS': {
      const config = {
        method: 'get',
        url: '/user/list',
      };
      API(config)
        .then((response) => {
          store.dispatch(storeAllUsers(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case TRY_USER: {
      //CHERCHER UTILISATEUR DANS LA BASE
      const config = {
        method: 'get',
        url: '/user/list',
      };
      API(config)
        .then((response) => {
          //renvoyer infos utilisateur ou absence utilisateur pour ajout au state wall 
          const user = response.data.find((user) => user.email == action.user);
          user == undefined ? store.dispatch(postUser('none')) : store.dispatch(postUser(user));
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

export default userMiddleware;
