import React, { Fragment } from "react";
import Header from "../component/Header/Header";
import Loading from "../component/Loading/Loading";
import UserMenu from "../component/UserMenu/UserMenu";
import ModalErr from "../component/ModalErr/ModalErr";
import UserAnnouncesList from "../component/UserAnnouncesList/UserAnnouncesList";
import { Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FaHome } from "react-icons/fa";
import { connect } from "react-redux";
import {
  fetchSearchAnnouncesUser,
  fetchDataUser,
  fetchCountAnnounces,
  deleteAnnounces,
} from "../actions";

class SearchUserAnnounces extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      keyword: match.params.ukeyword,
      atype: match.params.uatype,
      ptype: match.params.uptype,
      bedroom: match.params.ubedroom,
      toilet: match.params.utoilet,
    };
  }
  componentDidMount = () => {
    document.title = "ค้นหา ประกาศของฉัน";
    const page = this.props.match.params.page;
    this.props.fetchDataUser();
    this.props.fetchCountAnnounces();
    this.props.fetchSearchAnnouncesUser(this.state, page);
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
            !count &&
            !user &&
            !announces && <Loading isLoading={isLoading} />}
          {user && announces && count && (
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
                match={match}
                count={count}
                announces={announces}
                tab={0}
                delete={this.handleDelete}
                getData={this.getData}
              />
            </Fragment>
          )}
          {err ||
            announces_err ||
            deleteAnnounces_err ||
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

    announces: state.searchAnnouncesUser.data,
    isLoading_announces: state.searchAnnouncesUser.isLoading,
    announces_err: state.searchAnnouncesUser.err,

    count: state.countAnnounces.data,
    count_err: state.countAnnounces.err,
    count_isLoading: state.countAnnounces.isLoading,

    deleteAnnounces: state.deleteAnnounces.data,
    isLoading_deleteAnnounces: state.deleteAnnounces.isLoading,
    deleteAnnounces_err: state.deleteAnnounces.err,
    redirect: state.deleteAnnounces.redirect,
  };
};

const mapDispatchToProps = {
  fetchDataUser,
  fetchSearchAnnouncesUser,
  fetchCountAnnounces,
  deleteAnnounces,
};

export default SearchUserAnnounces = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUserAnnounces);
