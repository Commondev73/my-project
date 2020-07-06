import React, { Fragment } from "react";
import Header from "../component/Header/Header";
import BottomNavigation from "../component/BottomNavigation/BottomNavigation";
import Loading from "../component/Loading/Loading";
import UserMenu from "../component/UserMenu/UserMenu";
import ModalErr from "../component/ModalErr/ModalErr";
import UserAnnouncesList from "../component/UserAnnouncesList/UserAnnouncesList";
import { Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FaHome } from "react-icons/fa";
import { connect } from "react-redux";
import {
  countMail,
  fetchUserAnnouncesDraft,
  fetchDataUser,
  fetchCountAnnounces,
  deleteAnnounces,
} from "../actions";

class UserAnnouncesCorrect extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    document.title = "แบบร่าง";
    const page = this.props.match.params.page;
    this.props.fetchDataUser();
    this.props.fetchCountAnnounces();
    this.props.fetchUserAnnouncesDraft(page);
    this.props.countMail();
  };

  getData = async (pageNumber) => {
    window.location.replace(`${pageNumber}`);
  };

  handleDelete = (id) => {
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

      count_mail,
      count__mail_err,
      count__mail_isLoading,

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
          {isLoading &&
            isLoading_announces &&
            count_isLoading &&
            count__mail_isLoading &&
            !count_mail &&
            !count &&
            !user &&
            !announces && <Loading isLoading={isLoading} />}
          {user && announces && count && count_mail && (
            <Fragment>
              <UserMenu user={user} count={count_mail} />
              <Container className="mt-2">
                <Breadcrumb style={{ backgroundColor: "white" }}>
                  <BreadcrumbItem>
                    <FaHome className="mr-1" />
                    <a href="/">หน้าแรก</a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>หน้าสมาชิก</BreadcrumbItem>
                  <BreadcrumbItem>ประกาศของฉัน</BreadcrumbItem>
                  <BreadcrumbItem active>แบบร่าง</BreadcrumbItem>
                </Breadcrumb>
              </Container>
              <UserAnnouncesList
                count={count}
                announces={announces}
                tab={2}
                delete={this.handleDelete}
                getData={this.getData}
              />
              <BottomNavigation count={count_mail} />
            </Fragment>
          )}
          {err ||
            announces_err ||
            deleteAnnounces_err ||
            count__mail_err ||
            (count_err && <ModalErr />)}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
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

    count_mail: state.countMail.data,
    count__mail_err: state.countMail.err,
    count__mail_isLoading: state.countMail.isLoading,

    deleteAnnounces: state.deleteAnnounces.data,
    isLoading_deleteAnnounces: state.deleteAnnounces.isLoading,
    deleteAnnounces_err: state.deleteAnnounces.err,
    redirect: state.deleteAnnounces.redirect,
  };
};

const mapDispatchToProps = {
  countMail,
  fetchDataUser,
  fetchUserAnnouncesDraft,
  fetchCountAnnounces,
  deleteAnnounces,
};

export default UserAnnouncesCorrect = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAnnouncesCorrect);
