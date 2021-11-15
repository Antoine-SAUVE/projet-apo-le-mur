import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Doc from './doc';
import { arrayMove } from 'react-sortable-hoc';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
;import { changePos } from 'src/actions/wall.js'

import './style.scss';

const SortablePhoto = SortableElement((item)  => <Doc {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery photos={items} renderImage={ props => {
    return <SortablePhoto  {...props} />
  }  } />
));

const Docs = ( {docs, getAction, getInfo} ) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState(docs);

  useEffect(() => {
      setItems(docs)
  }, [docs]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log('items items items', items);
    dispatch(changePos(oldIndex + 1, newIndex + 1));
    setItems(arrayMove(items, oldIndex, newIndex));
    dispatch(changePos(oldIndex, newIndex));
  };
 
  return (
    <div className="board">
      <SortableGallery distance={2} items={items.map((doc) => ({...doc, getAction: getAction, getInfo: getInfo}))} onSortEnd={onSortEnd} axis={"xy"} />
    </div>
  )
};

export default Docs;
