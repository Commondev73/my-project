import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import ReactPaginate from "react-paginate";
import AnnouncesList from "../component/AnnouncesList/AnnouncesList";
import { connect } from "react-redux";
import { fetchAnnounces } from "../actions";
import { Container, Row, Breadcrumb, BreadcrumbItem, Col } from "reactstrap";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

class Home extends React.Component {
  // componentDidMount = async () => {
  //   await this.getData();
  // };

  componentDidMount = () => {
    const page = this.props.match.params.page;
    this.props.fetchAnnounces(page);
  };

  getData = async pageNumber => {
    window.location.replace(`${pageNumber}`);
    // this.props.fetchAnnounces(pageNumber);
  };

  render() {
    const { announces, err, isLoading } = this.props;
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

        <Container className="pt-3 border-primary border">
          <Row>
            {isLoading && !announces && <Loading isLoading={isLoading} />}
            {announces && (
              <Fragment>
                {announces.data.map(announce => (
                  <AnnouncesList key={announce.id} announce={announce} />
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
                      onPageChange={data => this.getData(data.selected + 1)}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  </Col>
                )}
              </Fragment>
            )}
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  // console.log("STATE: ", state);
  return {
    announces: state.announces.data,
    err: state.announces.err,
    isLoading: state.announces.isLoading
  };
};

const mapDispatchToProps = {
  fetchAnnounces
};

export default Home = connect(mapStateToProps, mapDispatchToProps)(Home);
