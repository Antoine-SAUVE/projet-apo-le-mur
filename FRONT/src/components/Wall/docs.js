import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Doc from './doc';
import { arrayMove } from 'react-sortable-hoc';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
;import { changePos } from 'src/actions/wall.js'

import './style.scss';

//fonctions de librairie react-sortable-hoc 
//pour déplacer et ordonner des éléments 
const SortablePhoto = SortableElement((item)  => <Doc {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
//composant de librairie react-photo-gallery
  <Gallery photos={items} renderImage={ props => {
    return <SortablePhoto  {...props} />
  }  } />
));

const Docs = ( {docs, getAction, getInfo} ) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState(docs);

  const docList = useSelector((state) => state.wall.docList);

  useEffect(() => {
      setItems(docs)
  }, [docs]);
  //récupération et enregistrement changement position dans state/bdd
  //changement position dans page avec librairie array-move
  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(changePos(oldIndex + 1, newIndex + 1, docList));
    setItems(arrayMove(items, oldIndex, newIndex));
  };
 
  return (
    <div className="board">
      <SortableGallery distance={2} items={items.map((doc) => ({...doc, getAction: getAction, getInfo: getInfo, width:2, height:3}))} onSortEnd={onSortEnd} axis={"xy"} />
    </div>
  )
};

export default Docs;
