import { useDispatch, useSelector } from 'react-redux';
import { disconnectUser } from '../../actions/users';

const Logged = () => {
  const dispatch = useDispatch();
  const handleDisconnectUser = () => {
    dispatch(disconnectUser());
  };
  const user = useSelector((state) => state.user.loggedUserName);
  return (
    <div className="userMenu__btnContainer">
      <p className="userMenu__btnContainer__userName">{user}</p>
      <ul className="userMenu__btnContainer__buttons">
        <li className="userMenu__btnContainer__buttons__logoutBtn" onClick={handleDisconnectUser}>Déconnexion</li>
        <li className="userMenu__btnContainer__buttons__accountBtn">Mon compte</li>
      </ul>
    </div>
  );
};

export default Logged;
