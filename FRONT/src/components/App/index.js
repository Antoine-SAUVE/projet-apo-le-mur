// == Import
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from 'src/components/Home';
import Walls from 'src/components/Walls';
import Wall from 'src/components/Wall';
import WallFileEdit from 'src/components/Wall/wallFileEdit';
import UserProfile from 'src/components/UserProfile';
import './styles.css';
import { Route, Switch } from 'react-router-dom';
import MainHeader from '../MainHeader';
import { populateLoggedInfosIfLogged } from '../../actions/users';
import NotFound from '../NotFound';
// == Composant
const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem('name')){
      const loggedUser = {name: localStorage.getItem('name'), lastname: localStorage.getItem('lastname'), userId: localStorage.getItem('userId')}
      dispatch (populateLoggedInfosIfLogged(loggedUser.name, loggedUser.lastname, loggedUser.userId))
    }
  },[]);

  return(
    <div className="app">
      <MainHeader />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/walls">
          <Walls />
        </Route>
        <Route exact path="/wall">
          <Wall />
        </Route>
        <Route exact path="/userprofile">
          <UserProfile />
        </Route>
        <Route exact path="/PDF">
          <WallFileEdit />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
};

// == Export
export default App;
