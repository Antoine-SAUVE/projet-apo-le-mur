import { useSelector, useDispatch } from 'react-redux';
import { changePanel } from 'src/actions/wall.js';

import './style.scss';

const InfoWallForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.loggedUserInfos.id);
  const { created_at, updated_at, title, description, photo, users, owner_id,  owner_name } = useSelector((state) => state.wall);

  const changeForm= () => {
    const fadeElem = document.querySelector('.fade-elem')
    fadeElem.classList.add('on');
    setTimeout(() => {
      dispatch(changePanel('changeWallPanel'));
    }, 500);
    setTimeout(() => {
      fadeElem.classList.remove('on');
    }, 1000);
  }

  return (
    <div className="form-info panel-form change-wall">
      <h2 className="form-title">Info du mur</h2>
      <div className="info-block date flex">
        <div className="left">
          <label>Créé le :</label>
          <p>{created_at}</p>
        </div>
        <div className="right">
          <label>Modifié le :</label>
          <p>{updated_at}</p>
        </div>
      </div>
      <div className="inner-form">
        <div className="info-block">
          <label>Nom :</label>
          <p>{title}</p>
          <img src={photo} />
        </div>
        <div className="info-block">
          <label>Description :</label>
          <p>{description}</p>
        </div>
        <div className="info-block">
          <label>Admin :</label>
          <p>{owner_name}</p>
        </div>
        <div className="info-block">
          <label>Participants :</label>
          <ul className="link-list">
            {users.map((item) => (<li key={item.id}>{item.name} {item.lastname}</li>))}
          </ul>
        </div>
        {user == owner_id && 
          <div className="user-btn-block">
            <button className="btn btn-change-txt" type="button" onClick={changeForm}>Modifier</button>
          </div>
        }
      </div>
    </div>
  )
};
export default InfoWallForm;
