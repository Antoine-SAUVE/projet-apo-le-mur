import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { viewDoc } from 'src/actions/element.js'
import { toggleEye } from 'src/actions/wall.js'

import './style.scss';


const imgWithClick = { cursor: "pointer" };

const Doc = ({ photo, margin, direction, top, left }) => {
  const dispatch = useDispatch();
  const detailed = useSelector((state) => state.wall.detailed);

  const imgStyle = { margin: margin };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const posterEye = () => {
    photo.id == detailed ? dispatch(toggleEye(-1)) : dispatch(toggleEye(photo.id));
  }

  const seeDoc = (e) => {
    dispatch(viewDoc({id:photo.id, name:photo.name, description:photo.description, type:photo.type, link:photo.link, src:photo.src, ownerid:photo.ownerid}));
    photo.getInfo(e);
  }

  // const arrayElem = Array.from(event.target.parentNode.children);
  // arrayElem.forEach((elem, index) => {
    
  // });
  const handleClick = event => {
    // onClick(event, { photo, index });
  };

  return (
    <div className={photo.ownerid == photo.user ? "doc owned" : "doc"} onClick={handleClick}>
      {photo.id == detailed && <div className="see-btn" panel={photo.getAction} onClick={seeDoc}></div>}
      {photo.type== 'image' && <img src={photo.src} alt={photo.name} onClick={posterEye}/>}
      {photo.type== 'texte' && <div className="doc-txt" onClick={posterEye}>{photo.src}</div>}
    </div>
  );
};

Doc.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    user: PropTypes.number.isRequired,
    getInfo: PropTypes.func.isRequired,
    getAction: PropTypes.string.isRequired,
  }).isRequired,
  
};
export default Doc;
