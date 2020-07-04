import React, { Fragment } from "react";
import Login from "../component/Login/Login";
import Header from "../component/Header/Header";
import ModalErr from "../component/ModalErr/ModalErr";
import { Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FaHome } from "react-icons/fa";
import { connect } from "react-redux";
import { login } from "../actions";
import { Redirect } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    document.title = "เข้าสู่ระบบ";
  };

  handleSubmit = (data) => {
    this.props.login(data);
  };

  render() {
    const { err, redirect, isAuthenticated, user, match } = this.props;
    if (redirect) {
      return <Redirect to="/member/announces/online/1" />;
    }
    return (
      <Fragment>
        <Header user={user} isAuthenticated={isAuthenticated} match={match} />
        <div className="content">
          <Container className="mt-2">
            <Breadcrumb style={{ backgroundColor: "white" }}>
              <BreadcrumbItem>
                <FaHome className="mr-1" />
                <a href="/">หน้าแรก</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>เข้าสู่ระบบ</BreadcrumbItem>
            </Breadcrumb>
          </Container>
          <Login submit={this.handleSubmit} err={err} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.authenticated,
    user: state.user,

    err: state.login.err,
    isLoading: state.login.isLoading,
    redirect: state.login.redirect,
  };
};

const mapDispatchToProps = {
  login,
};

export default LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
