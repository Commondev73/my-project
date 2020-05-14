import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import UserMenu from "../component/UserMenu/UserMenu";
import ModalErr from "../component/ModalErr/ModalErr";
import UserAnnouncesList from "../component/UserAnnouncesList/UserAnnouncesList";
import { Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FaHome } from "react-icons/fa";
import { connect } from "react-redux";
import { fetchUserAnnounces, fetchDataUser, deleteAnnounces } from "../actions";

class UserAnnouncesOnline extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    const page = this.props.match.params.page;
    this.props.fetchDataUser();
    this.props.fetchUserAnnounces(page);
  };

//   getDataAnnounces = pageNumber => {
//     this.props.fetchUserAnnounces(pageNumber);
//     return this.props.history.push('/foo')
//   };

  handleDelete = id => {
    this.props.deleteAnnounces(id);
  };

  render() {
    const {
      user,
      isLoading,
      err,
      announces,
      isLoading_announces,
      announces_err,
      deleteAnnounces_err,
      redirect
    } = this.props;

    if (redirect) {
      window.location.reload();
    }
    return (
      <Fragment>
        {/* <Loading isLoading={true} /> */}
        {isLoading && isLoading_announces && !user && !announces && (
          <Loading isLoading={isLoading} />
        )}
        {user && announces && (
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
                <BreadcrumbItem active>ประกาศของฉัน</BreadcrumbItem>
              </Breadcrumb>
            </Container>
            <UserAnnouncesList
              announces={announces}
              tab={1}
              delete={this.handleDelete}
              getDataAnnounces={this.getDataAnnounces}
            />
          </Fragment>
        )}
        {err || announces_err || deleteAnnounces_err && <ModalErr />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.data_user.data,
    err: state.data_user.err,
    isLoading: state.data_user.isLoading,

    announces: state.announces_user.data,
    isLoading_announces: state.announces_user.isLoading,
    announces_err: state.announces_user.err,

    deleteAnnounces: state.deleteAnnounces.data,
    isLoading_deleteAnnounces: state.deleteAnnounces.isLoading,
    deleteAnnounces_err: state.deleteAnnounces.err,
    redirect: state.deleteAnnounces.redirect
  };
};

const mapDispatchToProps = {
  fetchDataUser,
  fetchUserAnnounces,
  deleteAnnounces
};

export default UserAnnouncesOnline = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAnnouncesOnline);
