import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import ModalErr from "../component/ModalErr/ModalErr";
import UserMenu from "../component/UserMenu/UserMenu";
import MailDetail from "../component/Mail/MailDetail";
import { Container, Breadcrumb, BreadcrumbItem, Alert } from "reactstrap";
import { FaHome, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { connect } from "react-redux";
import {
  fetchDataUser,
  fetchMessage,
  readMail,
  unreadMail,
  saveMail,
} from "../actions";

class MailByID extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      err: false,
    };
  }
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.readMail(id);
    this.props.fetchDataUser();
    this.props.fetchMessage(id);
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
  
  handleUnread = () => {
    const id = this.props.match.params.id;
    this.props.unreadMail(id).then(res => this.setState({
      success: res.data,
    }))
  };

  handleSave = () => {
    const id = this.props.match.params.id;
    this.props.saveMail(id).then(res => this.setState({
      success: res.data,
    }));
  };

  render() {
    const {
      user,
      isLoading,
      err,
      message,
      message_isLoading,
      message_err,
    } = this.props;
    console.log("unread", this.props.unread);
    return (
      <Fragment>
        {isLoading && message_isLoading && !user && !message && (
          <Loading isLoading={isLoading} />
        )}
        {user && message && (
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
                <BreadcrumbItem>
                  <a href="/member/mail">ช้อความ</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>{message.message}</BreadcrumbItem>
              </Breadcrumb>
            </Container>
            <Container>
              <Alert
                className="text-center"
                color="success "
                isOpen={this.state.success}
                toggle={this.toggleSuccess}
              >
                <FaRegCheckCircle size="20"/>
                <h6 className="d-inline ml-1">ทํารายการสําเร็จ</h6>
              </Alert>
              <Alert
                className="text-center"
                color="danger"
                isOpen={this.state.err}
                toggle={this.toggleErr}
              >
                <FaRegTimesCircle size="20"/>
                <h6 className="d-inline ml-1">
                  เกิดข้อผิดพลาด กรุณาทำรายการใหม่
                </h6>
              </Alert>
              <MailDetail
                message={message}
                Unread={this.handleUnread}
                Save={this.handleSave}
              />
            </Container>
          </Fragment>
        )}
        {err || (message_err && <ModalErr />)}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.data_user.data,
    err: state.data_user.err,
    isLoading: state.data_user.isLoading,

    message: state.messageID.data,
    message_err: state.messageID.err,
    message_isLoading: state.messageID.isLoading,

    // read: state.readMail.data,
    // read_err: state.readMail.err,
    // read_isLoading: state.readMail.isLoading,

    // unread: state.unreadMail.data,
    // unread_err: state.unreadMail.err,
    // unread_isLoading: state.unreadMail.isLoading,

    // save: state.saveMail.data,
    // save_err: state.saveMail.err,
    // save_isLoading: state.saveMail.isLoading,
  };
};

const mapDispatchToProps = {
  fetchDataUser,
  fetchMessage,
  readMail,
  unreadMail,
  saveMail,
};

export default MailByID = connect(
  mapStateToProps,
  mapDispatchToProps
)(MailByID);
