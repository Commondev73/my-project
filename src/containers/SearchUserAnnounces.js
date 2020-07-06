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
          {user && announces && count &&  count_mail && (
            <Fragment>
              <UserMenu user={user} count={count_mail}/>
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

    announces: state.searchAnnouncesUser.data,
    isLoading_announces: state.searchAnnouncesUser.isLoading,
    announces_err: state.searchAnnouncesUser.err,

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
  fetchSearchAnnouncesUser,
  fetchCountAnnounces,
  deleteAnnounces,
};

export default SearchUserAnnounces = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUserAnnounces);
