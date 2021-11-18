import { useSelector, useDispatch } from 'react-redux';
import { changePanel, changeForm } from 'src/actions/wall.js';
import { supDoc, emptyForm } from 'src/actions/element.js';

import './style.scss';

const infoDocForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.loggedUserInfos.id);
  const { name, description, type, src, link, owner_id } = useSelector((state) => state.elements);
  //passer à la modification de document
  const changeForm= () => {
    const fadeElem = document.querySelector('.fade-elem')
    fadeElem.classList.add('on');
    setTimeout(() => {
      dispatch(changePanel('editDocPanel'));
    }, 500);
    setTimeout(() => {
      fadeElem.classList.remove('on');
    }, 1000);
  }
  //suppression de document
  const supElem = () => {
    dispatch(supDoc());
  }

  return (
    <div className="form-info panel-form">
      <h2 className="form-title">Info Document</h2>
      <div className="inner-form">
        <div className="info-block">
          <label>Nom :</label>
          <p>{name}</p>
        </div>
        <div className="info-block">
          <label>Description :</label>
          <p>{description}</p>
        </div>
        <div className="info-block">
          <label>Document :</label><span>{type}</span>
          {type == 'image' ? <img src={src} /> : <p>{src}</p>}
        </div>
        <div className="info-block">
          <label>Liens :</label>
          <ul className="link-list">
            {link.map((item) => (<li key={item}>-&nbsp;<a href={item} target="_blank" className="block">{item}</a></li>))}
          </ul>
        </div>
        {owner_id == user && 
          <div className="user-btn-block">
            <button className="btn btn-change-txt" type="button" onClick={changeForm}>Modifier</button>
            <button className="btn btn-supp-txt" type="button" onClick={supElem}>Supprimer</button>
          </div>
        }
      </div>
    </div>
  )
};
export default infoDocForm;
