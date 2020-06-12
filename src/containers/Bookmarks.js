import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import Header from "../component/Header/Header";
import ModalErr from "../component/ModalErr/ModalErr";
import UserMenu from "../component/UserMenu/UserMenu";
import AnnouncesList from "../component/AnnouncesList/AnnouncesList";
import NoData from "../component/UserAnnouncesList/NoData/NoData";
import ReactPaginate from "react-paginate";
import { Container, Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";
import { FaHome } from "react-icons/fa";
import { connect } from "react-redux";
import {
  fetchDataUser,
  fetchBookMarks,
  addBookMark,
  deleteBookMark,
} from "../actions";

const BookMarkBorder = {
  borderBottomRightRadius: "25px",
  borderTopRightRadius: "25px",
  borderBottomLeftRadius: "25px",
  borderTopLeftRadius: "25px",
};

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const page = this.props.match.params.page;
    this.props.fetchDataUser();
    this.props.fetchBookMarks(page);
  };

  getData = async (pageNumber) => {
    window.location.replace(`${pageNumber}`);
  };

  handleAddBookMark = (id) => {
    this.props.addBookMark(id);
  };

  handleDeleteBookMark = (id) => {
    this.props.deleteBookMark(id);
  };

  render() {
    const {
      user,
      isLoading,
      err,
      bookmarks,
      bookmarksErr,
      bookmarksIsLoading,
      addBookmarkErr,
      deleteBookmarkErr,

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
          {isLoading && bookmarksIsLoading && !user && !bookmarks && (
            <Loading isLoading={isLoading} />
          )}
          {user && bookmarks && (
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
                  <BreadcrumbItem active>รายการโปรด</BreadcrumbItem>
                </Breadcrumb>
                <Container className="pt-3 border" style={BookMarkBorder}>
                  <Row>
                    {bookmarks.data.map((announce) => (
                      <AnnouncesList
                        key={announce.id}
                        announce={announce}
                        addBookMark={this.handleAddBookMark}
                        deleteBookMark={this.handleDeleteBookMark}
                        mark={true}
                      />
                    ))}
                    {bookmarks.last_page > 1 && (
                      <Col xs="12">
                        <ReactPaginate
                          previousLabel={"previous"}
                          nextLabel={"next"}
                          breakLabel={"..."}
                          breakClassName={"break-me"}
                          pageCount={bookmarks.last_page}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          forcePage={this.props.match.params.page - 1}
                          onPageChange={(data) =>
                            this.getData(data.selected + 1)
                          }
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"}
                        />
                      </Col>
                    )}
                    {bookmarks.data.length === 0 && <NoData />}
                  </Row>
                </Container>
              </Container>
            </Fragment>
          )}
          {err ||
            bookmarksErr ||
            addBookmarkErr ||
            (deleteBookmarkErr && <ModalErr />)}
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

    bookmarks: state.bookmarks.data,
    bookmarksErr: state.bookmarks.err,
    bookmarksIsLoading: state.bookmarks.isLoading,

    addBookmark: state.addBookmark.data,
    addBookmarkErr: state.addBookmark.err,
    addBookmarkIsLoading: state.addBookmark.isLoading,

    deleteBookmark: state.deleteBookmark.data,
    deleteBookmarkErr: state.deleteBookmark.err,
    deleteBookmarkIsLoading: state.deleteBookmark.isLoading,
  };
};

const mapDispatchToProps = {
  fetchDataUser,
  fetchBookMarks,
  addBookMark,
  deleteBookMark,
};
export default Bookmarks = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookmarks);
