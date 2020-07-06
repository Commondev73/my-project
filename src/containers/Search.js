import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import Header from "../component/Header/Header";
import BottomNavigation from "../component/BottomNavigation/BottomNavigation";
import ModalErr from "../component/ModalErr/ModalErr";
import NoData from "../component/UserAnnouncesList/NoData/NoData";
import ReactPaginate from "react-paginate";
import AnnouncesList from "../component/AnnouncesList/AnnouncesList";
import { connect } from "react-redux";
import {
  countMail,
  fetchAnnounces,
  addBookMark,
  deleteBookMark,
  fetchBookMarksID,
  fetchSearch,
} from "../actions";
import { Container, Row, Breadcrumb, BreadcrumbItem, Col } from "reactstrap";
import { FaHome } from "react-icons/fa";

class Search extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      keyword: match.params.keyword,
      atype: match.params.atype,
      ptype: match.params.ptype,
      bedroom: match.params.bedroom,
      toilet: match.params.toilet,
      price: match.params.price,
      toprice: match.params.toprice,
    };
  }

  componentDidMount = () => {
    document.title = "บ้าน คอนโด ตลาดซื้อขาย-เช่า";
    const page = this.props.match.params.page;
    this.props.fetchSearch(this.state, page);
    if (this.props.isAuthenticated) {
      this.props.fetchBookMarksID();
      this.props.countMail();
    }
  };

  getData = async (pageNumber) => {
    window.location.replace(`${pageNumber}`);
  };

  handleBookMark = (id) => {
    if (this.props.isAuthenticated) {
      const Bookmark = this.props.BookmarkID.filter((data) => data === id);
      const result = Bookmark.length === 0 ? false : true;
      return result;
    }
    return false;
  };

  handleAddBookMark = (id) => {
    this.props.addBookMark(id);
  };

  handleDeleteBookMark = (id) => {
    this.props.deleteBookMark(id);
  };

  render() {
    const {
      isAuthenticated,
      user,
      announces,
      err,
      isLoading,
      BookmarkIDIsLoading,
      BookmarkID,
      BookmarkIDErr,
      addBookmarkErr,
      deleteBookmarkErr,
      match,

      count,
      count_isLoading,
      count_err,
    } = this.props;

    return (
      <Fragment>
        <Header user={user} isAuthenticated={isAuthenticated} match={match} />
        <div className="content">
          <Container className="mt-1">
            <Breadcrumb>
              <BreadcrumbItem active>
                <FaHome className="mr-1" />
                หน้าแรก
              </BreadcrumbItem>
            </Breadcrumb>
          </Container>

          <Container className="pt-3 border border-0">
            <Row>
              {isAuthenticated && (
                <Fragment>
                  {isLoading &&
                    BookmarkIDIsLoading &&
                    count_isLoading &&
                    !count &&
                    !BookmarkID &&
                    !announces && <Loading isLoading={isLoading} />}
                  {announces && BookmarkID && count && (
                    <Fragment>
                      {announces.data.map((announce) => (
                        <AnnouncesList
                          key={announce.id}
                          announce={announce}
                          addBookMark={this.handleAddBookMark}
                          deleteBookMark={this.handleDeleteBookMark}
                          mark={this.handleBookMark(announce.id)}
                        />
                      ))}

                      {announces.data.length === 0 && <NoData />}

                      {announces.last_page > 1 && (
                        <Col xs="12">
                          <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={announces.last_page}
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
                      <BottomNavigation count={count} />
                    </Fragment>
                  )}
                </Fragment>
              )}
              {!isAuthenticated && (
                <Fragment>
                  {isLoading && !announces && <Loading isLoading={isLoading} />}
                  {announces && (
                    <Fragment>
                      {announces.data.map((announce) => (
                        <AnnouncesList
                          key={announce.id}
                          announce={announce}
                          addBookMark={this.handleAddBookMark}
                          deleteBookMark={this.handleDeleteBookMark}
                          mark={false}
                        />
                      ))}

                      {announces.data.length === 0 && <NoData />}

                      {announces.last_page > 1 && (
                        <Col xs="12">
                          <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={announces.last_page}
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
                    </Fragment>
                  )}
                </Fragment>
              )}
              {err ||
                addBookmarkErr ||
                deleteBookmarkErr ||
                count_err ||
                (BookmarkIDErr && <ModalErr />)}
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.authenticated,
    user: state.user,

    announces: state.search.data,
    err: state.search.err,
    isLoading: state.search.isLoading,

    count: state.countMail.data,
    count_err: state.countMail.err,
    count_isLoading: state.countMail.isLoading,

    BookmarkID: state.bookmarksID.data,
    BookmarkIDErr: state.bookmarksID.err,
    BookmarkIDIsLoading: state.bookmarksID.isLoading,

    addBookmark: state.addBookmark.data,
    addBookmarkErr: state.addBookmark.err,
    addBookmarkIsLoading: state.addBookmark.isLoading,

    deleteBookmark: state.deleteBookmark.data,
    deleteBookmarkErr: state.deleteBookmark.err,
    deleteBookmarkIsLoading: state.deleteBookmark.isLoading,
  };
};

const mapDispatchToProps = {
  countMail,
  fetchAnnounces,
  addBookMark,
  deleteBookMark,
  fetchBookMarksID,
  fetchSearch,
};

export default Search = connect(mapStateToProps, mapDispatchToProps)(Search);
