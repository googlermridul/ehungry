import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import NotFound from './components/NotFound/NotFound';
import MenuPage from './components/MenuPage/MenuPage';
import FoodDetails from './components/FoodDetails/FoodDetails';
import Footer from './components/Footer/Footer';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import AuthProvider from './contexts/AuthProvider';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Cart from './components/Cart/Cart';
import OrderHistory from './components/OrderHistory/OrderHistory';

function App() {
  return (
    <AuthProvider>
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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/cart">
            <Cart />
          </PrivateRoute>
          <PrivateRoute path="/orderHistory">
            <OrderHistory />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
