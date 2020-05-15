import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import ModalErr from "../component/ModalErr/ModalErr";
import ReactPaginate from "react-paginate";
import UserMenu from "../component/UserMenu/UserMenu";
import MailList from "../component/Mail/MailList";
import { Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FaHome } from "react-icons/fa";
import { connect } from "react-redux";
import { fetchDataUser, fetchMail } from "../actions";
import { Col } from "reactstrap";

class Mail extends React.Component {
  componentDidMount = () => {
    const page = this.props.match.params.page;
    this.props.fetchDataUser();
    this.props.fetchMail(page);
  };

  getData = async pageNumber => {
    window.location.replace(`${pageNumber}`);
  };


  render() {
    const { user, isLoading, err, mail, mail_isLoading, mail_err } = this.props;
    return (
      <Fragment>
        {/* <Loading isLoading={true} /> */}
        {isLoading && mail_isLoading && !user && !mail && <Loading isLoading={isLoading} />}
        {user && mail && (
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
                <BreadcrumbItem active>ช้อความ</BreadcrumbItem>
              </Breadcrumb>
            </Container>
            <MailList mail={mail} />

            {mail.last_page > 1 && (
              <Col xs="12">
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={mail.last_page}
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
        {err || mail_err  && <ModalErr />}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.data_user.data,
    err: state.data_user.err,
    isLoading: state.data_user.isLoading,

    mail: state.mail.data,
    mail_err: state.mail.err,
    mail_isLoading: state.mail.isLoading,
  };
};

const mapDispatchToProps = {
  fetchDataUser,
  fetchMail,
};

export default Mail = connect(mapStateToProps, mapDispatchToProps)(Mail);

