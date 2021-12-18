import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import NotFound from './components/NotFound/NotFound';
import MenuPage from './components/MenuPage/MenuPage';
import FoodDetails from './components/FoodDetails/FoodDetails';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/home">
          <Main />
        </Route>
        <Route path="/menus">
          <MenuPage />
        </Route>
        <Route path="/menu/:menuId">
          <FoodDetails />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
