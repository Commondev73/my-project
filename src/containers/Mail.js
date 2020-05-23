import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import ModalErr from "../component/ModalErr/ModalErr";
import ReactPaginate from "react-paginate";
import UserMenu from "../component/UserMenu/UserMenu";
import MailList from "../component/Mail/MailList";
import { Container, Breadcrumb, BreadcrumbItem, Alert } from "reactstrap";
import { FaHome, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { connect } from "react-redux";
import {
  fetchDataUser,
  fetchMail,
  countMail,
  // readMail,
  unreadMail,
  saveMail,
  deleteMessage,
} from "../actions";
import { Col } from "reactstrap";

class Mail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      err: false,
    };
  }

  componentDidMount = () => {
    const page = this.props.match.params.page;
    this.props.fetchDataUser();
    this.props.fetchMail(page);
    this.props.countMail();
  };

  getData = async (pageNumber) => {
    window.location.replace(`${pageNumber}`);
  };

  toggleSuccess = () => {
    this.setState({
      success: !this.state.success,
    });
  };

  toggleErr = () => {
    this.setState({
      err: !this.state.err,
    });
  };

  handleUnread = (id) => {
    this.props.unreadMail(id).then((res) =>
      this.setState({
        success: res.data,
      })
    );
  };

  handleSave = (id) => {
    this.props.saveMail(id).then((res) =>
      this.setState({
        success: res.data,
      })
    );
  };

  handleDelete = (id) => {
    this.props.deleteMessage(id);
  };

  render() {
    const {
      user,
      isLoading,
      err,
      mail,
      mail_isLoading,
      mail_err,
      count,
      count_isLoading,
      count_err,
      delete_err,
      redirect,
    } = this.props;

    if (redirect) {
      window.location.reload();
    }

    return (
      <Fragment>
        {/* <Loading isLoading={true} /> */}
        {isLoading &&
          mail_isLoading &&
          count_isLoading &&
          !count &&
          !user &&
          !mail && <Loading isLoading={isLoading} />}
        {user && mail && count && (
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
              <Alert
                className="text-center"
                color="success "
                isOpen={this.state.success}
                toggle={this.toggleSuccess}
              >
                <FaRegCheckCircle size="20" />
                <h6 className="d-inline ml-1">ทํารายการสําเร็จ</h6>
              </Alert>
              <Alert
                className="text-center"
                color="danger"
                isOpen={this.state.err}
                toggle={this.toggleErr}
              >
                <FaRegTimesCircle size="20" />
                <h6 className="d-inline ml-1">
                  เกิดข้อผิดพลาด กรุณาทำรายการใหม่
                </h6>
              </Alert>
            </Container>
            <MailList
              mail={mail}
              count={count}
              save={this.handleSave}
              unread={this.handleUnread}
              deleteMail={this.handleDelete}
            />

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
                  onPageChange={(data) => this.getData(data.selected + 1)}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </Col>
            )}
          </Fragment>
        )}
        {err || mail_err || count_err || delete_err && <ModalErr />}
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

    count: state.countMail.data,
    count_err: state.countMail.err,
    count_isLoading: state.countMail.isLoading,

    // read: state.readMail.data,
    // read_err: state.readMail.err,
    // read_isLoading: state.readMail.isLoading,

    unread: state.unreadMail.data,
    unread_err: state.unreadMail.err,
    unread_isLoading: state.unreadMail.isLoading,

    save: state.saveMail.data,
    save_err: state.saveMail.err,
    save_isLoading: state.saveMail.isLoading,

    delete: state.deleteMessage.data,
    delete_err: state.deleteMessage.err,
    redirect: state.deleteMessage.redirect,
  };
};

const mapDispatchToProps = {
  fetchDataUser,
  fetchMail,
  countMail,
  unreadMail,
  saveMail,
  deleteMessage,
};

export default Mail = connect(mapStateToProps, mapDispatchToProps)(Mail);
