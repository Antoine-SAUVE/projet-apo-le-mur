import './walls.scss';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Plus from 'src/assets/icons/plus-neg.png';
import WallsCards from './WallsCards';
import WallForm from './WallForm';
import { getAllUsers } from '../../actions/users';
import { getWalls } from '../../actions/walls';
import { emptyWall } from "src/actions/wall";

const Walls = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setFormOpen] = useState(false);
  const handleOpenForm = () => {
    setFormOpen(!isFormOpen);
  };
  useEffect(() => {
    dispatch(emptyWall());
    dispatch(getAllUsers());
  }, []);
  useEffect(() => {
    dispatch(getWalls());
  }, []);

  return (
    <div className="projects">
      <div className="projects__title">
        <h1>Mes Projets</h1>
      </div>
      <div className="projects__addProjectBtn" onClick={handleOpenForm}>
        <p className="projects__addProjectBtn__title">ajouter un mur</p>
        <img className="projects__addProjectBtn__plusIcon" src={Plus} alt="bouton ajouter un mur" />
      </div>
      {
        isFormOpen && <WallForm setFormOpen={setFormOpen} />
      }
      <WallsCards openForm={handleOpenForm} />
    </div>
  );
};

export default Walls;
