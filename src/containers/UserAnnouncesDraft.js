import React, { Fragment } from "react";
import Header from "../component/Header/Header";
import Loading from "../component/Loading/Loading";
import UserMenu from "../component/UserMenu/UserMenu";
import ModalErr from "../component/ModalErr/ModalErr";
import UserAnnouncesList from "../component/UserAnnouncesList/UserAnnouncesList";
import { Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FaHome } from "react-icons/fa";
import { connect } from "react-redux";
import { fetchUserAnnouncesDraft, fetchDataUser, fetchCountAnnounces, deleteAnnounces } from "../actions";

class UserAnnouncesCorrect extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    const page = this.props.match.params.page;
    this.props.fetchDataUser();
    this.props.fetchCountAnnounces();
    this.props.fetchUserAnnouncesDraft(page);
  };

  getData = async (pageNumber) => {
    window.location.replace(`${pageNumber}`);
  };

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
      count,
      count_isLoading,
      count_err,
      deleteAnnounces_err,
      redirect,

      userSet,
      isAuthenticated,
      match,
    } = this.props;

    if (redirect) {
      window.location.reload();
    }
    return (
      <Fragment>
        <Header
          user={userSet}
          isAuthenticated={isAuthenticated}
          match={match}
        />
        <div className="content">
        {isLoading && isLoading_announces && count_isLoading &&
          !count && !user && !announces && (
            <Loading isLoading={isLoading} />
          )}
        {user && announces &&  count && (
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
              count={count}
              announces={announces}
              tab={2}
              delete={this.handleDelete}
              getData={this.getData}
            />
          </Fragment>
        )}
        {err || announces_err || deleteAnnounces_err || count_err && <ModalErr />}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.authenticated,
    userSet: state.user,

    user: state.data_user.data,
    err: state.data_user.err,
    isLoading: state.data_user.isLoading,

    announces: state.draft_announces_user.data,
    isLoading_announces: state.draft_announces_user.isLoading,
    announces_err: state.draft_announces_user.err,

    count: state.countAnnounces.data,
    count_err: state.countAnnounces.err,
    count_isLoading: state.countAnnounces.isLoading,

    deleteAnnounces: state.deleteAnnounces.data,
    isLoading_deleteAnnounces: state.deleteAnnounces.isLoading,
    deleteAnnounces_err: state.deleteAnnounces.err,
    redirect: state.deleteAnnounces.redirect
  };
};

const mapDispatchToProps = {
  fetchDataUser,
  fetchUserAnnouncesDraft,
  fetchCountAnnounces,
  deleteAnnounces
};

export default UserAnnouncesCorrect = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAnnouncesCorrect);
