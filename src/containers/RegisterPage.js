import React, { Fragment } from "react";
import Header from "../component/Header/Header";
import Register from "../component/Register/Register";
import ModalErr from "../component/ModalErr/ModalErr";
import { connect } from "react-redux";
import { postRegister } from "../actions";
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { FaHome, FaRegCheckCircle } from "react-icons/fa";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
  }
  handleSubmit = (data) => {
    this.props.postRegister(data);
  };

  handleRedirect = () => {
    const { redirect } = this.props;
    if (redirect) {
      return this.props.history.push("/login");
    }
  };
  render() {
    const { redirect, err, isAuthenticated, user, match } = this.props;
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
              <BreadcrumbItem active>สมัครสมาชิก</BreadcrumbItem>
            </Breadcrumb>
          </Container>
          {redirect && (
            <Modal isOpen={true}>
              <ModalHeader
                style={{
                  backgroundColor: "#01D26C",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FaRegCheckCircle style={{ color: "white" }} size={32} />
              </ModalHeader>
              <ModalBody className="text-center">
                <h3>สมัครสมาชิกสำเร็จ</h3>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="lg"
                  color="success m-auto"
                  onClick={this.handleRedirect}
                  className="rounded-pill"
                >
                  ตกลง
                </Button>
              </ModalFooter>
            </Modal>
          )}
          <Register submit={this.handleSubmit} />
          {err && <ModalErr />}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("STATE: ", state);
  return {
    isAuthenticated: state.user.authenticated,
    user: state.user,

    err: state.register.err,
    isLoading: state.register.isLoading,
    redirect: state.register.redirect,
  };
};

const mapDispatchToProps = {
  postRegister,
};

export default RegisterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
