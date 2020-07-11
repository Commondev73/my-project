import React from "react";
import { connect } from "react-redux";

import Footer from "./component/Footer/Footer";

import Home from "./containers/Home";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import AnnounceShow from "./containers/AnnounceShow";
import Search from "./containers/Search";

import ProfilePage from "./containers/ProfilePage";
import UserChangePassword from "./containers/UserChangePassword";
import PostAnnounces from "./containers/PostAnnounces";
import SearchUserAnnounces from "./containers/SearchUserAnnounces";
import UserAnnouncesOnline from "./containers/UserAnnouncesOnline";
import UserAnnouncesDraft from "./containers/UserAnnouncesDraft";
import UserAnnouncesCorrect from "./containers/UserAnnouncesCorrect";
import Bookmarks from "./containers/Bookmarks";

import EditAnnounces from "./containers/EditAnnounces";
import Mail from "./containers/Mail";
import SearchMail from "./containers/SearchMail";
import MailRead from "./containers/MailRead";
import MailUnread from "./containers/MailUnread";
import MailSave from "./containers/MailSave";
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
    const { isAuthenticated } = this.props;
    return (
      <Router>
        {/* <Header user={user} isAuthenticated={isAuthenticated}/>
        <div className="content"> */}
        <Switch>
          <Redirect exact from="/" to="/all/1" />
          <Route path="/all/:page" exact component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/announce/:id/:mark" component={AnnounceShow} />
          <Route
            path="/search/:keyword/:atype/:ptype/:bedroom/:toilet/:price/:toprice/:page"
            component={Search}
          />
          {/* MemberArea */}
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
            path="/member/announces/search/:ukeyword/:uatype/:uptype/:ubedroom/:utoilet/:page"
            component={SearchUserAnnounces}
          />

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            exact
            path="/member/announces/online/:page"
            component={UserAnnouncesOnline}
          />
          <Redirect
            exact
            from="/member/announces/online"
            to="/member/announces/online/1"
          />

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            exact
            path="/member/announces/draft/:page"
            component={UserAnnouncesDraft}
          />
          <Redirect
            exact
            from="/member/announces/draft"
            to="/member/announces/draft/1"
          />

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            exact
            path="/member/announces/correct/:page"
            component={UserAnnouncesCorrect}
          />
          <Redirect
            exact
            from="/member/announces/correct"
            to="/member/announces/correct/1"
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
            path="/member/bookmarks/:page"
            component={Bookmarks}
          />
          <Redirect exact from="/member/bookmarks" to="/member/bookmarks/1" />

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
            path="/member/search/mail/:mkeyword/:page"
            component={SearchMail}
          />

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            exact
            path="/member/read/mail/:page"
            component={MailRead}
          />
          <Redirect exact from="/member/read/mail/" to="/member/read/mail/1" />

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            exact
            path="/member/unread/mail/:page"
            component={MailUnread}
          />
          <Redirect
            exact
            from="/member/unread/mail/"
            to="/member/unread/mail/1"
          />

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            exact
            path="/member/save/mail/:page"
            component={MailSave}
          />
          <Redirect exact from="/member/save/mail/" to="/member/save/mail/1" />

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            exact
            path="/member/message/:id"
            component={MailByID}
          />

          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.authenticated,
    user: state.user,
  };
};
export default App = connect(mapStateToProps)(App);
