import React, { Fragment } from "react";
import Header from "../component/Header/Header";
import Loading from "../component/Loading/Loading";
import ModalErr from "../component/ModalErr/ModalErr";
import UserMenu from "../component/UserMenu/UserMenu";
import MailList from "../component/Mail/MailList";
import { Container, Breadcrumb, BreadcrumbItem, Alert } from "reactstrap";
import { FaHome, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { connect } from "react-redux";
import {
  fetchDataUser,
  fetchUserMailRead,
  countMail,
  readMail,
  unreadMail,
  saveMail,
  deleteMessage,
} from "../actions";
import { Col } from "reactstrap";

class MailRead extends React.Component {
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
    this.props.fetchUserMailRead(page);
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

  handleRead = (id) => {
    this.props.readMail(id).then((res) =>
      this.setState({
        success: res.data,
      })
    );
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

      // read,
      read_err,

      delete_err,
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
                  <BreadcrumbItem>หน้าสมาชิก</BreadcrumbItem>
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
                getData={this.getData}
                match={match}
                activeTab={2}
                read={this.handleRead}
                mail={mail}
                count={count}
                save={this.handleSave}
                unread={this.handleUnread}
                deleteMail={this.handleDelete}
              />
            </Fragment>
          )}
          {err ||
            mail_err ||
            count_err ||
            delete_err ||
            (read_err && <ModalErr />)}
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

    mail: state.mailRead.data,
    mail_err: state.mailRead.err,
    mail_isLoading: state.mailRead.isLoading,

    count: state.countMail.data,
    count_err: state.countMail.err,
    count_isLoading: state.countMail.isLoading,

    read: state.readMail.data,
    read_err: state.readMail.err,
    read_isLoading: state.readMail.isLoading,

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
  fetchUserMailRead,
  countMail,
  unreadMail,
  readMail,
  saveMail,
  deleteMessage,
};

export default MailRead = connect(
  mapStateToProps,
  mapDispatchToProps
)(MailRead);
