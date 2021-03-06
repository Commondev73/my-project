import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import Header from "../component/Header/Header";
import BottomNavigation from "../component/BottomNavigation/BottomNavigation";
import Profile from "../component/Profile/Profile";
import ModalErr from "../component/ModalErr/ModalErr";
import UserMenu from "../component/UserMenu/UserMenu";
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
import {
  countMail,
  fetchDataUser,
  UpdateProfile,
  UpdateProfileImage,
} from "../actions";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_profile: false,
    };
  }

  componentDidMount = () => {
    document.title = "ข้อมูลของฉัน";
    this.props.fetchDataUser();
    this.props.countMail();
  };

  componentDidUpdate(nextProps) {
    const { update_profile } = this.props;
    if (nextProps.update_profile !== update_profile) {
      if (update_profile) {
        this.setState({
          modal_profile: true,
        });
      }
    }
  }

  Modal = () => {
    this.setState({
      modal_profile: !this.state.modal_profile,
    });
  };

  handleUpdateProfileImage = (data) => {
    this.props.UpdateProfileImage(data);
  };

  handleSubmit = (data) => {
    this.props.UpdateProfile(data);
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const {
      user,
      isLoading,
      update_profile,
      //
      count,
      count_isLoading,
      count_err,
      //
      err_update,
      update_profile_image,
      update_profile_image_err,
      err,

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
              <UserMenu user={user} count={count}/>
              <Container className="mt-2">
                <Breadcrumb style={{ backgroundColor: "white" }}>
                  <BreadcrumbItem>
                    <FaHome className="mr-1" />
                    <a href="/">หน้าแรก</a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>หน้าสมาชิก</BreadcrumbItem>
                  <BreadcrumbItem active>โปรไฟล์</BreadcrumbItem>
                </Breadcrumb>
              </Container>
              <Profile
                submit={this.handleSubmit}
                UpdateProfileImage={this.handleUpdateProfileImage}
                user={user}
                err_update={err_update}
              />
              <BottomNavigation count={count} />
            </Fragment>
          )}

          {update_profile_image && (
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
                <h3>เปลี่ยนรูปภาพ !สำเร็จ</h3>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="lg"
                  color="success m-auto"
                  onClick={this.handleReload}
                  className="rounded-pill"
                >
                  ตกลง
                </Button>
              </ModalFooter>
            </Modal>
          )}

          <Modal isOpen={this.state.modal_profile}>
            <ModalHeader
              style={{
                backgroundColor: "#01D26C",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FaRegCheckCircle style={{ color: "white" }} size="32" />
            </ModalHeader>
            <ModalBody className="text-center">
              <h3>เอัปเดตข้อมูล!สำเร็จ</h3>
            </ModalBody>
            <ModalFooter>
              <Button
                size="lg"
                color="success m-auto"
                onClick={this.Modal}
                className="rounded-pill"
              >
                ตกลง
              </Button>
            </ModalFooter>
          </Modal>

          {count_err || update_profile_image_err || (err && <ModalErr />)}
        </div>
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

    update_profile_image: state.update_profile_image.data,
    update_profile_image_err: state.update_profile_image.err,
    update_profile: state.update_profile.data,
    err_update: state.update_profile.err,
  };
};

const mapDispatchToProps = {
  countMail,
  fetchDataUser,
  UpdateProfile,
  UpdateProfileImage,
};
export default ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
