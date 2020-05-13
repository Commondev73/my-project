import React, { Fragment } from "react";
import Login from "../component/Login/Login";
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

  handleSubmit = data => {
    this.props.login(data);
  };

  render() {
    const { err, redirect, isLoading } = this.props;
    if (redirect) {
      return <Redirect to='/member'/>;
    }
    return (
      <Fragment>
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
        {err  && <ModalErr />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    err: state.login.err,
    isLoading: state.login.isLoading,
    redirect: state.login.redirect
  };
};

const mapDispatchToProps = {
  login
};

export default LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
