import React from "react";
import { connect } from "react-redux";

import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import BottomNavigation from "./component/BottomNavigation/BottomNavigation";

import Home from "./containers/Home";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import AnnounceShow from "./containers/AnnounceShow";

import MemberArea from "./containers/MemberArea";
import ProfilePage from "./containers/ProfilePage";


import NotFoundPage from "./containers/PageNotFound";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./privateRoute";
class App extends React.Component {
  render() {
    const { isAuthenticated, user } = this.props;
    return (
      <Router>
        <Header user={user} isAuthenticated={isAuthenticated} />
        <div className="content">
          <Switch>
            {/* <Route path="/" exact component={Home} /> */}
            <Redirect exact from="/" to="/all/1" />
            <Route path="/all/:page" exact component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/announce/:id" component={AnnounceShow} />

            {/* MemberArea */}
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/member"
              component={MemberArea}
            />
             <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/profile"
              component={ProfilePage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        {isAuthenticated ? <BottomNavigation /> : null}
        <Footer />
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("STATE:", state);
  return {
    isAuthenticated: state.user.authenticated,
    user: state.user,
  };
};

export default App = connect(mapStateToProps)(App);
