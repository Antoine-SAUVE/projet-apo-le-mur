import { useSelector } from 'react-redux';
import NoWall from './Nowall';
import WallCard from './WallCard';
import './walls.scss';

const WallsCards = ({openForm}) => {
  const walls = useSelector((state) => state.walls.wallsList);
  const userName = useSelector((state) => state.user.loggedUserName);
  return (
    <div className="wallsCards">
      {walls.length > 0
        ? walls.map((wall) => <WallCard key={wall.id} {...wall} />)
        : <NoWall userName={userName} openForm={openForm} />}
    </div>
  );
};

export default WallsCards;
