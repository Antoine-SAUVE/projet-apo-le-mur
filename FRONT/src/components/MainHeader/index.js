import Logo from 'src/assets/img/Logo.svg';
import './header.scss';
import UserMenu from './UserMenu';

const MainHeader = () => (
  <header className="header">
    <div className="header__logo">
      <img className="header__logo__img" src={Logo} alt="logo" />
    </div>
    <h1 className="header__pageTitle">
      Titre de la page
    </h1>
    <UserMenu />
  </header>
);

export default MainHeader;
