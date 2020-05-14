import React, { Fragment } from "react";
import UserMenu from "../component/UserMenu/UserMenu";
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
  Button
} from "reactstrap";
import { FaHome ,FaRegCheckCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { changePassword, fetchDataUser } from "../actions";

class UserChangePassword extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.props.fetchDataUser();
  };
  handleSubmit = data => {
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
    const { user, isLoading, err_change_password , redirect} = this.props;
    return (
      <Fragment>
        {/* <Loading isLoading={true} /> */}
        {isLoading && !user && <Loading isLoading={isLoading} />}
        {user && (
          <Fragment>
            <UserMenu user={user} />
            <Container className="mt-2">
              <Breadcrumb style={{ backgroundColor: "white" }}>
                <BreadcrumbItem>
                  <FaHome className="mr-1" />
                  <a href="/">หน้าแรก</a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a href="/member">หน้าสมาชิก</a>
                </BreadcrumbItem>
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
                    justifyContent: "center"
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
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.data_user.data,
    err: state.data_user.err,
    isLoading: state.data_user.isLoading,

    err_change_password: state.change_password.err,
    isLoading: state.change_password.isLoading,
    redirect: state.change_password.redirect
  };
};

const mapDispatchToProps = {
  fetchDataUser,
  changePassword
};
export default UserChangePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserChangePassword);
