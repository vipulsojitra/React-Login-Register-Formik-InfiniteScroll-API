import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PrivateRoute from "./Component/privateRoute";
import Login from "./Screens/Login";
import Registration from "./Screens/Registration";
import Home from "./Screens/Home";
import store from "./store";
import ComicPage from "./Screens/ComicPage";
import "./App.css";

// https://gateway.marvel.com/v1/public/comics?limit=${increment}&offset=${number}&ts=1&hash=866ddc8bf8343c53f45a710a0deb34c0&apikey=8b0c1cf5084a6b18d0034b1096ece30d

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/comicpage" component={ComicPage} />
          </Switch>
        </Router>
        <ToastContainer />
      </Provider>
    </div>
  );
};

export default App;
