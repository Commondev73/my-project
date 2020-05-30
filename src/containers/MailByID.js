import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import ModalErr from "../component/ModalErr/ModalErr";
import UserMenu from "../component/UserMenu/UserMenu";
import MailDetail from "../component/Mail/MailDetail";
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Alert,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  FaHome,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaTrashAlt,
  FaTimes,
} from "react-icons/fa";
import { connect } from "react-redux";
import {
  fetchDataUser,
  fetchMessage,
  readMail,
  unreadMail,
  saveMail,
  deleteMessage,
} from "../actions";
import { Redirect } from "react-router-dom";

class MailByID extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      success: false,
      err: false,
    };
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.fetchDataUser();
    this.props.fetchMessage(id);
  };

  componentDidUpdate(nextProps) {
    const { unread_err, save_err } = this.props;
    if (
      nextProps.unread_err !== unread_err ||
      nextProps.save_err !== save_err
    ) {
      if (unread_err || save_err) {
        this.setState({
          err: true,
        });
      }
    }
  }

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

  handleRead = (data) => {
    const id = this.props.match.params.id;
    if (data === 1) {
      this.props.readMail(id);
    }
  };

  handleUnread = () => {
    const id = this.props.match.params.id;
    this.props.unreadMail(id).then((res) =>
      this.setState({
        success: res.data,
      })
    );
  };

  handleSave = () => {
    const id = this.props.match.params.id;
    this.props.saveMail(id).then((res) =>
      this.setState({
        success: res.data,
      })
    );
  };

  confirmDelete = () => {
    this.setState({
      ...this.state,
      confirmDelete: !this.state.confirmDelete,
    });
  };

  handleDelete = () => {
    const id = this.props.match.params.id;
    this.props.deleteMessage(id);
  };

  render() {
    const {
      user,
      isLoading,
      err,
      message,
      message_isLoading,
      message_err,
      redirect,
      delete_err,
    } = this.props;

    if (redirect) {
      return <Redirect push to="/member/mail/" />;
    }

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
              {this.handleRead(message.reading_status)}
              <MailDetail
                read={this.handleRead}
                message={message}
                Unread={this.handleUnread}
                Save={this.handleSave}
                deleteMail={this.confirmDelete}
              />
            </Container>
          </Fragment>
        )}
        {err || delete_err || (message_err && <ModalErr />)}
        <Modal isOpen={this.state.confirmDelete}>
          <ModalBody className="text-center confirm-delete">
            <h1>
              <FaTimes className="mt-3 mb-3" />
            </h1>
            <h3>รายการนี้จะถูกลบทันทีและกู้คืนไม่ได้</h3>
            <h3>คุณต้องการลบใช่หรือไม่?</h3>
          </ModalBody>
          <ModalFooter className="border-0">
            <Button
              color="secondary"
              onClick={this.confirmDelete}
              className="rounded-pill m-auto"
            >
              <FaTimes className="mr-2" />
              ยกเลิก
            </Button>
            <Button
              color="danger"
              className="rounded-pill m-auto"
              onClick={this.handleDelete}
            >
              <FaTrashAlt className="mr-2" />
              ตกลง
            </Button>
          </ModalFooter>
        </Modal>
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
    unread_err: state.unreadMail.err,
    // unread_isLoading: state.unreadMail.isLoading,

    // save: state.saveMail.data,
    save_err: state.saveMail.err,
    // save_isLoading: state.saveMail.isLoading,

    delete: state.deleteMessage.data,
    delete_err: state.deleteMessage.err,
    redirect: state.deleteMessage.redirect,
  };
};

const mapDispatchToProps = {
  fetchDataUser,
  fetchMessage,
  readMail,
  unreadMail,
  saveMail,
  deleteMessage,
};

export default MailByID = connect(
  mapStateToProps,
  mapDispatchToProps
)(MailByID);
