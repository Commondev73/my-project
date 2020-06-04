import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import ModalErr from "../component/ModalErr/ModalErr";
import ReactPaginate from "react-paginate";
import AnnouncesList from "../component/AnnouncesList/AnnouncesList";
import { connect } from "react-redux";
import { fetchAnnounces, addBookMark, deleteBookMark } from "../actions";
import { Container, Row, Breadcrumb, BreadcrumbItem, Col } from "reactstrap";
import { FaHome } from "react-icons/fa";
import { httpClient } from "../HttpClient";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: ""
    };
  }

  componentDidMount = () => {
    document.title = "บ้าน คอนโด ตลาดซื้อขาย-เช่า"
    const page = this.props.match.params.page;
    this.props.fetchAnnounces(page);
    if (this.props.isAuthenticated) {
      httpClient.get('/api/user/bookmark')
        .then(response => {
          this.setState({ bookmarks: response.data })
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  getData = async (pageNumber) => {
    window.location.replace(`${pageNumber}`);
  };

  handleBookMark = (id) => {
    if (this.props.isAuthenticated) {
      const Mark = this.state.bookmarks.filter(data => data === id)
      const result = Mark.length === 0 ? false : true;
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
      announces,
      err,
      isLoading,
      addBookmarkErr,
      deleteBookmarkErr,
    } = this.props;
    return (
      <Fragment>
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
            {isLoading && !announces && <Loading isLoading={isLoading} />}
            {announces && (
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
                      onPageChange={(data) => this.getData(data.selected + 1)}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  </Col>
                )}
              </Fragment>
            )}
            {err || addBookmarkErr || deleteBookmarkErr && <ModalErr />}
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.authenticated,

    announces: state.announces.data,
    err: state.announces.err,
    isLoading: state.announces.isLoading,

    addBookmark: state.addBookmark.data,
    addBookmarkErr: state.addBookmark.err,
    addBookmarkIsLoading: state.addBookmark.isLoading,

    deleteBookmark: state.deleteBookmark.data,
    deleteBookmarkErr: state.deleteBookmark.err,
    deleteBookmarkIsLoading: state.deleteBookmark.isLoading,
  };
};

const mapDispatchToProps = {
  fetchAnnounces,
  addBookMark,
  deleteBookMark,
};

export default Home = connect(mapStateToProps, mapDispatchToProps)(Home);
