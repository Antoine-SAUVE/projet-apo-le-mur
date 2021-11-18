import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { viewDoc } from 'src/actions/element.js'
import { toggleEye } from 'src/actions/wall.js'

import './style.scss';


const imgWithClick = { cursor: "pointer" };

const Doc = ({ photo, margin, direction, top, left }) => {
  
  const dispatch = useDispatch();
  const detailed = useSelector((state) => state.wall.detailed);

  const currentUser = useSelector((state) => state.user.loggedUserInfos.id);
  //mode disposition vertical des images
  const imgStyle = { margin: margin };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }
  //afficher bouton permettant consultation info au clic sur document
  const posterEye = () => {
    photo.id == detailed ? dispatch(toggleEye(-1)) : dispatch(toggleEye(photo.id));
  }
  //afficher fiche d'information du document
  const seeDoc = (e) => {
    dispatch(viewDoc({
      id:photo.id, 
      name:photo.name, 
      description:photo.description, 
      type:photo.type, 
      link:photo.link, 
      src:photo.src, 
      owner_id:photo.owner_id,
      position: photo.position,
    }));
    photo.getInfo(e);
  }

  return (
    <div className={photo.owner_id == currentUser ? "doc owned" : "doc"} >
      {photo.id == detailed && <div className="see-btn" panel={photo.getAction} onClick={seeDoc}></div>}
      <div className="doc-content">
        {photo.type== 'image' && <img src={photo.src} alt={photo.name} onClick={posterEye}/>}
        {photo.type== 'texte' && <div className="doc-txt" onClick={posterEye}>{photo.src}</div>}
      </div>
    </div>
  );
};

Doc.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    getInfo: PropTypes.func.isRequired,
    getAction: PropTypes.string.isRequired,
    owner_id: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
  }).isRequired,
  
};
export default Doc;
