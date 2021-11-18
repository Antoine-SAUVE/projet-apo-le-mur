import notWallFound from 'src/assets/icons/bankrupt.png';

const NoWall = ({userName, openForm}) => (
  <div className="wallsCards__noWall">
    { notWallFound
    && (
    <div>
      <img className="wallsCards__noWall__img" src={notWallFound} alt="no wall found" />
      <h2>Bienvenue {userName}</h2>
      <h2>Vous n'avez pas de projet en cours</h2>
      <p className="wallsCards__noWall__createWall" onClick={openForm}>ajoutez un mur</p>
    </div>
    )}
  </div>
);

export default NoWall;
