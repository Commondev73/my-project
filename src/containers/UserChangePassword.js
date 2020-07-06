import React, { Fragment } from "react";
import UserMenu from "../component/UserMenu/UserMenu";
import Header from "../component/Header/Header";
import BottomNavigation from "../component/BottomNavigation/BottomNavigation";
import ModalErr from "../component/ModalErr/ModalErr";
import Loading from "../component/Loading/Loading";
import ChangePassword from "../component/ChangePassword/ChangePassword";
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
import { connect } from "react-redux";
import { countMail, changePassword, fetchDataUser } from "../actions";

class UserChangePassword extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    document.title = "เปลี่ยนรหัสผ่าน";
    this.props.fetchDataUser();
    this.props.countMail();
  };
  handleSubmit = (data) => {
    this.props.changePassword(data);
  };

  handleRedirect = () => {
    const { redirect } = this.props;
    if (redirect) {
      return this.props.history.push("/login");
    }
  };

  render() {
    // const { err } = this.props;
    const {
      user,
      isLoading,
      err,
      err_change_password,

      count,
      count_isLoading,
      count_err,

      redirect,
      userSet,
      isAuthenticated,
      match,
    } = this.props;
    return (
      <Fragment>
        <Header
          user={userSet}
          isAuthenticated={isAuthenticated}
          match={match}
        />
        <div className="content">
          {isLoading && count_isLoading && !count && !user && (
            <Loading isLoading={isLoading} />
          )}
          {user && count && (
            <Fragment>
              <UserMenu user={user} count={count} />
              <Container className="mt-2">
                <Breadcrumb style={{ backgroundColor: "white" }}>
                  <BreadcrumbItem>
                    <FaHome className="mr-1" />
                    <a href="/">หน้าแรก</a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>หน้าสมาชิก</BreadcrumbItem>
                  <BreadcrumbItem active>เปลี่ยนรหัสผ่าน</BreadcrumbItem>
                </Breadcrumb>
              </Container>
              <ChangePassword
                submit={this.handleSubmit}
                err={err_change_password}
              />

              {redirect && (
                <Modal isOpen={true}>
                  <ModalHeader
                    style={{
                      backgroundColor: "#01D26C",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <h1>
                      <FaRegCheckCircle style={{ color: "white" }} />
                    </h1>
                  </ModalHeader>
                  <ModalBody className="text-center">
                    <h3>เปลี่ยนรหัสผ่าน สำเร็จ!</h3>
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
              <BottomNavigation count={count} />
            </Fragment>
          )}
        </div>
        {err || err_change_password || (count_err && <ModalErr />)}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.authenticated,
    userSet: state.user,

    count: state.countMail.data,
    count_err: state.countMail.err,
    count_isLoading: state.countMail.isLoading,

    user: state.data_user.data,
    err: state.data_user.err,
    isLoading: state.data_user.isLoading,

    err_change_password: state.change_password.err,
    isLoading: state.change_password.isLoading,
    redirect: state.change_password.redirect,
  };
};

const mapDispatchToProps = {
  countMail,
  fetchDataUser,
  changePassword,
};
export default UserChangePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserChangePassword);
