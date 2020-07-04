import React, { Fragment } from "react";
import Header from "../component/Header/Header";
import Announce from "../component/Announce/Announce";
import ModalErr from "../component/ModalErr/ModalErr";
import Loading from "../component/Loading/Loading";

import { connect } from "react-redux";
import {
  fetchAnnounce,
  message,
  addBookMark,
  deleteBookMark,
} from "../actions";
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { FaHome, FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class AnnounceShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageErr: false,
      messageSuccess: false,
      message: {
        name: "",
        phone: "",
        email: "",
        message: "",
        idUser: "",
      },
      invalid: {
        invalidName: false,
        invalidPhone: false,
        invalidEmail: false,
        invalidMessage: false,
      },
    };
  }

  componentDidMount = async () => {
    document.title = "บ้าน คอนโด ตลาดซื้อขาย-เช่า";
    const id = this.props.match.params.id;
    this.props.fetchAnnounce(id);
  };

  changeHandler = (event) => {
    const name = event.target.name;
    let value = event.target.value.trim();

    if (name === "phone") {
      const input = value.replace(/\D/g, "").substring(0, 10);
      const first = input.substring(0, 3);
      const middle = input.substring(3, 6);
      const last = input.substring(6, 10);
      let result;
      if (input.length > 6) {
        result = `${first}-${middle}-${last}`;
      } else if (input.length > 3) {
        result = `${first}-${middle}`;
      } else if (input.length >= 0) {
        result = input;
      }
      value = result;
    }

    this.setState({
      message: {
        ...this.state.message,
        [name]: value,
        idUser: this.props.announce.id_user,
      },
    });
  };

  validation = () => {
    let isError = false;
    const { invalid, message } = this.state;

    invalid.invalidName = message.name <= 1 ? true : false;
    invalid.invalidEmail = !emailRegex.test(message.email) ? true : false;
    invalid.invalidPhone =
      message.phone.toString().length !== 12 ? true : false;
    invalid.invalidMessage = message.message <= 2 ? true : false;

    if (
      invalid.invalidName ||
      invalid.invalidEmail ||
      invalid.invalidPhone ||
      invalid.invalidMessage
    )
      isError = true;

    this.setState({
      invalid: {
        ...this.state.invalid,
      },
    });
    return isError;
  };

  messageErr = () => {
    this.setState({
      messageErr: !this.state.messageErr,
    });
  };

  sendMessage = () => {
    this.setState({
      messageSuccess: !this.state.messageSuccess,
      message: {
        ...this.state.message,
        name: "",
        phone: "",
        email: "",
        message: "",
      },
    });
  };

  componentDidUpdate(nextProps) {
    const { message_err } = this.props;
    if (nextProps.message_err !== message_err) {
      if (message_err) {
        this.setState({ messageErr: true });
      }
    }
  }
  handleMessagSuccess = () => {
    const { message } = this.props;
    if (message) this.setState({ messageSuccess: true });
  };
  handleSubmit = async (event) => {
    const message = this.state.message;
    event.preventDefault();
    const err = this.validation();
    if (!err) {
      await this.props.message(message);
      await this.handleMessagSuccess();
    }
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
      announce,
      isLoading,
      message,
      err,
      message_err,
      match,
    } = this.props;
    const { invalid } = this.state;
    const value = { ...this.state.message };
    return (
      <Fragment>
        <Header user={user} isAuthenticated={isAuthenticated} match={match} />
        <div className="content">
          <Container className="mt-2">
            <Breadcrumb style={{ backgroundColor: "white" }}>
              <BreadcrumbItem>
                <FaHome className="mr-1" />
                <a href="/">หน้าแรก</a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                {announce && <Fragment>{announce.property_type}</Fragment>}
              </BreadcrumbItem>
              <BreadcrumbItem>
                {announce && <Fragment>{announce.announcement_type}</Fragment>}
              </BreadcrumbItem>
              <BreadcrumbItem active>
                {announce && <Fragment>{announce.topic}</Fragment>}
              </BreadcrumbItem>
              {/* <BreadcrumbItem active>{announce.topic}</BreadcrumbItem> */}
            </Breadcrumb>
          </Container>
          {isLoading && !announce && <Loading isLoading={isLoading} />}
          {announce && (
            <Announce
              mark={match.params.mark}
              announce={announce}
              value={value}
              invalid={invalid}
              changeHandler={this.changeHandler}
              submit={this.handleSubmit}
              addBookMark={this.handleAddBookMark}
              deleteBookMark={this.handleDeleteBookMark}
            />
          )}
          {err || (message_err && <ModalErr />)}
          <Modal
            isOpen={this.state.messageErr}
            className="modal-dialog-centered"
          >
            <ModalBody className="text-center">
              <FaRegTimesCircle style={{ color: "red" }} size={32} />
              <h4>เกิดข้อผิดพลาด กรุณาทำรายการใหม่</h4>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success m-auto"
                onClick={this.messageErr}
                className="rounded-pill"
              >
                ตกลง
              </Button>
            </ModalFooter>
          </Modal>

          <Modal
            isOpen={this.state.messageSuccess}
            className="modal-dialog-centered"
          >
            <ModalHeader
              style={{
                backgroundColor: "#01D26C",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FaRegCheckCircle style={{ color: "white" }} size={32} />
            </ModalHeader>
            <ModalBody className="text-center">
              <h3>ส่งข้อความสำเร็จ</h3>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success m-auto"
                onClick={this.sendMessage}
                className="rounded-pill"
              >
                ตกลง
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const announce = state.announce[props.match.params.id] || {};
  return {
    isAuthenticated: state.user.authenticated,
    user: state.user,

    isLoading: announce.isLoading,
    announce: announce.data,
    err: announce.err,

    message: state.message.data,
    message_err: state.message.err,

    addBookmark: state.addBookmark.data,
    addBookmarkErr: state.addBookmark.err,
    addBookmarkIsLoading: state.addBookmark.isLoading,

    deleteBookmark: state.deleteBookmark.data,
    deleteBookmarkErr: state.deleteBookmark.err,
    deleteBookmarkIsLoading: state.deleteBookmark.isLoading,
  };
};

const mapDispatchToProps = {
  fetchAnnounce,
  message,
  addBookMark,
  deleteBookMark,
};

export default AnnounceShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnounceShow);
