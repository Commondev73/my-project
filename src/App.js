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
import UserChangePassword from "./containers/UserChangePassword";
import PostAnnounces from "./containers/PostAnnounces";
import UserAnnouncesOnline from "./containers/UserAnnouncesOnline";

import EditAnnounces from "./containers/EditAnnounces";
import Mail from "./containers/Mail";
import MailByID from "./containers/MailByID";

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
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/member/changepassword"
              component={UserChangePassword}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/member/announces/post"
              component={PostAnnounces}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/member/announces"
              component={UserAnnouncesOnline}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/member/announces/edit/:id"
              component={EditAnnounces}
            />

            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/member/mail/:page"
              component={Mail}
            />
            <Redirect exact from="/member/mail/" to="/member/mail/1" />

            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/member/message/:id"
              component={MailByID}
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
