import React, { Fragment } from "react";
import "./Inbox.css";
import { Modal, Button ,ModalBody ,ModalFooter} from "reactstrap";
import { FaRegStar, FaRegEnvelope, FaTrashAlt ,FaTimes } from "react-icons/fa";
class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      id: "",
    };
  }

  handleClick = (e, id) => {
    e.preventDefault();
    return (window.location.href = `/member/message/${id}`);
  };

  confirmDelete = (id) => {
    this.setState({
      ...this.state,
      confirmDelete: !this.state.confirmDelete,
      id: id,
    });
  };

  handleDelete = () => {
    this.props.deleteMail(this.state.id);
  };

  render() {
    const { mail, save, unread } = this.props;
    return (
      <Fragment>
        <table className="mail-list mt-2">
          <tbody>
            {mail.data.map((detail, i) => (
              <tr
                className={
                  detail.reading_status === 1 ? "mail mail-read" : "mail"
                }
                key={i}
              >
                <td
                  className="pl-2 fix columnA"
                  onClick={(e) => {
                    this.handleClick(e, detail.id);
                  }}
                >
                  {detail.email}
                </td>
                <td
                  className="pl-2 fix columnB"
                  onClick={(e) => {
                    this.handleClick(e, detail.id);
                  }}
                >
                  {detail.message}
                </td>
                <td
                  className="pl-2 fix columnC"
                  onClick={(e) => {
                    this.handleClick(e, detail.id);
                  }}
                >
                  {detail.created_at}
                </td>
                <td className="pr-2 columnD">
                  <FaRegStar
                    size="20"
                    className={
                      detail.reading_status === 2
                        ? "mt-1 star-2 rounded-circle"
                        : "mt-1 star rounded-circle"
                    }
                    onClick={() => save(detail.id)}
                  />
                  <Button
                    color="primary"
                    className="rounded-pill ml-2"
                    size="sm"
                    onClick={() => unread(detail.id)}
                  >
                    <FaRegEnvelope className="mr-1" />
                    ยังไม่ได้อ่าน
                  </Button>
                  <Button
                    color="danger"
                    className="rounded-pill ml-2"
                    size="sm"
                    onClick={() => this.confirmDelete(detail.id)}
                  >
                    <FaTrashAlt className="mr-1" />
                    ลบ
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default Inbox;
